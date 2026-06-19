/* =========================================================================
   speech.js — Web Speech API (synthèse + reconnaissance) en ar-SA
   Comparaison par normalisation (retrait des diacritiques, unification de
   l'alif et des formes) et distance de Levenshtein tolérante.
   ========================================================================= */

const Parole = (function () {
  /* ---- Synthèse vocale ---- */
  let voixArabe = null;

  function chargerVoix() {
    if (!('speechSynthesis' in window)) return;
    const voix = window.speechSynthesis.getVoices();
    voixArabe = voix.find((v) => v.lang && v.lang.toLowerCase().startsWith('ar')) || null;
  }

  if ('speechSynthesis' in window) {
    chargerVoix();
    window.speechSynthesis.onvoiceschanged = chargerVoix;
  }

  function prononcer(texte, options = {}) {
    if (!('speechSynthesis' in window)) {
      console.info('Synthèse vocale indisponible sur ce navigateur.');
      return false;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = 'ar-SA';
    if (voixArabe) u.voice = voixArabe;
    // Débit ralenti pour les premières leçons, normal ensuite.
    u.rate = options.rate != null ? options.rate : 0.75;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
    return true;
  }

  function rateSelonLecon(idLecon) {
    return idLecon <= 6 ? 0.7 : (idLecon <= 18 ? 0.8 : 0.9);
  }

  /* ---- Normalisation du texte arabe ---- */
  function normaliser(texte) {
    if (!texte) return '';
    return texte
      .replace(/[ً-ْٰـ]/g, '') // diacritiques + tatweel
      .replace(/[آأإٱ]/g, 'ا') // formes d'alif -> alif nu
      .replace(/ى/g, 'ي') // alif maqsura -> ya
      .replace(/ة/g, 'ه') // ta marbuta -> ha (tolérance orale)
      .replace(/[ؤئ]/g, 'ء') // hamza sur support -> hamza
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---- Distance de Levenshtein ---- */
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let prec = Array.from({ length: n + 1 }, (_, i) => i);
    let cour = new Array(n + 1);
    for (let i = 1; i <= m; i++) {
      cour[0] = i;
      for (let j = 1; j <= n; j++) {
        const cout = a[i - 1] === b[j - 1] ? 0 : 1;
        cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + cout);
      }
      [prec, cour] = [cour, prec];
    }
    return prec[n];
  }

  function similarite(attendu, dit) {
    const a = normaliser(attendu);
    const b = normaliser(dit);
    if (!a) return 0;
    const dist = levenshtein(a, b);
    const score = Math.max(0, 1 - dist / Math.max(a.length, b.length));
    return Math.round(score * 100);
  }

  function motsReconnus(attendu, dit) {
    // Renvoie pour chaque mot attendu s'il a été reconnu (tolérance par mot).
    const motsA = normaliser(attendu).split(' ').filter(Boolean);
    const motsD = normaliser(dit).split(' ').filter(Boolean);
    return motsA.map((mot) => {
      const reconnu = motsD.some((md) => {
        const d = levenshtein(mot, md);
        return d <= Math.max(1, Math.floor(mot.length * 0.34));
      });
      return { mot, reconnu };
    });
  }

  /* ---- Reconnaissance vocale ---- */
  function disponibleReconnaissance() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  function ecouter({ surResultat, surErreur, surFin }) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      if (surErreur) surErreur('indisponible');
      return null;
    }
    const reco = new SR();
    reco.lang = 'ar-SA';
    reco.interimResults = false;
    reco.maxAlternatives = 3;
    reco.continuous = false;

    reco.onresult = (ev) => {
      const alternatives = [];
      for (let i = 0; i < ev.results[0].length; i++) {
        alternatives.push(ev.results[0][i].transcript);
      }
      if (surResultat) surResultat(alternatives);
    };
    reco.onerror = (ev) => { if (surErreur) surErreur(ev.error); };
    reco.onend = () => { if (surFin) surFin(); };

    try { reco.start(); } catch (e) { if (surErreur) surErreur('demarrage'); }
    return reco;
  }

  /* Choisit, parmi les alternatives proposées, celle qui colle le mieux. */
  function meilleureAlternative(attendu, alternatives) {
    let meilleure = alternatives[0] || '';
    let meilleurScore = -1;
    alternatives.forEach((alt) => {
      const s = similarite(attendu, alt);
      if (s > meilleurScore) { meilleurScore = s; meilleure = alt; }
    });
    return { texte: meilleure, score: meilleurScore };
  }

  return {
    prononcer, rateSelonLecon, normaliser, levenshtein, similarite,
    motsReconnus, disponibleReconnaissance, ecouter, meilleureAlternative,
  };
})();
