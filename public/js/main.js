// ============================================
// TIMETRAVEL AGENCY — Main (Global Init)
// ============================================

(function () {

  // ── Set current year in footer ──
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Footer destination buttons → open modal ──
  document.querySelectorAll('.footer-link-btn[data-destination]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-destination');
      if (window.openModal) {
        window.openModal(dest);
      }
    });
  });

  // ── Nav chat trigger → open chatbot ──
  const navChatTrigger = document.getElementById('nav-chat-trigger');
  if (navChatTrigger) {
    navChatTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openChatbot) {
        window.openChatbot();
      }
    });
  }

  // ── Log branding ──
  console.log(
    '%c⏱ TimeTravel Agency %c— Voyagez à travers le temps',
    'color: #c9a96e; font-family: serif; font-size: 16px; font-weight: bold;',
    'color: #9999aa; font-size: 14px;'
  );

})();
