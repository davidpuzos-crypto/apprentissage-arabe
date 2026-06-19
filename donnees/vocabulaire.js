/* =========================================================================
   vocabulaire.js — lexique agrégé du parcours
   La source de vérité du vocabulaire est répartie dans lecons.js (chaque
   leçon porte sa liste). Ce module aplatit l'ensemble pour la salle de
   révision et les statistiques, et garantit l'unicité par clé.
   ========================================================================= */

const Vocabulaire = (function () {
  let cacheIndex = null;
  let cacheListe = null;

  function construire() {
    if (cacheIndex) return;
    cacheIndex = {};
    cacheListe = [];
    if (typeof Lecons === 'undefined') return;
    Object.keys(Lecons).forEach((id) => {
      const lecon = Lecons[id];
      (lecon.vocabulaire || []).forEach((mot) => {
        if (!mot.cle) return;
        if (!cacheIndex[mot.cle]) {
          const entree = { ...mot, lecon: parseInt(id, 10) };
          cacheIndex[mot.cle] = entree;
          cacheListe.push(entree);
        }
      });
    });
  }

  function indexParCle() { construire(); return cacheIndex; }
  function tous() { construire(); return cacheListe; }
  function parCle(cle) { construire(); return cacheIndex[cle] || null; }
  function nombre() { construire(); return cacheListe.length; }

  return { indexParCle, tous, parCle, nombre };
})();
