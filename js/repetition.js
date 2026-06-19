/* =========================================================================
   repetition.js — répétition espacée légère
   Calendrier : un mot raté revient à 1 jour, puis 3 jours, puis 7 jours.
   Un mot réussi avance d'un palier ; un mot raté recule d'un palier.
   ========================================================================= */

const Repetition = (function () {
  const JOUR = 86400000;
  // Paliers en jours. Index 0 = à revoir vite, dernier = bien ancré.
  const PALIERS = [1, 3, 7, 16, 35];

  function planifier(revisions, cle, reussi) {
    const maintenant = Date.now();
    let entree = revisions[cle];
    if (!entree) {
      entree = { palier: 0, prochaine: maintenant + PALIERS[0] * JOUR, derniere: maintenant };
    }
    if (reussi) {
      entree.palier = Math.min(entree.palier + 1, PALIERS.length - 1);
    } else {
      // Un échec ramène le mot tout au début du calendrier.
      entree.palier = 0;
    }
    entree.derniere = maintenant;
    entree.prochaine = maintenant + PALIERS[entree.palier] * JOUR;
    revisions[cle] = entree;
    return entree;
  }

  function motsADue(revisions, maintenant = Date.now()) {
    // Renvoie les clés des mots dont la date de révision est atteinte.
    return Object.keys(revisions)
      .filter((cle) => revisions[cle].prochaine <= maintenant)
      .sort((a, b) => revisions[a].prochaine - revisions[b].prochaine);
  }

  function nbADue(revisions) { return motsADue(revisions).length; }

  function descriptionPalier(palier) {
    const noms = ['à consolider', 'en cours', 'familier', 'solide', 'ancré'];
    return noms[Math.min(palier, noms.length - 1)];
  }

  function joursAvant(revisions, cle) {
    const e = revisions[cle];
    if (!e) return null;
    return Math.max(0, Math.ceil((e.prochaine - Date.now()) / JOUR));
  }

  return { PALIERS, planifier, motsADue, nbADue, descriptionPalier, joursAvant };
})();
