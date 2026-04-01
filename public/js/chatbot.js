// ============================================
// TIMETRAVEL AGENCY — Chatbot Chronos
// ============================================

(function () {
  const widget = document.getElementById('chatbot-widget');
  const window_ = document.getElementById('chatbot-window');
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const messagesContainer = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const badge = document.getElementById('chatbot-badge');
  const iconOpen = document.getElementById('chatbot-icon-open');
  const iconClose = document.getElementById('chatbot-icon-close');

  if (!widget) return;

  let isOpen = false;
  let isTyping = false;

  // ── Réponses du chatbot ──
  const RESPONSES = [
    {
      keywords: ['bonjour', 'salut', 'hello', 'bonsoir', 'hey', 'hi', 'coucou'],
      response: "Bienvenue chez TimeTravel Agency ! Je suis Chronos, votre guide temporel. 🕰️\n\nJe suis là pour vous aider à choisir votre destination à travers le temps. Souhaitez-vous en savoir plus sur Paris 1889, le Crétacé ou Florence 1504 ?"
    },
    {
      keywords: ['paris', '1889', 'belle époque', 'belle epoque', 'tour eiffel', 'eiffel', 'exposition universelle'],
      response: "Paris 1889, c'est la Belle Époque à son apogée ! ✨\n\nAssistez à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Montmartre, les impressionnistes, les cafés parisiens...\n\n📍 Paris, France\n⏳ 7 jours\n💰 À partir de 4 500€\n\nC'est notre destination la plus populaire pour les amateurs d'art de vivre et d'histoire !"
    },
    {
      keywords: ['crétacé', 'cretace', 'dinosaure', 'dino', 'prehistoire', 'préhistoire', 't-rex', 'trex', 'tricératops', 'ptérosaure'],
      response: "Le Crétacé, c'est notre aventure la plus extrême ! 🦕\n\nImaginez observer un T-Rex dans son habitat naturel depuis un véhicule blindé... Notre camp base ultra-sécurisé vous garantit une expérience 100% authentique.\n\n📍 Pangée, Crétacé Supérieur\n⏳ 5 jours\n💰 À partir de 12 000€\n\nIdéal pour les amateurs de sensations fortes et de nature sauvage !"
    },
    {
      keywords: ['florence', '1504', 'renaissance', 'michel-ange', 'michelange', 'leonard', 'léonard', 'de vinci', 'medicis', 'médicis', 'italie'],
      response: "Florence 1504 est notre joyau culturel ! 🎨\n\nImaginez visiter l'atelier de Michel-Ange alors qu'il travaille sur le David, ou rencontrer Léonard de Vinci en personne !\n\n📍 Florence, Italie\n⏳ 10 jours\n💰 À partir de 6 200€\n\nParfait pour les passionnés d'art, d'histoire et de culture italienne."
    },
    {
      keywords: ['prix', 'tarif', 'coût', 'cout', 'combien', 'budget', 'cher'],
      response: "Nos tarifs reflètent le caractère exceptionnel de nos voyages :\n\n• Paris 1889 — dès 4 500€ (7 jours)\n• Florence 1504 — dès 6 200€ (10 jours)\n• Le Crétacé — dès 12 000€ (5 jours)\n\nCes prix incluent le transport temporel A/R, le guide expert, l'hébergement et l'équipement. Quelle destination vous intéresse ?"
    },
    {
      keywords: ['recommand', 'conseil', 'choisir', 'quelle destination', 'quel voyage', 'meilleur', 'suggère', 'suggerer'],
      response: "Mon conseil dépend de vos envies ! 🌟\n\n🏛️ Vous aimez la culture et l'élégance ? → Paris 1889 ou Florence 1504\n\n🦖 Vous cherchez l'aventure extrême ? → Le Crétacé\n\n🎨 Vous êtes passionné d'art ? → Florence 1504\n\nDites-moi ce que vous recherchez et je vous guide vers la destination parfaite !"
    },
    {
      keywords: ['sécurité', 'securite', 'danger', 'risque', 'safe', 'sûr', 'sur'],
      response: "La sécurité est notre priorité absolue ! 🛡️\n\nTous nos voyages sont accompagnés de guides experts certifiés. Pour le Crétacé, nous fournissons un équipement de protection de grade A et un camp base avec clôture ionique.\n\nBilan : 1 200+ voyageurs satisfaits, 0 incident majeur. Retour garanti à 100% !"
    },
    {
      keywords: ['réserver', 'reserver', 'réservation', 'reservation', 'booking', 'acheter', 'commander'],
      response: "Pour réserver votre voyage temporel 📅\n\nContactez-nous :\n📧 contact@timetravel-agency.com\n📞 +33 1 23 45 67 89\n\nNous sommes disponibles lun-ven, 9h-18h.\n\n⚠️ Réservez 3 mois à l'avance, nos places sont limitées !"
    },
    {
      keywords: ['durée', 'duree', 'jours', 'combien de temps', 'long'],
      response: "Durées de nos voyages :\n\n• Paris 1889 : 7 jours\n• Florence 1504 : 10 jours\n• Le Crétacé : 5 jours\n\nCes durées sont optimisées pour une immersion complète sans fatigue temporelle. Des extensions sont possibles sur demande !"
    },
    {
      keywords: ['merci', 'thank', 'parfait', 'super', 'génial', 'excellent', 'bravo'],
      response: "Avec plaisir ! C'est mon rôle de vous guider à travers les âges. 😊\n\nN'hésitez pas si vous avez d'autres questions sur nos destinations. À bientôt chez TimeTravel Agency !"
    },
    {
      keywords: ['au revoir', 'bye', 'ciao', 'adieu', 'bonne journée'],
      response: "À très bientôt ! Le temps vous attend... 🕰️\n\nN'hésitez pas à revenir si vous avez des questions. Bonne journée !"
    }
  ];

  const DEFAULT_RESPONSE = "Je suis là pour vous guider dans vos voyages temporels ! 🕰️\n\nPosez-moi des questions sur :\n• Paris 1889 (Belle Époque)\n• Le Crétacé (Dinosaures)\n• Florence 1504 (Renaissance)\n• Les prix et durées\n• La sécurité des voyages\n\nComment puis-je vous aider ?";

  // ── Find response ──
  function findResponse(message) {
    const lower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const item of RESPONSES) {
      for (const keyword of item.keywords) {
        const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (lower.includes(normalizedKeyword)) {
          return item.response;
        }
      }
    }
    return DEFAULT_RESPONSE;
  }

  // ── Add message ──
  function addMessage(text, type = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;

    msg.appendChild(bubble);
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  // ── Typing indicator ──
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.id = 'chat-typing';
    el.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    messagesContainer.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }

  // ── Send message ──
  function sendMessage() {
    const text = input.value.trim();
    if (!text || isTyping) return;

    addMessage(text, 'user');
    input.value = '';
    sendBtn.disabled = true;
    isTyping = true;

    // Simulate thinking delay
    const delay = 800 + Math.random() * 600;
    showTyping();

    setTimeout(() => {
      hideTyping();
      const response = findResponse(text);
      addMessage(response, 'bot');
      isTyping = false;
      sendBtn.disabled = false;
      input.focus();
    }, delay);
  }

  // ── Toggle window ──
  function toggleChat(forceOpen) {
    isOpen = forceOpen !== undefined ? forceOpen : !isOpen;
    window_.classList.toggle('open', isOpen);
    window_.setAttribute('aria-hidden', !isOpen);
    iconOpen.style.display = isOpen ? 'none' : 'flex';
    iconClose.style.display = isOpen ? 'flex' : 'none';

    if (isOpen) {
      hideBadge();
      setTimeout(() => input.focus(), 400);
    }
  }

  function hideBadge() {
    badge.setAttribute('data-hidden', 'true');
  }

  // ── Events ──
  toggleBtn.addEventListener('click', () => toggleChat());
  closeBtn.addEventListener('click', () => toggleChat(false));

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ── Welcome message ──
  function initWelcome() {
    setTimeout(() => {
      addMessage("Bonjour ! Je suis Chronos, votre guide temporel chez TimeTravel Agency. 🕰️\n\nJe peux vous conseiller sur nos destinations : Paris 1889, le Crétacé ou Florence 1504. Comment puis-je vous aider ?", 'bot');
    }, 500);
  }

  initWelcome();

  // ── Expose pour navbar ──
  window.openChatbot = () => toggleChat(true);

})();
