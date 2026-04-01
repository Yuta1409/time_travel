/* ============================================================
   destinations-page.js — Page Destinations TimeTravel Agency
   ============================================================ */

(function () {
  'use strict';

  // ─── AOS Init ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true,
        offset: 80,
      });
    }

    initDestNav();
    initSmoothScroll();
    initFooterYear();
    handleDestinationParam();
  });

  // ─── Navigation rapide : highlight selon section visible ────
  function initDestNav() {
    var sections = document.querySelectorAll('.destination-section[data-dest]');
    var navLinks = document.querySelectorAll('.dest-nav-link[data-target]');

    if (!sections.length || !navLinks.length) return;

    var observerOptions = {
      root: null,
      // Déclencher quand ~40% de la section est visible
      threshold: 0,
      rootMargin: '-30% 0px -60% 0px',
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target.getAttribute('data-dest');
          setActiveNavLink(target);
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function setActiveNavLink(target) {
    var navLinks = document.querySelectorAll('.dest-nav-link');
    navLinks.forEach(function (link) {
      if (link.getAttribute('data-target') === target) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ─── Smooth scroll avec compensation navbar + dest-nav ──────
  function initSmoothScroll() {
    var destNavLinks = document.querySelectorAll('.dest-nav-link[href^="#"]');

    destNavLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var targetId = href.replace('#', '');
        var targetEl = document.getElementById(targetId);

        if (targetEl) {
          e.preventDefault();
          scrollToSection(targetEl);
        }
      });
    });

    // Aussi pour tout lien ancre vers les sections destinations
    var inPageLinks = document.querySelectorAll('a[href^="#paris"], a[href^="#cretace"], a[href^="#florence"]');
    inPageLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var targetId = href.replace('#', '');
        var targetEl = document.getElementById(targetId);

        if (targetEl) {
          e.preventDefault();
          scrollToSection(targetEl);
        }
      });
    });
  }

  function scrollToSection(targetEl) {
    var navbar = document.getElementById('navbar');
    var destNav = document.getElementById('dest-nav');

    var navbarHeight = navbar ? navbar.offsetHeight : 72;
    var destNavHeight = destNav ? destNav.offsetHeight : 56;
    var totalOffset = navbarHeight + destNavHeight;

    var elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
    var scrollTarget = elementTop - totalOffset - 8; // 8px de marge

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  }

  // ─── Pré-sélection depuis URL ?destination=xxx ──────────────
  function handleDestinationParam() {
    var params = new URLSearchParams(window.location.search);
    var destination = params.get('destination');

    if (!destination) return;

    var validDestinations = ['paris', 'cretace', 'florence'];
    if (!validDestinations.includes(destination)) return;

    // Scroll vers la section après chargement complet
    window.addEventListener('load', function () {
      var targetEl = document.getElementById(destination);
      if (targetEl) {
        // Délai court pour laisser le DOM se stabiliser
        setTimeout(function () {
          scrollToSection(targetEl);
        }, 300);
      }
    });

    // Highlight du lien nav correspondant
    setActiveNavLink(destination);
  }

  // ─── Année footer ────────────────────────────────────────────
  function initFooterYear() {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

})();
