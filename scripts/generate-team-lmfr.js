#!/usr/bin/env node
/**
 * Génère data/team-lmfr.yaml à partir de :
 * - arbre_organisation_dxd.csv  (structure des nœuds)
 * - information_collaborateur_dxd.csv  (collaborateurs)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ── helpers ────────────────────────────────────────────────────────────────

function parseCsv(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').replace(/\r/g, '').trim().split('\n');
  const headers = lines[0].replace(/"/g, '').split(',');
  return lines.slice(1).map(line => {
    // handle commas inside quoted fields
    const cols = [];
    let cur = '';
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (cols[i] || '').trim(); });
    return obj;
  });
}

function capitalize(str) {
  if (!str) return '';
  // Handle hyphenated parts (e.g. Jean-Paul)
  return str
    .split('-')
    .map(segment =>
      segment.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    )
    .join('-');
}

function formatName(first, last) {
  return `${capitalize(first)} ${capitalize(last)}`;
}

// Normalise un manager_name "DUPONT Jean" ou "MASSET ALEXIS" → "Alexis Masset"
// Format dans arbre_organisation_dxd.csv : LASTNAME Firstname(s)
// Le premier token est toujours le nom de famille (tout en caps ou non)
function normalizeManagerName(raw) {
  if (!raw) return '';
  const parts = raw.trim().split(/\s+/);
  if (parts.length === 1) return capitalize(parts[0]);
  // First token = LASTNAME, rest = Firstname(s)
  const lastname = parts[0];
  const firstname = parts.slice(1).join(' ');
  return `${capitalize(firstname)} ${capitalize(lastname)}`;
}

// ── photos ─────────────────────────────────────────────────────────────────

// Photos réelles pour les personnes connues (clé = nom normalisé)
const KNOWN_PHOTOS = {
  'Franck Drecourt':  'https://media.licdn.com/dms/image/v2/C4D03AQHTKRqvHjEj5w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516933296317?e=1778112000&v=beta&t=DLyPwIbyPl0UWKS8CGlgiVsXMTWq5YiMvQX7WbD9vs4',
  'Alexis Masset':    'https://media.licdn.com/dms/image/v2/C4E03AQFe6OnLMtGtrA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1626881647348?e=1778112000&v=beta&t=c5sE-IZMQiDnSMOs22ICIV8pTp6ubQGiGONQiPtFYcA',
  'Thomas Bujaud':    'https://media.licdn.com/dms/image/v2/C5603AQELh6Z79-QYlw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516316841461?e=1778112000&v=beta&t=O9FndgdFKdSeKx7siXnvG__fmA8vBwJkDl_yjSHrk_s',
  'Cedric Boufflers': 'https://media.licdn.com/dms/image/v2/C4D03AQGAAMGjwYhF_w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1552597928446?e=1778112000&v=beta&t=Ah6SLgyyHGbTFhtmdFvE7iIgHe44AMg5o3vjYyvdcIU',
  'Julien Smadja':    'https://media.licdn.com/dms/image/v2/C4D03AQGdrssLYnRVjw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1597738702036?e=1778112000&v=beta&t=L8XgugcYu73c128RmR_2y0kbBC6f4Cd1gr57Eze64zM',
};

// Balkan CDN propose des avatars de /a/1.jpg à /a/20.jpg
// On alterne hommes (/a/) et femmes (/f/) selon le prénom
const FEMALE_FIRSTNAMES = new Set([
  'sophie', 'julie', 'alya', 'marie', 'fabienne', 'lucie', 'sarah', 'delphine',
  'anaïs', 'alexia', 'juliette', 'flora', 'emeline', 'elise', 'laetitia',
  'ingrid', 'audrey', 'aline', 'lise', 'camille', 'pauline', 'helene', 'helène',
  'hind', 'stephanie', 'clara', 'maite', 'hanane',
]);

// Hash simple pour avoir un index déterministe depuis le nom
function hashName(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function photoFor(name) {
  if (KNOWN_PHOTOS[name]) return KNOWN_PHOTOS[name];
  const firstname = name.split(' ')[0].toLowerCase();
  const isFemale = FEMALE_FIRSTNAMES.has(firstname);
  const folder = isFemale ? 'f' : 'a';
  const idx = (hashName(name) % 20) + 1;
  return `https://cdn.balkan.app/shared/${folder}/${idx}.jpg`;
}



const ROOT = path.join(__dirname, '..');
const arbre = parseCsv(path.join(ROOT, 'arbre_organisation_dxd.csv'));
const collabs = parseCsv(path.join(ROOT, 'information_collaborateur_dxd.csv'));

// Index arbre by code
const nodeByCode = {};
arbre.forEach(n => { nodeByCode[n.code] = n; });

// Group collabs by worker_code (= the org node they belong to)
const collabsByNode = {};
collabs.forEach(c => {
  const code = c.worker_code;
  if (!collabsByNode[code]) collabsByNode[code] = [];
  collabsByNode[code].push(c);
});

// ── build hierarchy ────────────────────────────────────────────────────────

// Level 2 = root DXD direction (Franck Drecourt)
// Level 3 = directors
// Level 4 = delivery manager domains
// Level 5 = teams

const level3 = arbre.filter(n => n.level === '3' && n.parent === 'LMFR_LTF1');
const level4 = arbre.filter(n => n.level === '4');
const level5 = arbre.filter(n => n.level === '5');

function stripDxdPrefix(label) {
  // "LMF - DXD - ROX - Services & Reno" → "Services & Reno"
  // "LMF - DXD - Supply, Data, Finance & Développement" → "Supply, Data, Finance & Développement"
  // Remove "LMF - DXD - " prefix, then optionally remove "ACRONYM - " prefix
  let s = label.replace(/^LMF\s*-\s*DXD\s*-\s*/i, '').trim();
  // If there are still segments like "ROX - Something", strip the first acronym
  s = s.replace(/^[A-Z0-9+&\s]+\s*-\s*/i, s => {
    // Only strip if the first part looks like a short acronym (≤6 chars without spaces)
    const acronym = s.replace(/\s*-\s*$/, '').trim();
    return acronym.replace(/\s/g, '').length <= 6 ? '' : s;
  });
  return s;
}

function makeMembers(nodeCode) {
  const people = collabsByNode[nodeCode] || [];
  return people.map(p => {
    const name = formatName(p.worker_first_name, p.worker_last_name);
    return {
      name,
      title: 'Développeur',
      photo: photoFor(name),
      technos: [],
      contact: ['Slack'],
    };
  });
}

// Build director objects
const directors = level3.map(dir => {
  const directorName = normalizeManagerName(dir.manager_name);
  const description = stripDxdPrefix(dir.label);

  // level4 nodes under this director
  const dmNodes = level4.filter(n => n.parent === dir.code);

  // Group level4 nodes by manager_name → 1 DM per unique manager
  const dmGroups = new Map();
  dmNodes.forEach(dmNode => {
    const key = dmNode.manager_name;
    if (!dmGroups.has(key)) dmGroups.set(key, []);
    dmGroups.get(key).push(dmNode);
  });

  const delivery_managers = [...dmGroups.entries()].map(([mgrName, nodes]) => {
    const dmName = normalizeManagerName(mgrName);
    // Description = join all domain names managed by this person
    const dmDescription = nodes.map(n => stripDxdPrefix(n.label)).join(', ');

    let engineering_manager = null;
    const teams = [];

    for (const dmNode of nodes) {
      const teamNodes = level5.filter(n => n.parent === dmNode.code);
      const directCollabs = collabsByNode[dmNode.code] || [];

      // Build teams from level5 sub-nodes
      for (const teamNode of teamNodes) {
        const teamName = stripDxdPrefix(teamNode.label);
        const teamManagerName = normalizeManagerName(teamNode.manager_name);

        // If team manager differs from DM → potential EM (first one wins)
        if (teamManagerName && teamManagerName !== dmName && !engineering_manager) {
          engineering_manager = {
            name: teamManagerName,
            title: 'Engineering Manager',
            isAssistant: true,
            photo: photoFor(teamManagerName),
            technos: [],
            contact: ['Slack'],
          };
        }

        teams.push({ name: teamName, members: makeMembers(teamNode.code) });
      }

      // Direct collabs on this DM node → always add them, either merged into
      // an existing team or as their own team if no level5 sub-nodes for this node
      if (teamNodes.length === 0 && directCollabs.length > 0) {
        teams.push({ name: stripDxdPrefix(dmNode.label), members: makeMembers(dmNode.code) });
      } else if (teamNodes.length > 0 && directCollabs.length > 0) {
        // Append direct collabs to the first team of this node
        const firstTeam = teams[teams.length - teamNodes.length];
        if (firstTeam) {
          firstTeam.members = [...firstTeam.members, ...makeMembers(dmNode.code)];
        }
      }
    }

    const dm = {
      name: dmName,
      title: 'Delivery Manager',
      description: dmDescription,
      photo: photoFor(dmName),
      technos: [],
      contact: ['Slack'],
      teams,
    };
    if (engineering_manager) {
      dm.engineering_manager = engineering_manager;
    }
    return dm;
  });

  // Collabs directly under director node (no DM)
  const directDirCollabs = collabsByNode[dir.code] || [];

  return {
    name: directorName,
    title: 'Directeur',
    description,
    technos: [],
    contact: ['Slack'],
    delivery_managers,
  };
});

// ── assemble root ──────────────────────────────────────────────────────────

const teamData = {
  head: {
    name: 'Franck Drecourt',
    title: 'Directeur Digital Data',
    technos: [],
    contact: ['Google Chat'],
  },
  directors,
};

// ── write YAML ─────────────────────────────────────────────────────────────

const outPath = path.join(ROOT, 'data', 'team-lmfr.yaml');
const yamlStr = yaml.dump(teamData, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,   // no anchors
  quotingType: '"',
  forceQuotes: false,
});

fs.writeFileSync(outPath, yamlStr, 'utf8');
console.log(`✅  Written: ${outPath}`);

// Print summary
const totalDirs = directors.length;
const totalDMs = directors.reduce((s, d) => s + (d.delivery_managers || []).length, 0);
const totalTeams = directors.reduce((s, d) =>
  s + (d.delivery_managers || []).reduce((s2, dm) => s2 + (dm.teams || []).length, 0), 0);
const totalMembers = directors.reduce((s, d) =>
  s + (d.delivery_managers || []).reduce((s2, dm) =>
    s2 + (dm.teams || []).reduce((s3, t) => s3 + (t.members || []).length, 0), 0), 0);

console.log(`   Directors : ${totalDirs}`);
console.log(`   DMs       : ${totalDMs}`);
console.log(`   Teams     : ${totalTeams}`);
console.log(`   Members   : ${totalMembers}`);
