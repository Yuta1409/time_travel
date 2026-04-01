// ============================================
// TIMETRAVEL AGENCY — Reservation Form
// ============================================

(function () {
  var form = document.getElementById('reservation-form');
  var successPanel = document.getElementById('reservation-success');
  var submitBtn = document.getElementById('form-submit');
  var submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
  var submitLoader = submitBtn ? submitBtn.querySelector('.submit-loader') : null;
  var successMessage = document.getElementById('success-message');
  var successId = document.getElementById('success-id');
  var resetBtn = document.getElementById('success-reset');

  if (!form) return;

  // ── Validation rules ──
  var VALIDATORS = {
    name: function (val) {
      if (!val || val.trim().length < 2) return 'Le nom est requis (2 caract\u00e8res minimum).';
      return '';
    },
    email: function (val) {
      if (!val || val.trim() === '') return 'L\u2019adresse email est requise.';
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val.trim())) return 'Veuillez entrer une adresse email valide.';
      return '';
    },
    destination: function (val) {
      var valid = ['paris', 'cretace', 'florence'];
      if (!val || valid.indexOf(val) === -1) return 'Veuillez choisir une destination.';
      return '';
    },
    departureDate: function (val) {
      if (!val) return 'La date de d\u00e9part est requise.';
      var selected = new Date(val);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected <= today) return 'La date doit \u00eatre dans le futur.';
      return '';
    },
    travelers: function (val) {
      var n = parseInt(val, 10);
      if (!val || isNaN(n)) return 'Le nombre de voyageurs est requis.';
      if (n < 1 || n > 10) return 'Entre 1 et 10 voyageurs.';
      return '';
    }
  };

  // ── Show / clear field error ──
  function showFieldError(field, msg) {
    var errorEl = document.getElementById('error-' + field);
    var inputEl = form.querySelector('[name="' + field + '"]');
    if (errorEl) errorEl.textContent = msg;
    if (inputEl) {
      if (msg) {
        inputEl.classList.add('error');
        inputEl.setAttribute('aria-invalid', 'true');
      } else {
        inputEl.classList.remove('error');
        inputEl.removeAttribute('aria-invalid');
      }
    }
  }

  function clearAllErrors() {
    var fields = ['name', 'email', 'destination', 'departureDate', 'travelers'];
    fields.forEach(function (f) { showFieldError(f, ''); });
    var globalErr = form.querySelector('.form-global-error');
    if (globalErr) globalErr.classList.remove('visible');
  }

  function showGlobalError(msg) {
    var el = form.querySelector('.form-global-error');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-global-error';
      el.setAttribute('role', 'alert');
      form.insertBefore(el, form.firstChild);
    }
    el.textContent = msg;
    el.classList.add('visible');
  }

  // ── Validate all ──
  function validateAll() {
    var valid = true;
    var fields = ['name', 'email', 'destination', 'departureDate', 'travelers'];
    fields.forEach(function (field) {
      var inputEl = form.querySelector('[name="' + field + '"]');
      var val = inputEl ? inputEl.value : '';
      var error = VALIDATORS[field](val);
      showFieldError(field, error);
      if (error) valid = false;
    });
    return valid;
  }

  // ── Set loading state ──
  function setLoading(loading) {
    if (loading) {
      submitBtn.disabled = true;
      if (submitText) submitText.style.display = 'none';
      if (submitLoader) submitLoader.style.display = 'inline-flex';
    } else {
      submitBtn.disabled = false;
      if (submitText) submitText.style.display = 'inline';
      if (submitLoader) submitLoader.style.display = 'none';
    }
  }

  // ── Submit handler ──
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    if (!validateAll()) return;

    var payload = {
      destination: form.querySelector('[name="destination"]').value,
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      travelers: parseInt(form.querySelector('[name="travelers"]').value, 10),
      departureDate: form.querySelector('[name="departureDate"]').value
    };

    var messageField = form.querySelector('[name="message"]');
    if (messageField && messageField.value.trim()) {
      payload.message = messageField.value.trim();
    }

    setLoading(true);

    fetch('/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, status: res.status, data: data };
        });
      })
      .then(function (result) {
        setLoading(false);

        if (result.ok && result.data.success) {
          // Success
          form.style.display = 'none';
          successPanel.style.display = 'block';
          if (successMessage) successMessage.textContent = result.data.message || 'Votre demande a bien \u00e9t\u00e9 enregistr\u00e9e.';
          if (successId) successId.textContent = 'R\u00e9f\u00e9rence : ' + (result.data.id || '');
          successPanel.focus();
        } else if (result.data.field) {
          // Field-level error from API
          showFieldError(result.data.field, result.data.error || 'Ce champ est invalide.');
        } else {
          // Generic API error
          showGlobalError(result.data.error || 'Une erreur est survenue. Veuillez r\u00e9essayer.');
        }
      })
      .catch(function () {
        setLoading(false);
        showGlobalError('Impossible de contacter le serveur. V\u00e9rifiez votre connexion et r\u00e9essayez.');
      });
  });

  // ── Reset ──
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      form.style.display = 'block';
      successPanel.style.display = 'none';
      clearAllErrors();
    });
  }

  // ── Inline validation on blur ──
  var validatableFields = ['name', 'email', 'destination', 'departureDate', 'travelers'];
  validatableFields.forEach(function (field) {
    var inputEl = form.querySelector('[name="' + field + '"]');
    if (inputEl) {
      inputEl.addEventListener('blur', function () {
        var error = VALIDATORS[field](inputEl.value);
        showFieldError(field, error);
      });
    }
  });

  // ── Expose prefill for modal / quiz ──
  window.prefillReservation = function (destination) {
    var select = document.getElementById('res-destination');
    if (select) {
      select.value = destination;
    }
    // Scroll to reservation
    var section = document.getElementById('reservation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

})();
