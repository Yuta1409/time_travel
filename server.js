import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=')
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim()
  })
} catch {}

const app = express()

// Servir fichiers statiques
app.use(express.static(path.join(__dirname, 'dist')));

// Toutes les routes renvoient index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être trop familier.
Tu utilises parfois des emojis pertinents (🕰️, 🎨, 🦕, ✨) mais avec parcimonie.

Tu connais parfaitement ces 3 destinations :

🗼 PARIS 1889 — Belle Époque
- Inauguration Tour Eiffel, Exposition Universelle
- Activités : Montmartre, impressionnistes, Moulin Rouge, calèche Champs-Élysées
- Durée : 7 jours | Prix : dès 4 500€/pers.
- Idéal pour : culture, élégance, art de vivre

🦕 LE CRÉTACÉ — -65 millions d'années
- Safari T-Rex, Tricératops, plongée récifs crétacés
- Équipement protection grade A, camp base sécurisé
- Durée : 5 jours | Prix : dès 12 000€/pers.
- Idéal pour : aventuriers, nature sauvage

🎨 FLORENCE 1504 — La Renaissance
- Atelier Michel-Ange, rencontre Léonard de Vinci, banquet Médicis
- Durée : 10 jours | Prix : dès 6 200€/pers.
- Idéal pour : passionnés d'art et d'histoire

Infos agence : transport temporel A/R inclus, guide expert, hébergement d'époque, assurance paradoxe temporel.
1 200+ voyageurs satisfaits, retour garanti 100%.
Contact : contact@timetravel-agency.com | +33 1 23 45 67 89

Règles : réponds toujours en français, sois concis (3-5 phrases max), ne sors jamais du personnage.`

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body
  if (!message) return res.status(400).json({ error: 'Message requis' })

  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey || apiKey === 'ta_clé_api_ici') {
    return res.json({ fallback: true })
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages,
        max_tokens: 400,
        temperature: 0.7
      })
    })

    if (!response.ok) return res.json({ fallback: true })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) return res.json({ fallback: true })

    res.json({ reply, success: true })
  } catch (err) {
    console.error('Erreur:', err.message)
    res.json({ fallback: true })
  }
})

app.post('/api/reservation', (req, res) => {
  const { destination, name, email, travelers, departureDate } = req.body
  if (!destination || !name || !email || !travelers || !departureDate) {
    return res.status(400).json({ error: 'Champs manquants', success: false })
  }
  const ref = 'TTA-' + Date.now().toString(36).toUpperCase()
  const destNames = {
    paris: 'Paris 1889 — Belle Époque',
    cretace: 'Le Crétacé',
    florence: 'Florence 1504 — Renaissance'
  }
  res.json({
    success: true,
    id: ref,
    message: `Merci ${name} ! Votre demande pour ${destNames[destination]} a bien été reçue.`
  })
})

app.listen(PORT, () => {
  console.log(`🕰️  Serveur démarré sur http://localhost:${PORT}`)
  const key = process.env.MISTRAL_API_KEY
  if (!key || key === 'ta_clé_api_ici') {
    console.log('⚠️  Clé Mistral manquante → mode mock actif')
  } else {
    console.log('✅  Mistral AI connecté')
  }
})