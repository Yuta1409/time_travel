# ⏱ TimeTravel Agency — Webapp Interactive

Webapp moderne et interactive pour une agence de voyage temporel fictive de luxe.
Projet pédagogique développé avec Node.js/Express et du "vibe coding" assisté par IA.

## 🎯 Présentation

TimeTravel Agency propose des voyages temporels vers 3 destinations d'exception :
- **Paris 1889** — La Belle Époque et l'inauguration de la Tour Eiffel
- **Le Crétacé** — Safari dinosaures il y a 65 millions d'années
- **Florence 1504** — La Renaissance et les grands Maîtres

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| Backend | Node.js + Express 4.x |
| Frontend | HTML5 + CSS3 + JavaScript ES6 vanilla |
| Animations | AOS 2.3.x (CDN) + Canvas API |
| Fonts | Google Fonts (Playfair Display + Inter) |

## ✨ Fonctionnalités

- **Landing page immersive** — Hero plein écran avec animation canvas (particules dorées + étoiles filantes)
- **Navbar responsive** — Transparente → solide au scroll, menu hamburger mobile
- **Section About** — Présentation agence + stats animées (compteur)
- **Galerie destinations** — 3 cards interactives avec hover effects, dégradés de fallback si pas d'images
- **Modal destinations** — Détail complet : description, highlights, inclus, prix, bouton réservation
- **Chatbot Chronos** — Widget flottant avec réponses mock intelligentes par mots-clés
- **Animations AOS** — Fade-in au scroll sur toutes les sections
- **Design system** — Thème sombre élégant avec accents dorés (CSS custom properties)
- **Responsive** — Mobile-first, breakpoints 480px / 640px / 768px / 900px / 1024px

## 🚀 Installation & Lancement

### Prérequis
- Node.js ≥ 18
- npm

### Installation

```bash
cd time_travel
npm install
```

### Lancement

```bash
# Production
npm start

# Développement (avec rechargement automatique)
npm run dev
```

Accéder à : [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
time_travel/
├── package.json
├── server.js              # Serveur Express
├── README.md
├── OPTIONAL.md            # Fonctionnalités non implémentées
└── public/
    ├── index.html         # Page principale (SPA)
    ├── css/
    │   ├── variables.css  # Design tokens (couleurs, polices, espacement)
    │   ├── base.css       # Reset + typographie + boutons
    │   ├── layout.css     # Container + grille
    │   ├── navbar.css     # Navigation
    │   ├── hero.css       # Section hero
    │   ├── about.css      # Section about
    │   ├── destinations.css
    │   ├── modal.css      # Modal détail destination
    │   ├── chatbot.css    # Widget chatbot
    │   ├── animations.css # Animations CSS
    │   └── footer.css
    ├── js/
    │   ├── main.js        # Initialisation globale
    │   ├── navbar.js      # Comportement navbar
    │   ├── hero.js        # Canvas particles
    │   ├── destinations.js # Données + event handlers
    │   ├── modal.js       # Logique modal
    │   ├── chatbot.js     # Chatbot Chronos
    │   └── animations.js  # AOS + scroll effects
    └── assets/
        └── images/        # Placez ici vos images
            ├── paris-1889.jpg
            ├── cretace.jpg
            └── florence-1504.jpg
```

## 🖼️ Images

Les images des destinations sont à placer dans `public/assets/images/`.
Sans images, des dégradés de couleur thématiques s'affichent automatiquement (fallback CSS).

## 🤖 IA Utilisées

- **Code** : Claude Sonnet 4.6 via Claude Code
- **Chatbot** : Réponses simulées (mock) — voir OPTIONAL.md pour connecter une vraie API
- **Visuels** : Vos images du projet TimeTravel précédent

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA
