// generate-tech-options.js
// Génère tech-options.json (pour le multiSelect OrgChart) et tech-radar.json (pour le panneau UI)
// Usage : node scripts/generate-tech-options.js  (depuis la racine du projet)

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const radar = yaml.load(fs.readFileSync(path.join(ROOT, 'data/tech-radar.yaml'), 'utf8'));

// tech-options.json : liste plate pour le multiSelect OrgChart
const techOptions = radar.categories.flatMap(cat =>
    cat.technos.map(t => ({ value: t, text: t }))
);
fs.writeFileSync(path.join(ROOT, 'public/tech-options.json'), JSON.stringify(techOptions, null, 4));
console.log(`✓ tech-options.json généré avec ${techOptions.length} technos.`);

// tech-radar.json : structure par catégorie pour le panneau UI
fs.writeFileSync(path.join(ROOT, 'public/tech-radar.json'), JSON.stringify(radar.categories, null, 4));
console.log(`✓ tech-radar.json généré avec ${radar.categories.length} catégories.`);
