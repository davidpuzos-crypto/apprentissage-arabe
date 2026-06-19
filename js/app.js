/* =========================================================================
   app.js — initialisation commune, thème, barre de navigation
   Chaque page appelle App.init() puis sa logique propre.
   ========================================================================= */

const App = (function () {

  function appliquerTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'sombre' ? 'sombre' : 'clair');
  }
  function appliquerPolice(police) {
    // 'scheherazade' (défaut), 'naskh', ou 'amiri'
    const map = { scheherazade: 'scheherazade', naskh: 'naskh', amiri: 'amiri' };
    document.documentElement.setAttribute('data-police', map[police] || 'scheherazade');
  }
  function appliquerPhonetique(v) {
    document.documentElement.setAttribute('data-phonetique', v === 'visible' ? 'visible' : 'masquee');
  }

  function basculerTheme() {
    const nouveau = Stockage.theme() === 'sombre' ? 'clair' : 'sombre';
    Stockage.definirTheme(nouveau); appliquerTheme(nouveau);
    rafraichirBoutons();
  }
  function basculerPolice() {
    // cycle : scheherazade -> naskh -> amiri -> scheherazade
    const ordre = ['scheherazade', 'naskh', 'amiri'];
    const i = ordre.indexOf(Stockage.police());
    const nouveau = ordre[(i + 1) % ordre.length];
    Stockage.definirPolice(nouveau); appliquerPolice(nouveau);
    rafraichirBoutons();
  }
  function basculerPhonetique() {
    const nouveau = Stockage.phonetique() === 'visible' ? 'masquee' : 'visible';
    Stockage.definirPhonetique(nouveau); appliquerPhonetique(nouveau);
    rafraichirBoutons();
  }

  function nomPolice(p) { return p === 'amiri' ? 'Amiri' : (p === 'naskh' ? 'Naskh' : 'Scheherazade'); }

  function rafraichirBoutons() {
    const bt = document.querySelector('.bascule-theme');
    if (bt) bt.innerHTML = Stockage.theme() === 'sombre' ? '☀' : '☾';
    const bp = document.querySelector('.bascule-police');
    if (bp) bp.textContent = 'ا ' + nomPolice(Stockage.police());
    const bph = document.querySelector('.bascule-phonetique');
    if (bph) {
      const vis = Stockage.phonetique() === 'visible';
      bph.textContent = vis ? 'phonétique visible' : 'phonétique masquée';
      bph.classList.toggle('actif', vis);
    }
  }

  function barre(pageActive) {
    const liens = [
      { href: 'index.html', txt: 'Accueil', cle: 'accueil' },
      { href: 'lecture.html', txt: 'Lecture du jour', cle: 'lecture' },
      { href: 'vocabulaire.html', txt: 'Vocabulaire', cle: 'vocabulaire' },
      { href: 'revision.html', txt: 'Révision', cle: 'revision' },
      { href: 'progression.html', txt: 'Progression', cle: 'progression' },
    ];
    const nav = liens.map((l) =>
      `<a href="${l.href}" class="${l.cle === pageActive ? 'actif' : ''}">${l.txt}</a>`
    ).join('');
    const sombre = Stockage.theme() === 'sombre';
    const vis = Stockage.phonetique() === 'visible';
    return `
      <div class="barre">
        <a href="index.html" class="marque">Arabe coranique</a>
        <nav>
          ${nav}
          <button class="bascule-mini bascule-phonetique ${vis ? 'actif' : ''}" title="Afficher ou masquer la phonétique" onclick="App.basculerPhonetique()">${vis ? 'phonétique visible' : 'phonétique masquée'}</button>
          <button class="bascule-mini bascule-police" title="Changer la police arabe" onclick="App.basculerPolice()">ا ${nomPolice(Stockage.police())}</button>
          <button class="bascule-theme" aria-label="Basculer le thème" onclick="App.basculerTheme()">${sombre ? '☀' : '☾'}</button>
        </nav>
      </div>`;
  }

  function init(pageActive) {
    appliquerTheme(Stockage.theme());
    appliquerPolice(Stockage.police());
    appliquerPhonetique(Stockage.phonetique());
    const cible = document.getElementById('barre');
    if (cible) cible.innerHTML = barre(pageActive);
  }

  // Avis audio : prévient si aucune voix arabe n'est disponible.
  function afficherAvis(message) {
    if (localStorage.getItem('avis-audio-vu') === '1') return;
    const barre = document.getElementById('barre');
    if (!barre) return;
    const avis = document.createElement('div');
    avis.className = 'avis-audio';
    avis.innerHTML = `<span>${message}</span>
      <button class="avis-fermer" aria-label="Fermer" title="Ne plus afficher">×</button>`;
    avis.querySelector('.avis-fermer').onclick = () => {
      localStorage.setItem('avis-audio-vu', '1');
      avis.remove();
    };
    barre.insertAdjacentElement('afterend', avis);
  }

  function verifierAudio() {
    if (!('speechSynthesis' in window)) {
      afficherAvis('La synthèse vocale n\'est pas disponible sur ce navigateur. Les boutons d\'écoute resteront silencieux ; essayez un autre navigateur, comme Chrome.');
      return;
    }
    let essais = 0;
    const check = () => {
      const voix = window.speechSynthesis.getVoices();
      if (voix.length === 0 && essais < 6) { essais++; setTimeout(check, 400); return; }
      const ar = voix.some((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));
      if (!ar && voix.length > 0) {
        afficherAvis('Aucune voix arabe ne semble installée sur votre appareil : l\'écoute emploiera une voix par défaut, à la prononciation approximative. Pour un meilleur son, ajoutez une voix arabe dans les réglages de synthèse vocale de votre système.');
      }
    };
    check();
  }

  // Rend un fragment phonétique masquable. Retourne une chaîne HTML.
  // Usage : App.phon('al-ḥamdu li-llāh')
  function phon(tr) {
    if (!tr) return '';
    return `<span class="phonetique"><button class="ph-bouton" type="button" onclick="this.parentNode.classList.add('devoilee')">phonétique</button><span class="ph-contenu translit">${tr}</span></span>`;
  }

  function param(nom) {
    return new URLSearchParams(window.location.search).get(nom);
  }

  function romain(n) {
    const map = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
      [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    let r = '';
    for (const [v, s] of map) { while (n >= v) { r += s; n -= v; } }
    return r;
  }

  return {
    init, param, romain, phon, verifierAudio,
    basculerTheme, basculerPolice, basculerPhonetique,
    appliquerTheme, appliquerPolice, appliquerPhonetique,
  };
})();
