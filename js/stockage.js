/* =========================================================================
   stockage.js — gestion de la persistance via localStorage
   Toutes les données utilisateur transitent par ce module unique.
   ========================================================================= */

const Stockage = (function () {
  const CLE = 'arabe-coranique-v1';

  const defaut = {
    leconCourante: 1,
    leconsTerminees: [],          // [1, 2, 3...]
    scoresLecons: {},             // { "1": { reussis: 4, total: 5, pourcentage: 80 } }
    vocabulaire: {},              // { "kitab": { vus: 3, reussis: 2, prochaineRevision: ts, intervalle: 0 } }
    revisions: {},                // mêmes clés que vocabulaire, planning SRS
    pratique: {
      dernierJour: null,          // 'AAAA-MM-JJ'
      serie: 0,                   // jours consécutifs
      joursActifs: [],            // historique des dates de pratique
    },
    preferences: { theme: 'clair', police: 'scheherazade', phonetique: 'masquee' },
    lecture: { etape: 0, derniereDate: null, faites: [] }, // programme « Lecture du jour »
    phrases: {},   // suivi de mémorisation des phrases clefs : { cle: {palier, prochaine} }
    creeLe: Date.now(),
  };

  let etat = charger();

  function charger() {
    try {
      const brut = localStorage.getItem(CLE);
      if (!brut) return structuredClone(defaut);
      const donnees = JSON.parse(brut);
      // Fusion défensive pour gérer les évolutions de schéma
      return Object.assign(structuredClone(defaut), donnees, {
        pratique: Object.assign({}, defaut.pratique, donnees.pratique || {}),
        preferences: Object.assign({}, defaut.preferences, donnees.preferences || {}),
        lecture: Object.assign({}, defaut.lecture, donnees.lecture || {}),
        phrases: donnees.phrases || {},
      });
    } catch (e) {
      console.warn('Lecture du stockage impossible, réinitialisation.', e);
      return structuredClone(defaut);
    }
  }

  function sauver() {
    try { localStorage.setItem(CLE, JSON.stringify(etat)); }
    catch (e) { console.warn('Écriture du stockage impossible.', e); }
  }

  /* ---- Progression des leçons ---- */
  function leconTerminee(id) { return etat.leconsTerminees.includes(id); }

  function leconAccessible(id) {
    // Navigation libre : toute leçon est accessible, afin que chacun aille
    // au niveau qui lui convient. La progression reste suivie séparément.
    return id >= 1 && id <= 30;
  }

  function enregistrerScoreLecon(id, reussis, total) {
    const pourcentage = total > 0 ? Math.round((reussis / total) * 100) : 0;
    etat.scoresLecons[id] = { reussis, total, pourcentage };
    if (pourcentage >= 80 && !leconTerminee(id)) {
      etat.leconsTerminees.push(id);
      etat.leconsTerminees.sort((a, b) => a - b);
    }
    if (id >= etat.leconCourante && leconAccessible(id + 1)) {
      etat.leconCourante = Math.min(id + 1, 30);
    }
    marquerPratiqueDuJour();
    sauver();
    return pourcentage;
  }

  function scoreLecon(id) { return etat.scoresLecons[id] || null; }

  /* ---- Vocabulaire et révision espacée ---- */
  function enregistrerMot(cle, reussi) {
    if (!etat.vocabulaire[cle]) etat.vocabulaire[cle] = { vus: 0, reussis: 0 };
    const v = etat.vocabulaire[cle];
    v.vus += 1;
    if (reussi) v.reussis += 1;
    Repetition.planifier(etat.revisions, cle, reussi);
    sauver();
  }

  function tauxMot(cle) {
    const v = etat.vocabulaire[cle];
    if (!v || v.vus === 0) return null;
    return Math.round((v.reussis / v.vus) * 100);
  }

  function motsMaitrises() {
    // Maîtrisé : vu au moins 2 fois avec un taux de réussite >= 75 %.
    return Object.keys(etat.vocabulaire).filter((c) => {
      const v = etat.vocabulaire[c];
      return v.vus >= 2 && v.reussis / v.vus >= 0.75;
    });
  }

  function motsADecouverts() { return Object.keys(etat.vocabulaire).length; }

  /* ---- Série de pratique (streak doux) ---- */
  function dateJour(d = new Date()) {
    return d.toISOString().slice(0, 10);
  }

  function marquerPratiqueDuJour() {
    const aujourdhui = dateJour();
    const p = etat.pratique;
    if (p.dernierJour === aujourdhui) return;
    if (!p.joursActifs.includes(aujourdhui)) p.joursActifs.push(aujourdhui);

    if (p.dernierJour) {
      const hier = dateJour(new Date(Date.now() - 86400000));
      p.serie = p.dernierJour === hier ? p.serie + 1 : 1;
    } else {
      p.serie = 1;
    }
    p.dernierJour = aujourdhui;
  }

  function serieActuelle() {
    // Si le dernier jour n'est ni aujourd'hui ni hier, la série est rompie.
    const p = etat.pratique;
    if (!p.dernierJour) return 0;
    const aujourdhui = dateJour();
    const hier = dateJour(new Date(Date.now() - 86400000));
    if (p.dernierJour === aujourdhui || p.dernierJour === hier) return p.serie;
    return 0;
  }

  /* ---- Préférences ---- */
  function theme() { return etat.preferences.theme; }
  function definirTheme(t) { etat.preferences.theme = t; sauver(); }
  function police() { return etat.preferences.police; }
  function definirPolice(p) { etat.preferences.police = p; sauver(); }
  function phonetique() { return etat.preferences.phonetique; }
  function definirPhonetique(v) { etat.preferences.phonetique = v; sauver(); }

  /* ---- Programme de lecture du jour ---- */
  function lecture() { return etat.lecture; }
  function avancerLecture(indexFait) {
    if (!etat.lecture.faites.includes(indexFait)) etat.lecture.faites.push(indexFait);
    etat.lecture.etape = Math.max(etat.lecture.etape, indexFait + 1);
    etat.lecture.derniereDate = dateJour();
    marquerPratiqueDuJour();
    sauver();
  }

  /* ---- Phrases clefs (mémorisation différée) ---- */
  function enregistrerPhrase(cle, reussi) {
    Repetition.planifier(etat.phrases, cle, reussi);
    marquerPratiqueDuJour();
    sauver();
  }
  function phrasesADue() { return Repetition.motsADue(etat.phrases); }

  /* ---- Divers ---- */
  function reinitialiser() { etat = structuredClone(defaut); sauver(); }
  function exporter() { return JSON.stringify(etat, null, 2); }

  return {
    get etat() { return etat; },
    leconTerminee, leconAccessible, enregistrerScoreLecon, scoreLecon,
    enregistrerMot, tauxMot, motsMaitrises, motsADecouverts,
    marquerPratiqueDuJour, serieActuelle,
    theme, definirTheme, police, definirPolice, phonetique, definirPhonetique,
    lecture, avancerLecture, enregistrerPhrase, phrasesADue,
    reinitialiser, exporter, sauver,
  };
})();
