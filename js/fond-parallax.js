/* =========================================================================
   fond-parallax.js — fond discret de lettres arabes qui dérivent et suivent
   légèrement le curseur. À inclure sur les pages « calmes ». Pendant les
   exercices, on appelle FondParallax.masquer() pour ne pas distraire, puis
   FondParallax.afficher() en sortant. Respecte prefers-reduced-motion.
   ========================================================================= */
(function () {
  const reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lettres = 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' ');
  let cv, ctx, parts = [], w = 0, h = 0, visible = true;
  const off = { x: 0, y: 0, tx: 0, ty: 0 };

  function dimensionner() {
    w = cv.width = window.innerWidth;
    h = cv.height = window.innerHeight;
    const n = Math.max(8, Math.min(30, Math.round(w * h / 50000)));
    parts = [];
    for (let i = 0; i < n; i++) {
      parts.push({
        x: Math.random() * w, y: Math.random() * h,
        c: lettres[(Math.random() * lettres.length) | 0],
        s: 22 + Math.random() * 40,
        a: 0.03 + Math.random() * 0.05, // très léger
        vy: 0.05 + Math.random() * 0.16,
        sway: Math.random() * Math.PI * 2,
        vsway: 0.004 + Math.random() * 0.008,
      });
    }
  }
  function dessiner() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      const prof = p.s / 40;
      ctx.font = p.s + 'px "Scheherazade New", "Amiri", serif';
      ctx.fillStyle = 'rgba(168, 133, 58, ' + p.a + ')';
      ctx.fillText(p.c, p.x + Math.sin(p.sway) * 8 + off.x * prof, p.y + off.y * prof);
    }
  }
  function boucle() {
    off.x += (off.tx - off.x) * 0.05; off.y += (off.ty - off.y) * 0.05;
    for (const p of parts) {
      p.y -= p.vy; p.sway += p.vsway;
      if (p.y < -p.s) { p.y = h + p.s; p.x = Math.random() * w; }
    }
    if (visible) dessiner();
    requestAnimationFrame(boucle);
  }
  function onMove(e) { off.tx = (e.clientX / w - 0.5) * 18; off.ty = (e.clientY / h - 0.5) * 12; }

  function creer() {
    cv = document.createElement('canvas');
    cv.id = 'fond-parallax';
    cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    ctx = cv.getContext('2d');
    dimensionner();
    if (reduit) { dessiner(); }
    else {
      window.addEventListener('pointermove', onMove, { passive: true });
      requestAnimationFrame(boucle);
    }
    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => { dimensionner(); if (reduit) dessiner(); }, 150);
    });
  }

  window.FondParallax = {
    masquer() { visible = false; if (cv) cv.classList.add('cache'); },
    afficher() { visible = true; if (cv) cv.classList.remove('cache'); },
  };

  if (document.body) creer();
  else document.addEventListener('DOMContentLoaded', creer);
})();
