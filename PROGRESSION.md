# Refonte de la progression pédagogique — proposition validée comme référence

Ce document est la **maquette de référence** de la nouvelle progression des 30 leçons.
**Statut : mise en œuvre dans `donnees/lecons.js`** (structure, renumérotation, fusions et
nouvelles leçons) — le polissage du contenu peut se poursuivre leçon par leçon.
Il fixe la structure (quelle notion, à quelle leçon, dans quel ordre, avec quel jalon) ;
le contenu détaillé de chaque leçon sera réécrit ensuite, leçon par leçon, à partir de
cette maquette et de la table de migration en fin de document.

---

## 1. Pour qui, et selon quels principes

**Le profil visé** : un musulman francophone, adulte, motivé par le Coran, qui ne
connaît **rien** de la langue arabe — ni les lettres, ni les sons, ni la grammaire.

**Les principes directeurs** de la refonte :

1. **Une seule notion nouvelle par leçon** (hors lettres). Jamais deux systèmes
   nouveaux le même jour (ex. actuel : leçon 2 = 6 lettres + 2 voyelles + sukūn + premiers mots).
2. **3 à 4 lettres nouvelles maximum par leçon**, présentées par familles de formes,
   et systématiquement réactivées les leçons suivantes.
3. **Un gain ressenti à chaque leçon** : chaque séance se termine sur quelque chose
   que l'apprenant *sait faire* et qui touche au Coran (lire « Allah », lire la basmala,
   réciter un verset qu'il connaît déjà par cœur en prière…). C'est le moteur de la motivation.
4. **Un jalon « sourate entière » par cycle** : Ikhlāṣ → Fātiḥa → Falaq + Nās →
   Kawthar + ʿAṣr → florilège de versets. On récite ces textes tous les jours en prière :
   les comprendre procure le sentiment d'efficacité le plus fort possible.
5. **Comprendre avant de produire, lire avant d'analyser** : les terminaisons de cas
   (iʿrāb) restent « à écouter seulement » ; aucune règle n'arrive avant que l'oreille
   ne l'ait déjà rencontrée plusieurs fois.
6. **Rien ne se perd** : chaque leçon s'ouvre par un rappel actif de la précédente et
   ne mobilise que du vocabulaire déjà rencontré (+ le vocabulaire du jour).

---

## 2. Diagnostic de la progression actuelle

### Ce qui fonctionne bien (à conserver tel quel)
- Les leçons 7 à 12 (article → démonstratifs → féminin → phrase nominale →
  prépositions → iḍāfa + Fātiḥa) forment un **escalier exemplaire** : chaque marche
  s'appuie sur la précédente, les dialogues réemploient l'acquis, la Fātiḥa couronne
  le tout. Cette séquence est reprise **à l'identique** (leçons 14 à 19 de la nouvelle maquette).
- La leçon 13 (racine + accompli 3ᵉ personne + ordre verbe-sujet) est également très réussie.
- Les batteries d'exercices en escalier (reconnaissance → discrimination → lecture →
  écriture → oral) et les rappels d'ouverture.

### Les problèmes identifiés

| # | Problème | Où | Nature |
|---|----------|----|--------|
| 1 | **Cycle I trop rapide** : 28 lettres en 4 leçons ; leçon 2 = 6 lettres **+** kasra **+** ḍamma **+** sukūn ; leçon 4 = **9 lettres** + voyelles longues + formes liées. Pour un vrai débutant, c'est le décrochage assuré. | L1–L4 | Rythme |
| 2 | **Épreuve de passage démesurée** : la leçon 6 se clôt sur la lecture d'al-Mulk 1–2, un texte truffé de notions jamais vues (relatif الَّذِي, pronoms suffixes بِيَدِهِ, orthographe du muṣḥaf عَلَىٰ). Placé en fin de cycle I, ce texte écrase au lieu d'encourager. | L6 | Notion trop tôt |
| 3 | **Doublon iḍāfa** : la leçon 16 ré-enseigne l'annexion comme si elle était nouvelle (« Comment dire "le livre d'Allah" ? »), alors que la leçon 12 l'a déjà enseignée, exercée et couronnée par la Fātiḥa. Son vocabulaire (rabb, yawm, dīn, rasūl, kalima) est lui aussi déjà appris. | L12 vs L16 | Doublon |
| 4 | **Doublon prépositions** : la leçon 20 ré-introduit fī, ʿalā, ilā, min, bi-, li- déjà enseignées en leçon 11 (mêmes exemples, mêmes exercices « où est le livre ? »). Seuls fawqa/taḥta/amāma/ʿinda et la phrase locative inversée sont réellement nouveaux. | L11 vs L20 | Doublon |
| 5 | **Doublon Fātiḥa** : les leçons 27–28 refont l'analyse mot à mot de la Fātiḥa… déjà faite intégralement en leçon 12 (lecture des 7 versets comprise). L'effet « déjà-vu » casse la dynamique du cycle final. | L12 vs L27–28 | Doublon |
| 6 | **Conjugaison massive** : la leçon 14 déroule les 8 personnes de l'accompli d'un coup, façon manuel de grammaire — contraire à la philosophie « petites doses » du site. | L14 | Rythme |
| 7 | **Incohérence** : la leçon 22 affirme « Vous connaissez déjà lam, qui nie au passé » — لَمْ n'a jamais été enseigné avant. Elle empile en outre 4 négations + l'exception + la conjugaison complète de لَيْسَ. | L22 | Notion trop tôt + erreur |
| 8 | **Formes liées des lettres sous-traitées** : le fait qu'une lettre change de forme selon sa place (début/milieu/fin) — LA difficulté n° 1 du débutant — n'occupe qu'un paragraphe (leçon 4) et un exercice. | Cycle I | Manque |
| 9 | Aucune leçon de **consolidation pure** dans le cycle I, alors que la discrimination des sons proches (ح/ه, ق/ك, س/ص…) conditionne toute la suite. | Cycle I | Manque |
| 10 | **L'impératif n'est jamais enseigné**, alors que les sourates du parcours en sont pleines (قُلْ, صَلِّ, اهْدِنَا, أَعُوذُ est appris comme un bloc opaque). | Cycle III–IV | Manque |

---

## 3. La nouvelle maquette : 30 leçons, 5 cycles

Le nombre total de leçons (30 + introduction) et le principe des 5 cycles sont
conservés (compatibilité avec `lecon.html?id=1…30`). Seule la **répartition** change :
8 / 5 / 6 / 6 / 5 au lieu de 6 × 5.

### Cycle I — Les lettres, une à une (leçons 1–8)
*L'alphabet étalé sur 8 leçons au lieu de 4. Une famille de lettres + un seul signe nouveau par leçon. Les formes liées (début/milieu/fin) travaillées au fil de l'eau dès la leçon 2.*

| Leçon | Titre de travail | Nouveautés | Gain ressenti en fin de leçon |
|---|---|---|---|
| **1** | Le premier son | **4 lettres** : ا ب ت ث (la famille des points) + la **fatḥa** | « Je lis mes premières syllabes : بَ تَ ثَ » |
| **2** | Les lettres se donnent la main | **3 lettres** : ج ح خ + la **kasra** + première approche des **formes liées** (بـ ـبـ ـب) | « Je reconnais une lettre même attachée » |
| **3** | Les premiers mots | **4 lettres** : د ذ ر ز + la **ḍamma** + le **sukūn** | « Je lis mes premiers vrais mots : دَار، بَاب، بَحْر » |
| **4** | Siffler et murmurer | **4 lettres** : س ش م ن + allongement par l'alif (révision étendue) | « Je lis شَمْس (soleil), نَاس (gens) » |
| **5** | La bouche s'ouvre | **4 lettres** : ف ق ك ل + la **ligature لا** | « Je lis قَلَم، كِتَاب، سَلَام، لَا — et je distingue قَلْب (cœur) de كَلْب (chien) » |
| **6** | Les lettres pleines | **4 lettres** : ص ض ط ظ (les emphatiques, avec leurs jumelles simples en face) | « J'entends la différence سَيْف / صَيْف ; je lis صِرَاط » |
| **7** | Les longues voyelles | **3 lettres** : ه و ي + les **voyelles longues ū / ī** | « Je lis نُور (lumière), دِين، يَوْم » |
| **8** | Le fond de la gorge — et le plus beau des mots | **2 lettres** : ع غ + la **shadda** + grande révision de l'alphabet complet | **Jalon** : « Je sais lire le mot اللَّه — et رَبّ، عَبْد، حُبّ » |

Répartition : 4+3+4+4+4+4+3+2 = **28 lettres**. Les leçons s'allègent à mesure que
les sons deviennent difficiles (3 puis 2 lettres pour les gutturales).

### Cycle II — Achever l'écriture : lire le Coran à voix haute (leçons 9–13)
*Les signes restants, un par leçon, puis une sourate entière. À la fin du cycle : tout mot vocalisé du Coran est déchiffrable.*

| Leçon | Titre de travail | Nouveautés | Gain ressenti |
|---|---|---|---|
| **9** | La lettre du féminin | la **tāʾ marbūṭa ة** (lecture « a » / « at » ; « souvent féminin », sans plus) | « Je lis صَلَاة، رَحْمَة، جَنَّة، سُورَة » |
| **10** | Le petit « n » de la fin | le **tanwīn** (ـً ـٍ ـٌ) — à LIRE seulement ; les cas = « on écoute, on n'analyse pas » | « Je lis سَلَامٌ et je comprends d'où vient le "-oun" que j'entends » |
| **11** | Le coup de glotte | la **hamza** et ses supports (أ إ ؤ ئ ء) + la **madda آ** + l'**alif maqṣūra ى** | « Je lis قُرْآن، إِيمَان، سَمَاء، عَلَى » |
| **12** | L'oreille juste | *aucun signe nouveau* — consolidation : paires proches (ح/ه، ق/ك، س/ص، ذ/ظ، ء/ع), lecture lente, premiers réflexes de tajwīd | « Je ne confonds plus قَلْب et كَلْب ; ma récitation devient juste » |
| **13** | Première sourate | l'**orthographe du muṣḥaf** en douceur (alif suscrit ـٰ, enchaînements) — juste ce qu'il faut pour lire | **Jalon : sourate al-Ikhlāṣ entière (4 versets), lue et comprise mot à mot** |

### Cycle III — La phrase sans verbe (leçons 14–19)
*Reprise à l'identique de l'excellente séquence actuelle 7 → 12.*

| Leçon | Contenu (= leçon actuelle) | Jalon |
|---|---|---|
| **14** | Défini / indéfini : l'article ال, lettres lunaires et solaires *(= actuelle 7)* | Lire ar-raḥmāni r-raḥīm en comprenant l'article |
| **15** | Montrer et questionner au masculin : هَٰذَا، ذَٰلِكَ، مَا، أَ، نَعَمْ، لَا *(= actuelle 8)* | Premier dialogue |
| **16** | Le miroir féminin : هَٰذِهِ، تِلْكَ, accord en genre *(= actuelle 9)* | |
| **17** | La phrase nominale : sujet défini + attribut indéfini, adjectifs, هُوَ هِيَ أَنَا *(= actuelle 10)* | « Je fais mes premières phrases complètes » |
| **18** | Les prépositions : فِي عَلَى مِنْ إِلَى لِـ بِـ + **phrase locative et prépositions de lieu (فَوْقَ، تَحْتَ، أَمَامَ، عِنْدَ)** rapatriées de l'actuelle leçon 20 | « Je comprends الْحَمْدُ لِلَّهِ » |
| **19** | L'iḍāfa *(= actuelle 12)* | **Jalon : al-Fātiḥa entière, lue et analysée** (absorbe le meilleur des actuelles 27–28 : décomposition de بِسْمِ, إِيَّاكَ en avant, اهْدِنَا) |

### Cycle IV — Le verbe et l'invocation (leçons 20–25)
*Le verbe en trois marches douces au lieu de deux massives, puis l'impératif des formules — la notion manquante — et les deux sourates de protection.*

| Leçon | Titre de travail | Nouveautés | Gain ressenti |
|---|---|---|---|
| **20** | La racine et l'accompli | racine trilitère + accompli 3ᵉ pers. (كَتَبَ، كَتَبَتْ، كَتَبُوا) + ordre verbe→sujet *(= actuelle 13)* | « Je vois la racine sous مَسْجِد ; je lis خَلَقَ اللَّهُ… » |
| **21** | « Je », « tu », « nous » | accompli des personnes du dialogue **seulement** : ـتُ، ـتَ، ـتِ، ـنَا (+ ـتُمْ en reconnaissance) — *moitié allégée de l'actuelle 14* | « Je comprends أَنْعَمْتَ (Tu as comblé) dans la Fātiḥa » |
| **22** | L'inaccompli | préfixes يَـ تَـ أَـ نَـ *(= actuelle 15)* | « Je comprends نَعْبُدُ et نَسْتَعِينُ » |
| **23** | Les pronoms suffixes | ـِي ـكَ ـهُ ـنَا ـهُمْ sur nom, verbe, préposition *(= actuelle 17)* | « رَبِّي, رَبُّنَا, عَلَيْهِمْ deviennent transparents » |
| **24** | Demander et invoquer | **NOUVELLE LEÇON** : l'impératif des formules — قُلْ (dis), صَلِّ (prie), اهْدِنَا (guide-nous), أَعُوذُ بِـ… مِنْ… (je cherche refuge) | « Les invocations que je récite se décomposent enfin » |
| **25** | Les deux protectrices | orthographe et lexique au fil du texte | **Jalon : al-Falaq et an-Nās COMPLÈTES** (l'actuelle 18 n'en montrait que 3 versets chacune) |

### Cycle V — Vers la lecture autonome (leçons 26–30)
*Les outils du texte long, sans doublon, et la synthèse.*

| Leçon | Titre de travail | Nouveautés | Gain ressenti |
|---|---|---|---|
| **26** | Relier et insister | وَ فَ ثُمَّ *(= actuelle 19)* + إِنَّ et لَـ d'insistance *(rapatriés de l'actuelle 24)* | « Je sens la différence entre "et", "donc", "puis" » |
| **27** | Nier et excepter | لَا، مَا، لَمْ + إِلَّا *(= actuelle 22 corrigée : لَمْ enfin introduit proprement ; لَيْسَ réduit à la simple reconnaissance, sa conjugaison retirée)* | **« Je comprends grammaticalement لَا إِلَـٰهَ إِلَّا اللَّهُ »** |
| **28** | Le mot se transforme | pluriels sains et brisé *(= actuelle 21)* + schèmes فَعِيل / فَعَّال et **noms divins** *(= actuelle 25, fusionnée : même logique de forme interne)* | « قُلُوب، رُسُل، الرَّزَّاق se laissent lire par la racine » |
| **29** | Ceux qui… | relatifs الَّذِي الَّتِي الَّذِينَ *(= actuelle 23)* | **Jalon : al-Kawthar et al-ʿAṣr complètes** *(= actuelle 24, textes complétés)* |
| **30** | La boucle est bouclée | synthèse « lire par reconnaissance » *(= actuelle 29)* + **lecture d'al-Mulk 1–2, déplacée de l'actuelle leçon 6** — cette fois tout y est connu — + bilan et chemins pour continuer *(= actuelle 30)* | « Le texte qui m'était illisible au premier jour, je le lis et le comprends » |

---

## 4. Notions supprimées, reportées ou ajoutées

### Supprimées ou reportées (abordées trop tôt)
- **Lecture d'al-Mulk en fin de cycle I** → déplacée en leçon 30, où elle devient la
  démonstration finale du chemin parcouru.
- **Conjugaison complète de l'accompli en une leçon** → scindée en deux (20 : il/elle/ils ;
  21 : je/tu/nous), chacune ancrée dans des versets déjà connus.
- **لَيْسَ et sa conjugaison (لَسْتُ، لَسْتَ…)** → réduit à la reconnaissance passive en
  leçon 27 ; la conjugaison part dans « pour aller plus loin » (hors parcours).
- **Leçon 16 actuelle (iḍāfa bis)** → supprimée (doublon de la 12).
- **Leçon 20 actuelle (prépositions bis)** → supprimée ; ses seuls apports réels
  (prépositions de lieu, phrase locative) sont rapatriés dans la leçon 18.
- **Leçons 27–28 actuelles (Fātiḥa bis)** → supprimées ; leurs meilleures analyses
  mot à mot enrichissent le jalon de la leçon 19.
- **Leçon 26 actuelle (vocabulaire de la prière)** → dissoute : ce lexique se
  redistribue là où il sert (hidāya/ṣirāṭ → leçon 19 ; duʿāʾ/sujūd → leçon 24 ;
  la page « Vocabulaire » du site continue de l'offrir en libre accès).

### Ajoutées (manques comblés)
- **Les formes liées des lettres** (début/milieu/fin) : introduites dès la leçon 2,
  réactivées à chaque famille de lettres, avec exercices de reconnaissance dédiés.
- **Une leçon de consolidation auditive** (leçon 12) : discrimination des paires
  proches avant d'entrer dans la grammaire — c'est le socle du tajwīd.
- **L'impératif des formules** (leçon 24) : قُلْ، صَلِّ، اهْدِنَا، أَعُوذُ ne seront
  plus des blocs opaques.
- **Un jalon « sourate entière » par cycle** (13, 19, 25, 29, 30) : al-Falaq, an-Nās,
  al-Kawthar données **complètes** (aujourd'hui tronquées à 3 versets).
- **Correction** de l'incohérence « Vous connaissez déjà lam » (actuelle leçon 22).

---

## 5. Table de migration (pour la réécriture du contenu)

| Nouvelle leçon | Source principale | Travail à faire |
|---|---|---|
| 1–8 | actuelles 1–4 (éclatées) + intro (leçon 0) | Redécouper les familles de lettres ; réécrire ; créer les sections « formes liées » |
| 9 | actuelle 5 (partie ة) | Extraire et étoffer |
| 10 | actuelle 5 (partie tanwīn) | Extraire ; garder le ton rassurant sur les cas |
| 11 | actuelle 6 (hamza/madda/maqṣūra) | Extraire ; retirer la lecture d'al-Mulk |
| 12 | actuelle 6 (paires minimales) + neuf | Étoffer en vraie leçon de discrimination |
| 13 | actuelle 6 (Ikhlāṣ v.1–2) + neuf | Donner la sourate **complète** (4 versets) |
| 14–17 | actuelles 7–10 | Quasi inchangées (renumérotation, références croisées) |
| 18 | actuelle 11 + morceaux de l'actuelle 20 | Fusionner prépositions de lieu + phrase locative |
| 19 | actuelle 12 + meilleures analyses des actuelles 27–28 | Enrichir le jalon Fātiḥa |
| 20 | actuelle 13 | Quasi inchangée |
| 21 | actuelle 14 (allégée) | Retirer la moitié du tableau ; ancrer dans أَنْعَمْتَ |
| 22 | actuelle 15 | Quasi inchangée |
| 23 | actuelle 17 | Quasi inchangée |
| 24 | **neuve** (impératif) + grammaire de l'actuelle 18 (أَعُوذُ بِـ) | Rédiger |
| 25 | actuelle 18 | Compléter les deux sourates ; alléger la grammaire (déjà vue en 24) |
| 26 | actuelle 19 + grammaire إِنَّ de l'actuelle 24 | Fusionner |
| 27 | actuelle 22 | Corriger « vous connaissez déjà lam » ; alléger لَيْسَ |
| 28 | actuelles 21 + 25 | Fusionner autour de la « forme interne » |
| 29 | actuelles 23 + 24 (sourates) | Fusionner ; compléter al-Kawthar / al-ʿAṣr |
| 30 | actuelles 29 + 30 + lecture al-Mulk (de l'actuelle 6) | Fusionner ; mettre en scène la « boucle bouclée » |
| — | actuelle 16 | **Supprimée** (doublon iḍāfa) |
| — | actuelle 20 | **Supprimée** (doublon prépositions ; restes → 18) |
| — | actuelles 26, 27, 28 | **Supprimées** (redistribuées → 19 et 24) |

## 6. Impacts techniques à prévoir (hors contenu)

1. **`progression.html`** suppose 6 leçons par cycle (`debut = c*6+1`, boucle sur 6).
   Avec la nouvelle répartition 8/5/6/6/5, il faudra grouper via `Lecons[i].cycle`
   au lieu du calcul arithmétique.
2. **`index.html`** : mettre à jour `titresCycles` →
   *Les lettres, une à une* · *Lire le Coran à voix haute* · *La phrase sans verbe* ·
   *Le verbe et l'invocation* · *Vers la lecture autonome*.
3. **`donnees/lecons.js`** : champ `cycle` de chaque leçon à réaligner ; les `cle`
   de vocabulaire sont conservées (la répétition espacée et la progression des
   utilisateurs existants survivent à la renumérotation, seuls les numéros de
   leçons acquis seront décalés — à traiter lors de la migration du contenu).
4. **`README.md`** : section « Architecture des trente leçons » à réécrire une fois
   la migration faite.
