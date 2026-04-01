// ============================================
// TIMETRAVEL AGENCY — Modal
// ============================================

(function () {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-container');
  const closeBtn = document.getElementById('modal-close');
  const inner = document.getElementById('modal-inner');

  if (!backdrop) return;

  // ── Open modal ──
  window.openModal = function (destinationId) {
    const data = window.DESTINATIONS_DATA && window.DESTINATIONS_DATA[destinationId];
    if (!data) return;

    inner.innerHTML = renderModalContent(data);
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    container.scrollTop = 0;

    // Focus close button
    setTimeout(() => closeBtn.focus(), 100);

    // Wire up reserve button
    const reserveBtn = inner.querySelector('.modal-btn-reserve');
    if (reserveBtn) {
      reserveBtn.addEventListener('click', () => {
        closeModal();
        // Open chatbot
        const chatToggle = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow && chatWindow.getAttribute('aria-hidden') === 'true') {
          chatToggle && chatToggle.click();
        }
        // Send pre-filled message
        setTimeout(() => {
          const input = document.getElementById('chatbot-input');
          if (input) {
            input.value = `Je suis intéressé par ${data.title}`;
            const sendBtn = document.getElementById('chatbot-send');
            if (sendBtn) sendBtn.click();
          }
        }, 400);
      });
    }
  };

  // ── Close modal ──
  function closeModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      inner.innerHTML = '';
    }, 400);
  }

  window.closeModal = closeModal;

  // ── Render content ──
  function renderModalContent(data) {
    const highlightItems = data.highlights.map(h => `<li>${h}</li>`).join('');
    const includeItems = data.includes.map(i => `<li>${i}</li>`).join('');

    return `
      <div class="modal-hero">
        <img
          class="modal-hero-bg"
          src="assets/images/${data.id}-${data.id === 'paris' ? '1889' : data.id === 'cretace' ? 'cretace' : '1504'}.jpg"
          alt="${data.title}"
          onerror="this.style.display='none'"
        >
        <div class="modal-hero-gradient"></div>
        <div class="modal-hero-content" style="background: linear-gradient(135deg, ${data.gradient || 'transparent'})">
        </div>
        <div class="modal-hero-content">
          <span class="modal-era-badge">${data.era}</span>
          <h2 class="modal-title" id="modal-title">${data.title}</h2>
          <p class="modal-subtitle">${data.subtitle}</p>
        </div>
      </div>

      <div class="modal-info-bar">
        <div class="modal-info-item">
          <span class="modal-info-label">Destination</span>
          <span class="modal-info-value">${data.location}</span>
        </div>
        <div class="modal-info-item">
          <span class="modal-info-label">Durée</span>
          <span class="modal-info-value">${data.duration}</span>
        </div>
        <div class="modal-info-item">
          <span class="modal-info-label">À partir de</span>
          <span class="modal-info-value">${data.price}</span>
        </div>
      </div>

      <p class="modal-description">${data.description}</p>

      <div class="modal-sections">
        <div>
          <h3 class="modal-section-title">Points forts</h3>
          <ul class="modal-list">${highlightItems}</ul>
        </div>
        <div>
          <h3 class="modal-section-title">Inclus dans le voyage</h3>
          <ul class="modal-list">${includeItems}</ul>
        </div>
      </div>

      <div class="modal-cta-bar">
        <div class="modal-price-display">
          <span class="modal-price-from">Tarif par voyageur</span>
          <span class="modal-price-amount">${data.price}</span>
        </div>
        <button class="modal-btn-reserve">Demander une réservation</button>
      </div>
    `;
  }

  // ── Event listeners ──
  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // ── Footer destination links ──
  document.querySelectorAll('.footer-link-btn[data-destination]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-destination');
      window.openModal(dest);
    });
  });

})();
