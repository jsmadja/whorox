//JavaScript

// ── Design : nœuds principaux (managers, Alexis) ─────────────
OrgChart.templates.clara.node = function(node, data, animations, config) {
    var id = 'grad_' + node.id;
    return `
    <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f8f9fb"/>
        </linearGradient>
        <filter id="shadow_${node.id}" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="rgba(0,0,0,0.10)"/>
        </filter>
    </defs>
    <rect x="0" y="0" height="${node.h}" width="${node.w}"
        fill="url(#${id})" rx="12" ry="12"
        stroke="#e2e8f0" stroke-width="1"
        filter="url(#shadow_${node.id})"/>
    <rect x="0" y="${node.h - 4}" width="${node.w}" height="4"
        fill="#78be20" rx="0" ry="12"/>`;
};

OrgChart.templates.clara.field_0 = function(node, data, config, mode, val) {
    var hasPhoto = !!data.photo;
    var x = node.stChildren.length ? (hasPhoto ? 90 : 15) : 15;
    var y = node.stChildren.length ? 65 : 160;
    var anchor = 'start';
    var w = node.stChildren.length ? (hasPhoto ? node.w - 110 : node.w - 30) : node.w - 30;
    return OrgChart.wrapText(val,
        `<text style="font-size:16px;font-weight:700;letter-spacing:0.01em;" fill="#1a202c" x="${x}" y="${y}" text-anchor="${anchor}"></text>`,
        w, 1);
};

OrgChart.templates.clara.field_1 = function(node, data, config, mode, val) {
    var x = node.stChildren.length ? node.w - 15 : node.w / 2;
    var y = node.stChildren.length ? 35 : 180;
    var anchor = node.stChildren.length ? 'end' : 'middle';
    var w = node.stChildren.length ? node.w - 100 : node.w - 20;
    var titleSvg = OrgChart.wrapText(val,
        `<text style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;" fill="#6b7a99" x="${x}" y="${y}" text-anchor="${anchor}"></text>`,
        w, 1);
    return titleSvg;
};

OrgChart.templates.clara.editFormHeaderColor = '#78be20';

OrgChart.templates.clara.nodeMenuButton = '';

// ── Augmenter la hauteur max des treeList pour tous les templates ──
OrgChart.templates.clara.treeListMaxHeight = 50000;

// ── Template CEO (Alexis Masset) ──────────────────────────────
OrgChart.templates.ceo = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.ceo.size = [340, 200];
OrgChart.templates.ceo.img_0 = `<clipPath id="{randId}"><circle cx="270" cy="100" r="65"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="205" y="35" width="130" height="130" ></image>`;
OrgChart.templates.ceo.field_0 = `<text data-width="180" style="font-size:18px;font-weight:700;" fill="#1a202c" x="15" y="60" text-anchor="start">{val}</text>`;
OrgChart.templates.ceo.field_1 = `<text data-width="180" style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;" fill="#6b7a99" x="15" y="80" text-anchor="start">{val}</text>`;
OrgChart.templates.ceo.description = `<text data-width="320" style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;" fill="#6b7a99" x="15" y="30" text-anchor="start">{val}</text>`;
OrgChart.templates.ceo.bio = '';

// ── Template manager : affiche titre + description + technos ──
OrgChart.templates.manager = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.manager.size = [180, 260];
OrgChart.templates.manager.field_0 = function(node, data, config, mode, val) {
    var x = node.stChildren.length ? 90 : node.w / 2;
    var y = node.stChildren.length ? 65 : 185;
    var anchor = node.stChildren.length ? 'start' : 'middle';
    var w = node.stChildren.length ? node.w - 110 : node.w - 20;
    return OrgChart.wrapText(val,
        `<text style="font-size:16px;font-weight:700;letter-spacing:0.01em;" fill="#1a202c" x="${x}" y="${y}" text-anchor="${anchor}"></text>`,
        w, 1);
};
OrgChart.templates.manager.img_0 = function(node, data, config, mode, val) {
    var r = 50;
    var cx = node.stChildren.length ? 30 : Math.round(node.w / 2);
    var cy = node.stChildren.length ? 30 : 100;
    var randId = OrgChart.randomId();
    return `<clipPath id="${randId}"><circle cx="${cx}" cy="${cy}" r="${r}"></circle></clipPath>`
         + `<image preserveAspectRatio="xMidYMid slice" clip-path="url(#${randId})" xlink:href="${val}" x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}"></image>`;
};
OrgChart.templates.manager.field_1 = function(node, data, config, mode, val) {
    var x = node.stChildren.length ? node.w - 15 : node.w / 2;
    var anchor = node.stChildren.length ? 'end' : 'middle';
    var w = node.stChildren.length ? node.w - 100 : node.w - 20;
    var yTitle = node.stChildren.length ? 35 : 205;
    var yDesc = node.stChildren.length ? 50 : 30;
    var yTechnos = node.stChildren.length ? 65 : 225;
    var titleSvg = OrgChart.wrapText(val,
        `<text style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;" fill="#6b7a99" x="${x}" y="${yTitle}" text-anchor="${anchor}"></text>`,
        w, 1);
    var description = data.description || '';
    var descW = node.stChildren.length ? 250 : w;
    var descSvg = description
        ? OrgChart.wrapText(description,
            `<text style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;" fill="#6b7a99" x="${x}" y="${yDesc}" text-anchor="${anchor}"></text>`,
            descW, 1)
        : '';
    return titleSvg + descSvg;
};
OrgChart.templates.manager.editFormHeaderColor = '#78be20';
OrgChart.templates.manager.treeListMaxHeight = 50000;

// ── Template expandable (opérations) ─────────────────────────
OrgChart.templates.expandable = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.expandable.treeListMaxHeight = 50000;

// ── Template treeListItem : items membres dans les équipes ────
OrgChart.templates.treeListItemWithTechnos = Object.assign({}, OrgChart.templates.treeListItem);
OrgChart.templates.treeListItemWithTechnos.size = [234, 56];
OrgChart.templates.treeListItemWithTechnos.img_0 = function(node, data, config, mode, val) {
    var r = 20;
    var cx = 22;
    var cy = Math.round(node.h / 2);
    var randId = OrgChart.randomId();
    return `<clipPath id="${randId}"><circle cx="${cx}" cy="${cy}" r="${r}"></circle></clipPath>`
         + `<image preserveAspectRatio="xMidYMid slice" clip-path="url(#${randId})" xlink:href="${val}" x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}"></image>`;
};

OrgChart.templates.treeListItemWithTechnos.field_0 = function(node, data, config, mode, val) {
    var offset = node.level * config.expandCollapseSize + 45;
    return OrgChart.wrapText(val,
        `<text fill="#1e2330" x="${offset}" y="24" style="font-size:13px;font-weight:600;"></text>`,
        node.w - offset - 70, 1);
};
OrgChart.templates.treeListItemWithTechnos.field_1 = function(node, data, config, mode, val) {
    var offset = node.level * config.expandCollapseSize + 45;
    return OrgChart.wrapText(val,
        `<text fill="#6b7a99" x="${offset}" y="40" style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;"></text>`,
        node.w - offset - 70, 1);
};

// ── Helpers ──────────────────────────────────────────────────
function slugify(str) {
    return String(str).toLowerCase().replace(/[.\-_ ]/g, '');
}

function normalizeTechnos(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
        return value.split(",").map(function (item) { return item.trim(); }).filter(Boolean);
    }
    return [];
}

function enrichNodeForSearch(node) {
    var normalizedTechnos = normalizeTechnos(node.likedTechnos);
    var bio = normalizedTechnos.length > 0 ? normalizedTechnos.join(' · ') : (node.bio || '');
    return Object.assign({}, node, {
        likedTechnos: normalizedTechnos,
        bio: bio
    });
}

// ── Tech Radar panel (gauche) ────────────────────────────────
var radarOpen = false;
var radarCategories = [];
var allNodes = [];
var radarAccordions = []; // { header, body, isOpen }
var activeRadarTechno = null;

function toggleRadar() {
    radarOpen = !radarOpen;
    var panel = document.getElementById('radar-panel');
    var btn = document.getElementById('btn-radar');
    if (radarOpen) {
        panel.classList.remove('hidden');
        btn.classList.add('bg-mozaic/10');
    } else {
        panel.classList.add('hidden');
        btn.classList.remove('bg-mozaic/10');
    }
}

function radarExpandAll() {
    radarAccordions.forEach(function(acc) {
        acc.isOpen = true;
        acc.body.style.display = 'block';
        acc.header.querySelector('svg').style.transform = 'rotate(180deg)';
    });
}

function radarCollapseAll() {
    radarAccordions.forEach(function(acc) {
        acc.isOpen = false;
        acc.body.style.display = 'none';
        acc.header.querySelector('svg').style.transform = 'rotate(0deg)';
    });
}

var radarHideUnused = false;

function toggleRadarHideUnused() {
    radarHideUnused = !radarHideUnused;
    var btn = document.getElementById('btn-radar-hide-unused');
    var label = btn.querySelector('span');
    if (radarHideUnused) {
        label.textContent = 'Afficher les technos inutilisées';
        btn.classList.add('text-mozaic-dark');
        btn.classList.remove('text-gray-500');
    } else {
        label.textContent = 'Masquer les technos inutilisées';
        btn.classList.remove('text-mozaic-dark');
        btn.classList.add('text-gray-500');
    }
    // Toggle visibility of items with count 0
    document.querySelectorAll('.radar-tech-item').forEach(function(el) {
        var countEl = el.querySelector('.text-gray-300');
        if (countEl) {
            el.style.display = radarHideUnused ? 'none' : '';
        }
    });
}

function buildRadarPanel(categories, nodes) {
    radarCategories = categories;
    allNodes = nodes;
    radarAccordions = [];

    // Calcul des compteurs : combien de personnes ont chaque techno
    var counts = {};
    nodes.forEach(function(node) {
        normalizeTechnos(node.likedTechnos).forEach(function(t) {
            counts[t] = (counts[t] || 0) + 1;
        });
    });

    var container = document.getElementById('radar-content');
    container.innerHTML = '';

    categories.forEach(function(cat, catIdx) {
        var section = document.createElement('div');
        section.className = 'border-b border-gray-100 last:border-0';

        var header = document.createElement('button');
        header.className = 'w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors';
        header.innerHTML = `
            <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">${cat.name}</span>
            <svg class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200" style="transform:rotate(180deg)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6"/>
            </svg>`;

        var body = document.createElement('div');
        body.className = 'px-4 pb-3 space-y-1';

        cat.technos.forEach(function(techno) {
            var count = counts[techno] || 0;
            var item = document.createElement('button');
            item.className = 'radar-tech-item w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left hover:bg-mozaic/10 transition-colors group';
            item.dataset.techno = techno;
            item.innerHTML = `
                <span class="text-sm text-gray-700 group-hover:text-mozaic-dark">${techno}</span>
                ${count > 0
                    ? `<span class="text-xs font-bold text-white bg-mozaic rounded-full px-1.5 py-0.5 min-w-[20px] text-center">${count}</span>`
                    : `<span class="text-xs text-gray-300">0</span>`
                }`;
            item.addEventListener('click', function() {
                searchFromRadar(techno, item);
            });
            body.appendChild(item);
        });

        // Ouvert par défaut
        var isOpen = true;
        var acc = { header: header, body: body, isOpen: true };
        radarAccordions.push(acc);

        header.addEventListener('click', function() {
            acc.isOpen = !acc.isOpen;
            body.style.display = acc.isOpen ? 'block' : 'none';
            header.querySelector('svg').style.transform = acc.isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });
        body.style.display = 'block';

        section.appendChild(header);
        section.appendChild(body);
        container.appendChild(section);
    });
}

function filterRadarPanel(query) {
    var q = query.trim().toLowerCase();
    radarAccordions.forEach(function(acc) {
        var items = acc.body.querySelectorAll('.radar-tech-item');
        var hasVisible = false;
        items.forEach(function(item) {
            var techno = (item.dataset.techno || '').toLowerCase();
            var match = !q || techno.indexOf(q) !== -1;
            // Respect hide-unused filter too
            var isUnused = item.querySelector('.text-gray-300');
            var hidden = (!match) || (radarHideUnused && isUnused);
            item.style.display = hidden ? 'none' : '';
            if (!hidden) hasVisible = true;
        });
        // Also check if category name matches
        var catName = acc.header.querySelector('span').textContent.toLowerCase();
        var catMatch = q && catName.indexOf(q) !== -1;
        if (catMatch) {
            // Show all items in matching category
            items.forEach(function(item) {
                var isUnused = item.querySelector('.text-gray-300');
                item.style.display = (radarHideUnused && isUnused) ? 'none' : '';
            });
            hasVisible = true;
        }
        // Hide entire section if no visible items
        acc.header.parentElement.style.display = (q && !hasVisible) ? 'none' : '';
        // Auto-expand when filtering
        if (q && hasVisible) {
            acc.body.style.display = 'block';
            acc.header.querySelector('svg').style.transform = 'rotate(180deg)';
        }
    });
}

function searchFromRadar(techno, clickedItem) {
    // Désélectionner si on reclique sur le même
    if (activeRadarTechno === techno) {
        activeRadarTechno = null;
        document.querySelectorAll('.radar-tech-item').forEach(function(el) {
            el.classList.remove('bg-mozaic/20', 'ring-1', 'ring-mozaic');
        });
        // Fermer le panneau recherche
        if (searchPanelOpen) toggleSearchPanel();
        return;
    }
    activeRadarTechno = techno;

    // Style du bouton actif
    document.querySelectorAll('.radar-tech-item').forEach(function(el) {
        el.classList.remove('bg-mozaic/20', 'ring-1', 'ring-mozaic');
    });
    clickedItem.classList.add('bg-mozaic/20', 'ring-1', 'ring-mozaic');

    // Ouvrir le panneau de recherche avec la techno
    if (!searchPanelOpen) toggleSearchPanel();
    var input = document.getElementById('search-panel-input');
    input.value = techno;
    onSearchPanelInput(techno);
}

// ── Current user & activity feed ─────────────────────────────
var currentUser = null;
var activityFeed = [];

// ── Search panel (droite) ────────────────────────────────────
var searchPanelOpen = false;
var searchIndexData = [];

function toggleSearchPanel() {
    searchPanelOpen = !searchPanelOpen;
    var panel = document.getElementById('search-panel');
    var btn = document.getElementById('btn-search-panel');
    if (searchPanelOpen) {
        panel.classList.remove('hidden');
        btn.classList.add('bg-gray-200');
        setTimeout(function() {
            document.getElementById('search-panel-input').focus();
        }, 100);
    } else {
        panel.classList.add('hidden');
        btn.classList.remove('bg-gray-200');
        clearOrgHighlights();
        // Désélectionner la techno radar active
        activeRadarTechno = null;
        document.querySelectorAll('.radar-tech-item').forEach(function(el) {
            el.classList.remove('bg-mozaic/20', 'ring-1', 'ring-mozaic');
        });
    }
}

function searchFilterCanHelp() {
    // Afficher tous les membres qui ont déclaré pouvoir aider, groupés par techno
    var results = [];
    Object.keys(allUserProfiles).forEach(function(name) {
        var profile = allUserProfiles[name];
        if (profile.canHelp.length > 0) {
            var entry = searchIndexData.find(function(e) { return e.name === name; });
            if (entry) {
                results.push({
                    name: entry.name,
                    title: entry.title,
                    photo: entry.photo,
                    technos: profile.canHelp,
                    team: entry.team,
                    dm: entry.dm,
                    _filterType: 'canHelp'
                });
            }
        }
    });
    results.sort(function(a, b) { return a.name.localeCompare(b.name); });
    renderSearchPanelFilterResults(results, 'Peut aider sur...', 'green');
}

function searchFilterNeedsHelp() {
    var results = [];
    Object.keys(allUserProfiles).forEach(function(name) {
        var profile = allUserProfiles[name];
        if (profile.needsHelp.length > 0) {
            var entry = searchIndexData.find(function(e) { return e.name === name; });
            if (entry) {
                results.push({
                    name: entry.name,
                    title: entry.title,
                    photo: entry.photo,
                    technos: profile.needsHelp,
                    team: entry.team,
                    dm: entry.dm,
                    _filterType: 'needsHelp'
                });
            }
        }
    });
    results.sort(function(a, b) { return a.name.localeCompare(b.name); });
    renderSearchPanelFilterResults(results, 'Cherche aide sur...', 'orange');
}

function renderSearchPanelFilterResults(results, title, color) {
    var container = document.getElementById('search-panel-results');
    var countEl = document.getElementById('search-panel-count');
    countEl.textContent = results.length + ' personne' + (results.length > 1 ? 's' : '');
    countEl.classList.remove('hidden');

    var input = document.getElementById('search-panel-input');
    input.value = '';

    var html = '<div class="px-4 py-2 text-xs font-bold text-' + color + '-600 uppercase tracking-wider">' + title + '</div>';
    results.forEach(function(r) {
        var technosList = r.technos.map(function(t) {
            return '<span class="inline-block px-1.5 py-0.5 text-[10px] rounded bg-' + color + '-100 text-' + color + '-700 mr-1">' + t + '</span>';
        }).join('');
        html += '<div class="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors" data-filter-result-name="' + r.name.replace(/"/g, '&quot;') + '">'
            + '<img src="' + (r.photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-8 h-8 rounded-full object-cover" />'
            + '<div class="flex-1 min-w-0">'
            + '<div class="text-sm font-medium text-gray-900 truncate">' + r.name + '</div>'
            + '<div class="text-xs text-gray-500">' + (r.title || '') + '</div>'
            + '<div class="mt-1">' + technosList + '</div>'
            + '</div></div>';
    });
    container.innerHTML = html;

    container.querySelectorAll('[data-filter-result-name]').forEach(function(el) {
        el.addEventListener('click', function() {
            var name = el.getAttribute('data-filter-result-name');
            openDetailPanel(name);
        });
    });
}

function onSearchPanelInput(query) {
    var results = searchPanelSearch(query);
    renderSearchPanelResults(results, query);
    highlightOrgNodes(results);
}

function highlightOrgNodes(results) {
    clearOrgHighlights();
    if (!results.length || !window._chart) return;

    // Build set of matched names
    var matchedNames = {};
    results.forEach(function(r) { matchedNames[r.name] = true; });

    // Find node IDs that match
    var matchedIds = [];
    (window._enrichedNodes || []).forEach(function(n) {
        if (matchedNames[n.name]) matchedIds.push(n.id);
    });

    // Highlight in DOM
    matchedIds.forEach(function(id) {
        var el = document.querySelector('[data-n-id="' + id + '"]');
        if (!el) return;
        // For treeListItem nodes (stChildren), find the rect/background
        var rect = el.querySelector('rect');
        if (rect) {
            rect.setAttribute('data-highlighted', 'true');
            rect.setAttribute('data-orig-stroke', rect.getAttribute('stroke') || '');
            rect.setAttribute('data-orig-stroke-width', rect.getAttribute('stroke-width') || '');
            rect.setAttribute('stroke', '#f59e0b');
            rect.setAttribute('stroke-width', '4');
        }
    });
}

function clearOrgHighlights() {
    document.querySelectorAll('rect[data-highlighted="true"]').forEach(function(rect) {
        rect.setAttribute('stroke', rect.getAttribute('data-orig-stroke') || '#e2e8f0');
        rect.setAttribute('stroke-width', rect.getAttribute('data-orig-stroke-width') || '1');
        rect.removeAttribute('data-highlighted');
        rect.removeAttribute('data-orig-stroke');
        rect.removeAttribute('data-orig-stroke-width');
    });
}

// ── Matching highlights dans l'orgchart ──────────────────────
function highlightMatchingNodes() {
    clearMatchingHighlights();
}

function clearMatchingHighlights() {
    document.querySelectorAll('rect[data-match-highlighted="true"]').forEach(function(rect) {
        rect.setAttribute('stroke', rect.getAttribute('data-match-orig-stroke') || '#e2e8f0');
        rect.setAttribute('stroke-width', rect.getAttribute('data-match-orig-stroke-width') || '1');
        rect.removeAttribute('data-match-highlighted');
        rect.removeAttribute('data-match-orig-stroke');
        rect.removeAttribute('data-match-orig-stroke-width');
    });
}

// ── Badges sur les cartes : orange (je peux aider) + vert (peut m'aider) ──
function addNeedsHelpBadges() {
    removeNeedsHelpBadges();
    if (!window._chart || !currentUser) return;

    var myProfile = allUserProfiles[currentUser.name] || { canHelp: [], needsHelp: [] };
    var myCanHelp = myProfile.canHelp || [];
    var myNeedsHelp = myProfile.needsHelp || [];

    // Orange : personnes dont un needsHelp matche un de mes canHelp
    var orangeNames = {};
    // Vert : personnes dont un canHelp matche un de mes needsHelp
    var greenNames = {};

    Object.keys(allUserProfiles).forEach(function(name) {
        if (name === currentUser.name) return;
        var p = allUserProfiles[name];
        if (p.needsHelp && p.needsHelp.some(function(t) { return myCanHelp.indexOf(t) !== -1; })) {
            orangeNames[name] = true;
        }
        if (p.canHelp && p.canHelp.some(function(t) { return myNeedsHelp.indexOf(t) !== -1; })) {
            greenNames[name] = true;
        }
    });

    (window._enrichedNodes || []).forEach(function(n) {
        var hasOrange = orangeNames[n.name];
        var hasGreen = greenNames[n.name];
        if (!hasOrange && !hasGreen) return;
        var el = document.querySelector('[data-n-id="' + n.id + '"]');
        if (!el) return;
        var cx = n.stpid ? 224 : 170;
        if (hasOrange) {
            var badge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            badge.setAttribute('cx', String(cx));
            badge.setAttribute('cy', '8');
            badge.setAttribute('r', '5');
            badge.setAttribute('fill', '#f97316');
            badge.setAttribute('class', 'needs-help-badge');
            el.appendChild(badge);
        }
        if (hasGreen) {
            var badgeG = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            badgeG.setAttribute('cx', String(hasOrange ? cx - 14 : cx));
            badgeG.setAttribute('cy', '8');
            badgeG.setAttribute('r', '5');
            badgeG.setAttribute('fill', '#22c55e');
            badgeG.setAttribute('class', 'needs-help-badge');
            el.appendChild(badgeG);
        }
    });
}

function removeNeedsHelpBadges() {
    document.querySelectorAll('.needs-help-badge').forEach(function(b) { b.remove(); });
}

function searchPanelSearch(query) {
    if (!query || !query.trim()) return [];
    var q = slugify(query);
    return searchIndexData.filter(function(entry) {
        if (slugify(entry.name).includes(q)) return true;
        if (slugify(entry.title).includes(q)) return true;
        if (entry.team && slugify(entry.team).includes(q)) return true;
        if (entry.dmDescription && slugify(entry.dmDescription).includes(q)) return true;
        for (var i = 0; i < entry.technos.length; i++) {
            if (slugify(entry.technos[i]).includes(q)) return true;
        }
        return false;
    }).sort(function(a, b) {
        return a.name.localeCompare(b.name, 'fr');
    });
}

function renderSearchPanelResults(results, query) {
    var container = document.getElementById('search-panel-results');
    var countEl = document.getElementById('search-panel-count');

    if (!query || !query.trim()) {
        container.innerHTML = '<p class="text-sm text-gray-400 px-4 py-8 text-center">Tapez un nom, titre ou techno...</p>';
        countEl.classList.add('hidden');
        return;
    }

    if (results.length === 0) {
        container.innerHTML = '<p class="text-sm text-gray-400 px-4 py-8 text-center">Aucun résultat</p>';
        countEl.textContent = '0 résultat';
        countEl.classList.remove('hidden');
        return;
    }

    countEl.textContent = results.length + ' résultat' + (results.length > 1 ? 's' : '');
    countEl.classList.remove('hidden');

    var html = '';
    results.forEach(function(entry) {
        var orgParts = [];
        if (entry.dmDescription) orgParts.push(entry.dmDescription);
        if (entry.team) orgParts.push(entry.team);
        var orgText = orgParts.join(' · ');

        var technosHtml = entry.technos.map(function(t) {
            var highlighted = slugify(t).includes(slugify(query));
            var safeT = t.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
            return '<span class="inline-block px-1.5 py-0.5 text-[10px] rounded cursor-pointer ' +
                (highlighted ? 'bg-mozaic/20 text-mozaic-dark font-semibold' : 'bg-gray-100 text-gray-500') +
                '" data-search-techno="' + safeT + '">' + t + '</span>';
        }).join(' ');

        var safeName = entry.name.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        html += '<div class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer" data-center-name="' + safeName + '">'
            + '<img src="' + (entry.photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5" />'
            + '<div class="min-w-0 flex-1">'
            + '<div class="text-sm font-semibold text-gray-900 truncate">' + entry.name + '</div>'
            + '<div class="text-[11px] text-gray-500 uppercase tracking-wide">' + entry.title + '</div>'
            + (orgText ? '<div class="text-[11px] text-mozaic-dark font-medium mt-0.5">' + orgText + '</div>' : '')
            + (technosHtml ? '<div class="flex flex-wrap gap-1 mt-1.5">' + technosHtml + '</div>' : '')
            + '</div>'
            + '</div>';
    });

    container.innerHTML = html;

    // Event delegation pour centrer sur le membre
    container.querySelectorAll('[data-center-name]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            // Ne pas centrer si on a cliqué sur une techno
            if (e.target.closest('[data-search-techno]')) return;
            centerOnMember(el.getAttribute('data-center-name'));
        });
    });

    // Event delegation pour relancer la recherche sur une techno
    container.querySelectorAll('[data-search-techno]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            var techno = el.getAttribute('data-search-techno');
            var input = document.getElementById('search-panel-input');
            input.value = techno;
            onSearchPanelInput(techno);
        });
    });
}

function centerOnMember(name) {
    if (!window._chart || !window._enrichedNodes) return;
    var node = window._enrichedNodes.find(function(n) { return n.name === name; });
    if (!node) return;

    // Si c'est un stChild (treeListItem), centrer sur le parent (l'équipe)
    var targetId = node.stpid || node.pid || node.id;

    // D'abord expand le parent si collapsé
    var parentNode = window._chart.getNode(targetId);
    if (parentNode && parentNode.collapsed) {
        window._chart.expand(targetId, [targetId]);
    }

    window._chart.center(targetId, null, function() {
        // Après centrage, scroller vers le nœud dans le DOM et le flasher
        setTimeout(function() {
            var el = document.querySelector('[data-n-id="' + node.id + '"]');
            if (el) {
                el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                // Flash effect
                var rect = el.querySelector('rect');
                if (rect) {
                    var origStroke = rect.getAttribute('stroke') || '';
                    var origWidth = rect.getAttribute('stroke-width') || '';
                    rect.setAttribute('stroke', '#f59e0b');
                    rect.setAttribute('stroke-width', '4');
                    setTimeout(function() {
                        rect.setAttribute('stroke', origStroke);
                        rect.setAttribute('stroke-width', origWidth);
                    }, 2000);
                }
            }
        }, 500);
    });
}

// ── Detail panel ─────────────────────────────────────────────
var detailPanelOpen = false;

function openDetailPanel(name) {
    var entry = searchIndexData.find(function(e) { return e.name === name; });
    if (!entry) return;

    // Fermer les autres panneaux droits
    if (searchPanelOpen) toggleSearchPanel();
    if (profilePanelOpen) { profilePanelOpen = false; document.getElementById('profile-panel').classList.add('hidden'); }
    if (feedPanelOpen) { feedPanelOpen = false; document.getElementById('feed-panel').classList.add('hidden'); }

    var panel = document.getElementById('detail-panel');
    var content = document.getElementById('detail-panel-content');

    var orgParts = [];
    if (entry.dmDescription) orgParts.push(entry.dmDescription);
    if (entry.team) orgParts.push(entry.team);
    var orgText = orgParts.join(' · ');

    var technosHtml = entry.technos.map(function(t) {
        var safeT = t.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return '<span class="inline-block px-2 py-1 text-xs rounded-lg bg-mozaic/10 text-mozaic-dark font-medium cursor-pointer hover:bg-mozaic/25 transition-colors" data-detail-techno="' + safeT + '">' + t + '</span>';
    }).join(' ');

    var dmHtml = entry.dm
        ? '<div class="mt-4 pt-4 border-t border-gray-100">'
            + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Delivery Manager</div>'
            + '<div class="text-sm text-gray-700">' + entry.dm + '</div>'
          + '</div>'
        : '';

    var profile = allUserProfiles[entry.name];
    var canHelpHtml = '';
    var needsHelpHtml = '';
    if (profile && profile.canHelp && profile.canHelp.length > 0) {
        canHelpHtml = '<div class="mt-4">'
            + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Peut aider sur</div>'
            + '<div class="flex flex-wrap gap-1.5">' + profile.canHelp.map(function(t) {
                var safeT = t.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
                return '<span class="inline-block px-2 py-1 text-xs rounded-lg bg-green-100 text-green-800 font-medium cursor-pointer hover:bg-green-200 transition-colors" data-detail-techno="' + safeT + '">' + t + '</span>';
            }).join('') + '</div></div>';
    }
    if (profile && profile.needsHelp && profile.needsHelp.length > 0) {
        needsHelpHtml = '<div class="mt-4">'
            + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Cherche de l\'aide sur</div>'
            + '<div class="flex flex-wrap gap-1.5">' + profile.needsHelp.map(function(t) {
                var safeT = t.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
                return '<span class="inline-block px-2 py-1 text-xs rounded-lg bg-orange-100 text-orange-800 font-medium cursor-pointer hover:bg-orange-200 transition-colors" data-detail-techno="' + safeT + '">' + t + '</span>';
            }).join('') + '</div></div>';
    }

    var contactIcons = { 'Slack': '💬', 'Teams': '📞', 'Email': '✉️', 'En personne': '🤝' };
    var contactHtml = (entry.contact && entry.contact.length > 0)
        ? '<div class="mt-4 pt-4 border-t border-gray-100">'
            + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Contact privilégié</div>'
            + '<div class="flex flex-wrap gap-1.5">' + entry.contact.map(function(c) {
                return '<span class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-blue-50 text-blue-700 font-medium">' + (contactIcons[c] || '') + ' ' + c + '</span>';
            }).join('') + '</div></div>'
        : '';

    content.innerHTML = ''
        + '<div class="flex flex-col items-center text-center">'
        + '<img src="' + (entry.photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-24 h-24 rounded-full object-cover shadow-md mb-4" />'
        + '<div class="text-lg font-bold text-gray-900">' + entry.name + '</div>'
        + '<div class="text-xs text-gray-500 uppercase tracking-wider mt-1">' + entry.title + '</div>'
        + (orgText ? '<div class="text-xs text-mozaic-dark font-semibold mt-1">' + orgText + '</div>' : '')
        + '<button id="detail-locate-btn" class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-mozaic hover:bg-mozaic-dark rounded-lg transition-colors"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>Localiser</button>'
        + '</div>'
        + (technosHtml
            ? '<div class="mt-6">'
                + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Technos</div>'
                + '<div class="flex flex-wrap gap-2">' + technosHtml + '</div>'
              + '</div>'
            : '')
        + canHelpHtml
        + needsHelpHtml
        + contactHtml
        + dmHtml;

    panel.classList.remove('hidden');
    detailPanelOpen = true;

    // Clic sur une techno → lancer la recherche
    content.querySelectorAll('[data-detail-techno]').forEach(function(el) {
        el.addEventListener('click', function() {
            openSearchWithTechno(el.getAttribute('data-detail-techno'));
        });
    });

    document.getElementById('detail-locate-btn').addEventListener('click', function() {
        centerOnMember(entry.name);
    });
}

function closeDetailPanel() {
    document.getElementById('detail-panel').classList.add('hidden');
    detailPanelOpen = false;
}

function openSearchWithTechno(techno) {
    if (detailPanelOpen) closeDetailPanel();
    if (profilePanelOpen) toggleProfilePanel();
    if (feedPanelOpen) toggleFeedPanel();
    if (!searchPanelOpen) toggleSearchPanel();
    var input = document.getElementById('search-panel-input');
    input.value = techno;
    onSearchPanelInput(techno);
}

// ── Profile panel (droite) ───────────────────────────────────
var profilePanelOpen = false;
var profileGroupByTechno = true;
var profileHelpersGroupByTechno = true;
var profileAccordion = { canHelp: true, needsHelp: true, seekers: true, helpers: true };
var allUserProfiles = {}; // name → { canHelp: [], needsHelp: [] }

function closeAllRightPanels() {
    if (detailPanelOpen) closeDetailPanel();
    if (searchPanelOpen) toggleSearchPanel();
    if (profilePanelOpen) { profilePanelOpen = false; document.getElementById('profile-panel').classList.add('hidden'); }
    if (feedPanelOpen) { feedPanelOpen = false; document.getElementById('feed-panel').classList.add('hidden'); }
}

function toggleProfilePanel() {
    if (profilePanelOpen) {
        profilePanelOpen = false;
        document.getElementById('profile-panel').classList.add('hidden');
        return;
    }
    closeAllRightPanels();
    profilePanelOpen = true;
    document.getElementById('profile-panel').classList.remove('hidden');
    renderProfilePanel();
}

function initAllUserProfiles() {
    // Initialiser des profils mockés pour tous les membres à partir du feed
    activityFeed.forEach(function(ev) {
        if (!allUserProfiles[ev.actor]) {
            allUserProfiles[ev.actor] = { canHelp: [], needsHelp: [] };
        }
        if (ev.type === 'canHelp' && allUserProfiles[ev.actor].canHelp.indexOf(ev.techno) === -1) {
            allUserProfiles[ev.actor].canHelp.push(ev.techno);
        }
        if (ev.type === 'needsHelp' && allUserProfiles[ev.actor].needsHelp.indexOf(ev.techno) === -1) {
            allUserProfiles[ev.actor].needsHelp.push(ev.techno);
        }
    });
    // Ajouter le currentUser
    if (currentUser) {
        allUserProfiles[currentUser.name] = {
            canHelp: currentUser.canHelp.slice(),
            needsHelp: currentUser.needsHelp.slice()
        };
    }
}

function getMatchingHelpSeekers() {
    // Personnes qui cherchent de l'aide sur une techno que je maîtrise
    if (!currentUser) return [];
    var matches = [];
    var myCanHelp = allUserProfiles[currentUser.name] ? allUserProfiles[currentUser.name].canHelp : currentUser.canHelp;
    Object.keys(allUserProfiles).forEach(function(name) {
        if (name === currentUser.name) return;
        var profile = allUserProfiles[name];
        var commonTechnos = profile.needsHelp.filter(function(t) {
            return myCanHelp.indexOf(t) !== -1;
        });
        if (commonTechnos.length > 0) {
            matches.push({ name: name, technos: commonTechnos });
        }
    });
    return matches;
}

function renderProfilePanel() {
    if (!currentUser) return;
    var content = document.getElementById('profile-panel-content');
    var profile = allUserProfiles[currentUser.name] || { canHelp: currentUser.canHelp, needsHelp: currentUser.needsHelp };

    var orgParts = [];
    if (currentUser.dmDescription) orgParts.push(currentUser.dmDescription);
    if (currentUser.team) orgParts.push(currentUser.team);
    var orgText = orgParts.join(' · ');

    // Infos
    var html = '<div class="flex flex-col items-center text-center">'
        + '<img src="' + (currentUser.photo || '') + '" class="w-24 h-24 rounded-full object-cover shadow-md mb-4" />'
        + '<div class="text-lg font-bold text-gray-900">' + currentUser.name + '</div>'
        + '<div class="text-xs text-gray-500 uppercase tracking-wider mt-1">' + currentUser.title + '</div>'
        + (orgText ? '<div class="text-xs text-mozaic-dark font-semibold mt-1">' + orgText + '</div>' : '')
        + '</div>';

    // Je peux aider sur
    html += '<div class="mt-6">'
        + '<button class="profile-accordion-header w-full flex items-center justify-between" data-accordion="canHelp">'
        + '<div class="flex items-center gap-2"><svg class="w-3 h-3 text-gray-400 transition-transform duration-200' + (profileAccordion.canHelp ? ' rotate-90' : '') + '" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
        + '<span class="text-[10px] text-gray-400 uppercase tracking-wider">Je peux aider sur</span>'
        + '<span class="text-[10px] text-gray-300">(' + profile.canHelp.length + ')</span></div>'
        + '<span onclick="event.stopPropagation();openTechnoPickerForProfile(\'canHelp\')" class="text-mozaic hover:text-mozaic-dark text-xs font-medium">+ Ajouter</span>'
        + '</button>'
        + '<div class="mt-2' + (profileAccordion.canHelp ? '' : ' hidden') + '" data-accordion-body="canHelp">'
        + '<div class="flex flex-wrap gap-2" id="profile-canhelp-tags">';
    profile.canHelp.forEach(function(t) {
        html += '<span class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-green-100 text-green-800 font-medium">'
            + t + ' <button onclick="removeProfileTechno(\'canHelp\',\'' + t.replace(/'/g, "\\'") + '\')" class="text-green-400 hover:text-green-700 ml-0.5">&times;</button></span>';
    });
    html += '</div></div></div>';

    // J'ai besoin d'aide sur
    html += '<div class="mt-4">'
        + '<button class="profile-accordion-header w-full flex items-center justify-between" data-accordion="needsHelp">'
        + '<div class="flex items-center gap-2"><svg class="w-3 h-3 text-gray-400 transition-transform duration-200' + (profileAccordion.needsHelp ? ' rotate-90' : '') + '" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
        + '<span class="text-[10px] text-gray-400 uppercase tracking-wider">J\'ai besoin d\'aide sur</span>'
        + '<span class="text-[10px] text-gray-300">(' + profile.needsHelp.length + ')</span></div>'
        + '<span onclick="event.stopPropagation();openTechnoPickerForProfile(\'needsHelp\')" class="text-orange-500 hover:text-orange-700 text-xs font-medium">+ Ajouter</span>'
        + '</button>'
        + '<div class="mt-2' + (profileAccordion.needsHelp ? '' : ' hidden') + '" data-accordion-body="needsHelp">'
        + '<div class="flex flex-wrap gap-2" id="profile-needshelp-tags">';
    profile.needsHelp.forEach(function(t) {
        html += '<span class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-orange-100 text-orange-800 font-medium">'
            + t + ' <button onclick="removeProfileTechno(\'needsHelp\',\'' + t.replace(/'/g, "\\'") + '\')" class="text-orange-400 hover:text-orange-700 ml-0.5">&times;</button></span>';
    });
    html += '</div></div></div>';

    // Matching : qui cherche de l'aide sur mes technos ?
    var matches = getMatchingHelpSeekers();
    if (matches.length > 0) {
        // Data par techno
        var byTechno = {};
        matches.forEach(function(m) {
            m.technos.forEach(function(t) {
                if (!byTechno[t]) byTechno[t] = [];
                byTechno[t].push(m.name);
            });
        });
        // Data par personne
        var byPerson = {};
        matches.forEach(function(m) {
            byPerson[m.name] = m.technos;
        });

        var totalSeekers = profileGroupByTechno ? Object.keys(byTechno).length : Object.keys(byPerson).length;
        html += '<div class="mt-6 pt-4 border-t border-gray-100">'
            + '<button class="profile-accordion-header w-full flex items-center justify-between" data-accordion="seekers">'
            + '<div class="flex items-center gap-2"><svg class="w-3 h-3 text-gray-400 transition-transform duration-200' + (profileAccordion.seekers ? ' rotate-90' : '') + '" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
            + '<span class="text-[10px] text-gray-400 uppercase tracking-wider">Cherchent de l\'aide sur tes technos</span>'
            + '<span class="text-[10px] text-gray-300">(' + matches.length + ')</span></div>'
            + '</button>'
            + '<div class="mt-3' + (profileAccordion.seekers ? '' : ' hidden') + '" data-accordion-body="seekers">'
            + '<div class="flex justify-end mb-2"><button id="toggle-seekers-group" class="text-[10px] text-gray-400 hover:text-gray-600 underline cursor-pointer">'
            + (profileGroupByTechno ? 'Par personne' : 'Par techno') + '</button></div>';

        if (profileGroupByTechno) {
            Object.keys(byTechno).sort().forEach(function(techno) {
                html += '<div class="mb-3"><div class="text-xs font-semibold text-orange-600 mb-1">' + techno + '</div>';
                byTechno[techno].forEach(function(name) {
                    var entry = searchIndexData.find(function(e) { return e.name === name; });
                    var photo = entry ? entry.photo : '';
                    html += '<div class="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" data-match-name="' + name.replace(/"/g, '&quot;') + '">'
                        + '<img src="' + (photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-7 h-7 rounded-full object-cover" />'
                        + '<div class="text-sm text-gray-900 truncate">' + name + '</div></div>';
                });
                html += '</div>';
            });
        } else {
            Object.keys(byPerson).sort().forEach(function(name) {
                var entry = searchIndexData.find(function(e) { return e.name === name; });
                var photo = entry ? entry.photo : '';
                html += '<div class="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" data-match-name="' + name.replace(/"/g, '&quot;') + '">'
                    + '<img src="' + (photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-7 h-7 rounded-full object-cover" />'
                    + '<div class="flex-1 min-w-0">'
                    + '<div class="text-sm font-medium text-gray-900 truncate">' + name + '</div>'
                    + '<div class="text-xs text-orange-500">' + byPerson[name].join(', ') + '</div>'
                    + '</div></div>';
            });
        }
        html += '</div></div>';
    }    // Matching inverse : qui peut m'aider sur mes needsHelp ?
    var myNeedsHelp = profile.needsHelp || [];
    if (myNeedsHelp.length > 0) {
        var helpersByTechno = {};
        var helpersByPerson = {};
        Object.keys(allUserProfiles).forEach(function(name) {
            if (name === currentUser.name) return;
            var p = allUserProfiles[name];
            if (!p.canHelp) return;
            p.canHelp.forEach(function(t) {
                if (myNeedsHelp.indexOf(t) !== -1) {
                    if (!helpersByTechno[t]) helpersByTechno[t] = [];
                    helpersByTechno[t].push(name);
                    if (!helpersByPerson[name]) helpersByPerson[name] = [];
                    helpersByPerson[name].push(t);
                }
            });
        });
        var helperTechnos = Object.keys(helpersByTechno).sort();
        var totalHelpers = Object.keys(helpersByPerson).length;
        if (helperTechnos.length > 0) {
            html += '<div class="mt-6 pt-4 border-t border-gray-100">'
                + '<button class="profile-accordion-header w-full flex items-center justify-between" data-accordion="helpers">'
                + '<div class="flex items-center gap-2"><svg class="w-3 h-3 text-gray-400 transition-transform duration-200' + (profileAccordion.helpers ? ' rotate-90' : '') + '" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
                + '<span class="text-[10px] text-gray-400 uppercase tracking-wider">Peuvent t\'aider sur tes besoins</span>'
                + '<span class="text-[10px] text-gray-300">(' + totalHelpers + ')</span></div>'
                + '</button>'
                + '<div class="mt-3' + (profileAccordion.helpers ? '' : ' hidden') + '" data-accordion-body="helpers">'
                + '<div class="flex justify-end mb-2"><button id="toggle-helpers-group" class="text-[10px] text-gray-400 hover:text-gray-600 underline cursor-pointer">'
                + (profileHelpersGroupByTechno ? 'Par personne' : 'Par techno') + '</button></div>';

            if (profileHelpersGroupByTechno) {
                helperTechnos.forEach(function(techno) {
                    html += '<div class="mb-3"><div class="text-xs font-semibold text-green-600 mb-1">' + techno + '</div>';
                    helpersByTechno[techno].forEach(function(name) {
                        var entry = searchIndexData.find(function(e) { return e.name === name; });
                        var photo = entry ? entry.photo : '';
                        html += '<div class="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" data-match-name="' + name.replace(/"/g, '&quot;') + '">'
                            + '<img src="' + (photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-7 h-7 rounded-full object-cover" />'
                            + '<div class="text-sm text-gray-900 truncate">' + name + '</div></div>';
                    });
                    html += '</div>';
                });
            } else {
                Object.keys(helpersByPerson).sort().forEach(function(name) {
                    var entry = searchIndexData.find(function(e) { return e.name === name; });
                    var photo = entry ? entry.photo : '';
                    html += '<div class="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" data-match-name="' + name.replace(/"/g, '&quot;') + '">'
                        + '<img src="' + (photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-7 h-7 rounded-full object-cover" />'
                        + '<div class="flex-1 min-w-0">'
                        + '<div class="text-sm font-medium text-gray-900 truncate">' + name + '</div>'
                        + '<div class="text-xs text-green-500">' + helpersByPerson[name].join(', ') + '</div>'
                        + '</div></div>';
                });
            }
            html += '</div></div>';
        }
    }

    content.innerHTML = html;

    // Toggle listeners
    var toggleSeekers = document.getElementById('toggle-seekers-group');
    if (toggleSeekers) {
        toggleSeekers.addEventListener('click', function() {
            profileGroupByTechno = !profileGroupByTechno;
            renderProfilePanel();
        });
    }
    var toggleHelpers = document.getElementById('toggle-helpers-group');
    if (toggleHelpers) {
        toggleHelpers.addEventListener('click', function() {
            profileHelpersGroupByTechno = !profileHelpersGroupByTechno;
            renderProfilePanel();
        });
    }

    // Accordion listeners
    content.querySelectorAll('.profile-accordion-header').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var key = btn.dataset.accordion;
            profileAccordion[key] = !profileAccordion[key];
            var body = content.querySelector('[data-accordion-body="' + key + '"]');
            var svg = btn.querySelector('svg');
            if (profileAccordion[key]) {
                body.classList.remove('hidden');
                svg.classList.add('rotate-90');
            } else {
                body.classList.add('hidden');
                svg.classList.remove('rotate-90');
            }
        });
    });

    // Clic sur un match → ouvrir le détail
    content.querySelectorAll('[data-match-name]').forEach(function(el) {
        el.addEventListener('click', function() {
            var name = el.getAttribute('data-match-name');
            toggleProfilePanel();
            openDetailPanel(name);
        });
    });

    // Mettre à jour le badge
    updateProfileBadge();
}

function removeProfileTechno(type, techno) {
    var profile = allUserProfiles[currentUser.name];
    if (!profile) return;
    var idx = profile[type].indexOf(techno);
    if (idx !== -1) profile[type].splice(idx, 1);
    // Ajouter un event dans le feed
    activityFeed.unshift({
        actor: currentUser.name,
        type: type === 'canHelp' ? 'removeCanHelp' : 'removeNeedsHelp',
        techno: techno,
        date: new Date().toISOString()
    });
    renderProfilePanel();
}

function addProfileTechno(type, techno) {
    var profile = allUserProfiles[currentUser.name];
    if (!profile) {
        profile = { canHelp: [], needsHelp: [] };
        allUserProfiles[currentUser.name] = profile;
    }
    if (profile[type].indexOf(techno) !== -1) return;
    profile[type].push(techno);
    // Ajouter un event dans le feed
    activityFeed.unshift({
        actor: currentUser.name,
        type: type,
        techno: techno,
        date: new Date().toISOString()
    });
    renderProfilePanel();
}

function openTechnoPickerForProfile(type) {
    // Supprimer un éventuel picker existant
    var existing = document.getElementById('profile-techno-picker');
    if (existing) existing.remove();

    var profile = allUserProfiles[currentUser.name] || { canHelp: [], needsHelp: [] };
    var alreadySelected = profile[type] || [];

    // Charger le tech-radar pour avoir les catégories
    fetch('tech-radar.json').then(function(r) { return r.json(); }).then(function(categories) {
        var overlay = document.createElement('div');
        overlay.id = 'profile-techno-picker';
        overlay.className = 'fixed inset-0 z-[200] flex items-center justify-center bg-black/30';

        var modal = document.createElement('div');
        modal.className = 'bg-white rounded-xl shadow-2xl w-80 max-h-[70vh] flex flex-col overflow-hidden';

        var header = '<div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">'
            + '<span class="text-sm font-bold text-gray-800">' + (type === 'canHelp' ? 'Je peux aider sur...' : 'J\'ai besoin d\'aide sur...') + '</span>'
            + '<button id="close-techno-picker" class="text-gray-400 hover:text-gray-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'
            + '</div>';

        var body = '<div class="overflow-y-auto flex-1 py-2">';
        categories.forEach(function(cat) {
            body += '<div class="px-4 py-1"><div class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">' + cat.name + '</div>';
            (cat.items || cat.technos).forEach(function(techno) {
                var isSelected = alreadySelected.indexOf(techno) !== -1;
                var color = type === 'canHelp' ? 'green' : 'orange';
                body += '<button data-pick-techno="' + techno.replace(/"/g, '&quot;') + '" class="inline-block m-0.5 px-2 py-1 text-xs rounded-lg border transition-colors '
                    + (isSelected
                        ? 'bg-' + color + '-100 text-' + color + '-800 border-' + color + '-300 opacity-50 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-' + color + '-50 hover:border-' + color + '-300 cursor-pointer')
                    + '"' + (isSelected ? ' disabled' : '') + '>' + techno + '</button>';
            });
            body += '</div>';
        });
        body += '</div>';

        modal.innerHTML = header + body;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.querySelector('#close-techno-picker').addEventListener('click', function() { overlay.remove(); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

        overlay.querySelectorAll('[data-pick-techno]:not([disabled])').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var techno = btn.getAttribute('data-pick-techno');
                addProfileTechno(type, techno);
                var color = type === 'canHelp' ? 'green' : 'orange';
                btn.disabled = true;
                btn.className = 'inline-block m-0.5 px-2 py-1 text-xs rounded-lg border transition-colors bg-' + color + '-100 text-' + color + '-800 border-' + color + '-300 opacity-50 cursor-not-allowed';
            });
        });
    });
}

function updateProfileBadge() {
    var matches = getMatchingHelpSeekers();
    var badge = document.getElementById('profile-badge');
    if (matches.length > 0) {
        badge.textContent = matches.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// ── Feed panel (droite) ──────────────────────────────────────
var feedPanelOpen = false;

function toggleFeedPanel() {
    if (feedPanelOpen) {
        feedPanelOpen = false;
        document.getElementById('feed-panel').classList.add('hidden');
        return;
    }
    closeAllRightPanels();
    feedPanelOpen = true;
    document.getElementById('feed-panel').classList.remove('hidden');
    renderFeedPanel();
}

function relativeDate(dateStr) {
    var now = new Date();
    var d = new Date(dateStr);
    var diffMs = now - d;
    var diffMins = Math.floor(diffMs / 60000);
    var diffHours = Math.floor(diffMs / 3600000);
    var diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "à l'instant";
    if (diffMins < 60) return 'il y a ' + diffMins + ' min';
    if (diffHours < 24) return 'il y a ' + diffHours + 'h';
    if (diffDays < 7) return 'il y a ' + diffDays + 'j';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function renderFeedPanel() {
    var content = document.getElementById('feed-panel-content');

    // Stats : top technos demandées et offertes
    var helpCounts = {};
    var offerCounts = {};
    activityFeed.forEach(function(ev) {
        if (ev.type === 'needsHelp') {
            helpCounts[ev.techno] = (helpCounts[ev.techno] || 0) + 1;
        }
        if (ev.type === 'canHelp') {
            offerCounts[ev.techno] = (offerCounts[ev.techno] || 0) + 1;
        }
    });

    function topN(obj, n) {
        return Object.keys(obj).sort(function(a, b) { return obj[b] - obj[a]; }).slice(0, n);
    }
    var topDemanded = topN(helpCounts, 3);
    var topOffered = topN(offerCounts, 3);

    var html = '<div class="mb-4 p-3 bg-gray-50 rounded-lg">'
        + '<div class="flex gap-4">'
        + '<div class="flex-1"><div class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Les plus demandées</div>';
    topDemanded.forEach(function(t, i) {
        html += '<div class="text-xs text-orange-600 font-medium">' + (i + 1) + '. ' + t + ' <span class="text-gray-400">(' + helpCounts[t] + ')</span></div>';
    });
    html += '</div><div class="flex-1"><div class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Les plus offertes</div>';
    topOffered.forEach(function(t, i) {
        html += '<div class="text-xs text-green-600 font-medium">' + (i + 1) + '. ' + t + ' <span class="text-gray-400">(' + offerCounts[t] + ')</span></div>';
    });
    html += '</div></div></div>';

    // Timeline
    activityFeed.forEach(function(ev) {
        var entry = searchIndexData.find(function(e) { return e.name === ev.actor; });
        var photo = entry ? entry.photo : '';
        var isCanHelp = ev.type === 'canHelp';
        var isRemove = ev.type === 'removeCanHelp' || ev.type === 'removeNeedsHelp';
        var color = isCanHelp ? 'green' : (isRemove ? 'gray' : 'orange');
        var icon, text;

        if (ev.type === 'canHelp') {
            text = 'peut aider sur <strong>' + ev.techno + '</strong>';
        } else if (ev.type === 'needsHelp') {
            text = 'cherche de l\'aide sur <strong>' + ev.techno + '</strong>';
        } else if (ev.type === 'removeCanHelp') {
            text = 'ne propose plus d\'aide sur <strong>' + ev.techno + '</strong>';
        } else if (ev.type === 'removeNeedsHelp') {
            text = 'ne cherche plus d\'aide sur <strong>' + ev.techno + '</strong>';
        }

        // Highlight si ça matche les canHelp du user
        var isMatchForMe = (ev.type === 'needsHelp' && currentUser && allUserProfiles[currentUser.name] && allUserProfiles[currentUser.name].canHelp.indexOf(ev.techno) !== -1);

        html += '<div class="flex items-start gap-3 py-3 border-b border-gray-50' + (isMatchForMe ? ' bg-orange-50/50 -mx-4 px-4 rounded' : '') + '">'
            + '<img src="' + (photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-8 h-8 rounded-full object-cover mt-0.5" />'
            + '<div class="flex-1 min-w-0">'
            + '<div class="text-sm"><span class="font-medium text-gray-900 cursor-pointer hover:text-mozaic-dark" data-feed-actor="' + ev.actor.replace(/"/g, '&quot;') + '">' + ev.actor + '</span> '
            + '<span class="text-gray-600">' + text + '</span></div>'
            + '<div class="text-[10px] text-gray-400 mt-0.5">' + relativeDate(ev.date) + '</div>'
            + (isMatchForMe ? '<div class="text-[10px] text-orange-500 font-medium mt-0.5">Tu peux aider !</div>' : '')
            + '</div>'
            + '<span class="shrink-0 w-2 h-2 rounded-full mt-2 bg-' + color + '-400"></span>'
            + '</div>';
    });

    if (activityFeed.length === 0) {
        html += '<div class="text-sm text-gray-400 text-center py-8">Aucune activité pour le moment</div>';
    }

    content.innerHTML = html;

    // Clic sur un acteur → ouvrir le détail
    content.querySelectorAll('[data-feed-actor]').forEach(function(el) {
        el.addEventListener('click', function() {
            var name = el.getAttribute('data-feed-actor');
            toggleFeedPanel();
            openDetailPanel(name);
        });
    });
}

// ── Init avatar photo ────────────────────────────────────────
function initProfileAvatar() {
    if (!currentUser || !currentUser.photo) return;
    var avatarEl = document.getElementById('profile-avatar');
    avatarEl.innerHTML = '<img src="' + currentUser.photo + '" class="w-full h-full object-cover" />';
}

function showTechnoPicker(technos, x, y) {
    // Supprimer un éventuel picker existant
    var existing = document.getElementById('techno-picker');
    if (existing) existing.remove();

    var picker = document.createElement('div');
    picker.id = 'techno-picker';
    picker.className = 'fixed z-[100] bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[160px]';
    picker.style.left = x + 'px';
    picker.style.top = y + 'px';

    technos.forEach(function(t) {
        var btn = document.createElement('button');
        btn.className = 'w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-mozaic/10 hover:text-mozaic-dark transition-colors';
        btn.textContent = t;
        btn.addEventListener('click', function() {
            picker.remove();
            openSearchWithTechno(t);
        });
        picker.appendChild(btn);
    });

    document.body.appendChild(picker);

    // Fermer au clic extérieur
    setTimeout(function() {
        document.addEventListener('click', function closePicker(e) {
            if (!picker.contains(e.target)) {
                picker.remove();
                document.removeEventListener('click', closePicker);
            }
        });
    }, 10);
}

Promise.all([
    fetch('nodes.json').then(function (r) { return r.json(); }),
    fetch('tech-radar.json').then(function (r) { return r.json(); }),
    fetch('search-index.json').then(function (r) { return r.json(); }),
    fetch('user-profile.json').then(function (r) { return r.json(); }),
    fetch('activity-feed.json').then(function (r) { return r.json(); })
]).then(function (results) {
    var nodes = results[0];
    var RADAR_CATEGORIES = results[1];
    searchIndexData = results[2];
    currentUser = results[3];
    activityFeed = results[4];

    var enrichedNodes = nodes.map(enrichNodeForSearch);
    buildRadarPanel(RADAR_CATEGORIES, enrichedNodes);
    document.getElementById('radar-filter-input').addEventListener('input', function() {
        filterRadarPanel(this.value);
    });
    initAllUserProfiles();
    initProfileAvatar();
    updateProfileBadge();

    window._chart = null;
    window._enrichedNodes = enrichedNodes;

    var chart = new OrgChart(document.getElementById("tree"), {
        template: 'clara',
        enableSearch: false,
        mouseScrool: OrgChart.action.zoom,
        expand: {},
        collapse: {
            level: 2
        },
        tags: {
            manager: {
                template: 'manager'
            },
            list: {
                min: OrgChart.isMobile(),
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItemWithTechnos',
                    collapse: {
                        level: 1
                    }
                }
            },
            team: {
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItemWithTechnos',
                    collapse: {
                        level: 1
                    }
                }
            },
            listceo: {
                template: 'ceo',
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItem',
                }
            },
            listtech: {
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItem',
                    collapse: {
                        level: 1
                    }
                }
            },
            listoperations: {
                template: 'expandable',
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItem',
                    collapse: {
                        level: 1,
                        allChildren: true
                    }
                }
            }
        },
        nodeBinding: {
            field_0: "name",
            field_1: "title",
            field_2: "bio",
            img_0: 'photo',
            bio: 'bio',
            description: 'description'
        }
    });

    // ── Expand / Collapse all ─────────────────────────────────
    function getAllCollapsedIds() {
        var ids = [];
        function walk(node) {
            if (!node) return;
            for (var i = 0; i < node.childrenIds.length; i++) {
                var child = chart.getNode(node.childrenIds[i]);
                if (child) {
                    if (child.collapsed) ids.push(child.id);
                    walk(child);
                }
            }
            if (node.stChildrenIds) {
                for (var j = 0; j < node.stChildrenIds.length; j++) {
                    var stChild = chart.getNode(node.stChildrenIds[j]);
                    if (stChild) {
                        if (stChild.collapsed) ids.push(stChild.id);
                        walk(stChild);
                    }
                }
            }
        }
        for (var r = 0; r < chart.roots.length; r++) {
            walk(chart.roots[r]);
        }
        return ids;
    }

    document.getElementById('btn-fit').addEventListener('click', function() {
        chart.fit();
    });

    document.getElementById('btn-zoom-in').addEventListener('click', function() {
        chart.zoom(true);
    });
    document.getElementById('btn-zoom-out').addEventListener('click', function() {
        chart.zoom(false);
    });

    document.getElementById('btn-expand-all').addEventListener('click', function() {
        var ids = getAllCollapsedIds();
        if (ids.length) {
            chart.expandCollapse(chart.roots[0].id, ids, []);
            setTimeout(function() { chart.fit(); }, 300);
        }
    });
    document.getElementById('btn-collapse-all').addEventListener('click', function() {
        chart.load(enrichedNodes);
    });

    chart.load(enrichedNodes);
    window._chart = chart;

    // ── Appliquer badges et highlights après chaque redraw ───
    chart.on('redraw', function() {
        setTimeout(function() {
            addNeedsHelpBadges();
            highlightMatchingNodes();
        }, 100);
    });

    // ── Clic sur un nœud → panneau détail ────────────────────
    chart.on('click', function(sender, args) {
        if (args && args.node) {
            var nodeData = chart.get(args.node.id);
            if (nodeData && nodeData.name) {
                openDetailPanel(nodeData.name);
            }
        }
        return false;
    });

    // ── Fit automatique après expand/collapse ────────────────
    chart.on('expcollclick', function(sender, collapse, id) {
        setTimeout(function() { chart.fit(); }, 300);
    });

    // ── Clic sur le vide → recentrer ─────────────────────────
    document.getElementById('tree').addEventListener('click', function(e) {
        if (e.target.closest('[data-n-id]')) return;
        if (e.target.closest('.boc-controls')) return;
        chart.fit();
    });

    // ── Clic sur un nœud → panneau détail ──────────────────────
    document.getElementById('tree').addEventListener('click', function(e) {
        var nodeEl = e.target.closest('[data-n-id]');
        if (!nodeEl) return;
        var nodeId = parseInt(nodeEl.getAttribute('data-n-id'));
        var nodeData = chart.get(nodeId);
        if (nodeData && nodeData.name) {
            openDetailPanel(nodeData.name);
        }
    }, true);

    // ── URL param ?q= ────────────────────────────────────────
    var urlQuery = new URLSearchParams(window.location.search).get('q');
    if (urlQuery) {
        setTimeout(function() {
            if (!searchPanelOpen) toggleSearchPanel();
            var input = document.getElementById('search-panel-input');
            input.value = urlQuery;
            onSearchPanelInput(urlQuery);
        }, 300);
    }

    // ── Échap → fermer tous les panneaux ─────────────────────
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (profilePanelOpen) toggleProfilePanel();
            if (feedPanelOpen) toggleFeedPanel();
            if (detailPanelOpen) closeDetailPanel();
            if (searchPanelOpen) toggleSearchPanel();
            if (radarOpen) toggleRadar();
            var picker = document.getElementById('techno-picker');
            if (picker) picker.remove();
            var profilePicker = document.getElementById('profile-techno-picker');
            if (profilePicker) profilePicker.remove();
        }
    });
});
