/* linjirong.com — site behaviors (Phase 3)
   - Lenis smooth scroll
   - Mouse parallax on hero floats + magnetic links + custom cursor
   - Directional reveals with stagger
   - GSAP gentle float drift behind hero
   All effects respect prefers-reduced-motion. */

(function () {
  'use strict';

  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(hover: none)').matches;

  // ---- Lenis smooth scroll ----
  if (window.Lenis && !reduceMotion) {
    try {
      var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
      window.__lenis = lenis;
    } catch (e) { /* lib mismatch — fall through to native scroll */ }
  }

  // ---- Section reveals (directional, with stagger) ----
  var targets = document.querySelectorAll('[data-reveal]');
  if (targets.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // stagger any children with [data-reveal-child]
            var kids = e.target.querySelectorAll('[data-reveal-child]');
            kids.forEach(function (k, i) {
              setTimeout(function () { k.classList.add('visible'); }, i * 90);
            });
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      targets.forEach(function (el) { io.observe(el); });
    }
  }

  // ---- Mouse-driven effects (skip on touch / reduced motion) ----
  if (reduceMotion || coarse) return;

  // 1) Hero parallax — float shapes follow mouse via manual rAF lerp (owns transform fully)
  var hero = document.querySelector('.hero');
  var floats = hero ? hero.querySelectorAll('.float') : [];
  if (hero && floats.length) {
    var heroRect = hero.getBoundingClientRect();
    function updateHeroRect() { heroRect = hero.getBoundingClientRect(); }
    window.addEventListener('resize', updateHeroRect);
    window.addEventListener('scroll', updateHeroRect, { passive: true });

    var floatStates = [];
    floats.forEach(function (f, i) {
      // preserve any baked-in rotation (e.g. f3 has rotate(15deg) in CSS)
      var rot = f.classList.contains('f3') ? 15 : 0;
      f.style.transform = 'translate3d(0,0,0) rotate(' + rot + 'deg)';
      floatStates.push({ el: f, tx: 0, ty: 0, cx: 0, cy: 0, depth: (i + 1) * 14, rot: rot });
    });

    var targetMx = 0, targetMy = 0;
    hero.addEventListener('mousemove', function (e) {
      targetMx = ((e.clientX - heroRect.left) / heroRect.width - 0.5) * 2;
      targetMy = ((e.clientY - heroRect.top) / heroRect.height - 0.5) * 2;
    });
    hero.addEventListener('mouseleave', function () { targetMx = 0; targetMy = 0; });

    (function floatTick() {
      for (var i = 0; i < floatStates.length; i++) {
        var s = floatStates[i];
        s.tx = targetMx * s.depth;
        s.ty = targetMy * s.depth;
        s.cx += (s.tx - s.cx) * 0.08;
        s.cy += (s.ty - s.cy) * 0.08;
        s.el.style.transform = 'translate3d(' + s.cx.toFixed(2) + 'px,' + s.cy.toFixed(2) + 'px,0) rotate(' + s.rot + 'deg)';
      }
      requestAnimationFrame(floatTick);
    })();
  }

  // 2) Magnetic links — nav links and more-links pull toward cursor
  var magnetSel = '.nav-links a, .more-link, .quick-links a, .folio-kicker, .folio-hint';
  var magnetEls = document.querySelectorAll(magnetSel);
  magnetEls.forEach(function (el) {
    var rect = null;
    el.addEventListener('mouseenter', function () { rect = el.getBoundingClientRect(); });
    el.addEventListener('mousemove', function (e) {
      if (!rect) rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
      rect = null;
    });
  });

  // 3) Custom cursor — small dot following mouse, scales up on links/cards
  if (!document.getElementById('cursor-dot')) {
    var dot = document.createElement('div');
    dot.id = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var dx = cx, dy = cy;
    var running = true;

    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      if (dot.style.opacity !== '1') dot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; });

    (function tick() {
      if (!running) return;
      dx += (cx - dx) * 0.18;
      dy += (cy - dy) * 0.18;
      dot.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) translate(-50%, -50%)';
      requestAnimationFrame(tick);
    })();

    var interactive = 'a, button, .feature-card, .folder, .direction-list li';
    document.querySelectorAll(interactive).forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('grow'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('grow'); });
    });
  }
})();
