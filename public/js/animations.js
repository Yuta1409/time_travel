// ============================================
// TIMETRAVEL AGENCY — Animations & Scroll Effects
// ============================================

(function () {

  // ── Init AOS ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: true,
      offset: 80,
      delay: 0,
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = 72;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ── Custom fade-in-up for non-AOS elements ──
  function observeFadeElements() {
    const els = document.querySelectorAll('.fade-in-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => observer.observe(el));
  }

  observeFadeElements();

  // ── Stat counter animation ──
  function animateCounter(el) {
    const text = el.textContent;
    // Skip non-numeric (∞, 100%, 1 200+)
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0 || text.includes('∞')) return;

    const suffix = text.replace(/[0-9., ]/g, '');
    const duration = 1500;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, num);
      const display = num >= 1000 ? Math.round(current).toLocaleString('fr-FR') : Math.round(current);
      el.textContent = display + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  // Observe stat cards
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat-number');
        if (numEl) animateCounter(numEl);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
  });

  // ── Parallax effect on hero title (subtle) ──
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
      }
    }, { passive: true });
  }

})();
