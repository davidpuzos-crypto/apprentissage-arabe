/* =========================================================================
   sync.js — synchronisation de la progression avec Firestore
   Module ES. Au login : récupère l'état cloud, le fusionne avec le local
   (union, sans perte), réapplique localement et renvoie l'état fusionné.
   Ensuite : pousse l'état vers le cloud après chaque sauvegarde (anti-rebond).
   La progression continue de fonctionner hors-ligne via localStorage ; le
   cloud n'est qu'un miroir partagé entre appareils.
   ========================================================================= */
import { db, surUtilisateur } from './auth.js';
import { fusionner } from './fusion-progression.js';
import {
  doc, getDoc, setDoc, serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const S = window.Stockage;
let uid = null;
let minuterie = null;

if (S && typeof surUtilisateur === 'function') {
  // Pousser vers le cloud après chaque sauvegarde (regroupé).
  S.surSauvegarde(() => { if (uid && db) planifierPush(); });

  surUtilisateur(async (user) => {
    uid = user ? user.uid : null;
    if (uid && db) {
      try { await synchroniserInitial(); } catch (e) { console.warn('[sync] init', e); }
    }
  });
}

function planifierPush() {
  clearTimeout(minuterie);
  minuterie = setTimeout(pousser, 1500);
}

async function pousser() {
  if (!uid || !db) return;
  try {
    await setDoc(
      doc(db, 'utilisateurs', uid),
      { progression: S.etat, progressionMajLe: serverTimestamp() },
      { merge: true },
    );
  } catch (e) {
    console.warn('[sync] envoi cloud impossible', e);
  }
}

// Signature légère pour détecter un changement notable après fusion.
function signature(e) {
  return [
    (e.leconsTerminees || []).length,
    (e.jeu && e.jeu.xp) || 0,
    Object.keys(e.vocabulaire || {}).length,
    e.leconCourante || 1,
    (e.lecture && e.lecture.etape) || 0,
  ].join('|');
}

async function synchroniserInitial() {
  const ref = doc(db, 'utilisateurs', uid);
  const snap = await getDoc(ref);
  const cloud = snap.exists() ? snap.data().progression : null;

  const avant = signature(S.etat);
  if (cloud) {
    const fusionne = fusionner(S.etat, cloud);
    S.appliquerEtat(fusionne);
  }
  const apres = signature(S.etat);

  // Remonter l'état (fusionné si cloud, sinon le local initial) vers le cloud.
  await pousser();

  // Si le cloud a apporté des changements, rafraîchir l'affichage une fois.
  if (cloud && avant !== apres && !sessionStorage.getItem('sync-rafraichi')) {
    sessionStorage.setItem('sync-rafraichi', '1');
    location.reload();
  }
}
