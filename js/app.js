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
    init, param, romain, phon,
    basculerTheme, basculerPolice, basculerPhonetique,
    appliquerTheme, appliquerPolice, appliquerPhonetique,
  };
})();
