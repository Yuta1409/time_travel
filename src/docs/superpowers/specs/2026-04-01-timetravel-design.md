# TimeTravel Agency — Webapp Interactive — Design Spec
_Date: 2026-04-01_

## Résumé

Webapp interactive pour une agence de voyage temporel de luxe fictive. Application Node.js/Express servant un frontend HTML/CSS/JS vanilla single-page.

## Stack Technique

| Couche | Choix |
|--------|-------|
| Backend | Node.js + Express 4.x (serveur fichiers statiques) |
| Frontend | HTML5 + CSS3 + JavaScript ES6 vanilla |
| Animations | AOS 2.3.x (CDN) + CSS transitions + Canvas API |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Déploiement | Non inclus (voir OPTIONAL.md) |

## Design System

```
Couleurs:
  --color-bg:          #0a0a0f   (fond principal)
  --color-bg-card:     #111118   (cartes)
  --color-bg-alt:      #0d0d14   (sections alternées)
  --color-primary:     #c9a96e   (or — accent principal)
  --color-primary-light:#e4c98b  (or clair)
  --color-text:        #e8e8e8   (texte principal)
  --color-text-muted:  #9999aa   (texte secondaire)
  --color-border:      rgba(201,169,110,0.2)

Typographie:
  Titres:  'Playfair Display' (serif, élégant)
  Corps:   'Inter' (sans-serif, lisible)

Espacement: grille 8px
Border-radius: 12px (cartes), 6px (boutons)
Transitions: 0.3s ease
```

## Structure des Fichiers

```
time_travel/
├── package.json
├── server.js
├── .gitignore
├── README.md
├── OPTIONAL.md
└── public/
    ├── index.html
    ├── css/
    │   ├── variables.css    (custom properties)
    │   ├── base.css         (reset, typo, boutons globaux)
    │   ├── layout.css       (container, grid utils)
    │   ├── navbar.css
    │   ├── hero.css
    │   ├── about.css
    │   ├── destinations.css
    │   ├── modal.css
    │   ├── chatbot.css
    │   ├── animations.css
    │   └── footer.css
    ├── js/
    │   ├── main.js          (init global, AOS, footer links)
    │   ├── navbar.js        (scroll behavior, menu mobile)
    │   ├── hero.js          (canvas particles)
    │   ├── destinations.js  (data + handlers)
    │   ├── modal.js         (modal destinations)
    │   ├── chatbot.js       (widget + mock responses)
    │   └── animations.js    (scroll animations custom)
    └── assets/
        └── images/
            ├── paris-1889.jpg
            ├── cretace.jpg
            └── florence-1504.jpg
```

## Sections de la Page

1. **Navbar** — sticky, transparente → solide au scroll, hamburger mobile
2. **Hero** — plein écran, canvas particules dorées, titre animé ligne par ligne
3. **About** — stats agence (3 destinations, 1200+ voyageurs, ∞ années, 100% retour garanti)
4. **Destinations** — 3 cards (Paris 1889 · Crétacé · Florence 1504), hover effect, clic → modal
5. **Modal** — détail destination (description complète, highlights, prix, includes)
6. **Chatbot** — widget flottant bas-droite, personnage Chronos, réponses mock par mots-clés
7. **Footer** — logo, liens destinations, contact

## Destinations

| Destination | Époque | Prix | Durée |
|-------------|--------|------|-------|
| Paris — Belle Époque | 1889 | 4 500€ | 7 jours |
| Le Crétacé | -65 000 000 | 12 000€ | 5 jours |
| Florence — Renaissance | 1504 | 6 200€ | 10 jours |

## Chatbot (Chronos)

Réponses simulées par correspondance de mots-clés. Architecture pluggable : une route `/api/chat` Express peut être ajoutée pour connecter une API réelle (Mistral, Groq, OpenRouter) sans modifier le frontend.

## Ce qui N'est PAS inclus

Voir `OPTIONAL.md` pour la liste complète des fonctionnalités non implémentées et les instructions pour les ajouter.
