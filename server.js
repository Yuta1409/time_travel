require('dotenv').config();

const express = require('express');
const path = require('path');
const { Mistral } = require('@mistralai/mistralai');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Mistral AI client — initialised only if API key is present
// ---------------------------------------------------------------------------
const mistralClient = process.env.MISTRAL_API_KEY
  ? new Mistral({ apiKey: process.env.MISTRAL_API_KEY })
  : null;

const CHRONOS_SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être familier.
Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — dès 4 500€, 7 jours
- Le Crétacé -65M (dinosaures, nature préhistorique) — dès 12 000€, 5 jours
- Florence 1504 (Renaissance, Michel-Ange, Médicis) — dès 6 200€, 10 jours
Réponds toujours en français. Sois concis (max 3 paragraphes). Suggère des destinations selon les intérêts.`;

const FALLBACK_REPLY = {
  reply: 'Je suis momentanément indisponible. Consultez directement nos fiches destinations sur le site !',
  fallback: true,
};

// ---------------------------------------------------------------------------
// In-memory reservation store
// ---------------------------------------------------------------------------
const reservations = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const VALID_DESTINATIONS = ['paris', 'cretace', 'florence'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateReservationId() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `TT-${digits}`;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// Routes — API endpoints BEFORE the catch-all
// ---------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', name: 'TimeTravel Agency' });
});

// ---- POST /api/chat -------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message requis' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message trop long (max 500 caractères)' });
  }

  // If no Mistral client, return fallback immediately
  if (!mistralClient) {
    return res.json(FALLBACK_REPLY);
  }

  try {
    // Build messages array: system + history + current user message
    const messages = [{ role: 'system', content: CHRONOS_SYSTEM_PROMPT }];

    if (Array.isArray(history)) {
      for (const entry of history) {
        if (
          entry &&
          typeof entry.content === 'string' &&
          (entry.role === 'user' || entry.role === 'assistant')
        ) {
          messages.push({ role: entry.role, content: entry.content });
        }
      }
    }

    messages.push({ role: 'user', content: message.trim() });

    const chatResponse = await mistralClient.chat.complete({
      model: 'mistral-small-latest',
      messages,
      maxTokens: 400,
      temperature: 0.7,
    });

    const reply = chatResponse.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json(FALLBACK_REPLY);
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Mistral API error:', err.message || err);
    return res.status(500).json({
      error: 'Service temporairement indisponible',
      fallback: true,
    });
  }
});

// ---- POST /api/reservation ------------------------------------------------
app.post('/api/reservation', (req, res) => {
  const { destination, name, email, travelers, departureDate, message } = req.body;

  // --- Validation ---
  if (!destination || !VALID_DESTINATIONS.includes(destination)) {
    return res.status(400).json({
      error: `Destination invalide. Choix possibles : ${VALID_DESTINATIONS.join(', ')}`,
      field: 'destination',
    });
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      error: 'Le nom est requis (minimum 2 caractères)',
      field: 'name',
    });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: 'Adresse email invalide',
      field: 'email',
    });
  }

  const travelersNum = Number(travelers);
  if (!Number.isInteger(travelersNum) || travelersNum < 1 || travelersNum > 10) {
    return res.status(400).json({
      error: 'Le nombre de voyageurs doit être entre 1 et 10',
      field: 'travelers',
    });
  }

  if (!departureDate || !/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
    return res.status(400).json({
      error: 'Date de départ requise au format YYYY-MM-DD',
      field: 'departureDate',
    });
  }

  const departure = new Date(departureDate);
  if (isNaN(departure.getTime()) || departure <= new Date()) {
    return res.status(400).json({
      error: 'La date de départ doit être dans le futur',
      field: 'departureDate',
    });
  }

  if (message !== undefined && (typeof message !== 'string' || message.length > 500)) {
    return res.status(400).json({
      error: 'Le message ne peut pas dépasser 500 caractères',
      field: 'message',
    });
  }

  // --- Build reservation ---
  const reservation = {
    id: generateReservationId(),
    destination,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    travelers: travelersNum,
    departureDate,
    message: message ? message.trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  reservations.push(reservation);
  console.log('📅 New reservation:', reservation);

  return res.status(201).json({
    success: true,
    id: reservation.id,
    message: 'Votre demande de réservation a été enregistrée. Notre équipe vous contactera sous 48h.',
    reservation,
  });
});

// ---------------------------------------------------------------------------
// Catch-all — serve SPA
// ---------------------------------------------------------------------------
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🕰️  TimeTravel Agency running on http://localhost:${PORT}`);
  if (!mistralClient) {
    console.log('⚠️  MISTRAL_API_KEY not set — chatbot will use fallback replies');
  }
});
