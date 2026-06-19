/* =========================================================================
   app.js — initialisation commune, thème, barre de navigation
   Chaque page appelle App.init() puis sa logique propre.
   ========================================================================= */

const App = (function () {

  function appliquerTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'sombre' ? 'sombre' : 'clair');
  }

  function basculerTheme() {
    const actuel = Stockage.theme();
    const nouveau = actuel === 'sombre' ? 'clair' : 'sombre';
    Stockage.definirTheme(nouveau);
    appliquerTheme(nouveau);
    const b = document.querySelector('.bascule-theme');
    if (b) b.innerHTML = nouveau === 'sombre' ? '☀' : '☾';
  }

  function barre(pageActive) {
    const liens = [
      { href: 'index.html', txt: 'Accueil', cle: 'accueil' },
      { href: 'revision.html', txt: 'Révision', cle: 'revision' },
      { href: 'progression.html', txt: 'Progression', cle: 'progression' },
    ];
    const nav = liens.map((l) =>
      `<a href="${l.href}" class="${l.cle === pageActive ? 'actif' : ''}">${l.txt}</a>`
    ).join('');
    const sombre = Stockage.theme() === 'sombre';
    return `
      <div class="barre">
        <a href="index.html" class="marque">Arabe coranique</a>
        <nav>
          ${nav}
          <button class="bascule-theme" aria-label="Basculer le thème" onclick="App.basculerTheme()">${sombre ? '☀' : '☾'}</button>
        </nav>
      </div>`;
  }

  function init(pageActive) {
    appliquerTheme(Stockage.theme());
    const cible = document.getElementById('barre');
    if (cible) cible.innerHTML = barre(pageActive);
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

  return { init, basculerTheme, appliquerTheme, param, romain };
})();
