/* ═══════════════════════════════════════════════════════════════
   NUOVA ME — main.js
   - Nav: shrink + hamburger
   - Scroll reveal con IntersectionObserver
   Nessuna dipendenza esterna.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Nav: shrink allo scroll ─────────────────────────────── */
  var navbar = document.getElementById('navbar');
  var scrollThreshold = 40;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // stato iniziale

  /* ─── Nav: hamburger menu ─────────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var navMenu   = document.getElementById('navMenu');

  function openMenu() {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Chiudi menu di navigazione');
    document.addEventListener('keydown', handleEsc);
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Apri menu di navigazione');
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e) {
    if (e.key === 'Escape') closeMenu();
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.contains('open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  // Chiudi il menu al click su un link interno
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Chiudi il menu al click fuori dal nav
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navbar.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ─── Scroll reveal (IntersectionObserver) ────────────────── */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: mostra tutto senza animazione
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ─── Smooth scroll per i link dell'ancora ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = navbar.offsetHeight;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

})();
