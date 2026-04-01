// ============================================
// TIMETRAVEL AGENCY — GSAP Animations
// ============================================

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Section titles reveal ──
  gsap.utils.toArray('.section-title').forEach(function (title) {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 85%', once: true },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // ── Stat cards stagger ──
  var statsBlock = document.querySelector('.about-stats-block');
  if (statsBlock) {
    gsap.from('.stat-card', {
      scrollTrigger: { trigger: '.about-stats-block', start: 'top 80%', once: true },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  // ── Destination cards stagger ──
  var destGrid = document.querySelector('.destinations-grid');
  if (destGrid) {
    gsap.from('.destination-card', {
      scrollTrigger: { trigger: '.destinations-grid', start: 'top 75%', once: true },
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // ── Quiz options stagger ──
  var quizSection = document.querySelector('.quiz-section');
  if (quizSection) {
    ScrollTrigger.create({
      trigger: '.quiz-section',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.from('.quiz-option', {
          opacity: 0,
          x: -20,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  }

  // ── Reservation form reveal ──
  var resWrapper = document.querySelector('.reservation-wrapper');
  if (resWrapper) {
    gsap.from('.reservation-wrapper', {
      scrollTrigger: { trigger: '.reservation-section', start: 'top 75%', once: true },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  // ── Footer reveal ──
  var footer = document.querySelector('.footer');
  if (footer) {
    gsap.from('.footer-brand, .footer-col', {
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

})();
