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
    var technos = data.bio || '';
    var yTechnos = node.stChildren.length ? 50 : 200;
    var technosSvg = technos
        ? `<text style="font-size:11px;font-style:italic;" fill="#46a610" x="${x}" y="${yTechnos}" text-anchor="${anchor}">${technos}</text>`
        : '';
    return titleSvg + technosSvg;
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
OrgChart.templates.ceo.bio = `<text data-width="180" data-text-overflow="multiline" style="font-size:11px;font-style:italic;" fill="#46a610" x="15" y="100" text-anchor="start">{val}</text>`;

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
    var technos = data.bio || '';
    var technosSvg = technos
        ? `<text style="font-size:11px;font-style:italic;" fill="#46a610" x="${x}" y="${yTechnos}" text-anchor="${anchor}">${technos}</text>`
        : '';
    return titleSvg + descSvg + technosSvg;
};
OrgChart.templates.manager.editFormHeaderColor = '#78be20';
OrgChart.templates.manager.treeListMaxHeight = 50000;

// ── Template expandable (opérations) ─────────────────────────
OrgChart.templates.expandable = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.expandable.treeListMaxHeight = 50000;

// ── Template treeListItem : items membres dans les équipes ────
OrgChart.templates.treeListItemWithTechnos = Object.assign({}, OrgChart.templates.treeListItem);
OrgChart.templates.treeListItemWithTechnos.size = [350, 76];
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
        `<text fill="#1e2330" x="${offset}" y="26" style="font-size:13px;font-weight:600;"></text>`,
        node.w - offset - 70, 1);
};
OrgChart.templates.treeListItemWithTechnos.field_1 = function(node, data, config, mode, val) {
    var offset = node.level * config.expandCollapseSize + 45;
    var technos = data.bio || '';
    var titleSvg = OrgChart.wrapText(val,
        `<text fill="#6b7a99" x="${offset}" y="44" style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;"></text>`,
        node.w - offset - 70, 1);
    var techSvg = technos
        ? `<text fill="#46a610" x="${offset}" y="62" style="font-size:11px;font-style:italic;">${technos}</text>`
        : '';
    return titleSvg + techSvg;
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

var activeRadarTechno = null;

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

    // Fermer le panneau recherche s'il est ouvert
    if (searchPanelOpen) toggleSearchPanel();

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

    content.innerHTML = ''
        + '<div class="flex flex-col items-center text-center">'
        + '<img src="' + (entry.photo || 'https://cdn.balkan.app/shared/a/1.jpg') + '" class="w-24 h-24 rounded-full object-cover shadow-md mb-4" />'
        + '<div class="text-lg font-bold text-gray-900">' + entry.name + '</div>'
        + '<div class="text-xs text-gray-500 uppercase tracking-wider mt-1">' + entry.title + '</div>'
        + (orgText ? '<div class="text-xs text-mozaic-dark font-semibold mt-1">' + orgText + '</div>' : '')
        + '</div>'
        + (technosHtml
            ? '<div class="mt-6">'
                + '<div class="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Technos</div>'
                + '<div class="flex flex-wrap gap-2">' + technosHtml + '</div>'
              + '</div>'
            : '')
        + dmHtml;

    panel.classList.remove('hidden');
    detailPanelOpen = true;

    // Clic sur une techno → lancer la recherche
    content.querySelectorAll('[data-detail-techno]').forEach(function(el) {
        el.addEventListener('click', function() {
            openSearchWithTechno(el.getAttribute('data-detail-techno'));
        });
    });
}

function closeDetailPanel() {
    document.getElementById('detail-panel').classList.add('hidden');
    detailPanelOpen = false;
}

function openSearchWithTechno(techno) {
    if (detailPanelOpen) closeDetailPanel();
    if (!searchPanelOpen) toggleSearchPanel();
    var input = document.getElementById('search-panel-input');
    input.value = techno;
    onSearchPanelInput(techno);
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
    fetch('search-index.json').then(function (r) { return r.json(); })
]).then(function (results) {
    var nodes = results[0];
    var RADAR_CATEGORIES = results[1];
    searchIndexData = results[2];

    var enrichedNodes = nodes.map(enrichNodeForSearch);
    buildRadarPanel(RADAR_CATEGORIES, enrichedNodes);

    window._chart = null;
    window._enrichedNodes = enrichedNodes;

    var chart = new OrgChart(document.getElementById("tree"), {
        template: 'clara',
        enableSearch: false,
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
            if (detailPanelOpen) closeDetailPanel();
            if (searchPanelOpen) toggleSearchPanel();
            if (radarOpen) toggleRadar();
            var picker = document.getElementById('techno-picker');
            if (picker) picker.remove();
        }
    });
});
