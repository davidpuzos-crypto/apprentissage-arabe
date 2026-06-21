/* =========================================================================
   jeu.js — couche ludique partagée (sons, confettis, compteurs animés)
   Sans dépendance ni fichier : sons générés par la Web Audio API, confettis
   dessinés au canvas. Respecte « prefers-reduced-motion » et une préférence
   de son persistée dans localStorage. À utiliser par lecon.html et
   entrainement.html pour un retour vivant, à la manière d'un jeu.
   ========================================================================= */
const Jeu = (function () {
  const CLE_SON = 'arabe_son_actif';

  function reduit() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function sonActif() {
    const v = localStorage.getItem(CLE_SON);
    return v === null ? true : v === '1';
  }
  function definirSon(v) { localStorage.setItem(CLE_SON, v ? '1' : '0'); }
  function basculerSon() { definirSon(!sonActif()); return sonActif(); }

  /* ---- Sons (oscillateurs Web Audio, aucun fichier) ---- */
  let ctx = null;
  function audio() {
    if (ctx) return ctx;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { ctx = null; }
    return ctx;
  }
  function note(freq, debut, duree, type, vol) {
    const a = audio(); if (!a) return;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    o.connect(g); g.connect(a.destination);
    const t = a.currentTime + debut;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.14, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    o.start(t); o.stop(t + duree + 0.03);
  }
  function son(type) {
    if (!sonActif()) return;
    const a = audio(); if (!a) return;
    if (a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    if (type === 'bon') {           // deux notes ascendantes, douces
      note(587.33, 0, 0.16, 'sine', 0.15);
      note(880.00, 0.09, 0.22, 'sine', 0.15);
    } else if (type === 'serie') {  // petite fanfare de série
      note(659.25, 0, 0.12, 'sine', 0.15);
      note(880.00, 0.08, 0.12, 'sine', 0.15);
      note(1174.66, 0.16, 0.28, 'triangle', 0.15);
    } else if (type === 'fin') {    // accord de fin de leçon
      [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => note(f, i * 0.11, 0.3, 'triangle', 0.15));
    } else {                        // 'moins' : note grave, brève, non punitive
      note(233.08, 0, 0.18, 'sine', 0.12);
      note(185.00, 0.09, 0.22, 'sine', 0.11);
    }
  }

  /* ---- Confettis (canvas plein écran, couleurs du manuscrit) ---- */
  function confettis(opts) {
    opts = opts || {};
    if (reduit()) return;
    const n = opts.nombre || 90;
    const cv = document.createElement('canvas');
    cv.className = 'confettis-canvas';
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    document.body.appendChild(cv);
    const g = cv.getContext('2d');
    const couleurs = opts.couleurs || ['#a6803a', '#3a5f3e', '#b9943f', '#7a5a2e', '#c9a24a', '#5a7a4e'];
    const ox = opts.x != null ? opts.x : cv.width / 2;
    const oy = opts.y != null ? opts.y : cv.height / 3;
    const parts = [];
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const vit = 4 + Math.random() * 7;
      parts.push({
        x: ox, y: oy,
        vx: Math.cos(ang) * vit,
        vy: Math.sin(ang) * vit - 4,
        g: 0.16 + Math.random() * 0.12,
        c: couleurs[(Math.random() * couleurs.length) | 0],
        s: 5 + Math.random() * 6,
        rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.4,
        vie: 1,
      });
    }
    let frames = 0;
    (function boucle() {
      g.clearRect(0, 0, cv.width, cv.height);
      frames++;
      parts.forEach((p) => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vie -= 0.012;
        g.save();
        g.globalAlpha = Math.max(0, p.vie);
        g.translate(p.x, p.y); g.rotate(p.rot);
        g.fillStyle = p.c;
        g.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62);
        g.restore();
      });
      if (frames < 150) requestAnimationFrame(boucle);
      else cv.remove();
    })();
  }

  /* ---- Compteur animé de 0 à la cible (ease in-out) ---- */
  function compteAnime(el, cible, prefixe, suffixe, duree) {
    if (!el) return;
    prefixe = prefixe || ''; suffixe = suffixe || ''; duree = duree || 700;
    if (reduit()) { el.textContent = prefixe + cible + suffixe; return; }
    const t0 = performance.now();
    (function pas(t) {
      const p = Math.min(1, (t - t0) / duree);
      const v = Math.round(cible * (0.5 - Math.cos(p * Math.PI) / 2));
      el.textContent = prefixe + v + suffixe;
      if (p < 1) requestAnimationFrame(pas);
    })(t0);
  }

  return { son, confettis, compteAnime, sonActif, definirSon, basculerSon, reduit };
})();
