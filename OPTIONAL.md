# Fonctionnalités Optionnelles — Non Implémentées

Ce fichier liste les fonctionnalités du brief non implémentées, avec des instructions pour les ajouter.

---

## 🔴 Non Implémenté

### Exercice 1.1 — Formulaire de Réservation
**Raison :** Choix délibéré pour se concentrer sur les features essentielles.

**Pour l'ajouter :**
1. Créer une section `<section class="reservation" id="reservation">` dans `index.html`
2. Créer `public/css/reservation.css` et `public/js/reservation.js`
3. Ajouter une route POST `/api/reservation` dans `server.js`
4. Formulaire : destination + dates + nombre de voyageurs + nom + email
5. Validation côté client (JS) + côté serveur (Express)

---

### Exercice 3.1 — Chatbot avec API IA Réelle (Option A)
**Raison :** Le chatbot utilise des réponses simulées par mots-clés. Aucune clé API nécessaire.

**Pour connecter Mistral AI :**

1. Installer le SDK :
   ```bash
   npm install @mistralai/mistralai
   ```

2. Ajouter dans `server.js` :
   ```js
   const { MistralAI } = require('@mistralai/mistralai');
   const mistral = new MistralAI({ apiKey: process.env.MISTRAL_API_KEY });

   app.post('/api/chat', async (req, res) => {
     const { message, history = [] } = req.body;
     const messages = [
       {
         role: 'system',
         content: `Tu es Chronos, l'assistant virtuel de TimeTravel Agency...
         [coller le prompt de personnalité ici]`
       },
       ...history,
       { role: 'user', content: message }
     ];
     const response = await mistral.chat.complete({ model: 'mistral-small-latest', messages });
     res.json({ reply: response.choices[0].message.content });
   });
   ```

3. Dans `chatbot.js`, remplacer la fonction `findResponse` par un appel fetch :
   ```js
   async function sendMessage() {
     const reply = await fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message: text, history: chatHistory })
     }).then(r => r.json()).then(d => d.reply);
     addMessage(reply, 'bot');
   }
   ```

4. Créer `.env` avec `MISTRAL_API_KEY=votre_cle`

---

### Exercice 3.2 — Quiz de Recommandation Personnalisée (Option A)
**Raison :** Fonctionnalité optionnelle non incluse dans le scope.

**Pour l'ajouter :**
1. Créer une section quiz après la section destinations dans `index.html`
2. 4 questions avec 3 choix chacune (voir le brief pour les questions)
3. Algorithme : chaque réponse donne +1 point à paris/cretace/florence
4. Afficher la destination avec le plus de points + description personnalisée

---

### Exercice 3.2 — Génération Dynamique de Descriptions (Option B)
**Nécessite une API IA.** Voir la section Mistral ci-dessus pour l'intégration API.

---

### Exercice 3.2 — Auto-complétion Intelligente (Option C)
Non implémenté. Nécessiterait une API IA pour les suggestions.

---

### Exercice 2.3 — Animations Avancées (GSAP/Framer Motion)
**Partiellement implémenté** : AOS + CSS animations + Canvas inclus.

**Non inclus :**
- GSAP ScrollTrigger pour animations complexes
- Morphing SVG
- Transitions de page full-screen

**Pour ajouter GSAP :**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

---

### Exercice 2.2 — Vidéo en Background Hero
**Non implémenté** : Le hero utilise une animation canvas (particules dorées).

**Pour ajouter une vidéo :**
1. Dans `index.html`, remplacer le `<canvas>` par :
   ```html
   <video class="hero-canvas" autoplay muted loop playsinline>
     <source src="assets/videos/hero.mp4" type="video/mp4">
   </video>
   ```
2. Supprimer le script `hero.js` ou garder les particules en overlay

---

### Exercice 4.2 — Déploiement en ligne
**Non déployé.** Instructions par plateforme :

#### Railway (recommandé pour Express)
```bash
npm install -g railway
railway login
railway init
railway up
```

#### Render
1. Créer un compte sur render.com
2. New Web Service → connecter le repo GitHub
3. Build command : `npm install`
4. Start command : `npm start`

#### Vercel (avec adapter)
Ajouter `vercel.json` :
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

---

## 🟡 Partiellement Implémenté

| Fonctionnalité | Statut | Notes |
|----------------|--------|-------|
| Chatbot IA | Simulé | Mock keyword-based. API pluggable via `/api/chat` |
| Animations | AOS + CSS | GSAP non inclus |
| Images destinations | Fallback CSS | Placez vos images dans `public/assets/images/` |
