/* linjirong.com — site behaviors (Phase 2)
   - Lenis smooth scroll (graceful: skipped if lib missing or reduced-motion)
   - IntersectionObserver section reveals (vanilla, no lib dep)
   - GSAP gentle float drift behind hero (homepage only) */

(function () {
  'use strict';

  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Lenis smooth scroll ----
  if (window.Lenis && !reduceMotion) {
    try {
      var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
      window.__lenis = lenis;
    } catch (e) { /* lib mismatch — fall through to native scroll */ }
  }

  // ---- Section reveals ----
  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  // ---- Hero floats (GSAP) ----
  if (window.gsap && !reduceMotion && document.querySelector('.float')) {
    gsap.to('.float.f1', { y: 30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.float.f2', { y: -20, x: 10, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.float.f3', { rotation: 90, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
})();
