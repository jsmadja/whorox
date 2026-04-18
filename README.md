# Who ROX

Organigramme interactif de l'équipe ROX, hébergé sur GitHub Pages et généré automatiquement à partir de fichiers YAML.

---

## Accéder à l'organigramme

**[https://jsmadja.github.io/whorox/](https://jsmadja.github.io/whorox/)**

---

## Structure du projet

```
├── data/
│   ├── team.yaml               # ← données de l'équipe (à éditer)
│   └── tech-radar.yaml         # ← technos par catégorie (à éditer)
├── scripts/
│   ├── generate-nodes.js       # génère public/nodes.json depuis data/team.yaml
│   ├── generate-tech-options.js # génère public/tech-*.json depuis data/tech-radar.yaml
│   └── dev.js                  # serveur de dev avec watch + live reload SSE
├── public/
│   ├── index.html              # page principale
│   ├── index.js                # logique OrgChart, templates, Tech Radar, fuzzy search
│   ├── index.css               # styles
│   ├── contact-options.json    # options contact (statique)
│   ├── domain-options.json     # options domaine (statique)
│   ├── title-options.json      # options titres (statique)
│   ├── nodes.json              # généré automatiquement (ignoré par git)
│   ├── tech-options.json       # généré automatiquement (ignoré par git)
│   └── tech-radar.json         # généré automatiquement (ignoré par git)
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → GitHub Pages
└── package.json
```

---

## Comment ça fonctionne

```
data/team.yaml
    │
    ▼
scripts/generate-nodes.js   →   public/nodes.json
                                        │
data/tech-radar.yaml                    │
    │                                   ▼
    ▼                           public/index.html / index.js / index.css
scripts/generate-tech-options.js  →  public/tech-*.json
                                        │
                                        ▼
                                  GitHub Pages (site public)
```

- **`data/team.yaml`** — source de vérité : les données de l'équipe en format lisible
- **`data/tech-radar.yaml`** — les technos classées par catégorie pour le Tech Radar
- **`scripts/generate-nodes.js`** — transforme `team.yaml` en `public/nodes.json`
- **`scripts/generate-tech-options.js`** — transforme `tech-radar.yaml` en `public/tech-*.json`
- **GitHub Actions** — à chaque push sur `main`, régénère les JSON et déploie `public/` sur GitHub Pages

---

## Mettre à jour l'organigramme

Toute la donnée équipe est dans **`data/team.yaml`**. C'est le seul fichier à modifier.

### Structure du YAML

```yaml
head:
  name: Prénom Nom
  title: Head of ROX
  photo: https://...
  technos: [JavaScript, AWS, Docker]

delivery_managers:
  - name: Prénom Nom
    title: Delivery Manager
    photo: https://...
    technos: [Python, Kubernetes, Azure]
    engineering_manager:
      name: Prénom Nom
      title: Engineering Manager
      photo: https://...
      technos: [Go, Docker, AWS]
    teams:
      - name: Nom de l'équipe
        description: Description courte
        members:
          - name: Prénom Nom
            title: Tech Lead
            photo: https://...
            technos: [TypeScript, React, AWS]
```

### Workflow

1. Modifier `data/team.yaml`
2. Committer et pousser sur `main`
3. GitHub Actions régénère les JSON et redéploie automatiquement

---

## Développement local

### Installation

```bash
npm install
```

### Lancer le serveur de dev (watch + live reload)

```bash
npm run dev
```

Puis ouvrir `http://localhost:3000`. Le navigateur se recharge automatiquement à chaque modification de `data/team.yaml` ou `data/tech-radar.yaml`.

### Régénérer les JSON manuellement

```bash
npm run generate
```

---

## Stack technique

| Outil | Rôle |
|---|---|
| [OrgChart.js (Balkan)](https://balkan.app/OrgChartJS) | Rendu de l'organigramme |
| [Tailwind CSS](https://tailwindcss.com) | Style de la topbar |
| [js-yaml](https://github.com/nodeca/js-yaml) | Parsing du YAML |
| GitHub Actions | CI/CD |
| GitHub Pages | Hébergement |
