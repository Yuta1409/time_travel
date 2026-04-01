// ============================================
// TIMETRAVEL AGENCY — Données des destinations
// ============================================

export const DESTINATIONS = {
  paris: {
    id: 'paris',
    era: '1889',
    title: 'Paris — Belle Époque',
    subtitle: "L'Exposition Universelle & la naissance d'une ère",
    location: 'Paris, France',
    duration: '7 jours',
    price: 4500,
    priceDisplay: '4 500€',
    tagline: 'Art de vivre, élégance et révolution industrielle',
    excerpt: "Assistez à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Montmartre, impressionnisme, art de vivre parisien au sommet.",
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
      "Guide historique certifié",
      "Costume d'époque fourni et ajusté",
      "Hébergement Hôtel Ritz (époque originale)",
      "Assurance paradoxe temporel incluse",
      "Repas gastronomiques inclus"
    ],
    image: 'src/public/assets/images/paris-1889.png',
    color: '#c9a96e',
    gradient: 'linear-gradient(135deg, #1a0a00, #8b6914, #c9a96e)',
    adventureLevel: 2,
    culturalLevel: 4,
    idealFor: "Amateurs d'élégance",
    type: "Culture & Art de vivre",
    locationIcon: '📍'
  },

  cretace: {
    id: 'cretace',
    era: '−65M',
    eraFull: '−65 000 000',
    title: 'L\'Ère des Dinosaures',
    subtitle: "L'ère des dinosaures — nature préhistorique",
    location: 'Pangée, Crétacé Supérieur',
    duration: '5 jours',
    price: 12000,
    priceDisplay: '12 000€',
    tagline: 'Aventure extrême dans la nature préhistorique',
    excerpt: "Observez les dinosaures dans leur habitat naturel. T-Rex, Tricératops, Ptérosaures... La nature à l'état brut depuis −65 millions d'années.",
    description: "Vivez l'aventure ultime en observant les dinosaures dans leur habitat naturel. Notre camp base ultra-sécurisé vous permet d'explorer en toute sécurité la nature préhistorique : forêts de fougères géantes, océans peuplés de créatures marines titanesques, et les majestueux dinosaures dans leur quotidien.",
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
      'Assurance paradoxe temporel & éco-protocole inclus',
      'Rations de survie premium'
    ],
    image: 'src/public/assets/images/cretace.png',
    color: '#4a8c3f',
    gradient: 'linear-gradient(135deg, #001a00, #1a5c1a, #4a8c3f)',
    adventureLevel: 5,
    culturalLevel: 2,
    idealFor: "Aventuriers",
    type: "Aventure & Nature",
    locationIcon: '🌍'
  },

  florence: {
    id: 'florence',
    era: '1504',
    title: 'La Renaissance',
    subtitle: 'Art, culture et magnificence médicéenne',
    location: 'Florence, Italie',
    duration: '10 jours',
    price: 6200,
    priceDisplay: '6 200€',
    tagline: 'Vivre la Renaissance aux côtés des Maîtres',
    excerpt: "Côtoyez Michel-Ange au summum de sa création, visitez les ateliers des Maîtres, assistez aux fastes de la cour des Médicis.",
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
      "Costume d'époque taillé sur mesure",
      'Palais florentin XVe siècle (chambre et repas)',
      'Assurance paradoxe temporel incluse',
      "Cours de langue italienne ancienne"
    ],
    image: 'src/public/assets/images/florence-1504.png',
    color: '#7c6bc9',
    gradient: 'linear-gradient(135deg, #0a0015, #3d1a6b, #7c6bc9)',
    adventureLevel: 2,
    culturalLevel: 5,
    idealFor: "Passionnés d'art",
    type: "Art & Histoire",
    locationIcon: '🏛️'
  }
}

export const DESTINATIONS_LIST = Object.values(DESTINATIONS)