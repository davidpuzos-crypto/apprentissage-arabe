# Apprendre l'arabe coranique

Une application web autonome pour apprendre l'arabe coranique depuis zéro,
dans l'esprit d'un manuel élégant et exigeant. Trente leçons mènent du
déchiffrage des premières lettres à la lecture comprise de plusieurs sourates
courtes.

Le texte des six sourates du parcours est aligné caractère par caractère sur
une référence Tanzil (quran-simple, riwāya Ḥafṣ), avec l'orthographe du muṣḥaf
(assimilations, alif suscrit), vérifié verset par verset.

## Lancer l'application

Aucune installation, aucun serveur, aucune dépendance. Ouvrez simplement
`index.html` dans un navigateur récent.

```
arabe-coranique/
├── index.html          tableau de bord d'accueil
├── lecon.html          template de leçon, paramétré par ?id=1 … ?id=30
├── lecture.html        lecture du jour (programme progressif commenté)
├── vocabulaire.html    vocabulaire coranique fréquent (dès le premier jour)
├── revision.html       hub « Réviser » : session d'exercices variés, défi, cartes
├── jeu-rapide.html     défi éclair (mot français → mot arabe, chrono et score)
├── entrainement.html   ancien entraînement libre (conservé, accessible en direct)
├── progression.html    statistiques détaillées
├── css/                base, composants, thème sombre
├── js/                 moteur (stockage, répétition, exercices, voix, clavier)
└── donnees/            leçons, vocabulaire, versets, mots fréquents, lectures
```

## Naviguer et personnaliser

- **Navigation libre** : toutes les leçons sont accessibles, pour aller directement au niveau qui vous convient. La progression reste suivie (leçon acquise quand quatre exercices sur cinq sont réussis), sans jamais vous bloquer.
- **Phonétique masquée par défaut** : on s'habitue à voir surtout l'arabe. Un bouton révèle la phonétique au besoin, et la barre du haut permet de l'afficher partout d'un seul geste.
- **Police arabe au choix** : Scheherazade New (par défaut, très lisible pour débuter), Noto Naskh, ou Amiri (plus calligraphique). Bascule dans la barre du haut.

## Vocabulaire fréquent, dès le départ

La page « Vocabulaire » réunit les mots les plus courants du Coran, classés par thème (outils grammaticaux, noms divins, création, foi, personnes, verbes), dans l'esprit du corpus « 80% des mots du Coran ». Chaque carte se retourne, se prononce, et peut être programmée dans la salle de révision. Inutile d'attendre : reconnaître ces mots éclaire aussitôt de nombreux versets.

## Finitions et progression ludique

L'interface vise un rendu soigné : boutons en léger relief, profondeur des
cartes, barres de progression en dégradé, panneau de statistiques avec
compteurs animés, marque ornée, et animations discrètes (apparition des
sections, réponses qui « pulsent » ou « tremblent », anneau qui respire sur la
leçon en cours). Les animations se désactivent si le système demande un
mouvement réduit.

L'entraînement récompense par des points, un bonus de série, des niveaux, et
un écran de fin avec étoiles selon la réussite et un total animé.

Le déroulé des exercices d'une leçon est lui aussi vivant, dans l'esprit des
applications de langue : en-tête avec points et compteur de série « ✦ », une
barre « Continuer » qui glisse depuis le bas à chaque réponse (sur fond opaque,
elle reprend la correction et l'explication pour qu'elles restent lisibles), de discrets
sons générés (bonne réponse, série, fin — sans aucun fichier audio, via la
Web Audio API), des confettis sur les séries et à la réussite de la leçon, et
un bilan animé (étoiles, points gagnés, niveau). Un bouton 🔊 coupe ou rétablit
le son ; toutes les animations se taisent si le système demande un mouvement
réduit.

## Usage mobile

L'interface est pensée pour le téléphone : la navigation se replie derrière
un bouton menu (les six rubriques et les réglages se déploient au clic), les
cibles tactiles sont agrandies, les tableaux, cartes, dialogues et le bandeau
de l'entraînement s'adaptent aux petits écrans, et le clavier arabe ramène le
champ de saisie au-dessus de lui à l'ouverture.

## Exactitude et mode sombre

Toutes les citations de versets affichées (références « sourate, numéro ») ont
été contrôlées automatiquement contre le texte de référence. Le mode sombre
déclare `color-scheme` et stylise les listes déroulantes, pour que tous les
textes et contrôles restent lisibles dans les deux thèmes.

## Dialogues, prononciation et corrections

Des dialogues guidés (leçons 8 et 11) mettent en scène des échanges simples
qui réemploient le vocabulaire déjà appris (salutations, démonstratifs,
interrogatifs, noms concrets), avec des exercices « quelle réponse convient ».

Les exercices de prononciation peuvent désormais être repris autant de fois
que nécessaire : un bouton « Réessayer » relance le micro, et la réussite
n'est comptée qu'une fois atteinte. Les corrections de tous les types
d'exercices peuvent porter une explication (sens du mot, racine, portée
spirituelle du verset), affichée après la réponse.

## Densité pédagogique

Le parcours a été densifié en s'inspirant d'un excellent module débutant
(Institut Imtiyaz, « Unité 1 : la phrase nominale ») : règles complémentaires
intégrées sans changer le déroulé (le couple mubtadaʾ/khabar et l'iʿrāb,
l'adjectif épithète, les interrogatifs hal / mā / ayna, la phrase locative et
les prépositions de lieu, la conjugaison de laysa, les ligatures lām-alif /
madda / alif maqṣūra, le schème intensif faʿʿāl des noms divins), un
vocabulaire concret du quotidien attesté dans le Coran, des salutations
usuelles, et des proverbes coraniques vérifiés mot pour mot.

## Entraînement et points

La page « Entraînement » génère des questions tirées de tout le vocabulaire
rencontré (leçons et mots fréquents) : reconnaissance du sens, choix du mot
arabe, lecture phonétique. Chaque bonne réponse rapporte des points, avec un
bonus de série, et fait progresser un niveau. C'est la révision libre et
ludique, dans l'esprit des applications de langue, mais sobre.

Par ailleurs, chaque leçon complète désormais ses exercices rédigés par des
questions générées à partir de son propre vocabulaire (appariement, sens,
lecture phonétique), pour un entraînement plus dense.

## Lecture du jour

Une fois la lecture acquise, le programme « Lecture du jour » propose chaque jour un peu plus : un mot, puis un verset court, un verset plus long, une petite sourate, une plus grande, jusqu'à al-Fātiḥa entière. Chaque étape donne l'arabe mis en avant, la phonétique révélable, la traduction, et un commentaire mêlant langue, étymologie et spiritualité.

Les phrases clefs de chaque leçon peuvent être ajoutées à vos rappels (« Je veux retenir cette phrase ») : la salle de révision vous redemandera, plus tard, si vous les connaissez encore.

Pour de meilleurs résultats, utilisez un navigateur à jour. La reconnaissance
vocale (lecture à voix haute notée) repose sur l'API Web Speech, mieux prise en
charge par Chrome ; en son absence, les exercices oraux restent praticables en
mode écoute et répétition. La synthèse vocale fonctionne sur la plupart des
navigateurs disposant d'une voix arabe installée.

## Progression et persistance

Toute la progression est enregistrée localement dans le navigateur, via
`localStorage`. Rien n'est envoyé sur Internet. Sont mémorisés :

- la leçon en cours et les leçons acquises,
- les scores par leçon,
- le vocabulaire rencontré et son taux de réussite,
- le calendrier de répétition espacée,
- la série de jours de pratique et le thème choisi.

Une leçon s'ouvre lorsque la précédente est acquise, c'est-à-dire lorsque
quatre exercices sur cinq au moins ont été réussis. Le bouton de réinitialisation,
en bas de l'accueil, efface l'ensemble des données.

## La salle de révision

Chaque mot rencontré entre dans un calendrier de répétition espacée léger.
Un mot revient à un jour, puis trois jours, puis sept jours, et ainsi de suite ;
un mot raté repart au début du calendrier. La salle de révision propose chaque
jour les mots arrivés à échéance, sous forme de cartes éclair.

Comme la répétition espacée planifie les rappels pour les jours suivants, il
peut n'y avoir aucun mot « dû » juste après une leçon. La salle de révision
propose alors toujours une **révision libre** : on peut réviser quand on veut
l'ensemble du vocabulaire rencontré (ou, pour un nouvel arrivant, le
vocabulaire fréquent), par séances courtes. Aucune base de données n'est
nécessaire : tout est conservé dans le navigateur via localStorage.

## Les huit types d'exercices

1. QCM de reconnaissance (lettre, mot, sens)
2. Appariement mot arabe et traduction
3. Glisser-déposer pour reconstituer une phrase
4. Texte à trous
5. Saisie au clavier arabe virtuel intégré
6. Lecture à voix haute, notée par reconnaissance vocale
7. Identification de la racine trilitère (à partir du cycle 3)
8. Décomposition de mot, préfixe, racine, suffixe (à partir du cycle 4)
9. Lecture phonétique : lire un mot arabe et choisir, dans une liste, sa transcription exacte

## Note sur l'exactitude et l'adab

Le texte coranique est donné en orthographe standard vocalisée et a été vérifié avec soin ; signalez-moi toute correction souhaitée. Les commentaires spirituels et étymologiques sont offerts avec humilité, comme une ouverture : ils ne remplacent ni les grands tafsīr ni l'enseignement vivant d'un maître. Vérifiez, approfondissez, et référez-vous à vos guides.

## L'architecture des trente leçons

- **Cycle I, le système d'écriture (1 à 6)** : l'alphabet, les voyelles, le tanwīn, la hamza.
- **Cycle II, premiers mots et structures (7 à 12)** : l'article, les pronoms, le genre, la phrase nominale, les démonstratifs, la sourate al-Ikhlāṣ.
- **Cycle III, le verbe et l'annexion (13 à 18)** : l'accompli, l'inaccompli, l'idāfa, les pronoms suffixes, les sourates al-Falaq et an-Nās.
- **Cycle IV, grammaire approfondie (19 à 24)** : coordination, prépositions, pluriels, négation, relatifs, les sourates al-Kawthar et al-ʿAṣr.
- **Cycle V, premières lectures coraniques (25 à 30)** : les noms d'Allah, le lexique du culte, la sourate al-Fātiḥa, la synthèse, le bilan.

## La philosophie pédagogique

L'application s'inspire des principes d'une méthode progressive douce :

- **Progressivité** : jamais trop de nouveautés à la fois, chaque leçon s'appuie sur la précédente.
- **Imprégnation** : le vocabulaire et les structures reviennent dans des contextes variés.
- **Du concret vers l'abstrait** : la grammaire émerge d'exemples, jamais de règles isolées.
- **Comprendre avant de produire** : une phase passive précède la phase active.
- **Petites doses quotidiennes** : chaque leçon tient en quinze à vingt-cinq minutes.
- **Encouragement mesuré** : des retours bienveillants, jamais punitifs, sans gamification voyante.

Le ton est celui d'un manuel sérieux, adressé à un adulte engagé dans une
démarche spirituelle et intellectuelle.

## Conventions

- Translittération selon la norme DIN 31635 simplifiée (ā ī ū, ḥ ṣ ḍ ṭ ẓ, ʿ pour le ʿayn, l'apostrophe pour la hamza).
- Texte coranique vocalisé en orthographe standard.
- Palette inspirée des manuscrits anciens, typographies Amiri, Cormorant Garamond et Inter.

## Continuer après les trente leçons

Reprenez les sourates apprises dans un Coran annoté, écoutez de bons
récitateurs, entretenez le vocabulaire par la salle de révision, et abordez
peu à peu des sourates plus longues. La méthode reste la même : douceur,
régularité, imprégnation.

## Comptes et synchronisation (Firebase)

Le projet intègre une authentification optionnelle via **Firebase** (e-mail/mot
de passe et Google) et **Firestore** (profil utilisateur).

### Mise en route

1. Copiez le modèle et renseignez vos clés (console Firebase → Paramètres du
   projet → Vos applications → Web) :

   ```
   cp js/firebase-config.example.js js/firebase-config.js
   ```

   `js/firebase-config.js` est **ignoré par git** (voir `.gitignore`) : vos
   valeurs ne sont pas committées.
2. Dans la console Firebase, activez **Authentication** → méthodes
   « E-mail/mot de passe » et « Google », et ajoutez votre domaine dans
   **Authorized domains**.
3. Publiez les règles de sécurité **`firestore.rules`** (Firestore → Règles).
4. Servez le site en **http(s)** (Firebase Hosting, GitHub Pages, ou un serveur
   local) : l'authentification Google et les modules Firebase ne fonctionnent
   pas en ouvrant le fichier en `file://`.

### À propos des clés

La configuration **web** de Firebase n'est **pas un secret** : elle identifie
le projet côté navigateur et y est forcément visible. La sécurité réelle repose
sur les **règles Firestore** (`firestore.rules`), les **domaines autorisés** et
la **restriction de la clé d'API** (Google Cloud Console → Identifiants →
restrictions par référent HTTP). Le `.env`/`.gitignore` évite seulement de
publier les clés dans le dépôt ; il ne les rend pas privées une fois le site en
ligne.

> Déploiement depuis le dépôt : comme `js/firebase-config.js` n'est pas
> versionné, pensez à le déposer sur l'hébergeur (ou à l'injecter au déploiement).
> Si vous acceptez que cette config publique soit dans le dépôt, vous pouvez
> aussi committer le fichier — c'est une pratique courante et sûre dès lors que
> les règles et les restrictions de clé sont en place.

La page **Compte** (`connexion.html`) gère la connexion/inscription ; une fois
connecté, l'utilisateur est redirigé vers son espace (l'accueil), qui affiche
son profil et un bouton de déconnexion. La progression reste pour l'instant
stockée localement (localStorage) ; la synchronisation vers Firestore pourra
être ajoutée ensuite.
