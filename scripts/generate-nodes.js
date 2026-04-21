// generate-nodes.js
// Usage : node scripts/generate-nodes.js  (depuis la racine du projet)
// Requires : npm install js-yaml

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const data = yaml.load(fs.readFileSync(path.join(ROOT, 'data/team.yaml'), 'utf8'));

const nodes = [];
const searchIndex = [];
let idCounter = 1;

function nextId() {
    return idCounter++;
}

// ── Head (Franck Drecourt) ──────────────────────────────────────
const headId = nextId();
nodes.push({
    id: headId,
    name: data.head.name,
    title: data.head.title,
    photo: data.head.photo || '',
    description: data.head.description || '',
    likedTechnos: data.head.technos || [],
    tags: ['listceo']
});
searchIndex.push({
    name: data.head.name,
    title: data.head.title,
    photo: data.head.photo || '',
    technos: data.head.technos || [],
    contact: data.head.contact || [],
    referent: data.head.referent || [],
    team: '',
    dm: '',
    dmDescription: ''
});

// ── Directors ───────────────────────────────────────────────────
for (const director of (data.directors || [])) {
    const dirId = nextId();
    nodes.push({
        id: dirId,
        pid: headId,
        name: director.name,
        title: director.title,
        photo: director.photo || '',
        description: director.description || '',
        likedTechnos: director.technos || [],
        tags: ['list', 'director']
    });
    searchIndex.push({
        name: director.name,
        title: director.title,
        photo: director.photo || '',
        technos: director.technos || [],
        contact: director.contact || [],
        referent: director.referent || [],
        team: '',
        dm: '',
        dmDescription: director.description || ''
    });

    // ── Delivery Managers under this director ───────────────────
    for (const dm of (director.delivery_managers || [])) {
        const dmId = nextId();
        nodes.push({
            id: dmId,
            pid: dirId,
            name: dm.name,
            title: dm.title,
            tags: ['list', 'manager'],
            photo: dm.photo || '',
            likedTechnos: dm.technos || [],
            description: dm.description || ''
        });
        searchIndex.push({
            name: dm.name,
            title: dm.title,
            photo: dm.photo || '',
            technos: dm.technos || [],
            contact: dm.contact || [],
            referent: dm.referent || [],
            team: '',
            dm: director.name,
            dmDescription: dm.description || ''
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
            searchIndex.push({
                name: em.name,
                title: em.title,
                photo: em.photo || '',
                technos: em.technos || [],
                contact: em.contact || [],
                referent: em.referent || [],
                team: '',
                dm: dm.name,
                dmDescription: dm.description || ''
            });
        }

        // Teams
        for (const team of (dm.teams || [])) {
            const teamId = nextId();
            nodes.push({
                id: teamId,
                pid: dmId,
                name: team.name,
                title: team.description || 'Team',
                tags: ['team']
            });

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
                searchIndex.push({
                    name: member.name,
                    title: member.title,
                    photo: member.photo || '',
                    technos: member.technos || [],
                    contact: member.contact || [],
                    referent: member.referent || [],
                    team: team.name,
                    dm: dm.name,
                    dmDescription: dm.description || ''
                });
            }
        }
    }
}

fs.writeFileSync(path.join(ROOT, 'public/nodes.json'), JSON.stringify(nodes, null, 4));
console.log(`✓ nodes.json généré avec ${nodes.length} nœuds.`);

fs.writeFileSync(path.join(ROOT, 'public/search-index.json'), JSON.stringify(searchIndex, null, 4));
console.log(`✓ search-index.json généré avec ${searchIndex.length} entrées.`);
