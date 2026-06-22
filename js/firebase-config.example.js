/* =========================================================================
   firebase-config.example.js — MODÈLE de configuration (versionné)
   ---------------------------------------------------------------------------
   1. Copiez ce fichier en  js/firebase-config.js
   2. Renseignez vos valeurs (console Firebase → Paramètres du projet → Web).
   js/firebase-config.js est ignoré par git : vos clés ne seront pas committées.

   À savoir : cette configuration web n'est PAS un secret. Elle identifie le
   projet côté navigateur et y sera toujours visible. Protégez votre projet
   par les règles Firestore (firestore.rules) et la restriction de la clé
   d'API (domaines autorisés) dans Google Cloud Console.
   ========================================================================= */
window.FIREBASE_CONFIG = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID",
};
