/* =========================================================================
   auth.js — authentification Firebase (Auth + Firestore)
   Module ES, chargé via <script type="module">. Nécessite que
   window.FIREBASE_CONFIG soit défini avant (js/firebase-config.js).
   Expose des fonctions (import) ET window.Auth pour les scripts classiques.
   ========================================================================= */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut, updateProfile,
  EmailAuthProvider, linkWithCredential,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore, doc, setDoc, serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const cfg = window.FIREBASE_CONFIG;
let auth = null, db = null, google = null;
let pret = false, messageErreurConfig = null;

if (!cfg || !cfg.apiKey || /^VOTRE_/.test(cfg.apiKey)) {
  messageErreurConfig =
    'Configuration Firebase absente. Copiez js/firebase-config.example.js ' +
    'vers js/firebase-config.js et renseignez vos clés.';
  console.warn('[auth]', messageErreurConfig);
} else {
  try {
    const app = initializeApp(cfg);
    auth = getAuth(app);
    db = getFirestore(app);
    google = new GoogleAuthProvider();
    // Session conservée d'un onglet/visite à l'autre.
    setPersistence(auth, browserLocalPersistence).catch(() => {});
    pret = true;
  } catch (e) {
    messageErreurConfig = 'Initialisation Firebase impossible : ' + (e && e.message);
    console.error('[auth]', e);
  }
}

// Crée/actualise le document de profil de l'utilisateur dans Firestore.
async function assurerProfil(user) {
  if (!db || !user) return;
  try {
    await setDoc(
      doc(db, 'utilisateurs', user.uid),
      {
        email: user.email || null,
        nom: user.displayName || null,
        derniereConnexion: serverTimestamp(),
        creeLe: serverTimestamp(), // figé à la création grâce à merge
      },
      { merge: true },
    );
  } catch (e) {
    console.warn('[auth] profil Firestore non enregistré', e);
  }
}

export function estConfigure() { return pret; }
export function messageConfig() { return messageErreurConfig; }
export { auth, db };

export function surUtilisateur(cb) {
  if (!pret) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}

export async function inscrire(email, motDePasse, nom) {
  const cred = await createUserWithEmailAndPassword(auth, email, motDePasse);
  if (nom) { try { await updateProfile(cred.user, { displayName: nom }); } catch (e) {} }
  await assurerProfil(cred.user);
  return cred.user;
}

export async function connecter(email, motDePasse) {
  const cred = await signInWithEmailAndPassword(auth, email, motDePasse);
  await assurerProfil(cred.user);
  return cred.user;
}

export async function connecterGoogle() {
  const cred = await signInWithPopup(auth, google);
  await assurerProfil(cred.user);
  return cred.user;
}

export async function deconnecter() {
  if (pret) await signOut(auth);
}

// L'utilisateur courant possède-t-il déjà un mot de passe (fournisseur e-mail) ?
export function aMotDePasse() {
  return !!(auth && auth.currentUser &&
    auth.currentUser.providerData.some((p) => p.providerId === 'password'));
}

// Associe un mot de passe au compte courant (ex. après une connexion Google),
// pour permettre aussi la connexion par e-mail. Lie l'identifiant à l'utilisateur.
export async function definirMotDePasse(motDePasse) {
  if (!auth || !auth.currentUser) throw new Error('Aucun utilisateur connecté.');
  const email = auth.currentUser.email;
  if (!email) throw new Error('Ce compte n’a pas d’adresse e-mail.');
  const cred = EmailAuthProvider.credential(email, motDePasse);
  await linkWithCredential(auth.currentUser, cred);
  await assurerProfil(auth.currentUser);
  return auth.currentUser;
}

// Traduit les codes d'erreur Firebase en messages clairs en français.
export function traduireErreur(e) {
  const code = (e && e.code) || '';
  const map = {
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/missing-password': 'Veuillez saisir un mot de passe.',
    'auth/weak-password': 'Mot de passe trop faible (au moins 6 caractères).',
    'auth/email-already-in-use': 'Un compte existe déjà avec cet e-mail.',
    'auth/user-not-found': 'Aucun compte ne correspond à cet e-mail.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
    'auth/popup-closed-by-user': 'Fenêtre Google fermée avant la connexion.',
    'auth/popup-blocked': 'La fenêtre Google a été bloquée par le navigateur.',
    'auth/provider-already-linked': 'Un mot de passe est déjà défini pour ce compte.',
    'auth/credential-already-in-use': 'Ces identifiants sont déjà utilisés par un autre compte.',
    'auth/requires-recent-login': 'Reconnectez-vous pour définir un mot de passe.',
    'auth/unauthorized-domain': 'Ce domaine n’est pas autorisé dans Firebase (Authentication → Settings → Authorized domains).',
    'auth/network-request-failed': 'Problème de réseau. Vérifiez votre connexion.',
  };
  return map[code] || (e && e.message) || 'Une erreur est survenue.';
}

// Exposition pour les scripts non-module (barre de navigation, etc.).
window.Auth = {
  estConfigure, messageConfig, surUtilisateur,
  inscrire, connecter, connecterGoogle, deconnecter, traduireErreur,
  aMotDePasse, definirMotDePasse,
};
window.dispatchEvent(new Event('auth-pret'));
