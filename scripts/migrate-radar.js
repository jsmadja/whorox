/**
 * Script de migration : tech-radar-adeo.json → tech-radar.yaml + mise à jour team.yaml + public/
 *
 * - Filtre les technos pertinentes pour une équipe dev (exclut infra réseau, OS, etc.)
 * - Regroupe par quadrant ADEO renommé en catégories lisibles
 * - Réassigne aléatoirement 3 technos par membre depuis le nouveau radar
 * - Met à jour user-profile.json et activity-feed.json
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const ROOT = path.resolve(__dirname, '..');
const adeoData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/tech-radar-adeo.json'), 'utf8'));
const teamData = yaml.parse(fs.readFileSync(path.join(ROOT, 'data/team.yaml'), 'utf8'));

// ── 1. Filtrer et regrouper les technos ADEO ─────────────────

// Catégories à exclure (pas pertinentes pour les développeurs)
const EXCLUDED_CATEGORIES = [
    'Network', 'Operating Systems', 'CDN', 'Cloud', 'Server',
    'Duplicated', 'Scheduling', 'Alerting', 'Incident',
    'Incident Management', 'Identity Management', 'Identity & Role Mangement',
    'SBOM', 'Antibot and DDOS protection', 'Configuration Compliance',
    'Vulnerability Manager', 'Data Access Management', 'Agile Project Management',
    'API Portal', 'API Gateway', 'Database Platform', 'Database Provider',
    'Innersource', 'Web Indicators', 'Web Performance',
];

// Stages à garder (adopt + trial, exclure assess et hold qui sont trop niche)
const KEEP_STAGES = ['adopt', 'trial'];

// Filtrer
const filtered = adeoData.filter(function(t) {
    if (!t.name || t.name.trim() === '') return false;
    if (EXCLUDED_CATEGORIES.indexOf(t.category) !== -1) return false;
    if (KEEP_STAGES.indexOf(t.stage) === -1) return false;
    return true;
});

// Regrouper par category (champ `category` du JSON ADEO)
const grouped = {};
filtered.forEach(function(t) {
    var cat = t.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    // Éviter les doublons de nom
    var exists = grouped[cat].find(function(x) { return x === t.name.trim(); });
    if (!exists) grouped[cat].push(t.name.trim());
});

// Trier les technos dans chaque catégorie, trier les catégories alphabétiquement
Object.keys(grouped).forEach(function(cat) {
    grouped[cat].sort();
});
var sortedCats = Object.keys(grouped).sort();

// ── 2. Écrire tech-radar.yaml ────────────────────────────────
var radarYaml = { categories: [] };
sortedCats.forEach(function(name) {
    radarYaml.categories.push({ name: name, technos: grouped[name] });
});

fs.writeFileSync(path.join(ROOT, 'data/tech-radar.yaml'), yaml.stringify(radarYaml));
console.log('✓ tech-radar.yaml réécrit avec ' + filtered.length + ' technos en ' + sortedCats.length + ' catégories.');

// ── 3. Construire la liste plate de toutes les technos ───────
var allTechnos = [];
radarYaml.categories.forEach(function(c) {
    c.technos.forEach(function(t) {
        if (allTechnos.indexOf(t) === -1) allTechnos.push(t);
    });
});
console.log('   → ' + allTechnos.length + ' technos uniques');

// ── 4. Réassigner les technos dans team.yaml ─────────────────
function pickRandom(arr, n) {
    var shuffled = arr.slice().sort(function() { return 0.5 - Math.random(); });
    return shuffled.slice(0, n);
}

function reassignTechnos(person) {
    if (person && person.technos) {
        person.technos = pickRandom(allTechnos, 3);
    }
}

// Head
reassignTechnos(teamData.head);

// DMs + EMs + membres
teamData.delivery_managers.forEach(function(dm) {
    reassignTechnos(dm);
    if (dm.engineering_manager) reassignTechnos(dm.engineering_manager);
    (dm.teams || []).forEach(function(team) {
        (team.members || []).forEach(function(member) {
            reassignTechnos(member);
        });
    });
});

// Garder les technos spécifiques de Julien Smadja (on les réassigne aussi mais c'est OK)

fs.writeFileSync(path.join(ROOT, 'data/team.yaml'), yaml.stringify(teamData));
console.log('✓ team.yaml réécrit avec technos réassignées.');

// ── 5. Mettre à jour user-profile.json ───────────────────────
// Trouver les technos de Julien dans le YAML mis à jour
var julienTechnos = [];
teamData.delivery_managers.forEach(function(dm) {
    (dm.teams || []).forEach(function(team) {
        (team.members || []).forEach(function(m) {
            if (m.name === 'Julien Smadja') julienTechnos = m.technos || [];
        });
    });
});

var userProfile = {
    name: 'Julien Smadja',
    title: 'Tech Lead',
    photo: 'https://media.licdn.com/dms/image/v2/C4D03AQGdrssLYnRVjw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1597738702036?e=1778112000&v=beta&t=L8XgugcYu73c128RmR_2y0kbBC6f4Cd1gr57Eze64zM',
    team: 'Tapas',
    dm: 'Thomas Bujaud',
    dmDescription: 'Services & Reno',
    canHelp: julienTechnos.slice(0, 2),
    needsHelp: pickRandom(allTechnos.filter(function(t) { return julienTechnos.indexOf(t) === -1; }), 2)
};
fs.writeFileSync(path.join(ROOT, 'public/user-profile.json'), JSON.stringify(userProfile, null, 4) + '\n');
console.log('✓ user-profile.json mis à jour.');

// ── 6. Mettre à jour activity-feed.json ──────────────────────
// Collecter des noms de membres
var allMembers = [];
teamData.delivery_managers.forEach(function(dm) {
    (dm.teams || []).forEach(function(team) {
        (team.members || []).forEach(function(m) {
            allMembers.push(m.name);
        });
    });
});

var feed = [];
var baseDate = new Date('2026-04-20T10:00:00');
for (var i = 0; i < 20; i++) {
    var actor = allMembers[Math.floor(Math.random() * allMembers.length)];
    var type = Math.random() > 0.5 ? 'canHelp' : 'needsHelp';
    var techno = allTechnos[Math.floor(Math.random() * allTechnos.length)];
    var date = new Date(baseDate.getTime() - i * 3600000 * (2 + Math.random() * 10));
    feed.push({
        actor: actor,
        type: type,
        techno: techno,
        date: date.toISOString().replace(/\.\d{3}Z/, '')
    });
}
fs.writeFileSync(path.join(ROOT, 'public/activity-feed.json'), JSON.stringify(feed, null, 4) + '\n');
console.log('✓ activity-feed.json mis à jour avec 20 événements.');

console.log('\n→ Lancez maintenant : npm run generate');
