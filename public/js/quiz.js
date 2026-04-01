// ============================================
// TIMETRAVEL AGENCY — Quiz de recommandation
// ============================================

(function () {
  const body = document.getElementById('quiz-body');
  const progressBar = document.getElementById('quiz-progress-bar');

  if (!body || !progressBar) return;

  // ── Questions ──
  const QUESTIONS = [
    {
      q: "Quel type d\u2019exp\u00e9rience recherchez-vous ?",
      options: [
        { icon: "\uD83C\uDFA8", text: "Culturelle et artistique", scores: { paris: 2, cretace: 0, florence: 3 } },
        { icon: "\uD83E\uDD96", text: "Aventure et nature", scores: { paris: 0, cretace: 3, florence: 0 } },
        { icon: "\u2728", text: "\u00C9l\u00e9gance et raffinement", scores: { paris: 3, cretace: 0, florence: 2 } }
      ]
    },
    {
      q: "Votre p\u00e9riode pr\u00e9f\u00e9r\u00e9e ?",
      options: [
        { icon: "\uD83D\uDDFC", text: "Histoire moderne (XIXe-XXe si\u00e8cle)", scores: { paris: 3, cretace: 0, florence: 0 } },
        { icon: "\uD83C\uDF0B", text: "Temps anciens et origines", scores: { paris: 0, cretace: 3, florence: 0 } },
        { icon: "\uD83C\uDFDB\uFE0F", text: "Renaissance et classicisme", scores: { paris: 0, cretace: 0, florence: 3 } }
      ]
    },
    {
      q: "Vous pr\u00e9f\u00e9rez :",
      options: [
        { icon: "\uD83C\uDF06", text: "L\u2019effervescence urbaine", scores: { paris: 3, cretace: 0, florence: 1 } },
        { icon: "\uD83C\uDF3F", text: "La nature sauvage", scores: { paris: 0, cretace: 3, florence: 0 } },
        { icon: "\uD83D\uDDBC\uFE0F", text: "L\u2019art et l\u2019architecture", scores: { paris: 1, cretace: 0, florence: 3 } }
      ]
    },
    {
      q: "Votre activit\u00e9 id\u00e9ale :",
      options: [
        { icon: "\uD83D\uDDFC", text: "Visiter des monuments historiques", scores: { paris: 3, cretace: 0, florence: 1 } },
        { icon: "\uD83E\uDD95", text: "Observer la faune pr\u00e9historique", scores: { paris: 0, cretace: 3, florence: 0 } },
        { icon: "\uD83C\uDFAD", text: "Explorer mus\u00e9es et ateliers", scores: { paris: 1, cretace: 0, florence: 3 } }
      ]
    }
  ];

  const RESULTS = {
    paris: {
      title: "Paris 1889 \u2014 Belle \u00C9poque",
      description: "Votre profil r\u00e9v\u00e8le un go\u00fbt prononc\u00e9 pour l\u2019\u00e9l\u00e9gance et l\u2019effervescence culturelle. Paris 1889 est faite pour vous : l\u2019inauguration de la Tour Eiffel, les caf\u00e9s de Montmartre et l\u2019art impressionniste vous attendent.",
      destination: "paris"
    },
    cretace: {
      title: "Le Cr\u00e9tac\u00e9 \u2014 \u00C8re des Dinosaures",
      description: "Vous \u00eates un aventurier dans l\u2019\u00e2me ! Le Cr\u00e9tac\u00e9 est votre terrain de jeu id\u00e9al : observer des T-Rex dans leur habitat naturel, explorer une nature pr\u00e9historique grandiose depuis notre camp base ultra-s\u00e9curis\u00e9.",
      destination: "cretace"
    },
    florence: {
      title: "Florence 1504 \u2014 Renaissance",
      description: "Votre sensibilit\u00e9 artistique et votre amour du beau vous destinent \u00e0 Florence 1504. C\u00f4toyez Michel-Ange, visitez les ateliers des Ma\u00eetres et vivez les fastes de la Renaissance italienne.",
      destination: "florence"
    }
  };

  let currentStep = 0;
  let scores = { paris: 0, cretace: 0, florence: 0 };

  // ── Render question ──
  function renderStep(step) {
    const question = QUESTIONS[step];
    const progress = ((step) / QUESTIONS.length) * 100;
    progressBar.style.width = progress + '%';

    const optionsHtml = question.options.map(function (opt, i) {
      return '<button class="quiz-option" type="button" data-index="' + i + '" aria-label="' + opt.text + '">' +
        '<span class="quiz-option-icon" aria-hidden="true">' + opt.icon + '</span>' +
        '<span class="quiz-option-text">' + opt.text + '</span>' +
        '</button>';
    }).join('');

    body.innerHTML =
      '<div class="quiz-step">' +
        '<h3 class="quiz-question">' + question.q + '</h3>' +
        '<div class="quiz-options" role="group" aria-label="Options de r\u00e9ponse">' +
          optionsHtml +
        '</div>' +
      '</div>';

    // Wire up option clicks
    body.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = parseInt(btn.getAttribute('data-index'), 10);
        selectOption(index);
      });
    });
  }

  // ── Select option ──
  function selectOption(index) {
    var option = QUESTIONS[currentStep].options[index];

    // Add scores
    scores.paris += option.scores.paris;
    scores.cretace += option.scores.cretace;
    scores.florence += option.scores.florence;

    // Visual feedback
    var buttons = body.querySelectorAll('.quiz-option');
    buttons.forEach(function (btn) { btn.classList.remove('selected'); });
    buttons[index].classList.add('selected');

    // Next step after brief delay
    setTimeout(function () {
      currentStep++;
      if (currentStep < QUESTIONS.length) {
        renderStep(currentStep);
      } else {
        showResult();
      }
    }, 350);
  }

  // ── Show result ──
  function showResult() {
    progressBar.style.width = '100%';

    // Find winner
    var winner = 'paris';
    if (scores.cretace > scores[winner]) winner = 'cretace';
    if (scores.florence > scores[winner]) winner = 'florence';

    var result = RESULTS[winner];

    body.innerHTML =
      '<div class="quiz-result">' +
        '<h3 class="quiz-result-title">' + result.title + '</h3>' +
        '<p class="quiz-result-subtitle">Notre recommandation pour vous</p>' +
        '<div class="quiz-result-card">' +
          '<p class="quiz-result-description">' + result.description + '</p>' +
          '<div class="quiz-result-actions">' +
            '<button class="quiz-btn-view" type="button" id="quiz-view-dest">Voir la destination</button>' +
            '<button class="quiz-btn-restart" type="button" id="quiz-restart">Refaire le quiz</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Wire up buttons
    document.getElementById('quiz-view-dest').addEventListener('click', function () {
      if (window.openModal) {
        window.openModal(result.destination);
      }
    });

    document.getElementById('quiz-restart').addEventListener('click', function () {
      resetQuiz();
    });
  }

  // ── Reset ──
  function resetQuiz() {
    currentStep = 0;
    scores = { paris: 0, cretace: 0, florence: 0 };
    renderStep(0);
  }

  // ── Init ──
  renderStep(0);

})();
