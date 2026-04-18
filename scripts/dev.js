// dev.js
// Serveur de développement avec watch sur data/ + live reload SSE
// Usage : node scripts/dev.js  (depuis la racine du projet)

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const WATCH_FILES = [
    path.join(ROOT, 'data/team.yaml'),
    path.join(ROOT, 'data/tech-radar.yaml'),
];

const MIME_TYPES = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.yaml': 'text/yaml',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.ico':  'image/x-icon',
    '.svg':  'image/svg+xml',
};

// ── SSE clients ───────────────────────────────────────────────
const sseClients = new Set();

function notifyReload() {
    for (const res of sseClients) {
        res.write('data: reload\n\n');
    }
}

// ── Snippet SSE injecté dans index.html ───────────────────────
const SSE_SNIPPET = `
<script>
(function() {
    var es = new EventSource('/__livereload');
    es.onmessage = function(e) {
        if (e.data === 'reload') window.location.reload();
    };
    es.onerror = function() {
        setTimeout(function() { window.location.reload(); }, 1000);
    };
})();
</script>
`;

// ── Serveur HTTP ──────────────────────────────────────────────
const server = http.createServer((req, res) => {
    // Endpoint SSE
    if (req.url === '/__livereload') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });
        res.write(':\n\n'); // keep-alive initial
        sseClients.add(res);
        req.on('close', () => sseClients.delete(res));
        return;
    }

    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.join(PUBLIC_DIR, urlPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || 'text/plain';

        // Injection du snippet SSE dans index.html
        if (ext === '.html') {
            const html = data.toString().replace('</body>', SSE_SNIPPET + '</body>');
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(html);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré : http://localhost:${PORT}`);
    console.log(`📁 Serveur depuis : ${PUBLIC_DIR}`);
    console.log(`👀 Watch : ${WATCH_FILES.map(f => path.relative(ROOT, f)).join(', ')}\n`);
});

// ── Watch + régénération ──────────────────────────────────────
let debounceTimer = null;

function regenerate(filename) {
    console.log(`📝 ${path.relative(ROOT, filename)} modifié — régénération...`);
    try {
        const output = execSync('npm run generate', { cwd: ROOT, encoding: 'utf8' });
        output.split('\n').filter(Boolean).forEach(line => console.log('  ' + line));
        console.log('✓ Régénération terminée — reload navigateur\n');
        notifyReload();
    } catch (err) {
        console.error('✗ Erreur lors de la régénération :', err.message);
    }
}

WATCH_FILES.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Fichier introuvable, pas de watch : ${filePath}`);
        return;
    }
    fs.watch(filePath, () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => regenerate(filePath), 200);
    });
    console.log(`👀 Watching ${path.relative(ROOT, filePath)}`);
});
