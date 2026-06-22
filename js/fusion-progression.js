/* =========================================================================
   fusion-progression.js — fusion « union » de deux états de progression
   Module pur (sans dépendance) : on garde toujours la progression la plus
   avancée des deux côtés (local et cloud), pour ne jamais rien perdre en
   passant d'un appareil à l'autre. Testable hors navigateur.
   ========================================================================= */
function maxNombre(a, b) { return Math.max(a || 0, b || 0); }
function unionTableau(a, b) { return Array.from(new Set([...(a || []), ...(b || [])])); }

function fusionnerPlanning(local, cloud, champCle) {
  local = local || {}; cloud = cloud || {};
  const out = {};
  Array.from(new Set([...Object.keys(local), ...Object.keys(cloud)])).forEach((cle) => {
    const l = local[cle], c = cloud[cle];
    if (l && c) out[cle] = ((l[champCle] || 0) >= (c[champCle] || 0)) ? l : c;
    else out[cle] = l || c;
  });
  return out;
}

export function fusionner(local, cloud) {
  local = local || {}; cloud = cloud || {};
  const r = JSON.parse(JSON.stringify(local)); // copie de travail

  r.leconCourante = maxNombre(local.leconCourante, cloud.leconCourante) || 1;
  r.leconsTerminees = unionTableau(local.leconsTerminees, cloud.leconsTerminees).sort((x, y) => x - y);

  // Scores par leçon : on garde le meilleur pourcentage.
  r.scoresLecons = Object.assign({}, cloud.scoresLecons, local.scoresLecons);
  Object.keys(cloud.scoresLecons || {}).forEach((id) => {
    const l = (local.scoresLecons || {})[id], c = cloud.scoresLecons[id];
    if (l && c) r.scoresLecons[id] = (c.pourcentage > l.pourcentage) ? c : l;
  });

  // Vocabulaire : par clé, max des vus et des réussis.
  r.vocabulaire = {};
  unionTableau(Object.keys(local.vocabulaire || {}), Object.keys(cloud.vocabulaire || {})).forEach((cle) => {
    const l = (local.vocabulaire || {})[cle] || {}, c = (cloud.vocabulaire || {})[cle] || {};
    r.vocabulaire[cle] = { vus: maxNombre(l.vus, c.vus), reussis: maxNombre(l.reussis, c.reussis) };
  });

  // Plannings de répétition espacée : on garde l'entrée la plus avancée.
  r.revisions = fusionnerPlanning(local.revisions, cloud.revisions, 'intervalle');
  r.phrases = fusionnerPlanning(local.phrases, cloud.phrases, 'palier');

  // Pratique : série max, jours actifs en union, dernier jour le plus récent.
  r.pratique = Object.assign({}, cloud.pratique, local.pratique);
  r.pratique.serie = maxNombre(local.pratique && local.pratique.serie, cloud.pratique && cloud.pratique.serie);
  r.pratique.joursActifs = unionTableau(local.pratique && local.pratique.joursActifs, cloud.pratique && cloud.pratique.joursActifs).sort();
  r.pratique.dernierJour = [r.pratique.joursActifs[r.pratique.joursActifs.length - 1] || null,
    (local.pratique || {}).dernierJour, (cloud.pratique || {}).dernierJour].filter(Boolean).sort().pop() || null;

  // Jeu (points / niveau) : max de chaque compteur.
  r.jeu = {
    xp: maxNombre(local.jeu && local.jeu.xp, cloud.jeu && cloud.jeu.xp),
    parties: maxNombre(local.jeu && local.jeu.parties, cloud.jeu && cloud.jeu.parties),
    meilleureSerie: maxNombre(local.jeu && local.jeu.meilleureSerie, cloud.jeu && cloud.jeu.meilleureSerie),
  };

  // Lecture du jour : étape la plus avancée, étapes faites en union.
  r.lecture = {
    etape: maxNombre(local.lecture && local.lecture.etape, cloud.lecture && cloud.lecture.etape),
    faites: unionTableau(local.lecture && local.lecture.faites, cloud.lecture && cloud.lecture.faites),
    derniereDate: [(local.lecture || {}).derniereDate, (cloud.lecture || {}).derniereDate].filter(Boolean).sort().pop() || null,
  };

  // Préférences d'affichage : on conserve celles de l'appareil courant.
  r.preferences = Object.assign({}, cloud.preferences, local.preferences);

  return r;
}
