// generate-nodes.js
// Usage : node scripts/generate-nodes.js  (depuis la racine du projet)
// Requires : npm install js-yaml

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const team = yaml.load(fs.readFileSync(path.join(ROOT, 'data/team.yaml'), 'utf8'));

const nodes = [];
let idCounter = 1;

function nextId() {
    return idCounter++;
}

// ── Head ────────────────────────────────────────────────────────
const headId = nextId();
nodes.push({
    id: headId,
    name: team.head.name,
    title: team.head.title,
    photo: team.head.photo || '',
    description: team.head.description || '',
    likedTechnos: team.head.technos || [],
    tags: ['listceo']
});

// ── Delivery Managers ───────────────────────────────────────────
for (const dm of team.delivery_managers) {
    const dmId = nextId();
    nodes.push({
        id: dmId,
        pid: headId,
        name: dm.name,
        title: dm.title,
        tags: ['list', 'manager'],
        photo: dm.photo || '',
        likedTechnos: dm.technos || [],
        description: dm.description || ''
    });

    // Engineering Manager (assistant)
    if (dm.engineering_manager) {
        const em = dm.engineering_manager;
        nodes.push({
            id: nextId(),
            pid: dmId,
            isAssistant: true,
            name: em.name,
            title: em.title,
            photo: em.photo || '',
            likedTechnos: em.technos || []
        });
    }

    // Teams
    for (const team of (dm.teams || [])) {
        const teamId = nextId();
        const teamNode = {
            id: teamId,
            pid: dmId,
            name: team.name,
            title: team.description || 'Team',
            tags: ['team']
        };
        nodes.push(teamNode);

        // Members
        for (const member of (team.members || [])) {
            nodes.push({
                id: nextId(),
                stpid: teamId,
                name: member.name,
                title: member.title,
                photo: member.photo || '',
                likedTechnos: member.technos || []
            });
        }
    }
}

fs.writeFileSync(path.join(ROOT, 'public/nodes.json'), JSON.stringify(nodes, null, 4));
console.log(`✓ nodes.json généré avec ${nodes.length} nœuds.`);

// ── Search index : liste plate des membres avec contexte orga ──
const searchIndex = [];

// Head
searchIndex.push({
    name: team.head.name,
    title: team.head.title,
    photo: team.head.photo || '',
    technos: team.head.technos || [],
    contact: team.head.contact || [],
    team: '',
    dm: '',
    dmDescription: ''
});

for (const dm of team.delivery_managers) {
    // DM themselves
    searchIndex.push({
        name: dm.name,
        title: dm.title,
        photo: dm.photo || '',
        technos: dm.technos || [],
        contact: dm.contact || [],
        team: '',
        dm: '',
        dmDescription: dm.description || ''
    });

    // EM
    if (dm.engineering_manager) {
        const em = dm.engineering_manager;
        searchIndex.push({
            name: em.name,
            title: em.title,
            photo: em.photo || '',
            technos: em.technos || [],
            contact: em.contact || [],
            team: '',
            dm: dm.name,
            dmDescription: dm.description || ''
        });
    }

    // Team members
    for (const t of (dm.teams || [])) {
        for (const member of (t.members || [])) {
            searchIndex.push({
                name: member.name,
                title: member.title,
                photo: member.photo || '',
                technos: member.technos || [],
                contact: member.contact || [],
                team: t.name,
                dm: dm.name,
                dmDescription: dm.description || ''
            });
        }
    }
}

fs.writeFileSync(path.join(ROOT, 'public/search-index.json'), JSON.stringify(searchIndex, null, 4));
console.log(`✓ search-index.json généré avec ${searchIndex.length} entrées.`);
