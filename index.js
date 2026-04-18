//JavaScript

OrgChart.SEARCH_PLACEHOLDER = "Nom, titre, techno...";

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
    var x = node.stChildren.length ? 65 : node.w / 2;
    var y = node.stChildren.length ? 65 : 160;
    var anchor = 'middle';
    var w = node.stChildren.length ? node.w - 100 : node.w - 20;
    return OrgChart.wrapText(val,
        `<text style="font-size:16px;font-weight:700;letter-spacing:0.01em;" fill="#1a202c" x="${x}" y="${y}" text-anchor="${anchor}"></text>`,
        w, 1);
};

OrgChart.templates.clara.field_1 = function(node, data, config, mode, val) {
    var x = node.stChildren.length ? node.w - 15 : node.w / 2;
    var y = node.stChildren.length ? 35 : 180;
    var anchor = node.stChildren.length ? 'end' : 'middle';
    var w = node.stChildren.length ? node.w - 100 : node.w - 20;
    return OrgChart.wrapText(val,
        `<text style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;" fill="#46a610" x="${x}" y="${y}" text-anchor="${anchor}"></text>`,
        w, 1);
};

OrgChart.templates.clara.editFormHeaderColor = '#78be20';

OrgChart.templates.clara.nodeMenuButton = function(node, data, config, mode) {
    return `<g style="cursor:pointer;" transform="matrix(1,0,0,1,${node.w - 28},6)">
        <rect x="0" y="0" fill="transparent" width="22" height="22"/>
        <circle cy="11" cx="4" r="2" fill="#a0aec0"/>
        <circle cy="11" cx="11" r="2" fill="#a0aec0"/>
        <circle cy="11" cx="18" r="2" fill="#a0aec0"/>
    </g>`;
};

// ── Template CEO (Alexis Masset) ──────────────────────────────
OrgChart.templates.ceo = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.ceo.padding = [7, 390, 7, 7];
OrgChart.templates.ceo.img_0 = `<clipPath id="{randId}"><circle cx="660" cy="97" r="75"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="585" y="22" width="150" height="150" ></image>`;
OrgChart.templates.ceo.field_0 = `<text data-width="200" style="font-size:20px;font-weight:700;" fill="#ffffff" x="390" y="40" text-anchor="start">{val}</text>`;
OrgChart.templates.ceo.field_1 = `<text data-width="200" style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;" fill="#78be20" x="390" y="60" text-anchor="start">{val}</text>`;
OrgChart.templates.ceo.bio = `<text data-width="200" data-text-overflow="multiline" style="font-size:13px;" fill="#8a9ab5" x="390" y="90" text-anchor="start">{val}</text>`;

// ── Template manager : affiche titre + domaine ────────────────
OrgChart.templates.manager = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.manager.field_1 = function(node, data, config, mode, val) {
    var x = node.stChildren.length ? node.w - 15 : node.w / 2;
    var anchor = node.stChildren.length ? 'end' : 'middle';
    var w = node.stChildren.length ? node.w - 100 : node.w - 20;
    var yTitle = node.stChildren.length ? 35 : 180;
    var yDomain = node.stChildren.length ? 50 : 197;
    var titleSvg = OrgChart.wrapText(val,
        `<text style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;" fill="#46a610" x="${x}" y="${yTitle}" text-anchor="${anchor}"></text>`,
        w, 1);
    var domain = data.domain || '';
    var domainSvg = domain
        ? `<text style="font-size:10px;font-weight:600;letter-spacing:0.06em;" fill="#888" x="${x}" y="${yDomain}" text-anchor="${anchor}">${domain}</text>`
        : '';
    return titleSvg + domainSvg;
};
OrgChart.templates.manager.editFormHeaderColor = '#78be20';

// ── Template expandable (opérations) ─────────────────────────
OrgChart.templates.expandable = Object.assign({}, OrgChart.templates.clara);
OrgChart.templates.expandable.treeListMaxHeight = 50000;

// ── Template treeListItem : items membres dans les équipes ────
OrgChart.templates.treeListItemWithTechnos = Object.assign({}, OrgChart.templates.treeListItem);
OrgChart.templates.treeListItemWithTechnos.size = [350, 76];
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

function normalizeTechnos(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
        return value.split(",").map(function (item) { return item.trim(); }).filter(Boolean);
    }
    return [];
}

function buildTechSearchValue(technos) {
    return normalizeTechnos(technos).join(", ");
}

function normalizePreferredContact(value) {
    if (typeof value === "string" && value.trim()) return value.trim();
    return "Email";
}

function enrichNodeForSearch(node) {
    var normalizedTechnos = normalizeTechnos(node.likedTechnos);
    var bio = normalizedTechnos.length > 0 ? normalizedTechnos.join(' · ') : (node.bio || '');
    return Object.assign({}, node, {
        likedTechnos: normalizedTechnos,
        techSearch: buildTechSearchValue(normalizedTechnos),
        preferredContact: normalizePreferredContact(node.preferredContact),
        bio: bio
    });
}

var controls = {
    fit: { title: 'Fit' }
};

if (OrgChart.isMobile()) {
    controls = {};
}

Promise.all([
    fetch('tech-options.json').then(function (r) { return r.json(); }),
    fetch('contact-options.json').then(function (r) { return r.json(); }),
    fetch('title-options.json').then(function (r) { return r.json(); }),
    fetch('domain-options.json').then(function (r) { return r.json(); }),
    fetch('nodes.json').then(function (r) { return r.json(); })
]).then(function (results) {
    var TECH_OPTIONS = results[0];
    var CONTACT_OPTIONS = results[1];
    var TITLE_OPTIONS = results[2];
    var DOMAIN_OPTIONS = results[3];
    var nodes = results[4];

    var chart = new OrgChart(document.getElementById("tree"), {
        template: 'clara',
        enableSearch: !(new URLSearchParams(window.location.search).get('fit')),
        searchFields: ['name', 'title', 'bio', 'techSearch', 'preferredContact'],
        collapse: { level: 2 },
        expand: {},
        nodeMouseClick: OrgChart.action.edit,
        editForm: {
            photoBinding: "photo",
            generateElementsFromFields: false,
            addMore: false,
            buttons: {
                edit: null,
                share: null,
                pdf: null,
                remove: null
            },
            elements: [
                { type: 'textbox', label: 'Full Name', binding: 'name' },
                { type: 'select', options: TITLE_OPTIONS, label: 'Job Title', binding: 'title' },
                { type: 'select', options: DOMAIN_OPTIONS, label: 'Domaine', binding: 'domain' },
                { type: 'multiSelect', options: TECH_OPTIONS, label: 'Technos preferees', binding: 'likedTechnos' },
                { type: 'select', options: CONTACT_OPTIONS, label: 'Contact prefere', binding: 'preferredContact' },
                { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' }
            ]
        },
        controls: controls,
        nodeMenu: {
            add: { text: 'Add' }
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
                        level: 0
                    }
                }
            },
            team: {
                subTreeConfig: {
                    layout: OrgChart.layout.treeList,
                    template: 'treeListItemWithTechnos',
                    collapse: {
                        level: 0
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
                        level: 0
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
            bio: 'bio'
        }
    });

    function minimize(nodeId) {
        chart.minimize(nodeId);
    }

    function maximize(nodeId) {
        chart.maximize(nodeId);
    }

    function addInside(nodeId) {
        var data = {
            id: chart.generateId(),
            stpid: nodeId,
            likedTechnos: [],
            techSearch: '',
            preferredContact: 'Email'
        };
        chart.addNode(data, undefined, true);
    }

    function addOutside(nodeId) {
        var data = {
            id: chart.generateId(),
            pid: nodeId,
            tags: ['list'],
            likedTechnos: [],
            techSearch: '',
            preferredContact: 'Email'
        };
        chart.addNode(data, undefined, true);
    }

    function removeAll(nodeId) {
        chart.remove(nodeId);
        var node = chart.getNode(nodeId);
        for (var stnodeid of node.stChildrenIds) {
            removeChildren(stnodeid);
        }
        chart.draw();
    }

    function removeChildren(nodeId) {
        chart.remove(nodeId);
        var node = chart.getNode(nodeId);
        for (var cid of node.childrenIds) {
            removeChildren(cid);
        }
    }

    chart.nodeMenuUI.on('show', function (sender, args) {
        var node = chart.getNode(args.firstNodeId);
        args.menu = {};
        if (node.isTreeListItem) {
            args.menu.add = { text: 'Add a new employee' };
        }
        else if (!node.isTreeListItem && !node.min && node.stChildrenIds.length > 0) {
            args.menu.addInside = { text: 'Add a new employee (inside)', icon: OrgChart.icon.add(24, 24, '#7A7A7A'), onClick: addInside };
            args.menu.addOutside = { text: 'Add a new employee (outside)', icon: OrgChart.icon.add(24, 24, '#7A7A7A'), onClick: addOutside };
            args.menu.minimize = { text: 'Minimize', icon: OrgChart.icon.zoom_out(24, 24, '#7A7A7A'), onClick: minimize };
        }
        else if (!node.isTreeListItem && !node.min && node.stChildrenIds.length == 0) {
            args.menu.addInside = { text: 'Add a new employee (inside)', icon: OrgChart.icon.add(24, 24, '#7A7A7A'), onClick: addInside };
            args.menu.addOutside = { text: 'Add a new employee (outside)', icon: OrgChart.icon.add(24, 24, '#7A7A7A'), onClick: addOutside };
        }
        else if (!node.isTreeListItem && node.min && node.stChildrenIds.length > 0) {
            args.menu.maximize = { text: 'Maximize', onClick: maximize, icon: OrgChart.icon.expand_all(24, 24, '#7A7A7A') };
        }
    });

    chart.onRedraw(function () {
        if (this.manager.action == OrgChart.action.insert) {
            this.editUI.show(this.manager.actionParams.insertedNodeId);
        }
    });

    chart.on('update', function (sender, oldData, newData) {
        if (!newData) return;
        var normalizedTechnos = normalizeTechnos(newData.likedTechnos);
        newData.likedTechnos = normalizedTechnos;
        newData.techSearch = buildTechSearchValue(normalizedTechnos);
        newData.preferredContact = normalizePreferredContact(newData.preferredContact);
        newData.bio = normalizedTechnos.length > 0 ? normalizedTechnos.join(' · ') : '';
    });

    chart.load(nodes.map(enrichNodeForSearch));
});
