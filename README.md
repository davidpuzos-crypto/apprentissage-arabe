# Arabe coranique, méthode progressive

Une application web autonome pour apprendre l'arabe coranique depuis zéro,
dans l'esprit d'un manuel élégant et exigeant. Trente leçons mènent du
déchiffrage des premières lettres à la lecture comprise de plusieurs sourates
courtes.

## Lancer l'application

Aucune installation, aucun serveur, aucune dépendance. Ouvrez simplement
`index.html` dans un navigateur récent.

```
arabe-coranique/
├── index.html          tableau de bord d'accueil
├── lecon.html          template de leçon, paramétré par ?id=1 … ?id=30
├── revision.html       salle de révision (répétition espacée)
├── progression.html    statistiques détaillées
├── css/                base, composants, thème sombre
├── js/                 moteur (stockage, répétition, exercices, voix, clavier)
└── donnees/            contenu des 30 leçons, vocabulaire, versets
```

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

## Les huit types d'exercices

1. QCM de reconnaissance (lettre, mot, sens)
2. Appariement mot arabe et traduction
3. Glisser-déposer pour reconstituer une phrase
4. Texte à trous
5. Saisie au clavier arabe virtuel intégré
6. Lecture à voix haute, notée par reconnaissance vocale
7. Identification de la racine trilitère (à partir du cycle 3)
8. Décomposition de mot, préfixe, racine, suffixe (à partir du cycle 4)

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
