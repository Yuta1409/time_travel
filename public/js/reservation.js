// ============================================
// TIMETRAVEL AGENCY — Reservation Page
// ============================================

(function() {
  // Prix par destination
  var DEST_PRICES    = { paris: 4500, cretace: 12000, florence: 6200 };
  var DEST_NAMES     = { paris: 'Paris 1889 — Belle Époque', cretace: 'Le Crétacé', florence: 'Florence 1504 — Renaissance' };
  var DEST_DURATION  = { paris: '7 jours', cretace: '5 jours', florence: '10 jours' };

  var form      = document.getElementById('reservation-form');
  var step1     = document.getElementById('step-1');
  var step2     = document.getElementById('step-2');
  var successEl = document.getElementById('res-success');

  if (!form) return;

  // ── Lecture URL params (pré-remplissage depuis /destinations) ──
  var urlParams      = new URLSearchParams(window.location.search);
  var preDestination = urlParams.get('destination');
  if (preDestination && document.getElementById('res-destination')) {
    document.getElementById('res-destination').value = preDestination;
    var card = document.querySelector('.res-dest-card[data-dest="' + preDestination + '"]');
    if (card) card.classList.add('selected');
    updatePriceRecap();
  }

  // ── Cards sidebar sélection ──
  document.querySelectorAll('.res-dest-card').forEach(function(card) {
    card.addEventListener('click', function() {
      document.querySelectorAll('.res-dest-card').forEach(function(c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      var dest = card.getAttribute('data-dest');
      document.getElementById('res-destination').value = dest;
      clearError('destination');
      updatePriceRecap();
    });
  });

  // ── Prix recap dynamique ──
  function updatePriceRecap() {
    var dest      = document.getElementById('res-destination').value;
    var travelers = parseInt(document.getElementById('res-travelers').value) || 1;
    var recap     = document.getElementById('price-recap');
    var recapVal  = document.getElementById('price-recap-value');
    if (dest && DEST_PRICES[dest]) {
      var total = DEST_PRICES[dest] * travelers;
      recapVal.textContent = 'Dès ' + total.toLocaleString('fr-FR') + '€ pour ' + travelers + ' voyageur' + (travelers > 1 ? 's' : '');
      recap.style.display = 'flex';
    } else {
      recap.style.display = 'none';
    }
  }

  document.getElementById('res-destination').addEventListener('change', updatePriceRecap);
  document.getElementById('res-travelers').addEventListener('input', updatePriceRecap);

  // ── Validation step 1 ──
  function validateStep1() {
    var valid     = true;
    var dest      = document.getElementById('res-destination').value;
    var date      = document.getElementById('res-date').value;
    var travelers = document.getElementById('res-travelers').value;

    clearError('destination'); clearError('departureDate'); clearError('travelers');

    if (!dest) {
      showError('destination', 'Veuillez choisir une destination');
      valid = false;
    }
    if (!date) {
      showError('departureDate', 'Date requise');
      valid = false;
    } else if (new Date(date) <= new Date()) {
      showError('departureDate', 'La date doit être dans le futur');
      valid = false;
    }
    if (!travelers || parseInt(travelers) < 1 || parseInt(travelers) > 10) {
      showError('travelers', 'Entre 1 et 10 voyageurs');
      valid = false;
    }
    return valid;
  }

  // ── Step 1 → Step 2 ──
  document.getElementById('btn-next-1').addEventListener('click', function() {
    if (!validateStep1()) return;
    updateStepIndicator(2);
    step1.style.display = 'none';
    step2.style.display = 'block';
    renderBookingRecap();
  });

  // ── Step 2 → Step 1 ──
  document.getElementById('btn-back-2').addEventListener('click', function() {
    updateStepIndicator(1);
    step2.style.display = 'none';
    step1.style.display = 'block';
  });

  function renderBookingRecap() {
    var dest      = document.getElementById('res-destination').value;
    var date      = document.getElementById('res-date').value;
    var travelers = document.getElementById('res-travelers').value;
    var recap     = document.getElementById('booking-recap');
    if (!dest) return;
    var dateFormatted = new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    recap.innerHTML =
      '<strong>Récapitulatif :</strong><br>' +
      'Destination : <strong>' + DEST_NAMES[dest] + '</strong><br>' +
      'Départ : <strong>' + dateFormatted + '</strong> · Durée : <strong>' + DEST_DURATION[dest] + '</strong><br>' +
      'Voyageurs : <strong>' + travelers + '</strong> · Estimation : <strong>Dès ' +
      (DEST_PRICES[dest] * parseInt(travelers)).toLocaleString('fr-FR') + '€</strong>';
  }

  // ── Submit ──
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearError('name'); clearError('email');
    var valid   = true;
    var name    = document.getElementById('res-name').value.trim();
    var email   = document.getElementById('res-email').value.trim();
    var message = document.getElementById('res-message').value.trim();

    if (!name || name.length < 2) {
      showError('name', 'Nom requis (min 2 caractères)');
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Email invalide');
      valid = false;
    }
    if (!valid) return;

    var submitBtn = document.getElementById('btn-submit');
    document.getElementById('submit-text').style.display = 'none';
    document.getElementById('submit-loader').style.display = 'inline';
    submitBtn.disabled = true;

    var payload = {
      destination:   document.getElementById('res-destination').value,
      name:          name,
      email:         email,
      travelers:     parseInt(document.getElementById('res-travelers').value),
      departureDate: document.getElementById('res-date').value
    };
    if (message) payload.message = message;

    fetch('/api/reservation', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    })
      .then(function(res) {
        return res.json().then(function(data) { return { ok: res.ok, data: data }; });
      })
      .then(function(result) {
        if (result.ok && result.data.success) {
          updateStepIndicator(3);
          form.style.display = 'none';
          successEl.style.display = 'block';
          document.getElementById('success-message').textContent = result.data.message;
          document.getElementById('success-ref').textContent = result.data.id;
        } else {
          if (result.data.field) {
            showError(result.data.field, result.data.error);
            if (['destination', 'departureDate', 'travelers'].indexOf(result.data.field) !== -1) {
              updateStepIndicator(1);
              step2.style.display = 'none';
              step1.style.display = 'block';
            }
          } else {
            alert(result.data.error || 'Une erreur est survenue');
          }
        }
      })
      .catch(function() {
        alert('Erreur de connexion. Réessayez dans quelques instants.');
      })
      .finally(function() {
        document.getElementById('submit-text').style.display = 'inline';
        document.getElementById('submit-loader').style.display = 'none';
        submitBtn.disabled = false;
      });
  });

  // ── Reset ──
  document.getElementById('btn-new-reservation').addEventListener('click', function() {
    form.reset();
    form.style.display = 'block';
    successEl.style.display = 'none';
    step1.style.display = 'block';
    step2.style.display = 'none';
    document.getElementById('price-recap').style.display = 'none';
    document.querySelectorAll('.res-dest-card').forEach(function(c) { c.classList.remove('selected'); });
    updateStepIndicator(1);
  });

  // ── Helpers ──
  function showError(field, msg) {
    var el    = document.getElementById('error-' + field);
    var input = document.querySelector('[name="' + field + '"]') || document.getElementById('res-' + field);
    if (el)    el.textContent = msg;
    if (input) input.classList.add('error');
  }

  function clearError(field) {
    var el    = document.getElementById('error-' + field);
    var input = document.querySelector('[name="' + field + '"]') || document.getElementById('res-' + field);
    if (el)    el.textContent = '';
    if (input) input.classList.remove('error');
  }

  function updateStepIndicator(activeStep) {
    document.querySelectorAll('.res-step').forEach(function(s) {
      var n = parseInt(s.getAttribute('data-step'));
      s.classList.remove('active', 'done');
      if (n === activeStep)    s.classList.add('active');
      else if (n < activeStep) s.classList.add('done');
    });
  }

  // ── Date minimum = demain ──
  var dateInput = document.getElementById('res-date');
  if (dateInput) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  // ── Init AOS si disponible ──
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 700, offset: 60 });
  }

})();
