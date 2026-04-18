# Who ROX

Organigramme interactif de l'équipe ROX, hébergé sur GitHub Pages et généré automatiquement à partir d'un fichier YAML.

---

## Accéder à l'organigramme

L'organigramme est disponible à l'adresse :

**[https://jsmadja.github.io/whorox/](https://jsmadja.github.io/whorox/)**

---

## Comment ça fonctionne

```
team.yaml
    │
    ▼
generate-nodes.js   →   nodes.json
                              │
                              ▼
                        index.html / index.js / index.css
                              │
                              ▼
                        GitHub Pages (site public)
```

- **`team.yaml`** — source de vérité : les données de l'équipe en format lisible
- **`generate-nodes.js`** — script Node.js qui transforme le YAML en `nodes.json` (structure technique attendue par OrgChart.js)
- **`nodes.json`** — généré automatiquement, consommé par le front
- **GitHub Actions** — à chaque push sur `main`, régénère `nodes.json` et déploie sur GitHub Pages

---

## Mettre à jour l'organigramme

Toute la donnée équipe est dans **`team.yaml`**. C'est le seul fichier à modifier.

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
    domain: SPLIT                        # domaine métier
    engineering_manager:
      name: Prénom Nom
      title: Engineering Manager
      photo: https://...
      technos: [Go, Docker, AWS]
    teams:
      - name: Nom de l'équipe
        members:
          - name: Prénom Nom
            title: Tech Lead
            photo: https://...
            technos: [TypeScript, React, AWS]
```

### Workflow

1. Modifier `team.yaml`
2. Committer et pousser sur `main`
3. GitHub Actions régénère `nodes.json` et redéploie automatiquement

---

## Développement local

### Prérequis

- Node.js 18+
- Un serveur HTTP local (ex. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) dans VS Code, ou `npx serve`)

### Installation

```bash
npm install
```

### Régénérer nodes.json après modification du YAML

```bash
npm run generate
```

### Lancer le site en local

```bash
npx serve .
```

Puis ouvrir `http://localhost:3000`.

---

## Stack technique

| Outil | Rôle |
|---|---|
| [OrgChart.js (Balkan)](https://balkan.app/OrgChartJS) | Rendu de l'organigramme |
| [Tailwind CSS](https://tailwindcss.com) | Style de la topbar |
| [js-yaml](https://github.com/nodeca/js-yaml) | Parsing du YAML |
| GitHub Actions | CI/CD |
| GitHub Pages | Hébergement |

---

## Structure du projet

```
├── team.yaml               # ← données de l'équipe (à éditer)
├── generate-nodes.js       # script de génération
├── nodes.json              # généré automatiquement
├── index.html              # page principale
├── index.js                # logique OrgChart
├── index.css               # styles
├── tech-options.json       # options du multiselect "Technos"
├── title-options.json      # options du select "Job Title"
├── domain-options.json     # options du select "Domaine"
├── contact-options.json    # options du select "Contact préféré"
└── .github/
    └── workflows/
        └── deploy.yml      # pipeline CI/CD
```
