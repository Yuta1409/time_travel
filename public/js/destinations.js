// ============================================
// TIMETRAVEL AGENCY — Destinations Data & Interactions
// ============================================

// ── Données des destinations (global pour modal.js) ──
window.DESTINATIONS_DATA = {
  paris: {
    id: 'paris',
    era: '1889',
    title: 'Paris — Belle Époque',
    subtitle: "L'Exposition Universelle & la naissance d'une ère",
    location: 'Paris, France',
    duration: '7 jours',
    price: '4 500€',
    tagline: 'Art de vivre, élégance et révolution industrielle',
    description: "Plongez au cœur du Paris de la Belle Époque, lors de l'Exposition Universelle de 1889. Assistez à l'inauguration de la Tour Eiffel par Gustave Eiffel lui-même. Flânez sur les Grands Boulevards illuminés au gaz, découvrez Montmartre avant qu'il ne devienne célèbre, et côtoyez les impressionnistes dans leurs cafés préférés.",
    highlights: [
      "Inauguration de la Tour Eiffel (31 mars 1889)",
      "Visite guidée de l'Exposition Universelle",
      "Soirée au Moulin Rouge (première ouverture : 1889)",
      "Rencontre avec les peintres de Montmartre",
      "Promenade en calèche sur les Champs-Élysées",
      "Dîner gastronomique Belle Époque au Grand Véfour"
    ],
    includes: [
      'Transport temporel aller-retour',
      'Guide historique certifié',
      'Costume d\'époque fourni et ajusté',
      'Hébergement Hôtel Ritz (époque originale)',
      'Assurance paradoxe temporel incluse'
    ],
    color: '#c9a96e',
    gradient: 'linear-gradient(135deg, #1a0a00, #8b6914, #c9a96e)'
  },

  cretace: {
    id: 'cretace',
    era: '−65 000 000',
    title: 'Le Crétacé',
    subtitle: "L'ère des dinosaures — nature préhistorique",
    location: 'Pangée, Crétacé Supérieur',
    duration: '5 jours',
    price: '12 000€',
    tagline: 'Aventure extrême dans la nature préhistorique',
    description: "Vivez l'aventure ultime en observant les dinosaures dans leur habitat naturel. Notre camp base ultra-sécurisé vous permet d'explorer en toute sécurité la nature préhistorique : forêts de fougères géantes, océans peuplés de créatures marines titanesques, et les majestueux dinosaures dans leur quotidien. Une expérience qui redéfinit le mot 'safari'.",
    highlights: [
      'Observation de T-Rex depuis un véhicule blindé',
      'Safari Tricératops et Diplodocus en plaine ouverte',
      'Observation de vols de Ptérosaures au coucher du soleil',
      'Plongée dans les récifs coralliens crétacés',
      'Nuit sous les étoiles préhistoriques sans pollution lumineuse',
      'Fossile personnel à emporter en souvenir'
    ],
    includes: [
      'Transport temporel aller-retour',
      'Guide paléontologue expert',
      'Équipement de protection complet (combinaison grade A)',
      'Camp base ultra-sécurisé avec clôture ionique',
      'Assurance paradoxe temporel & éco-protocole inclus'
    ],
    color: '#4a8c3f',
    gradient: 'linear-gradient(135deg, #001a00, #1a5c1a, #4a8c3f)'
  },

  florence: {
    id: 'florence',
    era: '1504',
    title: 'Florence — La Renaissance',
    subtitle: 'Art, culture et magnificence médicéenne',
    location: 'Florence, Italie',
    duration: '10 jours',
    price: '6 200€',
    tagline: 'Vivre la Renaissance aux côtés des Maîtres',
    description: "Immergez-vous dans la Florence du XVIe siècle au moment où la Renaissance atteint son apogée. Michel-Ange vient de terminer le David (1504), Léonard de Vinci est en pleine création. La cour des Médicis rayonne de culture et d'art. Visitez les ateliers des Maîtres et assistez à la création des plus grandes œuvres de l'humanité.",
    highlights: [
      "Visite privée de l'atelier de Michel-Ange",
      "Rencontre avec Léonard de Vinci dans son studio",
      "Banquet somptueux à la cour des Médicis",
      "Accès aux Galeries des Offices avant leur ouverture officielle",
      "Cours de peinture Renaissance avec un maître florentin",
      "Cérémonie du carnaval florentin en costume d'époque"
    ],
    includes: [
      'Transport temporel aller-retour',
      'Guide historien spécialisé Renaissance italienne',
      'Costume d\'époque taillé sur mesure',
      'Palais florentin XVe siècle (chambre et repas)',
      'Assurance paradoxe temporel incluse'
    ],
    color: '#7c6bc9',
    gradient: 'linear-gradient(135deg, #0a0015, #3d1a6b, #7c6bc9)'
  }
};

// ── Event listeners ──
(function () {
  // Ouvre le modal au clic sur bouton "Découvrir"
  document.querySelectorAll('.btn-card-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const destination = btn.getAttribute('data-destination');
      if (window.openModal) {
        window.openModal(destination);
      }
    });
  });

  // Ouvre le modal au clic sur la card entière
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Ne pas déclencher si on clique sur le bouton (déjà géré)
      if (e.target.closest('.btn-card-detail')) return;
      const destination = card.getAttribute('data-destination');
      if (window.openModal) {
        window.openModal(destination);
      }
    });
  });

  // Keyboard accessibility
  document.querySelectorAll('.destination-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const destination = card.getAttribute('data-destination');
        if (window.openModal) {
          window.openModal(destination);
        }
      }
    });
  });

})();
