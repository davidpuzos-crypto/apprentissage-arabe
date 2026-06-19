/* =========================================================================
   lecons.js — contenu intégral des 30 leçons
   ---------------------------------------------------------------------------
   SCHÉMA D'UNE LEÇON
   {
     cycle: 1..5,
     titre: 'Texte',
     intro: 'paragraphe(s) séparés par \n',
     decouverte: [
       { texte: '…' }                                   // prose
       { lettres: [{ ar, nom, son }] }                  // vitrine de lettres
       { lignes:  [{ ar, tr, fr, note? }] }             // tableau arabe/translit/fr
     ],
     grammaire: { titre, corps } | absent avant la leçon 7,
     vocabulaire: [{ ar, tr, fr, cle }],                // cle = identifiant SRS
     exercices: [ … objets typés, voir exercices.js ],  // >= 5
     memoriser: { ar, tr, fr },
     recap: ['point 1', …],
   }
   Translittération : DIN 31635 simplifiée (ā ī ū, ḥ ṣ ḍ ṭ ẓ, ʿ ayn, ' hamza,
   th dh sh kh gh). Les exercices déclarent leurs `cles` de vocabulaire pour
   alimenter la répétition espacée.
   ========================================================================= */

const Lecons = {

  /* ===================== CYCLE I — LE SYSTÈME D'ÉCRITURE ===================== */

  1: {
    cycle: 1,
    titre: 'Les sept premières lettres',
    intro: 'Bienvenue. Vous tenez là le tout premier pas vers la lecture du Coran dans sa langue.\n' +
      'L\'arabe s\'écrit et se lit de droite à gauche. Nous allons aujourd\'hui faire connaissance avec sept lettres, sans nous presser.\n' +
      'Écoutez chaque son, répétez à voix haute, observez la forme. Rien d\'autre n\'est demandé pour l\'instant.',
    decouverte: [
      { texte: 'Voici les sept premières lettres de l\'alphabet arabe. Cliquez sur chacune pour l\'entendre.' },
      { lettres: [
        { ar: 'ا', nom: 'alif', son: 'a long' },
        { ar: 'ب', nom: 'bāʾ', son: 'b' },
        { ar: 'ت', nom: 'tāʾ', son: 't' },
        { ar: 'ث', nom: 'thāʾ', son: 'th anglais (think)' },
        { ar: 'ج', nom: 'jīm', son: 'dj' },
        { ar: 'ح', nom: 'ḥāʾ', son: 'h très expiré' },
        { ar: 'خ', nom: 'khāʾ', son: 'kh (jota espagnole)' },
      ]},
      { texte: 'Trois de ces lettres ne se distinguent que par les points : ب porte un point dessous, ت deux points dessus, ث trois points dessus. La vigilance sur les points est essentielle.' },
      { texte: 'De même, ح et خ ont la même forme : seul le point au-dessus du خ les sépare. Le ح est un souffle de gorge, le خ un raclement plus rugueux.' },
    ],
    vocabulaire: [
      { ar: 'بَاب', tr: 'bāb', fr: 'porte', cle: 'bab' },
      { ar: 'تَاج', tr: 'tāj', fr: 'couronne', cle: 'taj' },
      { ar: 'حَجّ', tr: 'ḥajj', fr: 'pèlerinage', cle: 'hajj' },
      { ar: 'أَخ', tr: 'akh', fr: 'frère', cle: 'akh' },
      { ar: 'حُبّ', tr: 'ḥubb', fr: 'amour', cle: 'hubb' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle lettre produit le son « th » anglais, comme dans think ?',
        options: [{ ar: 'ت' }, { ar: 'ث' }, { ar: 'ج' }], bonne: 1,
        explication: 'Le ث (thāʾ) porte trois points et se prononce comme le th de think.' },
      { type: 'qcm', consigne: 'Laquelle de ces lettres est le khāʾ, ce son rugueux de gorge ?',
        options: [{ ar: 'ح' }, { ar: 'خ' }, { ar: 'ب' }], bonne: 1,
        explication: 'Le خ porte un point au-dessus ; le ح, sans point, est un simple souffle.' },
      { type: 'appariement', consigne: 'Reliez chaque lettre à son nom.',
        paires: [ { ar: 'ا', fr: 'alif' }, { ar: 'ب', fr: 'bāʾ' }, { ar: 'ت', fr: 'tāʾ' }, { ar: 'ج', fr: 'jīm' } ] },
      { type: 'qcm', consigne: 'Combien de points porte la lettre ت ?',
        options: [{ texte: 'Un point dessous' }, { texte: 'Deux points dessus' }, { texte: 'Trois points dessus' }], bonne: 1,
        explication: 'ت porte deux points au-dessus. Un point dessous donnerait ب, trois points dessus ث.' },
      { type: 'saisie', consigne: 'À l\'aide du clavier, écrivez la lettre bāʾ.',
        indice: 'C\'est la lettre du son « b », avec un point dessous.', reponse: 'ب' },
      { type: 'oral', consigne: 'Prononcez à voix haute le nom de ces trois lettres.',
        phraseAr: 'بَا تَا ثَا', translit: 'bā, tā, thā' },
    ],
    memoriser: { ar: 'ا ب ت ث ج ح خ', tr: 'alif, bāʾ, tāʾ, thāʾ, jīm, ḥāʾ, khāʾ', fr: 'Les sept premières lettres de l\'alphabet.' },
    recap: [
      'L\'arabe se lit de droite à gauche.',
      'ب ت ث partagent la même forme et ne diffèrent que par les points.',
      'ح est un souffle de gorge, خ un raclement plus rugueux marqué d\'un point.',
      'Les points changent entièrement la lettre : il faut les regarder de près.',
    ],
  },

  2: {
    cycle: 1,
    titre: 'Sifflantes et chuintantes',
    intro: 'Vous connaissez déjà sept lettres. En voici six nouvelles, sans rien oublier des précédentes.\n' +
      'Ce groupe contient des sons familiers pour une oreille française, ce qui rend l\'étape plus douce.\n' +
      'Comme hier, écoutez, répétez, observez les points.',
    decouverte: [
      { lettres: [
        { ar: 'د', nom: 'dāl', son: 'd' },
        { ar: 'ذ', nom: 'dhāl', son: 'th anglais (this)' },
        { ar: 'ر', nom: 'rāʾ', son: 'r roulé' },
        { ar: 'ز', nom: 'zāy', son: 'z' },
        { ar: 'س', nom: 'sīn', son: 's' },
        { ar: 'ش', nom: 'shīn', son: 'ch' },
      ]},
      { texte: 'د et ذ ont la même forme : le point au-dessus du ذ le transforme en « th » sonore, comme dans l\'anglais this.' },
      { texte: 'ر et ز se ressemblent aussi : le ز porte un point. Le ر est un r roulé, proche du r espagnol ou italien.' },
      { texte: 'س et ش partagent les mêmes trois dents ; les trois points au-dessus donnent le « ch » du ش.' },
    ],
    vocabulaire: [
      { ar: 'دَار', tr: 'dār', fr: 'demeure', cle: 'dar' },
      { ar: 'رَبّ', tr: 'rabb', fr: 'seigneur', cle: 'rabb' },
      { ar: 'سَلَام', tr: 'salām', fr: 'paix', cle: 'salam' },
      { ar: 'شَمْس', tr: 'shams', fr: 'soleil', cle: 'shams' },
      { ar: 'ذِكْر', tr: 'dhikr', fr: 'rappel, évocation', cle: 'dhikr' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle lettre se prononce « ch », comme dans chat ?',
        options: [{ ar: 'س' }, { ar: 'ش' }, { ar: 'ز' }], bonne: 1,
        explication: 'ش (shīn) porte trois points et donne le son « ch ».' },
      { type: 'qcm', consigne: 'Le mot رَبّ signifie :',
        options: [{ texte: 'demeure' }, { texte: 'seigneur' }, { texte: 'paix' }], bonne: 1, cles: ['rabb'],
        explication: 'رَبّ, « seigneur », est l\'un des mots les plus fréquents du Coran.' },
      { type: 'appariement', consigne: 'Reliez chaque mot à sa traduction.',
        paires: [ { ar: 'دَار', fr: 'demeure', cle: 'dar' }, { ar: 'شَمْس', fr: 'soleil', cle: 'shams' }, { ar: 'سَلَام', fr: 'paix', cle: 'salam' }, { ar: 'ذِكْر', fr: 'rappel', cle: 'dhikr' } ] },
      { type: 'qcm', consigne: 'Qu\'est-ce qui distingue ز de ر ?',
        options: [{ texte: 'Le ز a un point au-dessus' }, { texte: 'Le ز est plus grand' }, { texte: 'Rien, ce sont les mêmes' }], bonne: 0,
        explication: 'Le point au-dessus transforme le r roulé ر en z (ز).' },
      { type: 'saisie', consigne: 'Écrivez le mot signifiant « paix ».',
        indice: 'salām, un mot que vous entendrez souvent.', reponse: 'سلام', cles: ['salam'] },
      { type: 'oral', consigne: 'Prononcez ce mot très fréquent dans le Coran.',
        phraseAr: 'سَلَام', translit: 'salām', cles: ['salam'] },
    ],
    memoriser: { ar: 'سَلَام', tr: 'salām', fr: 'La paix.' },
    recap: [
      'Six nouvelles lettres : د ذ ر ز س ش.',
      'د/ذ et ر/ز se distinguent par un seul point.',
      'س a trois dents sans points, ش les mêmes dents avec trois points.',
      'Premiers mots coraniques : رَبّ (seigneur), سَلَام (paix), ذِكْر (rappel).',
    ],
  },

  3: {
    cycle: 1,
    titre: 'Les emphatiques et les gutturales',
    intro: 'Voici le cœur de la difficulté pour une oreille française, mais aussi ce qui donne à l\'arabe sa saveur.\n' +
      'Les emphatiques sont des consonnes prononcées avec le fond de la bouche, plus graves et plus pleines.\n' +
      'Les gutturales viennent du fond de la gorge. Prenez votre temps, écoutez beaucoup.',
    decouverte: [
      { texte: 'Les quatre emphatiques. Comparez chacune à sa version simple déjà connue.' },
      { lettres: [
        { ar: 'ص', nom: 'ṣād', son: 's emphatique' },
        { ar: 'ض', nom: 'ḍād', son: 'd emphatique' },
        { ar: 'ط', nom: 'ṭāʾ', son: 't emphatique' },
        { ar: 'ظ', nom: 'ẓāʾ', son: 'dh emphatique' },
      ]},
      { texte: 'Une emphatique « assombrit » la voyelle qui la suit. Le ص est un س prononcé avec la langue plate et la bouche pleine.' },
      { texte: 'Les deux gutturales. Le ع n\'a pas d\'équivalent français : c\'est un son produit en serrant le fond de la gorge. Le غ ressemble à un r grasseyé parisien.' },
      { lettres: [
        { ar: 'ع', nom: 'ʿayn', son: 'son de gorge serrée' },
        { ar: 'غ', nom: 'ghayn', son: 'r grasseyé' },
      ]},
    ],
    vocabulaire: [
      { ar: 'صَلَاة', tr: 'ṣalāt', fr: 'prière', cle: 'salat' },
      { ar: 'عِلْم', tr: 'ʿilm', fr: 'savoir', cle: 'ilm' },
      { ar: 'عَبْد', tr: 'ʿabd', fr: 'serviteur', cle: 'abd' },
      { ar: 'غَفُور', tr: 'ghafūr', fr: 'pardonneur', cle: 'ghafur' },
      { ar: 'طَيِّب', tr: 'ṭayyib', fr: 'bon, pur', cle: 'tayyib' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Laquelle est une lettre emphatique ?',
        options: [{ ar: 'س' }, { ar: 'ص' }, { ar: 'ر' }], bonne: 1,
        explication: 'ص (ṣād) est le s emphatique, prononcé bouche pleine.' },
      { type: 'qcm', consigne: 'Le son du ع se produit :',
        options: [{ texte: 'avec les lèvres' }, { texte: 'au fond de la gorge' }, { texte: 'avec la langue contre les dents' }], bonne: 1,
        explication: 'Le ʿayn est une constriction du fond de la gorge, propre à l\'arabe.' },
      { type: 'appariement', consigne: 'Reliez la lettre emphatique à sa version simple correspondante.',
        paires: [ { ar: 'ص', fr: 's de سَلَام' }, { ar: 'ط', fr: 't de تَاج' }, { ar: 'ض', fr: 'd de دَار' }, { ar: 'ظ', fr: 'dh de ذِكْر' } ] },
      { type: 'qcm', consigne: 'Le mot صَلَاة signifie :',
        options: [{ texte: 'savoir' }, { texte: 'prière' }, { texte: 'serviteur' }], bonne: 1, cles: ['salat'],
        explication: 'صَلَاة, la prière, est un pilier du vocabulaire coranique.' },
      { type: 'saisie', consigne: 'Écrivez la lettre ʿayn.',
        indice: 'Le son de gorge serrée, sans équivalent en français.', reponse: 'ع' },
      { type: 'oral', consigne: 'Prononcez ce mot en soignant le ع de gorge.',
        phraseAr: 'عِلْم', translit: 'ʿilm', cles: ['ilm'] },
    ],
    memoriser: { ar: 'عَبْد', tr: 'ʿabd', fr: 'Un serviteur (d\'Allah).' },
    recap: [
      'Quatre emphatiques : ص ض ط ظ, graves et bouche pleine.',
      'Deux gutturales : ع (gorge serrée) et غ (r grasseyé).',
      'L\'emphase assombrit la voyelle voisine.',
      'Mots-clés : صَلَاة (prière), عِلْم (savoir), عَبْد (serviteur).',
    ],
  },

  4: {
    cycle: 1,
    titre: 'Les dernières lettres et les formes contextuelles',
    intro: 'Avec les dix lettres d\'aujourd\'hui, vous aurez vu l\'alphabet en entier. C\'est une étape importante.\n' +
      'Nous abordons aussi une idée nouvelle : en arabe, une lettre change légèrement de forme selon sa place dans le mot.\n' +
      'Ne cherchez pas à tout retenir d\'un coup. La lecture viendra par l\'usage.',
    decouverte: [
      { lettres: [
        { ar: 'ف', nom: 'fāʾ', son: 'f' },
        { ar: 'ق', nom: 'qāf', son: 'k profond (gorge)' },
        { ar: 'ك', nom: 'kāf', son: 'k' },
        { ar: 'ل', nom: 'lām', son: 'l' },
        { ar: 'م', nom: 'mīm', son: 'm' },
        { ar: 'ن', nom: 'nūn', son: 'n' },
        { ar: 'ه', nom: 'hāʾ', son: 'h léger' },
        { ar: 'و', nom: 'wāw', son: 'w / ou' },
        { ar: 'ي', nom: 'yāʾ', son: 'y / i' },
      ]},
      { texte: 'Le ق est un k prononcé très en arrière, presque dans la gorge ; le ك est notre k ordinaire.' },
      { texte: 'و et ي sont doubles : ils servent de consonnes (w, y) mais aussi de voyelles longues (ū, ī), ce que nous verrons bientôt.' },
      { texte: 'Les formes contextuelles. La lettre nūn par exemple : isolée ن, au début نـ, au milieu ـنـ, à la fin ـن. Le squelette reste reconnaissable.' },
      { lignes: [
        { ar: 'كَتَبَ', tr: 'kataba', fr: 'il a écrit', note: 'les lettres se lient entre elles' },
        { ar: 'نُور', tr: 'nūr', fr: 'lumière', note: 'le wāw note ici le son ū' },
        { ar: 'قَلَم', tr: 'qalam', fr: 'calame, plume', note: 'le qāf, un k profond' },
      ]},
    ],
    vocabulaire: [
      { ar: 'نُور', tr: 'nūr', fr: 'lumière', cle: 'nur' },
      { ar: 'قَلَم', tr: 'qalam', fr: 'plume, calame', cle: 'qalam' },
      { ar: 'مَلِك', tr: 'malik', fr: 'roi', cle: 'malik' },
      { ar: 'يَوْم', tr: 'yawm', fr: 'jour', cle: 'yawm' },
      { ar: 'كِتَاب', tr: 'kitāb', fr: 'livre', cle: 'kitab' },
      { ar: 'فَلَق', tr: 'falaq', fr: 'aube', cle: 'falaq' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle lettre est un « k » profond, prononcé dans la gorge ?',
        options: [{ ar: 'ك' }, { ar: 'ق' }, { ar: 'ف' }], bonne: 1,
        explication: 'ق (qāf) se prononce très en arrière, contrairement au ك ordinaire.' },
      { type: 'qcm', consigne: 'Dans le mot نُور (lumière), le و note :',
        options: [{ texte: 'le son w' }, { texte: 'le son long ū' }, { texte: 'le son a' }], bonne: 1, cles: ['nur'],
        explication: 'و sert ici de voyelle longue ū. Il peut aussi être la consonne w.' },
      { type: 'appariement', consigne: 'Reliez chaque mot à son sens.',
        paires: [ { ar: 'كِتَاب', fr: 'livre', cle: 'kitab' }, { ar: 'مَلِك', fr: 'roi', cle: 'malik' }, { ar: 'يَوْم', fr: 'jour', cle: 'yawm' }, { ar: 'قَلَم', fr: 'plume', cle: 'qalam' } ] },
      { type: 'glisser', consigne: 'Remettez les lettres dans l\'ordre pour écrire « kitāb » (livre), de droite à gauche.',
        ordre: ['كِ', 'تَ', 'اب'], traduction: 'kitāb — un livre', cles: ['kitab'] },
      { type: 'saisie', consigne: 'Écrivez le mot « jour ».',
        indice: 'yawm, composé de ي و م.', reponse: 'يوم', cles: ['yawm'] },
      { type: 'oral', consigne: 'Lisez ce mot à voix haute.',
        phraseAr: 'كِتَاب', translit: 'kitāb', cles: ['kitab'] },
    ],
    memoriser: { ar: 'كِتَاب', tr: 'kitāb', fr: 'Un livre (le Coran est al-kitāb, le Livre par excellence).' },
    recap: [
      'L\'alphabet arabe est désormais complet : 28 lettres.',
      'ق est un k profond, ك un k ordinaire.',
      'و et ي sont à la fois consonnes (w, y) et voyelles longues (ū, ī).',
      'Les lettres se lient et changent de forme selon leur place dans le mot.',
    ],
  },

  5: {
    cycle: 1,
    titre: 'Les voyelles courtes et la shadda',
    intro: 'Jusqu\'ici, vous avez lu des mots déjà vocalisés sans en connaître les règles. Le moment est venu de les comprendre.\n' +
      'En arabe, les voyelles courtes ne sont pas des lettres mais de petits signes placés au-dessus ou au-dessous des consonnes.\n' +
      'Ce sont elles qui font vivre le squelette des consonnes. Le Coran est toujours entièrement vocalisé.',
    decouverte: [
      { texte: 'Les trois voyelles courtes se posent sur une consonne. Prenons le ب.' },
      { lignes: [
        { ar: 'بَ', tr: 'ba', fr: 'fatḥa : un petit trait au-dessus, son « a »' },
        { ar: 'بِ', tr: 'bi', fr: 'kasra : un petit trait au-dessous, son « i »' },
        { ar: 'بُ', tr: 'bu', fr: 'ḍamma : une petite boucle au-dessus, son « ou »' },
        { ar: 'بْ', tr: 'b', fr: 'sukūn : un petit rond, absence de voyelle' },
      ]},
      { texte: 'La shadda (ّ) est un petit signe qui double la consonne. رَبّ se lit rabb, avec un b appuyé.' },
      { lignes: [
        { ar: 'كَتَبَ', tr: 'kataba', fr: 'il a écrit', note: 'trois fatḥa : ka-ta-ba' },
        { ar: 'رَبّ', tr: 'rabb', fr: 'seigneur', note: 'la shadda double le b' },
        { ar: 'مُسْلِم', tr: 'muslim', fr: 'musulman', note: 'ḍamma, sukūn, kasra' },
      ]},
    ],
    grammaire: {
      titre: 'Lire, c\'est assembler consonne et voyelle',
      corps: 'Une consonne portant une fatḥa, une kasra ou une ḍamma se lit en une seule émission : بَ = « ba ».\n' +
        'Le sukūn indique au contraire qu\'aucune voyelle ne suit : la consonne ferme la syllabe.\n' +
        'La shadda double la consonne : on prononce le son deux fois, en appuyant. Ces signes sont la clé de toute lecture juste.',
    },
    vocabulaire: [
      { ar: 'مُسْلِم', tr: 'muslim', fr: 'musulman', cle: 'muslim' },
      { ar: 'كَتَبَ', tr: 'kataba', fr: 'il a écrit', cle: 'kataba' },
      { ar: 'حَمْد', tr: 'ḥamd', fr: 'louange', cle: 'hamd' },
      { ar: 'دِين', tr: 'dīn', fr: 'religion, rétribution', cle: 'din' },
      { ar: 'قُلْ', tr: 'qul', fr: 'dis', cle: 'qul' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quel signe donne le son « i » ?',
        options: [{ texte: 'fatḥa, le trait au-dessus' }, { texte: 'kasra, le trait au-dessous' }, { texte: 'ḍamma, la boucle au-dessus' }], bonne: 1,
        explication: 'La kasra se place sous la lettre et donne le son « i ».' },
      { type: 'qcm', consigne: 'Que fait la shadda ( ّ ) ?',
        options: [{ texte: 'Elle allonge la voyelle' }, { texte: 'Elle double la consonne' }, { texte: 'Elle supprime la voyelle' }], bonne: 1,
        explication: 'La shadda redouble la consonne, comme le double b de rabb.' },
      { type: 'trous', consigne: 'Choisissez la voyelle qui complète « qul » (dis), avec une ḍamma sur le qāf.',
        segments: [ { options: ['قُ', 'قَ', 'قِ'], bonne: 0 }, 'لْ' ], traduction: 'qul — « dis »', cles: ['qul'] },
      { type: 'appariement', consigne: 'Reliez le mot vocalisé à sa lecture.',
        paires: [ { ar: 'بَ', fr: 'ba' }, { ar: 'بِ', fr: 'bi' }, { ar: 'بُ', fr: 'bou' }, { ar: 'بْ', fr: 'b (sans voyelle)' } ] },
      { type: 'saisie', consigne: 'Écrivez « kataba » (il a écrit), avec trois fatḥa.',
        indice: 'ك + fatḥa, ت + fatḥa, ب + fatḥa.', reponse: 'كَتَبَ', cles: ['kataba'] },
      { type: 'oral', consigne: 'Prononcez ce mot en appuyant bien sur le redoublement.',
        phraseAr: 'الْحَمْد', translit: 'al-ḥamd', cles: ['hamd'] },
    ],
    memoriser: { ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ', tr: 'qul huwa llāhu aḥad', fr: 'Dis : il est Allah, Unique. (premier verset déjà lisible)' },
    recap: [
      'Trois voyelles courtes : fatḥa (a), kasra (i), ḍamma (ou).',
      'Le sukūn marque l\'absence de voyelle.',
      'La shadda double la consonne.',
      'Avec ces signes, vous pouvez déjà lire un premier verset entier.',
    ],
  },

  6: {
    cycle: 1,
    titre: 'Voyelles longues, tanwīn, hamza et révision',
    intro: 'Dernière étape du système d\'écriture. Après cette leçon, vous saurez déchiffrer n\'importe quel mot vocalisé.\n' +
      'Nous voyons les voyelles longues, la nunation appelée tanwīn, et la hamza, ce petit signe du coup de glotte.\n' +
      'Puis nous révisons l\'ensemble. Félicitez-vous : lire l\'arabe n\'aura bientôt plus de secret de surface.',
    decouverte: [
      { texte: 'Une voyelle longue tient deux temps. Elle s\'écrit avec une lettre support : ا pour ā, و pour ū, ي pour ī.' },
      { lignes: [
        { ar: 'قَالَ', tr: 'qāla', fr: 'il a dit', note: 'le alif allonge le a' },
        { ar: 'نُور', tr: 'nūr', fr: 'lumière', note: 'le wāw allonge le ou' },
        { ar: 'كَبِير', tr: 'kabīr', fr: 'grand', note: 'le yāʾ allonge le i' },
      ]},
      { texte: 'Le tanwīn est une voyelle doublée en fin de mot, qui se prononce avec un « n » : ـٌ (un), ـٍ (in), ـً (an). Il marque souvent l\'indéfini.' },
      { lignes: [
        { ar: 'أَحَدٌ', tr: 'aḥadun', fr: 'un, unique', note: 'tanwīn ḍamma : son « oun »' },
        { ar: 'كِتَابًا', tr: 'kitāban', fr: 'un livre (cas direct)', note: 'tanwīn fatḥa : son « an »' },
      ]},
      { texte: 'La hamza (ء) note un bref coup de glotte, comme entre les deux « a » de « la-aïe ». Elle se pose souvent sur un support : أ، إ، ؤ، ئ.' },
    ],
    grammaire: {
      titre: 'Voyelle longue ou voyelle courte ?',
      corps: 'La différence entre une voyelle courte et une voyelle longue est une question de durée, et elle change le sens.\n' +
        'كَتَبَ (kataba, il a écrit) et كَاتِب (kātib, celui qui écrit) ne diffèrent que par l\'allongement.\n' +
        'Tendez l\'oreille : la voyelle longue dure environ deux fois plus que la courte.',
    },
    vocabulaire: [
      { ar: 'قَالَ', tr: 'qāla', fr: 'il a dit', cle: 'qala' },
      { ar: 'كَبِير', tr: 'kabīr', fr: 'grand', cle: 'kabir' },
      { ar: 'أَحَد', tr: 'aḥad', fr: 'un, unique', cle: 'ahad' },
      { ar: 'إِيمَان', tr: 'īmān', fr: 'foi', cle: 'iman' },
      { ar: 'سَمَاء', tr: 'samāʾ', fr: 'ciel', cle: 'sama' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Dans كَبِير (grand), qu\'est-ce qui allonge le son « i » ?',
        options: [{ texte: 'une kasra' }, { texte: 'un yāʾ ي' }, { texte: 'une shadda' }], bonne: 1, cles: ['kabir'],
        explication: 'Le ي note ici la voyelle longue ī.' },
      { type: 'qcm', consigne: 'Le tanwīn ( ـً ـٍ ـٌ ) se prononce avec :',
        options: [{ texte: 'un son « n » final' }, { texte: 'un souffle' }, { texte: 'rien de particulier' }], bonne: 0,
        explication: 'Le tanwīn ajoute un « n » : aḥad-un, kitāb-an.' },
      { type: 'qcm', consigne: 'À quoi sert la hamza ( ء ) ?',
        options: [{ texte: 'à doubler la lettre' }, { texte: 'à noter un coup de glotte' }, { texte: 'à allonger la voyelle' }], bonne: 1,
        explication: 'La hamza est l\'arrêt glottal, ce petit blocage de la voix.' },
      { type: 'trous', consigne: 'Complétez pour obtenir « qāla » (il a dit), avec un alif d\'allongement.',
        segments: [ 'قَ', { options: ['ا', 'و', 'ي'], bonne: 0 }, 'لَ' ], traduction: 'qāla — « il a dit »', cles: ['qala'] },
      { type: 'saisie', consigne: 'Écrivez le mot « foi ».',
        indice: 'īmān, avec une hamza initiale sur kasra : إِيمَان.', reponse: 'إيمان', cles: ['iman'] },
      { type: 'oral', consigne: 'Distinguez bien la voyelle longue à la lecture.',
        phraseAr: 'قَالَ اللَّهُ', translit: 'qāla llāh', cles: ['qala'] },
    ],
    memoriser: { ar: 'اللَّهُ الصَّمَدُ', tr: 'allāhu ṣ-ṣamad', fr: 'Allah, le Soutien universel. (sourate al-Ikhlāṣ, verset 2)' },
    recap: [
      'Voyelles longues : ā (ا), ū (و), ī (ي), deux fois plus longues que les courtes.',
      'Le tanwīn double la voyelle finale avec un son « n », marque de l\'indéfini.',
      'La hamza note le coup de glotte, souvent sur un support.',
      'Vous savez désormais déchiffrer tout mot arabe vocalisé.',
    ],
  },

  /* ===================== CYCLE II — PREMIERS MOTS ET STRUCTURES ===================== */

  7: {
    cycle: 2,
    titre: 'L\'article défini et les lettres solaires',
    intro: 'Vous savez lire. Nous entrons maintenant dans le sens des mots et leur agencement.\n' +
      'L\'arabe n\'a qu\'un seul article, الـ (al-), invariable, qui correspond à « le, la, les ».\n' +
      'Une subtilité de prononciation l\'accompagne : selon la lettre qui suit, le « l » se prononce ou se fond.',
    decouverte: [
      { texte: 'L\'article الـ se colle au mot. Devant la moitié des lettres, dites « lunaires », le « l » se prononce nettement.' },
      { lignes: [
        { ar: 'الْقَمَر', tr: 'al-qamar', fr: 'la lune', note: 'lettre lunaire : on entend le l' },
        { ar: 'الْبَيْت', tr: 'al-bayt', fr: 'la maison', note: 'lettre lunaire' },
        { ar: 'الْكِتَاب', tr: 'al-kitāb', fr: 'le livre', note: 'lettre lunaire' },
      ]},
      { texte: 'Devant les autres lettres, dites « solaires », le « l » disparaît à l\'oral et la consonne suivante double. On l\'écrit toujours, mais on ne le prononce pas.' },
      { lignes: [
        { ar: 'الشَّمْس', tr: 'ash-shams', fr: 'le soleil', note: 'lettre solaire : le l se fond dans le ch' },
        { ar: 'الرَّحْمَٰن', tr: 'ar-raḥmān', fr: 'le Tout Miséricordieux', note: 'solaire : ar-r…' },
        { ar: 'النَّاس', tr: 'an-nās', fr: 'les gens', note: 'solaire : an-n…' },
      ]},
    ],
    grammaire: {
      titre: 'Lettres solaires et lunaires',
      corps: 'L\'article s\'écrit toujours الـ, mais sa prononciation dépend de la première lettre du mot.\n' +
        'Devant une lettre solaire (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), le « l » s\'assimile et la consonne suivante se redouble : ash-shams.\n' +
        'Devant une lettre lunaire (les autres), le « l » se prononce clairement : al-qamar. Une astuce : si la consonne est faite avec le bout de la langue, elle est souvent solaire.',
    },
    vocabulaire: [
      { ar: 'الْقَمَر', tr: 'al-qamar', fr: 'la lune', cle: 'qamar' },
      { ar: 'الشَّمْس', tr: 'ash-shams', fr: 'le soleil', cle: 'shams2' },
      { ar: 'الْبَيْت', tr: 'al-bayt', fr: 'la maison', cle: 'bayt' },
      { ar: 'الْأَرْض', tr: 'al-arḍ', fr: 'la terre', cle: 'ard' },
      { ar: 'اللَّيْل', tr: 'al-layl', fr: 'la nuit', cle: 'layl' },
      { ar: 'النَّاس', tr: 'an-nās', fr: 'les gens', cle: 'nas' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Comment se prononce الشَّمْس ?',
        options: [{ texte: 'al-shams' }, { texte: 'ash-shams' }, { texte: 'ach-lams' }], bonne: 1, cles: ['shams2'],
        explication: 'ش est une lettre solaire : le « l » se fond, la consonne double.' },
      { type: 'qcm', consigne: 'Dans الْقَمَر, le « l » de l\'article :',
        options: [{ texte: 'se prononce' }, { texte: 'disparaît' }], bonne: 0, cles: ['qamar'],
        explication: 'ق est lunaire : on entend distinctement al-qamar.' },
      { type: 'appariement', consigne: 'Reliez chaque mot à sa traduction.',
        paires: [ { ar: 'الْبَيْت', fr: 'la maison', cle: 'bayt' }, { ar: 'اللَّيْل', fr: 'la nuit', cle: 'layl' }, { ar: 'الْأَرْض', fr: 'la terre', cle: 'ard' }, { ar: 'النَّاس', fr: 'les gens', cle: 'nas' } ] },
      { type: 'qcm', consigne: 'Laquelle de ces lettres est solaire ?',
        options: [{ ar: 'ق' }, { ar: 'ب' }, { ar: 'ر' }], bonne: 2,
        explication: 'ر est solaire : ar-raḥmān, et non al-raḥmān.' },
      { type: 'trous', consigne: 'Complétez l\'article devant « lune » (lettre lunaire).',
        segments: [ { options: ['الْ', 'اشّ'], bonne: 0 }, 'قَمَر' ], traduction: 'la lune', cles: ['qamar'] },
      { type: 'oral', consigne: 'Prononcez en soignant l\'assimilation solaire.',
        phraseAr: 'الرَّحْمَٰن', translit: 'ar-raḥmān' },
    ],
    memoriser: { ar: 'الْحَمْدُ لِلَّهِ', tr: 'al-ḥamdu li-llāh', fr: 'Louange à Allah.' },
    recap: [
      'L\'arabe a un seul article : الـ, invariable.',
      'Devant une lettre lunaire, le « l » se prononce : al-qamar.',
      'Devant une lettre solaire, le « l » se fond et la consonne double : ash-shams.',
      'L\'article s\'écrit toujours de la même façon, seule la prononciation change.',
    ],
  },

  8: {
    cycle: 2,
    titre: 'Les pronoms personnels',
    intro: 'Pour construire des phrases, il faut savoir dire « je, tu, il, elle ».\n' +
      'L\'arabe distingue le masculin et le féminin dès la deuxième personne, ce que le français ne fait pas.\n' +
      'Ces petits mots reviennent sans cesse dans le Coran : huwa, anta, naḥnu.',
    decouverte: [
      { texte: 'Voici les pronoms isolés, ceux qui se tiennent seuls en début de phrase.' },
      { lignes: [
        { ar: 'أَنَا', tr: 'anā', fr: 'je, moi' },
        { ar: 'أَنْتَ', tr: 'anta', fr: 'tu (masculin)' },
        { ar: 'أَنْتِ', tr: 'anti', fr: 'tu (féminin)' },
        { ar: 'هُوَ', tr: 'huwa', fr: 'il, lui' },
        { ar: 'هِيَ', tr: 'hiya', fr: 'elle' },
        { ar: 'نَحْنُ', tr: 'naḥnu', fr: 'nous' },
        { ar: 'أَنْتُمْ', tr: 'antum', fr: 'vous (masculin pluriel)' },
        { ar: 'هُمْ', tr: 'hum', fr: 'ils, eux' },
      ]},
      { texte: 'Remarquez أَنْتَ et أَنْتِ : seule la voyelle finale change, et avec elle le genre de la personne à qui l\'on parle.' },
    ],
    grammaire: {
      titre: 'Le genre s\'entend dès « tu »',
      corps: 'Là où le français dit « tu » indistinctement, l\'arabe choisit : anta pour un homme, anti pour une femme.\n' +
        'De même à la troisième personne : huwa (il), hiya (elle).\n' +
        'Ces pronoms suffisent à former une phrase complète, car le verbe « être » au présent n\'existe pas : huwa kabīr veut dire « il est grand ».',
    },
    vocabulaire: [
      { ar: 'أَنَا', tr: 'anā', fr: 'je, moi', cle: 'ana' },
      { ar: 'أَنْتَ', tr: 'anta', fr: 'tu (m.)', cle: 'anta' },
      { ar: 'هُوَ', tr: 'huwa', fr: 'il', cle: 'huwa' },
      { ar: 'هِيَ', tr: 'hiya', fr: 'elle', cle: 'hiya' },
      { ar: 'نَحْنُ', tr: 'naḥnu', fr: 'nous', cle: 'nahnu' },
      { ar: 'هُمْ', tr: 'hum', fr: 'ils, eux', cle: 'hum' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Comment dit-on « elle » ?',
        options: [{ ar: 'هُوَ' }, { ar: 'هِيَ' }, { ar: 'هُمْ' }], bonne: 1, cles: ['hiya'],
        explication: 'هِيَ (hiya) signifie « elle » ; هُوَ (huwa) signifie « il ».' },
      { type: 'qcm', consigne: 'À qui s\'adresse-t-on avec أَنْتِ (anti) ?',
        options: [{ texte: 'à un homme' }, { texte: 'à une femme' }, { texte: 'à un groupe' }], bonne: 1,
        explication: 'La kasra finale marque le féminin : anti s\'adresse à une femme.' },
      { type: 'appariement', consigne: 'Reliez chaque pronom à sa traduction.',
        paires: [ { ar: 'أَنَا', fr: 'je', cle: 'ana' }, { ar: 'نَحْنُ', fr: 'nous', cle: 'nahnu' }, { ar: 'هُوَ', fr: 'il', cle: 'huwa' }, { ar: 'هُمْ', fr: 'ils', cle: 'hum' } ] },
      { type: 'glisser', consigne: 'Reconstituez « huwa muslim » (il est musulman).',
        ordre: ['هُوَ', 'مُسْلِم'], traduction: 'il est musulman', cles: ['huwa','muslim'] },
      { type: 'saisie', consigne: 'Écrivez le pronom « nous ».',
        indice: 'naḥnu', reponse: 'نحن', cles: ['nahnu'] },
      { type: 'oral', consigne: 'Prononcez ce pronom si fréquent dans le Coran.',
        phraseAr: 'هُوَ', translit: 'huwa', cles: ['huwa'] },
    ],
    memoriser: { ar: 'هُوَ اللَّهُ أَحَدٌ', tr: 'huwa llāhu aḥad', fr: 'Il est Allah, Unique.' },
    recap: [
      'Les pronoms isolés : anā, anta/anti, huwa/hiya, naḥnu, antum, hum.',
      'Le genre se distingue dès la deuxième personne (anta / anti).',
      'Le verbe « être » au présent ne s\'exprime pas.',
      'Un pronom et un mot suffisent à faire une phrase : huwa kabīr, il est grand.',
    ],
  },

  9: {
    cycle: 2,
    titre: 'Le masculin et le féminin',
    intro: 'En arabe, tout nom est masculin ou féminin. Heureusement, une marque très régulière aide à reconnaître le féminin.\n' +
      'Cette marque est la tāʾ marbūṭa, une lettre arrondie ة que l\'on rencontre en fin de mot.\n' +
      'La reconnaître vous évitera bien des erreurs d\'accord par la suite.',
    decouverte: [
      { texte: 'On forme souvent le féminin en ajoutant ة (tāʾ marbūṭa) à la forme masculine.' },
      { lignes: [
        { ar: 'مُسْلِم', tr: 'muslim', fr: 'un musulman', note: 'masculin' },
        { ar: 'مُسْلِمَة', tr: 'muslima', fr: 'une musulmane', note: 'féminin en ة' },
        { ar: 'مُؤْمِن', tr: 'muʾmin', fr: 'un croyant', note: 'masculin' },
        { ar: 'مُؤْمِنَة', tr: 'muʾmina', fr: 'une croyante', note: 'féminin en ة' },
      ]},
      { texte: 'La tāʾ marbūṭa se prononce « a » à la pause, mais « at » quand le mot est lié à un autre. صَلَاة se lit ṣalāt dès qu\'il est suivi d\'un complément.' },
      { texte: 'Quelques noms sont féminins sans porter la marque : أُمّ (mère), أَرْض (terre), شَمْس (soleil). L\'usage les fixe.' },
    ],
    grammaire: {
      titre: 'La tāʾ marbūṭa, signe du féminin',
      corps: 'La lettre ة, en fin de mot, indique presque toujours le féminin.\n' +
        'On l\'obtient en ajoutant ة au masculin : muslim donne muslima.\n' +
        'À l\'oral, elle se dit « a » quand le mot est isolé, et « at » quand il est suivi d\'un autre mot. Quelques mots sont féminins par nature, sans cette marque.',
    },
    vocabulaire: [
      { ar: 'مُؤْمِن', tr: 'muʾmin', fr: 'croyant', cle: 'mumin' },
      { ar: 'مُؤْمِنَة', tr: 'muʾmina', fr: 'croyante', cle: 'mumina' },
      { ar: 'أُمّ', tr: 'umm', fr: 'mère', cle: 'umm' },
      { ar: 'وَلَد', tr: 'walad', fr: 'enfant, garçon', cle: 'walad' },
      { ar: 'جَنَّة', tr: 'janna', fr: 'jardin, paradis', cle: 'janna' },
      { ar: 'رَحْمَة', tr: 'raḥma', fr: 'miséricorde', cle: 'rahma' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle lettre marque le plus souvent le féminin ?',
        options: [{ ar: 'ة' }, { ar: 'ن' }, { ar: 'ا' }], bonne: 0,
        explication: 'La tāʾ marbūṭa ة, en fin de mot, signale le féminin.' },
      { type: 'qcm', consigne: 'Quel est le féminin de مُؤْمِن (croyant) ?',
        options: [{ ar: 'مُؤْمِنَة' }, { ar: 'مُؤْمِنُون' }, { ar: 'مُؤْمِن' }], bonne: 0, cles: ['mumina'],
        explication: 'On ajoute ة : muʾmin devient muʾmina.' },
      { type: 'appariement', consigne: 'Reliez chaque mot à son sens.',
        paires: [ { ar: 'أُمّ', fr: 'mère', cle: 'umm' }, { ar: 'وَلَد', fr: 'enfant', cle: 'walad' }, { ar: 'جَنَّة', fr: 'jardin', cle: 'janna' }, { ar: 'رَحْمَة', fr: 'miséricorde', cle: 'rahma' } ] },
      { type: 'qcm', consigne: 'Comment se prononce la ة de صَلَاة quand le mot est isolé ?',
        options: [{ texte: 'at' }, { texte: 'a' }, { texte: 'on' }], bonne: 1,
        explication: 'À la pause, on dit ṣalā(t) avec un simple « a » ; liée, elle redevient « at ».' },
      { type: 'saisie', consigne: 'Écrivez le mot « miséricorde ».',
        indice: 'raḥma, avec une tāʾ marbūṭa finale.', reponse: 'رحمة', cles: ['rahma'] },
      { type: 'oral', consigne: 'Prononcez ce mot féminin.',
        phraseAr: 'جَنَّة', translit: 'janna', cles: ['janna'] },
    ],
    memoriser: { ar: 'رَحْمَةٌ لِلْعَالَمِين', tr: 'raḥmatun li-l-ʿālamīn', fr: 'Une miséricorde pour les mondes.' },
    recap: [
      'Tout nom arabe est masculin ou féminin.',
      'La tāʾ marbūṭa ة marque le plus souvent le féminin.',
      'Elle se dit « a » à la pause, « at » quand le mot est lié.',
      'Quelques noms sont féminins sans marque : umm, arḍ, shams.',
    ],
  },

  10: {
    cycle: 2,
    titre: 'La phrase nominale',
    intro: 'Vous allez former vos premières phrases complètes, et elles sont étonnamment simples.\n' +
      'La phrase nominale relie un sujet à ce qu\'on en dit, sans aucun verbe.\n' +
      'C\'est l\'une des structures les plus fréquentes du Coran.',
    decouverte: [
      { texte: 'Une phrase nominale réunit un sujet (souvent défini) et un attribut (souvent indéfini), sans verbe « être ».' },
      { lignes: [
        { ar: 'الْبَيْتُ كَبِيرٌ', tr: 'al-baytu kabīr', fr: 'la maison est grande', note: 'défini + indéfini' },
        { ar: 'اللَّهُ غَفُورٌ', tr: 'allāhu ghafūr', fr: 'Allah est pardonneur', note: 'sujet + attribut' },
        { ar: 'الْوَلَدُ مُسْلِمٌ', tr: 'al-waladu muslim', fr: 'l\'enfant est musulman' },
      ]},
      { texte: 'L\'attribut s\'accorde en genre avec le sujet : الْمُؤْمِنَةُ صَابِرَةٌ, « la croyante est patiente », avec un féminin en ة des deux côtés.' },
    ],
    grammaire: {
      titre: 'Sujet défini, attribut indéfini',
      corps: 'La phrase nominale juxtapose deux éléments : on n\'a pas besoin du verbe « être » au présent.\n' +
        'En règle générale, le sujet est défini (avec l\'article) et l\'attribut est indéfini (avec un tanwīn).\n' +
        'C\'est cette différence, défini contre indéfini, qui signale lequel est le sujet et lequel est ce qu\'on en dit.',
    },
    vocabulaire: [
      { ar: 'كَبِير', tr: 'kabīr', fr: 'grand', cle: 'kabir' },
      { ar: 'صَغِير', tr: 'ṣaghīr', fr: 'petit', cle: 'saghir' },
      { ar: 'حَكِيم', tr: 'ḥakīm', fr: 'sage', cle: 'hakim' },
      { ar: 'صَابِر', tr: 'ṣābir', fr: 'patient, endurant', cle: 'sabir' },
      { ar: 'قَرِيب', tr: 'qarīb', fr: 'proche', cle: 'qarib' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie الْبَيْتُ كَبِيرٌ ?',
        options: [{ texte: 'la grande maison' }, { texte: 'la maison est grande' }, { texte: 'une maison grande' }], bonne: 1,
        explication: 'Sujet défini + attribut indéfini, sans verbe : « la maison est grande ».' },
      { type: 'qcm', consigne: 'Dans une phrase nominale, le sujet est en général :',
        options: [{ texte: 'indéfini' }, { texte: 'défini (avec article)' }], bonne: 1,
        explication: 'Le sujet porte d\'ordinaire l\'article ; l\'attribut reste indéfini.' },
      { type: 'glisser', consigne: 'Reconstituez « Allah est sage » (allāhu ḥakīm).',
        ordre: ['اللَّهُ', 'حَكِيمٌ'], traduction: 'Allah est sage', cles: ['hakim'] },
      { type: 'trous', consigne: 'Complétez : « l\'enfant est petit ».',
        segments: [ 'الْوَلَدُ', { options: ['صَغِيرٌ', 'كَبِيرَةٌ'], bonne: 0 } ], traduction: 'l\'enfant est petit', cles: ['saghir'] },
      { type: 'appariement', consigne: 'Reliez chaque adjectif à son sens.',
        paires: [ { ar: 'كَبِير', fr: 'grand', cle: 'kabir' }, { ar: 'صَغِير', fr: 'petit', cle: 'saghir' }, { ar: 'قَرِيب', fr: 'proche', cle: 'qarib' }, { ar: 'حَكِيم', fr: 'sage', cle: 'hakim' } ] },
      { type: 'oral', consigne: 'Lisez cette phrase nominale.',
        phraseAr: 'اللَّهُ غَفُورٌ', translit: 'allāhu ghafūr' },
    ],
    memoriser: { ar: 'اللَّهُ حَكِيمٌ', tr: 'allāhu ḥakīm', fr: 'Allah est sage.' },
    recap: [
      'La phrase nominale n\'a pas de verbe « être » au présent.',
      'Sujet généralement défini, attribut généralement indéfini.',
      'L\'attribut s\'accorde en genre avec le sujet.',
      'C\'est une structure omniprésente dans le Coran.',
    ],
  },

  11: {
    cycle: 2,
    titre: 'Les démonstratifs',
    intro: 'Pour dire « ceci » et « cela », l\'arabe choisit un mot selon le genre et la distance.\n' +
      'Nous voyons les quatre plus courants : hādhā, hādhihi, dhālika, tilka.\n' +
      'Ils ouvrent souvent les versets : « Ceci est le Livre… ».',
    decouverte: [
      { texte: 'Pour ce qui est proche, on emploie hādhā (masculin) et hādhihi (féminin).' },
      { lignes: [
        { ar: 'هَٰذَا كِتَابٌ', tr: 'hādhā kitāb', fr: 'ceci est un livre', note: 'masculin proche' },
        { ar: 'هَٰذِهِ جَنَّةٌ', tr: 'hādhihi janna', fr: 'ceci est un jardin', note: 'féminin proche' },
      ]},
      { texte: 'Pour ce qui est éloigné, on emploie dhālika (masculin) et tilka (féminin).' },
      { lignes: [
        { ar: 'ذَٰلِكَ الْكِتَابُ', tr: 'dhālika l-kitāb', fr: 'ce Livre-là, voilà le Livre', note: 'masculin éloigné' },
        { ar: 'تِلْكَ آيَاتٌ', tr: 'tilka āyāt', fr: 'ce sont là des signes', note: 'féminin éloigné' },
      ]},
    ],
    grammaire: {
      titre: 'Genre et distance',
      corps: 'Le démonstratif s\'accorde en genre avec le nom : hādhā pour un masculin, hādhihi pour un féminin.\n' +
        'La distance compte aussi : hādhā désigne le proche (ceci), dhālika le lointain (cela).\n' +
        'Devant un nom indéfini, on traduit par « ceci est… » ; devant un nom avec article, par « ce… là ».',
    },
    vocabulaire: [
      { ar: 'هَٰذَا', tr: 'hādhā', fr: 'ceci (m.)', cle: 'hadha' },
      { ar: 'هَٰذِهِ', tr: 'hādhihi', fr: 'ceci (f.)', cle: 'hadhihi' },
      { ar: 'ذَٰلِكَ', tr: 'dhālika', fr: 'cela (m.)', cle: 'dhalika' },
      { ar: 'تِلْكَ', tr: 'tilka', fr: 'cela (f.)', cle: 'tilka' },
      { ar: 'آيَة', tr: 'āya', fr: 'signe, verset', cle: 'aya' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quel démonstratif emploie-t-on pour un objet féminin proche ?',
        options: [{ ar: 'هَٰذَا' }, { ar: 'هَٰذِهِ' }, { ar: 'ذَٰلِكَ' }], bonne: 1, cles: ['hadhihi'],
        explication: 'hādhihi désigne un féminin proche : hādhihi janna.' },
      { type: 'qcm', consigne: 'Que signifie ذَٰلِكَ الْكِتَابُ ?',
        options: [{ texte: 'ceci est un livre' }, { texte: 'voilà le Livre' }, { texte: 'ce livre est grand' }], bonne: 1, cles: ['dhalika'],
        explication: 'Démonstratif lointain + nom défini : « ce Livre-là, voilà le Livre ».' },
      { type: 'appariement', consigne: 'Reliez chaque démonstratif à sa valeur.',
        paires: [ { ar: 'هَٰذَا', fr: 'ceci (m.)', cle: 'hadha' }, { ar: 'هَٰذِهِ', fr: 'ceci (f.)', cle: 'hadhihi' }, { ar: 'ذَٰلِكَ', fr: 'cela (m.)', cle: 'dhalika' }, { ar: 'تِلْكَ', fr: 'cela (f.)', cle: 'tilka' } ] },
      { type: 'glisser', consigne: 'Reconstituez « ceci est un livre » (hādhā kitāb).',
        ordre: ['هَٰذَا', 'كِتَابٌ'], traduction: 'ceci est un livre', cles: ['hadha','kitab'] },
      { type: 'trous', consigne: 'Complétez : « ceci est un jardin » (féminin).',
        segments: [ { options: ['هَٰذِهِ', 'هَٰذَا'], bonne: 0 }, 'جَنَّةٌ' ], traduction: 'ceci est un jardin', cles: ['hadhihi','janna'] },
      { type: 'oral', consigne: 'Lisez ce début de verset très connu.',
        phraseAr: 'ذَٰلِكَ الْكِتَابُ', translit: 'dhālika l-kitāb', cles: ['dhalika'] },
    ],
    memoriser: { ar: 'هَٰذَا صِرَاطٌ مُسْتَقِيمٌ', tr: 'hādhā ṣirāṭun mustaqīm', fr: 'Ceci est un droit chemin.' },
    recap: [
      'Proche : hādhā (m.), hādhihi (f.).',
      'Éloigné : dhālika (m.), tilka (f.).',
      'Le démonstratif s\'accorde en genre avec le nom.',
      'Devant un indéfini : « ceci est… » ; devant un défini : « ce… là ».',
    ],
  },

  12: {
    cycle: 2,
    titre: 'Premier verset entier : sourate al-Ikhlāṣ',
    intro: 'Le moment est venu de lire une sourate complète. al-Ikhlāṣ, le Monothéisme pur, ne compte que quatre versets.\n' +
      'Vous y reconnaîtrez presque tous les mots déjà vus : huwa, allāh, aḥad, lam.\n' +
      'Lisez lentement, verset par verset, en vous appuyant sur la translittération puis sur le sens.',
    decouverte: [
      { texte: 'Sourate 112, al-Ikhlāṣ. Cliquez sur chaque verset pour l\'entendre.' },
      { lignes: [
        { ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ', tr: 'qul huwa llāhu aḥad', fr: 'Dis : il est Allah, Unique.' },
        { ar: 'اللَّهُ الصَّمَدُ', tr: 'allāhu ṣ-ṣamad', fr: 'Allah, le Soutien universel.' },
        { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', tr: 'lam yalid wa-lam yūlad', fr: 'Il n\'a pas engendré et n\'a pas été engendré.' },
        { ar: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', tr: 'wa-lam yakun lahu kufuwan aḥad', fr: 'Et nul ne Lui est égal.' },
      ]},
      { texte: 'لَمْ devant un verbe exprime la négation au passé : « il n\'a pas… ». La particule وَ relie deux propositions : « et ».' },
    ],
    grammaire: {
      titre: 'Lire en s\'appuyant sur le connu',
      corps: 'Vous ne partez pas de rien : قُلْ (dis), هُوَ (il), اللَّه (Allah), أَحَد (un) vous sont familiers.\n' +
        'Le sens d\'un verset se devine souvent en reconnaissant ses mots-clés, sans tout analyser.\n' +
        'C\'est ainsi qu\'on progresse : par reconnaissance, puis par compréhension, enfin par mémorisation.',
    },
    vocabulaire: [
      { ar: 'الصَّمَد', tr: 'aṣ-ṣamad', fr: 'le Soutien, l\'Absolu', cle: 'samad' },
      { ar: 'لَمْ', tr: 'lam', fr: 'ne... pas (passé)', cle: 'lam' },
      { ar: 'يَلِد', tr: 'yalid', fr: 'il engendre', cle: 'yalid' },
      { ar: 'كُفُو', tr: 'kufuw', fr: 'égal, équivalent', cle: 'kufuw' },
      { ar: 'لَهُ', tr: 'lahu', fr: 'à lui, pour lui', cle: 'lahu' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie قُلْ هُوَ اللَّهُ أَحَدٌ ?',
        options: [{ texte: 'Dis : il est Allah, Unique' }, { texte: 'Allah est le Soutien' }, { texte: 'Louange à Allah' }], bonne: 0, cles: ['qul','huwa','ahad'],
        explication: 'qul (dis) + huwa (il) + allāh + aḥad (unique).' },
      { type: 'qcm', consigne: 'À quoi sert لَمْ devant un verbe ?',
        options: [{ texte: 'à interroger' }, { texte: 'à nier au passé' }, { texte: 'à insister' }], bonne: 1, cles: ['lam'],
        explication: 'lam exprime la négation passée : lam yalid, « il n\'a pas engendré ».' },
      { type: 'glisser', consigne: 'Remettez dans l\'ordre le premier verset.',
        ordre: ['قُلْ', 'هُوَ', 'اللَّهُ', 'أَحَدٌ'], traduction: 'Dis : il est Allah, Unique', cles: ['qul','huwa','ahad'] },
      { type: 'appariement', consigne: 'Reliez chaque mot du verset à son sens.',
        paires: [ { ar: 'الصَّمَد', fr: 'le Soutien', cle: 'samad' }, { ar: 'لَمْ', fr: 'ne... pas', cle: 'lam' }, { ar: 'لَهُ', fr: 'à lui', cle: 'lahu' }, { ar: 'كُفُو', fr: 'égal', cle: 'kufuw' } ] },
      { type: 'trous', consigne: 'Complétez le deuxième verset.',
        segments: [ 'اللَّهُ', { options: ['الصَّمَدُ', 'أَحَدٌ'], bonne: 0 } ], traduction: 'Allah, le Soutien universel', cles: ['samad'] },
      { type: 'oral', consigne: 'Récitez le premier verset, lentement.',
        phraseAr: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translit: 'qul huwa llāhu aḥad', cles: ['qul'] },
    ],
    memoriser: { ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ', tr: 'qul huwa llāhu aḥad', fr: 'Dis : il est Allah, Unique. (al-Ikhlāṣ, 1)' },
    recap: [
      'al-Ikhlāṣ, sourate 112, compte quatre versets.',
      'لَمْ nie au passé ; وَ relie par « et ».',
      'Le sens se construit en reconnaissant les mots déjà connus.',
      'Vous venez de lire et comprendre votre première sourate entière.',
    ],
  },

  /* ===================== CYCLE III — LE VERBE ET L'ANNEXION ===================== */

  13: {
    cycle: 3,
    titre: 'Le verbe accompli à la troisième personne',
    intro: 'Nous abordons le verbe, et avec lui une idée centrale de l\'arabe : la racine.\n' +
      'Presque tout mot arabe est bâti sur trois consonnes qui en portent le sens. La racine ك ت ب tourne autour de l\'écriture.\n' +
      'L\'accompli exprime une action achevée. Commençons par la troisième personne, la forme la plus simple.',
    decouverte: [
      { texte: 'La forme de base du verbe, à la 3e personne du masculin, suit souvent le schéma faʿala : trois consonnes portant chacune une fatḥa.' },
      { lignes: [
        { ar: 'كَتَبَ', tr: 'kataba', fr: 'il a écrit', note: 'racine ك-ت-ب' },
        { ar: 'خَلَقَ', tr: 'khalaqa', fr: 'il a créé', note: 'racine خ-ل-ق' },
        { ar: 'نَصَرَ', tr: 'naṣara', fr: 'il a secouru', note: 'racine ن-ص-ر' },
      ]},
      { texte: 'Pour le féminin, on ajoute ـَتْ : kataba devient katabat, « elle a écrit ». Pour le pluriel masculin, on ajoute ـُوا : katabū, « ils ont écrit ».' },
      { lignes: [
        { ar: 'كَتَبَتْ', tr: 'katabat', fr: 'elle a écrit' },
        { ar: 'كَتَبُوا', tr: 'katabū', fr: 'ils ont écrit' },
      ]},
    ],
    grammaire: {
      titre: 'La racine, cœur du sens',
      corps: 'La plupart des mots arabes reposent sur une racine de trois consonnes qui en fixe le sens général.\n' +
        'Sur la racine ك-ت-ب (idée d\'écrire) se forment kataba (il a écrit), kitāb (livre), kātib (scribe).\n' +
        'Reconnaître la racine d\'un mot, c\'est deviner sa famille de sens : un réflexe précieux pour la lecture.',
    },
    vocabulaire: [
      { ar: 'خَلَقَ', tr: 'khalaqa', fr: 'il a créé', cle: 'khalaqa' },
      { ar: 'نَصَرَ', tr: 'naṣara', fr: 'il a secouru', cle: 'nasara' },
      { ar: 'سَمِعَ', tr: 'samiʿa', fr: 'il a entendu', cle: 'samia' },
      { ar: 'عَلِمَ', tr: 'ʿalima', fr: 'il a su', cle: 'alima' },
      { ar: 'فَعَلَ', tr: 'faʿala', fr: 'il a fait', cle: 'faala' },
      { ar: 'رَزَقَ', tr: 'razaqa', fr: 'il a pourvu', cle: 'razaqa' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie خَلَقَ ?',
        options: [{ texte: 'il a écrit' }, { texte: 'il a créé' }, { texte: 'il a entendu' }], bonne: 1, cles: ['khalaqa'],
        explication: 'خَلَقَ, « il a créé », de la racine خ-ل-ق.' },
      { type: 'racine', consigne: 'Reconstituez la racine de كَتَبَ en choisissant ses trois consonnes.',
        mot: 'كَتَبَ', racine: ['ك','ت','ب'], distracteurs: ['ن','ل','ر'], cles: ['kataba'] },
      { type: 'qcm', consigne: 'Comment dit-on « elle a écrit » ?',
        options: [{ ar: 'كَتَبَ' }, { ar: 'كَتَبَتْ' }, { ar: 'كَتَبُوا' }], bonne: 1,
        explication: 'On ajoute ـَتْ au masculin : katabat.' },
      { type: 'appariement', consigne: 'Reliez chaque verbe à son sens.',
        paires: [ { ar: 'سَمِعَ', fr: 'il a entendu', cle: 'samia' }, { ar: 'عَلِمَ', fr: 'il a su', cle: 'alima' }, { ar: 'رَزَقَ', fr: 'il a pourvu', cle: 'razaqa' }, { ar: 'نَصَرَ', fr: 'il a secouru', cle: 'nasara' } ] },
      { type: 'racine', consigne: 'Quelle est la racine de خَلَقَ (il a créé) ?',
        mot: 'خَلَقَ', racine: ['خ','ل','ق'], distracteurs: ['ك','ت','ب'], cles: ['khalaqa'] },
      { type: 'oral', consigne: 'Prononcez ce verbe coranique fréquent.',
        phraseAr: 'خَلَقَ', translit: 'khalaqa', cles: ['khalaqa'] },
    ],
    memoriser: { ar: 'خَلَقَ الْإِنْسَانَ', tr: 'khalaqa l-insān', fr: 'Il a créé l\'être humain.' },
    recap: [
      'La racine de trois consonnes porte le sens d\'une famille de mots.',
      'L\'accompli exprime une action achevée.',
      'Masculin : kataba ; féminin : katabat ; pluriel masculin : katabū.',
      'Repérer la racine aide à deviner le sens d\'un mot.',
    ],
  },

  14: {
    cycle: 3,
    titre: 'La conjugaison complète de l\'accompli',
    intro: 'Vous connaissez la troisième personne. Voyons maintenant tout le tableau de l\'accompli.\n' +
      'La bonne nouvelle : la racine ne bouge pas, on ne fait qu\'ajouter des terminaisons.\n' +
      'Apprenez ce tableau peu à peu ; il vous servira pour tous les verbes réguliers.',
    decouverte: [
      { texte: 'Conjugaison de كَتَبَ (écrire) à l\'accompli. La terminaison varie, la base katab- reste.' },
      { lignes: [
        { ar: 'كَتَبْتُ', tr: 'katabtu', fr: 'j\'ai écrit', note: 'ـْتُ' },
        { ar: 'كَتَبْتَ', tr: 'katabta', fr: 'tu as écrit (m.)', note: 'ـْتَ' },
        { ar: 'كَتَبْتِ', tr: 'katabti', fr: 'tu as écrit (f.)', note: 'ـْتِ' },
        { ar: 'كَتَبَ', tr: 'kataba', fr: 'il a écrit', note: 'ـَ' },
        { ar: 'كَتَبَتْ', tr: 'katabat', fr: 'elle a écrit', note: 'ـَتْ' },
        { ar: 'كَتَبْنَا', tr: 'katabnā', fr: 'nous avons écrit', note: 'ـْنَا' },
        { ar: 'كَتَبْتُمْ', tr: 'katabtum', fr: 'vous avez écrit', note: 'ـْتُمْ' },
        { ar: 'كَتَبُوا', tr: 'katabū', fr: 'ils ont écrit', note: 'ـُوا' },
      ]},
    ],
    grammaire: {
      titre: 'Des terminaisons qui s\'ajoutent',
      corps: 'À l\'accompli, on part de la base verbale et on ajoute un suffixe selon la personne.\n' +
        'Les terminaisons en ـتُ، ـتَ، ـتِ marquent celui qui parle ou à qui l\'on parle ; ـَ et ـَتْ marquent la troisième personne.\n' +
        'Inutile de tout retenir d\'un coup : la régularité fait que ces formes s\'ancrent vite par la pratique.',
    },
    vocabulaire: [
      { ar: 'عَبَدَ', tr: 'ʿabada', fr: 'il a adoré', cle: 'abada' },
      { ar: 'شَكَرَ', tr: 'shakara', fr: 'il a remercié', cle: 'shakara' },
      { ar: 'صَبَرَ', tr: 'ṣabara', fr: 'il a patienté', cle: 'sabara' },
      { ar: 'غَفَرَ', tr: 'ghafara', fr: 'il a pardonné', cle: 'ghafara' },
      { ar: 'دَخَلَ', tr: 'dakhala', fr: 'il est entré', cle: 'dakhala' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Comment dit-on « nous avons écrit » ?',
        options: [{ ar: 'كَتَبْتُ' }, { ar: 'كَتَبْنَا' }, { ar: 'كَتَبُوا' }], bonne: 1,
        explication: 'La terminaison ـْنَا marque « nous » : katabnā.' },
      { type: 'qcm', consigne: 'La forme كَتَبْتُ se traduit par :',
        options: [{ texte: 'j\'ai écrit' }, { texte: 'tu as écrit' }, { texte: 'il a écrit' }], bonne: 0,
        explication: 'ـْتُ marque la première personne : katabtu, « j\'ai écrit ».' },
      { type: 'appariement', consigne: 'Reliez chaque forme conjuguée à sa personne.',
        paires: [ { ar: 'كَتَبْتَ', fr: 'tu as écrit (m.)' }, { ar: 'كَتَبَتْ', fr: 'elle a écrit' }, { ar: 'كَتَبْتُمْ', fr: 'vous avez écrit' }, { ar: 'كَتَبُوا', fr: 'ils ont écrit' } ] },
      { type: 'trous', consigne: 'Complétez « nous avons adoré » à partir de عَبَدَ.',
        segments: [ 'عَبَدْ', { options: ['نَا', 'تُ', 'وا'], bonne: 0 } ], traduction: 'nous avons adoré', cles: ['abada'] },
      { type: 'racine', consigne: 'Donnez la racine de غَفَرَ (il a pardonné).',
        mot: 'غَفَرَ', racine: ['غ','ف','ر'], distracteurs: ['ع','ق','ل'], cles: ['ghafara'] },
      { type: 'oral', consigne: 'Prononcez « nous avons adoré ».',
        phraseAr: 'عَبَدْنَا', translit: 'ʿabadnā', cles: ['abada'] },
    ],
    memoriser: { ar: 'إِيَّاكَ نَعْبُدُ', tr: 'iyyāka naʿbudu', fr: 'C\'est Toi que nous adorons. (al-Fātiḥa, 5)' },
    recap: [
      'L\'accompli ajoute un suffixe à la base verbale.',
      'ـتُ (je), ـتَ/ـتِ (tu), ـَ/ـَتْ (il/elle), ـنَا (nous), ـتُمْ (vous), ـُوا (ils).',
      'La racine reste stable d\'une forme à l\'autre.',
      'La pratique ancre le tableau bien mieux que la mémorisation forcée.',
    ],
  },

  15: {
    cycle: 3,
    titre: 'Le verbe inaccompli',
    intro: 'L\'accompli regardait vers le passé. L\'inaccompli, lui, exprime le présent et le futur, l\'action en cours ou à venir.\n' +
      'Sa marque la plus visible est un préfixe : un petit son placé devant la racine.\n' +
      'C\'est le temps de نَعْبُدُ (nous adorons), que vous avez déjà rencontré.',
    decouverte: [
      { texte: 'À l\'inaccompli, un préfixe annonce la personne, et la voyelle finale est souvent une ḍamma.' },
      { lignes: [
        { ar: 'يَكْتُبُ', tr: 'yaktubu', fr: 'il écrit', note: 'préfixe يَـ' },
        { ar: 'تَكْتُبُ', tr: 'taktubu', fr: 'elle écrit, tu écris', note: 'préfixe تَـ' },
        { ar: 'أَكْتُبُ', tr: 'aktubu', fr: 'j\'écris', note: 'préfixe أَـ' },
        { ar: 'نَكْتُبُ', tr: 'naktubu', fr: 'nous écrivons', note: 'préfixe نَـ' },
      ]},
      { texte: 'On résume les préfixes par le moyen mnémotechnique أَنَيْتُ (a, n, y, t), qui réunit les quatre marques de personne.' },
      { lignes: [
        { ar: 'يَعْلَمُ', tr: 'yaʿlamu', fr: 'il sait' },
        { ar: 'نَعْبُدُ', tr: 'naʿbudu', fr: 'nous adorons' },
      ]},
    ],
    grammaire: {
      titre: 'Le préfixe de l\'inaccompli',
      corps: 'L\'inaccompli se reconnaît à son préfixe : يَـ (il), تَـ (elle ou tu), أَـ (je), نَـ (nous).\n' +
        'La racine se loge entre le préfixe et la terminaison, souvent avec un sukūn puis une ḍamma : ya-ktub-u.\n' +
        'Ce temps couvre le présent et le futur ; le contexte précise lequel.',
    },
    vocabulaire: [
      { ar: 'يَعْلَمُ', tr: 'yaʿlamu', fr: 'il sait', cle: 'yalamu' },
      { ar: 'يَعْبُدُ', tr: 'yaʿbudu', fr: 'il adore', cle: 'yabudu' },
      { ar: 'يَقُولُ', tr: 'yaqūlu', fr: 'il dit', cle: 'yaqulu' },
      { ar: 'يُؤْمِنُ', tr: 'yuʾminu', fr: 'il croit', cle: 'yuminu' },
      { ar: 'نَسْتَعِينُ', tr: 'nastaʿīnu', fr: 'nous implorons le secours', cle: 'nastain' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quel préfixe marque « nous » à l\'inaccompli ?',
        options: [{ ar: 'يَـ' }, { ar: 'نَـ' }, { ar: 'أَـ' }], bonne: 1,
        explication: 'نَـ marque « nous » : naktubu, naʿbudu.' },
      { type: 'qcm', consigne: 'Que signifie يَقُولُ ?',
        options: [{ texte: 'il a dit' }, { texte: 'il dit' }, { texte: 'dis !' }], bonne: 1, cles: ['yaqulu'],
        explication: 'Inaccompli de la racine ق-و-ل : « il dit ».' },
      { type: 'appariement', consigne: 'Reliez chaque verbe à son sens.',
        paires: [ { ar: 'يَعْلَمُ', fr: 'il sait', cle: 'yalamu' }, { ar: 'يَعْبُدُ', fr: 'il adore', cle: 'yabudu' }, { ar: 'يَقُولُ', fr: 'il dit', cle: 'yaqulu' }, { ar: 'يُؤْمِنُ', fr: 'il croit', cle: 'yuminu' } ] },
      { type: 'trous', consigne: 'Complétez « nous adorons » avec le bon préfixe.',
        segments: [ { options: ['نَـ', 'يَـ', 'أَـ'], bonne: 0 }, 'عْبُدُ' ], traduction: 'nous adorons', cles: ['yabudu'] },
      { type: 'racine', consigne: 'Quelle est la racine de يَعْلَمُ (il sait) ?',
        mot: 'يَعْلَمُ', racine: ['ع','ل','م'], distracteurs: ['ي','ك','ت'], cles: ['yalamu'] },
      { type: 'oral', consigne: 'Lisez ce verbe de la Fātiḥa.',
        phraseAr: 'نَعْبُدُ', translit: 'naʿbudu', cles: ['yabudu'] },
    ],
    memoriser: { ar: 'وَإِيَّاكَ نَسْتَعِينُ', tr: 'wa-iyyāka nastaʿīn', fr: 'Et c\'est Toi dont nous implorons le secours. (al-Fātiḥa, 5)' },
    recap: [
      'L\'inaccompli exprime le présent et le futur.',
      'Préfixes : يَـ (il), تَـ (elle/tu), أَـ (je), نَـ (nous), résumés par أَنَيْتُ.',
      'La racine s\'insère entre préfixe et terminaison.',
      'Le contexte distingue présent et futur.',
    ],
  },

  16: {
    cycle: 3,
    titre: 'L\'annexion (idāfa)',
    intro: 'Comment dire « le livre d\'Allah », « le Seigneur des mondes » ? L\'arabe procède par simple juxtaposition.\n' +
      'On accole deux noms : le premier est possédé, le second possesseur. C\'est l\'idāfa, l\'annexion.\n' +
      'Cette construction est partout dans le Coran : rabbi l-ʿālamīn, māliki yawmi d-dīn.',
    decouverte: [
      { texte: 'Dans l\'annexion, le premier nom perd son article et le second se met au cas indirect (kasra finale).' },
      { lignes: [
        { ar: 'كِتَابُ اللَّهِ', tr: 'kitābu llāh', fr: 'le livre d\'Allah', note: 'kitāb sans article + Allāh' },
        { ar: 'رَبُّ الْعَالَمِينَ', tr: 'rabbu l-ʿālamīn', fr: 'le Seigneur des mondes' },
        { ar: 'يَوْمُ الدِّينِ', tr: 'yawmu d-dīn', fr: 'le Jour de la rétribution' },
      ]},
      { texte: 'Le premier mot ne prend jamais l\'article : on ne dit pas al-kitābu llāh, mais kitābu llāh. C\'est le second mot, défini, qui rend l\'ensemble défini.' },
    ],
    grammaire: {
      titre: 'Deux noms accolés',
      corps: 'L\'idāfa relie un possédé et un possesseur en les juxtaposant, sans préposition.\n' +
        'Le premier nom ne porte jamais d\'article ni de tanwīn ; le second se met à la kasra et peut, lui, porter l\'article.\n' +
        'On traduit par « de » : bābu l-bayt, « la porte de la maison ».',
    },
    vocabulaire: [
      { ar: 'رَبّ', tr: 'rabb', fr: 'seigneur', cle: 'rabb' },
      { ar: 'عَالَمِين', tr: 'ʿālamīn', fr: 'les mondes', cle: 'alamin' },
      { ar: 'يَوْم', tr: 'yawm', fr: 'jour', cle: 'yawm' },
      { ar: 'دِين', tr: 'dīn', fr: 'religion, rétribution', cle: 'din' },
      { ar: 'رَسُول', tr: 'rasūl', fr: 'messager, envoyé', cle: 'rasul' },
      { ar: 'كَلِمَة', tr: 'kalima', fr: 'parole, mot', cle: 'kalima' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie كِتَابُ اللَّهِ ?',
        options: [{ texte: 'un livre et Allah' }, { texte: 'le livre d\'Allah' }, { texte: 'Allah a un livre' }], bonne: 1, cles: ['kitab','rabb'],
        explication: 'Annexion : possédé (kitāb) + possesseur (Allāh) = « le livre d\'Allah ».' },
      { type: 'qcm', consigne: 'Dans une idāfa, le premier nom :',
        options: [{ texte: 'porte l\'article' }, { texte: 'ne porte jamais l\'article' }], bonne: 1,
        explication: 'Le premier terme est défini par le second, jamais par un article propre.' },
      { type: 'glisser', consigne: 'Reconstituez « le Seigneur des mondes ».',
        ordre: ['رَبُّ', 'الْعَالَمِينَ'], traduction: 'le Seigneur des mondes', cles: ['rabb','alamin'] },
      { type: 'appariement', consigne: 'Reliez chaque mot à son sens.',
        paires: [ { ar: 'رَسُول', fr: 'messager', cle: 'rasul' }, { ar: 'دِين', fr: 'religion', cle: 'din' }, { ar: 'كَلِمَة', fr: 'parole', cle: 'kalima' }, { ar: 'يَوْم', fr: 'jour', cle: 'yawm' } ] },
      { type: 'trous', consigne: 'Complétez « le Jour de la rétribution ».',
        segments: [ 'يَوْمُ', { options: ['الدِّينِ', 'دِينٌ'], bonne: 0 } ], traduction: 'le Jour de la rétribution', cles: ['yawm','din'] },
      { type: 'oral', consigne: 'Lisez cette annexion célèbre.',
        phraseAr: 'رَبِّ الْعَالَمِينَ', translit: 'rabbi l-ʿālamīn', cles: ['rabb','alamin'] },
    ],
    memoriser: { ar: 'مَالِكِ يَوْمِ الدِّينِ', tr: 'māliki yawmi d-dīn', fr: 'Maître du Jour de la rétribution. (al-Fātiḥa, 4)' },
    recap: [
      'L\'idāfa accole un possédé et un possesseur, sans préposition.',
      'Le premier nom ne porte ni article ni tanwīn.',
      'Le second nom se met à la kasra et peut porter l\'article.',
      'On traduit l\'annexion par « de ».',
    ],
  },

  17: {
    cycle: 3,
    titre: 'Les pronoms suffixes',
    intro: 'Pour dire « mon Seigneur », « son livre », l\'arabe attache un petit pronom à la fin du mot.\n' +
      'Ces pronoms suffixes expriment la possession sur un nom, et le complément sur un verbe ou une préposition.\n' +
      'Vous les avez déjà croisés : lahu (à lui), iyyāka (Toi).',
    decouverte: [
      { texte: 'Sur un nom, le pronom suffixe marque le possesseur. Sur رَبّ (seigneur) :' },
      { lignes: [
        { ar: 'رَبِّي', tr: 'rabbī', fr: 'mon Seigneur', note: 'ـِي = mon' },
        { ar: 'رَبُّكَ', tr: 'rabbuka', fr: 'ton Seigneur (m.)', note: 'ـكَ = ton' },
        { ar: 'رَبُّهُ', tr: 'rabbuhu', fr: 'son Seigneur', note: 'ـهُ = son' },
        { ar: 'رَبُّنَا', tr: 'rabbunā', fr: 'notre Seigneur', note: 'ـنَا = notre' },
        { ar: 'رَبُّهُمْ', tr: 'rabbuhum', fr: 'leur Seigneur', note: 'ـهُمْ = leur' },
      ]},
      { texte: 'Le même suffixe, attaché à une préposition, donne : لَهُ (à lui), بِهِ (par lui), عَلَيْهِمْ (sur eux).' },
    ],
    grammaire: {
      titre: 'Un pronom collé à la fin',
      corps: 'Le pronom suffixe s\'attache directement au mot, sans espace : ـِي (mon), ـكَ (ton), ـهُ (son), ـنَا (notre), ـهُمْ (leur).\n' +
        'Sur un nom, il exprime la possession ; sur un verbe, le complément d\'objet ; sur une préposition, son régime.\n' +
        'Ainsi رَبَّنَا signifie « notre Seigneur », et عَلَيْهِمْ « sur eux ».',
    },
    vocabulaire: [
      { ar: 'رَبِّي', tr: 'rabbī', fr: 'mon Seigneur', cle: 'rabbi' },
      { ar: 'رَبُّنَا', tr: 'rabbunā', fr: 'notre Seigneur', cle: 'rabbuna' },
      { ar: 'عَلَيْهِمْ', tr: 'ʿalayhim', fr: 'sur eux', cle: 'alayhim' },
      { ar: 'بِهِ', tr: 'bihi', fr: 'par lui, en lui', cle: 'bihi' },
      { ar: 'مِنْهُ', tr: 'minhu', fr: 'de lui', cle: 'minhu' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie رَبِّي ?',
        options: [{ texte: 'notre Seigneur' }, { texte: 'mon Seigneur' }, { texte: 'ton Seigneur' }], bonne: 1, cles: ['rabbi'],
        explication: 'Le suffixe ـِي marque « mon » : rabbī.' },
      { type: 'qcm', consigne: 'Le suffixe ـهُمْ signifie :',
        options: [{ texte: 'son' }, { texte: 'leur' }, { texte: 'notre' }], bonne: 1,
        explication: 'ـهُمْ marque le pluriel « leur, eux » : rabbuhum, ʿalayhim.' },
      { type: 'appariement', consigne: 'Reliez chaque forme à sa traduction.',
        paires: [ { ar: 'رَبِّي', fr: 'mon Seigneur', cle: 'rabbi' }, { ar: 'رَبُّنَا', fr: 'notre Seigneur', cle: 'rabbuna' }, { ar: 'عَلَيْهِمْ', fr: 'sur eux', cle: 'alayhim' }, { ar: 'مِنْهُ', fr: 'de lui', cle: 'minhu' } ] },
      { type: 'decomposition', consigne: 'Analysez رَبُّنَا : séparez le nom de son pronom suffixe.',
        segments: [ { ar: 'رَبّ', role: 'nom' }, { ar: 'نَا', role: 'suffixe' } ], roles: ['nom','suffixe'], cles: ['rabbuna'] },
      { type: 'trous', consigne: 'Complétez « ton Seigneur » (à un homme).',
        segments: [ 'رَبُّ', { options: ['كَ', 'هُ', 'نَا'], bonne: 0 } ], traduction: 'ton Seigneur', cles: ['rabbi'] },
      { type: 'oral', consigne: 'Prononcez « notre Seigneur ».',
        phraseAr: 'رَبَّنَا', translit: 'rabbanā', cles: ['rabbuna'] },
    ],
    memoriser: { ar: 'أَنْعَمْتَ عَلَيْهِمْ', tr: 'anʿamta ʿalayhim', fr: 'Tu les as comblés de grâces. (al-Fātiḥa, 7)' },
    recap: [
      'Les pronoms suffixes s\'attachent à la fin du mot.',
      'ـِي (mon), ـكَ (ton), ـهُ (son), ـنَا (notre), ـهُمْ (leur).',
      'Sur un nom : possession ; sur un verbe : complément ; sur une préposition : régime.',
      'Exemples coraniques : rabbanā, ʿalayhim, bihi.',
    ],
  },

  18: {
    cycle: 3,
    titre: 'Sourates al-Falaq et an-Nās',
    intro: 'Deux sourates de protection, souvent récitées ensemble, closent le Coran. Elles partagent le même élan : chercher refuge auprès d\'Allah.\n' +
      'Vous y retrouverez l\'annexion (rabbi l-falaq), les pronoms suffixes et la préposition min.\n' +
      'Lisez-les verset par verset, sans hâte, en savourant les mots reconnus.',
    decouverte: [
      { texte: 'Sourate 113, al-Falaq, l\'Aube naissante.' },
      { lignes: [
        { ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', tr: 'qul aʿūdhu bi-rabbi l-falaq', fr: 'Dis : je cherche refuge auprès du Seigneur de l\'aube,' },
        { ar: 'مِنْ شَرِّ مَا خَلَقَ', tr: 'min sharri mā khalaq', fr: 'contre le mal de ce qu\'Il a créé,' },
        { ar: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', tr: 'wa-min sharri ghāsiqin idhā waqab', fr: 'contre le mal de l\'obscurité quand elle s\'étend,' },
      ]},
      { texte: 'Sourate 114, an-Nās, les Hommes.' },
      { lignes: [
        { ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', tr: 'qul aʿūdhu bi-rabbi n-nās', fr: 'Dis : je cherche refuge auprès du Seigneur des hommes,' },
        { ar: 'مَلِكِ النَّاسِ', tr: 'maliki n-nās', fr: 'le Roi des hommes,' },
        { ar: 'إِلَٰهِ النَّاسِ', tr: 'ilāhi n-nās', fr: 'le Dieu des hommes,' },
      ]},
    ],
    grammaire: {
      titre: 'Chercher refuge : aʿūdhu bi-',
      corps: 'Le verbe أَعُوذُ (je cherche refuge) se construit avec la préposition بِـ : aʿūdhu bi-rabbi, « je me réfugie auprès du Seigneur ».\n' +
        'La préposition مِنْ (de, contre) introduit ce dont on se protège : min sharri, « contre le mal de ».\n' +
        'Trois annexions se suivent dans an-Nās : rabbi n-nās, maliki n-nās, ilāhi n-nās.',
    },
    vocabulaire: [
      { ar: 'أَعُوذُ', tr: 'aʿūdhu', fr: 'je cherche refuge', cle: 'audhu' },
      { ar: 'شَرّ', tr: 'sharr', fr: 'mal', cle: 'sharr' },
      { ar: 'الْفَلَق', tr: 'al-falaq', fr: 'l\'aube', cle: 'falaq' },
      { ar: 'مَلِك', tr: 'malik', fr: 'roi', cle: 'malik' },
      { ar: 'إِلَٰه', tr: 'ilāh', fr: 'dieu, divinité', cle: 'ilah' },
      { ar: 'مِنْ', tr: 'min', fr: 'de, contre', cle: 'min' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie أَعُوذُ بِرَبِّ الْفَلَقِ ?',
        options: [{ texte: 'Louange au Seigneur de l\'aube' }, { texte: 'Je cherche refuge auprès du Seigneur de l\'aube' }, { texte: 'Dis : Allah est l\'aube' }], bonne: 1, cles: ['audhu','falaq'],
        explication: 'aʿūdhu bi- : « je me réfugie auprès de » ; rabbi l-falaq : « le Seigneur de l\'aube ».' },
      { type: 'qcm', consigne: 'La préposition مِنْ introduit ici :',
        options: [{ texte: 'le lieu d\'où l\'on vient' }, { texte: 'ce dont on se protège' }, { texte: 'le moment' }], bonne: 1, cles: ['min'],
        explication: 'min sharri : « contre le mal de ».' },
      { type: 'appariement', consigne: 'Reliez chaque mot à son sens.',
        paires: [ { ar: 'شَرّ', fr: 'mal', cle: 'sharr' }, { ar: 'مَلِك', fr: 'roi', cle: 'malik' }, { ar: 'إِلَٰه', fr: 'dieu', cle: 'ilah' }, { ar: 'الْفَلَق', fr: 'l\'aube', cle: 'falaq' } ] },
      { type: 'glisser', consigne: 'Reconstituez « le Roi des hommes ».',
        ordre: ['مَلِكِ', 'النَّاسِ'], traduction: 'le Roi des hommes', cles: ['malik','nas'] },
      { type: 'racine', consigne: 'Quelle est la racine de أَعُوذُ (je cherche refuge) ?',
        mot: 'أَعُوذُ', racine: ['ع','و','ذ'], distracteurs: ['ء','ر','ب'], cles: ['audhu'] },
      { type: 'oral', consigne: 'Récitez le premier verset d\'an-Nās.',
        phraseAr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', translit: 'qul aʿūdhu bi-rabbi n-nās', cles: ['audhu','nas'] },
    ],
    memoriser: { ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', tr: 'qul aʿūdhu bi-rabbi l-falaq', fr: 'Dis : je cherche refuge auprès du Seigneur de l\'aube. (al-Falaq, 1)' },
    recap: [
      'al-Falaq et an-Nās sont deux sourates de protection.',
      'aʿūdhu bi- : « je cherche refuge auprès de ».',
      'min sharri : « contre le mal de ».',
      'an-Nās enchaîne trois annexions : rabbi, maliki, ilāhi n-nās.',
    ],
  },

  /* ===================== CYCLE IV — GRAMMAIRE APPROFONDIE ===================== */

  19: {
    cycle: 4,
    titre: 'Les particules de coordination',
    intro: 'De petits mots relient les propositions entre elles et donnent au texte son mouvement.\n' +
      'Trois reviennent sans cesse : wa (et), fa (alors, donc), thumma (ensuite, puis).\n' +
      'Les deux premières se collent au mot suivant ; elles sont faciles à repérer une fois connues.',
    decouverte: [
      { texte: 'Les particules wa et fa s\'attachent directement au mot qui suit.' },
      { lignes: [
        { ar: 'وَالْعَصْرِ', tr: 'wa-l-ʿaṣr', fr: 'par le Temps', note: 'وَ collé : « et / par »' },
        { ar: 'فَصَلِّ', tr: 'fa-ṣalli', fr: 'prie donc', note: 'فَ collé : « alors, donc »' },
        { ar: 'ثُمَّ', tr: 'thumma', fr: 'ensuite, puis', note: 'mot séparé' },
      ]},
      { texte: 'wa relie deux éléments de même rang ; fa marque une conséquence ou une suite immédiate ; thumma indique une succession dans le temps, avec un délai.' },
    ],
    grammaire: {
      titre: 'wa, fa, thumma : trois nuances de liaison',
      corps: 'وَ (wa) est le « et » le plus neutre ; il joint simplement deux mots ou deux phrases.\n' +
        'فَ (fa) ajoute une idée de conséquence ou d\'enchaînement rapide : « et alors, donc ».\n' +
        'ثُمَّ (thumma) marque une succession espacée : « puis, ensuite ». Le sens du verset dépend souvent de ces nuances.',
    },
    vocabulaire: [
      { ar: 'وَ', tr: 'wa', fr: 'et', cle: 'wa' },
      { ar: 'فَ', tr: 'fa', fr: 'alors, donc', cle: 'fa' },
      { ar: 'ثُمَّ', tr: 'thumma', fr: 'ensuite, puis', cle: 'thumma' },
      { ar: 'الْعَصْر', tr: 'al-ʿaṣr', fr: 'le temps, l\'après-midi', cle: 'asr' },
      { ar: 'صَلَّى', tr: 'ṣallā', fr: 'il a prié', cle: 'salla' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle particule marque une conséquence, « alors, donc » ?',
        options: [{ ar: 'وَ' }, { ar: 'فَ' }, { ar: 'ثُمَّ' }], bonne: 1, cles: ['fa'],
        explication: 'فَ (fa) introduit une suite ou une conséquence immédiate.' },
      { type: 'qcm', consigne: 'ثُمَّ exprime :',
        options: [{ texte: 'une simple addition' }, { texte: 'une succession dans le temps' }, { texte: 'une cause' }], bonne: 1, cles: ['thumma'],
        explication: 'thumma marque « ensuite, puis », avec un intervalle.' },
      { type: 'decomposition', consigne: 'Séparez la particule du mot dans وَالْعَصْرِ.',
        segments: [ { ar: 'وَ', role: 'particule' }, { ar: 'الْعَصْرِ', role: 'nom' } ], roles: ['particule','nom'], cles: ['wa','asr'] },
      { type: 'appariement', consigne: 'Reliez chaque particule à son sens.',
        paires: [ { ar: 'وَ', fr: 'et', cle: 'wa' }, { ar: 'فَ', fr: 'donc', cle: 'fa' }, { ar: 'ثُمَّ', fr: 'ensuite', cle: 'thumma' }, { ar: 'الْعَصْر', fr: 'le temps', cle: 'asr' } ] },
      { type: 'trous', consigne: 'Complétez « prie donc ton Seigneur » avec la bonne particule.',
        segments: [ { options: ['فَ', 'ثُمَّ'], bonne: 0 }, 'صَلِّ لِرَبِّكَ' ], traduction: 'prie donc ton Seigneur', cles: ['fa'] },
      { type: 'oral', consigne: 'Lisez ce serment qui ouvre une sourate.',
        phraseAr: 'وَالْعَصْرِ', translit: 'wa-l-ʿaṣr', cles: ['wa','asr'] },
    ],
    memoriser: { ar: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', tr: 'fa-ṣalli li-rabbika wa-nḥar', fr: 'Prie donc ton Seigneur et sacrifie. (al-Kawthar, 2)' },
    recap: [
      'wa : « et », liaison neutre.',
      'fa : « alors, donc », conséquence ou suite immédiate.',
      'thumma : « ensuite, puis », succession espacée.',
      'wa et fa se collent au mot suivant.',
    ],
  },

  20: {
    cycle: 4,
    titre: 'Les prépositions principales',
    intro: 'Les prépositions situent, relient, orientent. Six d\'entre elles couvrent l\'essentiel du Coran.\n' +
      'Trois s\'écrivent séparément (fī, ʿalā, ilā), trois se collent au mot (bi-, li-, et parfois min).\n' +
      'Le nom qui suit une préposition se met toujours au cas indirect, avec une kasra.',
    decouverte: [
      { texte: 'Les prépositions séparées :' },
      { lignes: [
        { ar: 'فِي', tr: 'fī', fr: 'dans, en' },
        { ar: 'عَلَىٰ', tr: 'ʿalā', fr: 'sur' },
        { ar: 'إِلَىٰ', tr: 'ilā', fr: 'vers, jusqu\'à' },
        { ar: 'مِنْ', tr: 'min', fr: 'de, depuis, contre' },
      ]},
      { texte: 'Les prépositions collées, qui s\'attachent au mot :' },
      { lignes: [
        { ar: 'بِاللَّهِ', tr: 'bi-llāh', fr: 'par Allah, en Allah', note: 'بِـ collé' },
        { ar: 'لِلَّهِ', tr: 'li-llāh', fr: 'à Allah, pour Allah', note: 'لِـ collé' },
      ]},
    ],
    grammaire: {
      titre: 'Le cas indirect après la préposition',
      corps: 'Toute préposition entraîne le cas indirect : le nom qui suit prend une kasra (ou un tanwīn kasra).\n' +
        'بِـ (bi) signifie « par, avec, en » ; لِـ (li) signifie « à, pour, appartenant à ».\n' +
        'On reconnaît bi-smi llāh, « au nom d\'Allah », où bi- est collé et Allāh porte la kasra.',
    },
    vocabulaire: [
      { ar: 'فِي', tr: 'fī', fr: 'dans', cle: 'fi' },
      { ar: 'عَلَىٰ', tr: 'ʿalā', fr: 'sur', cle: 'ala' },
      { ar: 'إِلَىٰ', tr: 'ilā', fr: 'vers', cle: 'ila' },
      { ar: 'بِـ', tr: 'bi-', fr: 'par, avec', cle: 'bi' },
      { ar: 'لِـ', tr: 'li-', fr: 'à, pour', cle: 'li' },
      { ar: 'صَدْر', tr: 'ṣadr', fr: 'poitrine', cle: 'sadr' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie la préposition فِي ?',
        options: [{ texte: 'sur' }, { texte: 'dans, en' }, { texte: 'vers' }], bonne: 1, cles: ['fi'],
        explication: 'fī signifie « dans, en » : fī ṣudūri n-nās, « dans les poitrines des hommes ».' },
      { type: 'qcm', consigne: 'Après une préposition, le nom se met :',
        options: [{ texte: 'au cas indirect (kasra)' }, { texte: 'au cas sujet (ḍamma)' }], bonne: 0,
        explication: 'La préposition régit le cas indirect, marqué par la kasra.' },
      { type: 'appariement', consigne: 'Reliez chaque préposition à son sens.',
        paires: [ { ar: 'فِي', fr: 'dans', cle: 'fi' }, { ar: 'عَلَىٰ', fr: 'sur', cle: 'ala' }, { ar: 'إِلَىٰ', fr: 'vers', cle: 'ila' }, { ar: 'لِـ', fr: 'pour', cle: 'li' } ] },
      { type: 'decomposition', consigne: 'Séparez la préposition de son nom dans لِلَّهِ.',
        segments: [ { ar: 'لِـ', role: 'préposition' }, { ar: 'اللَّهِ', role: 'nom' } ], roles: ['préposition','nom'], cles: ['li'] },
      { type: 'trous', consigne: 'Complétez « dans les poitrines » (fī ṣudūr).',
        segments: [ { options: ['فِي', 'عَلَىٰ'], bonne: 0 }, 'صُدُورِ النَّاسِ' ], traduction: 'dans les poitrines des hommes', cles: ['fi'] },
      { type: 'oral', consigne: 'Lisez ce groupe prépositionnel.',
        phraseAr: 'فِي الْعُقَدِ', translit: 'fī l-ʿuqad', cles: ['fi'] },
    ],
    memoriser: { ar: 'فِي صُدُورِ النَّاسِ', tr: 'fī ṣudūri n-nās', fr: 'dans les poitrines des hommes. (an-Nās, 5)' },
    recap: [
      'Prépositions séparées : fī (dans), ʿalā (sur), ilā (vers), min (de).',
      'Prépositions collées : bi- (par), li- (à, pour).',
      'Le nom régi par une préposition prend la kasra.',
      'bi-smi llāh : « au nom d\'Allah ».',
    ],
  },

  21: {
    cycle: 4,
    titre: 'Le pluriel',
    intro: 'L\'arabe forme ses pluriels de trois manières, dont une qui déroute d\'abord : le pluriel brisé.\n' +
      'Le pluriel sain ajoute une terminaison régulière. Le pluriel brisé, lui, remodèle l\'intérieur du mot.\n' +
      'Ne cherchez pas de règle unique : on retient les pluriels brisés mot par mot, comme en allemand.',
    decouverte: [
      { texte: 'Le pluriel sain masculin ajoute ـُونَ ou ـِينَ. Le pluriel sain féminin ajoute ـَات.' },
      { lignes: [
        { ar: 'مُسْلِم ← مُسْلِمُونَ', tr: 'muslim → muslimūn', fr: 'musulman → musulmans', note: 'sain masculin' },
        { ar: 'مُؤْمِنَة ← مُؤْمِنَات', tr: 'muʾmina → muʾmināt', fr: 'croyante → croyantes', note: 'sain féminin' },
      ]},
      { texte: 'Le pluriel brisé change la forme interne du mot, sans terminaison régulière.' },
      { lignes: [
        { ar: 'كِتَاب ← كُتُب', tr: 'kitāb → kutub', fr: 'livre → livres', note: 'brisé' },
        { ar: 'رَسُول ← رُسُل', tr: 'rasūl → rusul', fr: 'messager → messagers', note: 'brisé' },
        { ar: 'قَلْب ← قُلُوب', tr: 'qalb → qulūb', fr: 'cœur → cœurs', note: 'brisé' },
      ]},
    ],
    grammaire: {
      titre: 'Trois pluriels, un réflexe',
      corps: 'Le pluriel sain masculin se forme avec ـُونَ / ـِينَ, le sain féminin avec ـَات : ce sont les plus réguliers.\n' +
        'Le pluriel brisé reconstruit le mot de l\'intérieur : kitāb donne kutub, qalb donne qulūb.\n' +
        'La racine reste lisible sous le pluriel brisé : repérez-la, et le sens reste accessible même si la forme surprend.',
    },
    vocabulaire: [
      { ar: 'قَلْب', tr: 'qalb', fr: 'cœur', cle: 'qalb' },
      { ar: 'قُلُوب', tr: 'qulūb', fr: 'cœurs', cle: 'qulub' },
      { ar: 'كُتُب', tr: 'kutub', fr: 'livres', cle: 'kutub' },
      { ar: 'رُسُل', tr: 'rusul', fr: 'messagers', cle: 'rusul' },
      { ar: 'آيَات', tr: 'āyāt', fr: 'signes, versets', cle: 'ayat' },
      { ar: 'صَالِحَات', tr: 'ṣāliḥāt', fr: 'bonnes œuvres', cle: 'salihat' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quel est le pluriel de مُسْلِم (musulman) ?',
        options: [{ ar: 'مُسْلِمَات' }, { ar: 'مُسْلِمُونَ' }, { ar: 'مَسَاجِد' }], bonne: 1,
        explication: 'Pluriel sain masculin : on ajoute ـُونَ, muslimūn.' },
      { type: 'qcm', consigne: 'كِتَاب → كُتُب est un pluriel :',
        options: [{ texte: 'sain masculin' }, { texte: 'sain féminin' }, { texte: 'brisé' }], bonne: 2, cles: ['kutub'],
        explication: 'La forme interne change : c\'est un pluriel brisé.' },
      { type: 'appariement', consigne: 'Reliez chaque pluriel à son singulier.',
        paires: [ { ar: 'قُلُوب', fr: 'cœurs (qalb)', cle: 'qulub' }, { ar: 'رُسُل', fr: 'messagers (rasūl)', cle: 'rusul' }, { ar: 'كُتُب', fr: 'livres (kitāb)', cle: 'kutub' }, { ar: 'آيَات', fr: 'signes (āya)', cle: 'ayat' } ] },
      { type: 'racine', consigne: 'Retrouvez la racine sous le pluriel brisé قُلُوب (cœurs).',
        mot: 'قُلُوب', racine: ['ق','ل','ب'], distracteurs: ['ك','ت','ر'], cles: ['qulub'] },
      { type: 'trous', consigne: 'Complétez « les bonnes œuvres » au pluriel féminin.',
        segments: [ 'الصَّالِحَ', { options: ['ات', 'ون', 'ين'], bonne: 0 } ], traduction: 'les bonnes œuvres', cles: ['salihat'] },
      { type: 'oral', consigne: 'Prononcez ce pluriel brisé.',
        phraseAr: 'قُلُوب', translit: 'qulūb', cles: ['qulub'] },
    ],
    memoriser: { ar: 'وَعَمِلُوا الصَّالِحَاتِ', tr: 'wa-ʿamilū ṣ-ṣāliḥāt', fr: 'et ont accompli les bonnes œuvres. (al-ʿAṣr, 3)' },
    recap: [
      'Pluriel sain masculin : ـُونَ / ـِينَ.',
      'Pluriel sain féminin : ـَات.',
      'Pluriel brisé : la forme interne change (kitāb → kutub).',
      'La racine reste repérable sous le pluriel brisé.',
    ],
  },

  22: {
    cycle: 4,
    titre: 'La négation',
    intro: 'Nier, c\'est essentiel pour comprendre le Coran, qui affirme autant qu\'il écarte.\n' +
      'L\'arabe choisit l\'outil de négation selon le temps et la nature de ce qu\'on nie : lā, mā, lam, laysa.\n' +
      'Vous connaissez déjà lam, qui nie au passé. Complétons le tableau.',
    decouverte: [
      { lignes: [
        { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', tr: 'lā ilāha illā llāh', fr: 'il n\'est de dieu sinon Allah', note: 'لَا nie le nom' },
        { ar: 'لَمْ يَلِدْ', tr: 'lam yalid', fr: 'il n\'a pas engendré', note: 'لَمْ nie le passé' },
        { ar: 'مَا خَلَقَ', tr: 'mā khalaq', fr: 'ce qu\'il a créé / il n\'a pas créé', note: 'مَا : « ce que » ou négation' },
        { ar: 'لَيْسَ كَذَٰلِكَ', tr: 'laysa ka-dhālika', fr: 'il n\'est pas ainsi', note: 'لَيْسَ : « ne pas être »' },
      ]},
      { texte: 'لَا nie de façon générale, souvent un nom ou le présent. لَمْ nie une action passée, suivie d\'un verbe à l\'inaccompli. لَيْسَ nie l\'existence ou l\'attribut : « il n\'est pas ».' },
    ],
    grammaire: {
      titre: 'Choisir la bonne négation',
      corps: 'لَا (lā) est la négation la plus générale : elle nie un nom (lā ilāha, « pas de dieu ») ou le présent.\n' +
        'لَمْ (lam) nie le passé et se construit avec un verbe à l\'inaccompli : lam yalid, « il n\'a pas engendré ».\n' +
        'لَيْسَ (laysa) est un verbe qui signifie « ne pas être » ; مَا (mā) sert aussi de négation, surtout du passé.',
    },
    vocabulaire: [
      { ar: 'لَا', tr: 'lā', fr: 'non, ne... pas', cle: 'la' },
      { ar: 'مَا', tr: 'mā', fr: 'ne... pas ; ce que', cle: 'ma' },
      { ar: 'لَيْسَ', tr: 'laysa', fr: 'il n\'est pas', cle: 'laysa' },
      { ar: 'إِلَّا', tr: 'illā', fr: 'sinon, sauf', cle: 'illa' },
      { ar: 'إِلَٰه', tr: 'ilāh', fr: 'divinité', cle: 'ilah' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Quelle négation emploie-t-on dans لَا إِلَٰهَ إِلَّا اللَّهُ ?',
        options: [{ ar: 'لَمْ' }, { ar: 'لَا' }, { ar: 'لَيْسَ' }], bonne: 1, cles: ['la'],
        explication: 'لَا nie le nom : « il n\'est aucune divinité… ».' },
      { type: 'qcm', consigne: 'لَمْ se construit avec :',
        options: [{ texte: 'un nom' }, { texte: 'un verbe à l\'inaccompli, sens passé' }, { texte: 'rien' }], bonne: 1, cles: ['lam'],
        explication: 'lam yalid : lam + inaccompli = négation du passé.' },
      { type: 'qcm', consigne: 'Que signifie إِلَّا ?',
        options: [{ texte: 'et' }, { texte: 'sinon, sauf' }, { texte: 'dans' }], bonne: 1, cles: ['illa'],
        explication: 'illā introduit l\'exception : « sinon, sauf ».' },
      { type: 'appariement', consigne: 'Reliez chaque outil à sa valeur.',
        paires: [ { ar: 'لَا', fr: 'ne... pas (général)', cle: 'la' }, { ar: 'لَمْ', fr: 'ne... pas (passé)', cle: 'lam' }, { ar: 'لَيْسَ', fr: 'il n\'est pas', cle: 'laysa' }, { ar: 'إِلَّا', fr: 'sinon', cle: 'illa' } ] },
      { type: 'glisser', consigne: 'Reconstituez la formule « il n\'est de dieu sinon Allah ».',
        ordre: ['لَا', 'إِلَٰهَ', 'إِلَّا', 'اللَّهُ'], traduction: 'il n\'est de dieu sinon Allah', cles: ['la','ilah','illa'] },
      { type: 'oral', consigne: 'Récitez cette attestation fondamentale.',
        phraseAr: 'لَا إِلَٰهَ إِلَّا اللَّهُ', translit: 'lā ilāha illā llāh', cles: ['la','illa'] },
    ],
    memoriser: { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', tr: 'lā ilāha illā llāh', fr: 'Il n\'est de divinité sinon Allah.' },
    recap: [
      'لَا : négation générale (nom ou présent).',
      'لَمْ : négation du passé, avec un verbe à l\'inaccompli.',
      'لَيْسَ : « ne pas être ».',
      'إِلَّا : exception, « sinon, sauf ».',
    ],
  },

  23: {
    cycle: 4,
    titre: 'Les pronoms relatifs',
    intro: 'Pour dire « celui qui », « celle que », l\'arabe dispose de relatifs qui s\'accordent en genre.\n' +
      'Les deux plus courants sont alladhī (masculin) et allatī (féminin).\n' +
      'On les rencontre dès le début de la Fātiḥa et dans an-Nās : alladhī yuwaswisu.',
    decouverte: [
      { lignes: [
        { ar: 'الَّذِي', tr: 'alladhī', fr: 'celui qui (m.)' },
        { ar: 'الَّتِي', tr: 'allatī', fr: 'celle qui (f.)' },
        { ar: 'الَّذِينَ', tr: 'alladhīna', fr: 'ceux qui (m. pluriel)' },
      ]},
      { texte: 'Le relatif renvoie à un être ou une chose déjà défini. الَّذِينَ آمَنُوا : « ceux qui ont cru ».' },
      { lignes: [
        { ar: 'الَّذِي يُوَسْوِسُ', tr: 'alladhī yuwaswisu', fr: 'celui qui souffle (le mal)', note: 'an-Nās, 5' },
        { ar: 'الَّذِينَ آمَنُوا', tr: 'alladhīna āmanū', fr: 'ceux qui ont cru', note: 'al-ʿAṣr, 3' },
      ]},
    ],
    grammaire: {
      titre: 'Un relatif qui s\'accorde',
      corps: 'Le pronom relatif s\'accorde en genre et en nombre avec ce qu\'il reprend : الَّذِي (masculin singulier), الَّتِي (féminin singulier), الَّذِينَ (masculin pluriel).\n' +
        'Il ne s\'emploie qu\'avec un antécédent défini ; après un indéfini, l\'arabe se passe de relatif.\n' +
        'La proposition qui suit complète le sens : alladhī khalaqa, « celui qui a créé ».',
    },
    vocabulaire: [
      { ar: 'الَّذِي', tr: 'alladhī', fr: 'celui qui', cle: 'alladhi' },
      { ar: 'الَّتِي', tr: 'allatī', fr: 'celle qui', cle: 'allati' },
      { ar: 'الَّذِينَ', tr: 'alladhīna', fr: 'ceux qui', cle: 'alladhina' },
      { ar: 'آمَنُوا', tr: 'āmanū', fr: 'ils ont cru', cle: 'amanu' },
      { ar: 'يُوَسْوِسُ', tr: 'yuwaswisu', fr: 'il souffle (le mal)', cle: 'yuwaswisu' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Comment dit-on « celle qui » ?',
        options: [{ ar: 'الَّذِي' }, { ar: 'الَّتِي' }, { ar: 'الَّذِينَ' }], bonne: 1, cles: ['allati'],
        explication: 'الَّتِي est le relatif féminin singulier.' },
      { type: 'qcm', consigne: 'الَّذِينَ آمَنُوا signifie :',
        options: [{ texte: 'celui qui croit' }, { texte: 'ceux qui ont cru' }, { texte: 'la foi' }], bonne: 1, cles: ['alladhina','amanu'],
        explication: 'الَّذِينَ (ceux qui) + آمَنُوا (ils ont cru).' },
      { type: 'qcm', consigne: 'Le relatif s\'emploie avec un antécédent :',
        options: [{ texte: 'défini' }, { texte: 'indéfini' }], bonne: 0,
        explication: 'On n\'emploie alladhī, allatī qu\'après un nom défini.' },
      { type: 'appariement', consigne: 'Reliez chaque relatif à sa valeur.',
        paires: [ { ar: 'الَّذِي', fr: 'celui qui', cle: 'alladhi' }, { ar: 'الَّتِي', fr: 'celle qui', cle: 'allati' }, { ar: 'الَّذِينَ', fr: 'ceux qui', cle: 'alladhina' }, { ar: 'آمَنُوا', fr: 'ils ont cru', cle: 'amanu' } ] },
      { type: 'glisser', consigne: 'Reconstituez « celui qui souffle le mal ».',
        ordre: ['الَّذِي', 'يُوَسْوِسُ'], traduction: 'celui qui souffle le mal', cles: ['alladhi','yuwaswisu'] },
      { type: 'oral', consigne: 'Lisez ce fragment d\'an-Nās.',
        phraseAr: 'الَّذِي يُوَسْوِسُ', translit: 'alladhī yuwaswisu', cles: ['alladhi'] },
    ],
    memoriser: { ar: 'إِلَّا الَّذِينَ آمَنُوا', tr: 'illā lladhīna āmanū', fr: 'sauf ceux qui ont cru. (al-ʿAṣr, 3)' },
    recap: [
      'Relatifs : الَّذِي (m.), الَّتِي (f.), الَّذِينَ (m. pluriel).',
      'Le relatif s\'accorde en genre et en nombre.',
      'Il suppose un antécédent défini.',
      'La proposition suivante précise le sens.',
    ],
  },

  24: {
    cycle: 4,
    titre: 'Sourates al-Kawthar et al-ʿAṣr',
    intro: 'Deux sourates brèves mais denses. al-Kawthar est la plus courte du Coran ; al-ʿAṣr tient en un serment et une leçon de vie.\n' +
      'Vous y mobiliserez tout le cycle : particules, prépositions, pluriels, négation, relatifs.\n' +
      'Lisez, comprenez, puis laissez les mots résonner.',
    decouverte: [
      { texte: 'Sourate 108, al-Kawthar, l\'Abondance.' },
      { lignes: [
        { ar: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', tr: 'innā aʿṭaynāka l-kawthar', fr: 'Nous t\'avons certes accordé l\'abondance.' },
        { ar: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', tr: 'fa-ṣalli li-rabbika wa-nḥar', fr: 'Prie donc ton Seigneur et sacrifie.' },
        { ar: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', tr: 'inna shāni\'aka huwa l-abtar', fr: 'Celui qui te hait sera, lui, sans postérité.' },
      ]},
      { texte: 'Sourate 103, al-ʿAṣr, le Temps.' },
      { lignes: [
        { ar: 'وَالْعَصْرِ', tr: 'wa-l-ʿaṣr', fr: 'Par le Temps,' },
        { ar: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ', tr: 'inna l-insāna la-fī khusr', fr: 'l\'être humain est certes en perdition,' },
        { ar: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ', tr: 'illā lladhīna āmanū wa-ʿamilū ṣ-ṣāliḥāt', fr: 'sauf ceux qui croient et accomplissent les bonnes œuvres,' },
      ]},
    ],
    grammaire: {
      titre: 'inna, particule d\'insistance',
      corps: 'إِنَّ (inna) renforce l\'affirmation : « certes, vraiment ». Elle ouvre souvent un verset.\n' +
        'Le nom qui la suit prend une fatḥa : inna l-insāna, « l\'être humain, certes ».\n' +
        'La particule لَـ (la-) ajoutée renforce encore : la-fī khusr, « bien en perdition ».',
    },
    vocabulaire: [
      { ar: 'الْكَوْثَر', tr: 'al-kawthar', fr: 'l\'abondance', cle: 'kawthar' },
      { ar: 'إِنَّ', tr: 'inna', fr: 'certes, vraiment', cle: 'inna' },
      { ar: 'الْإِنْسَان', tr: 'al-insān', fr: 'l\'être humain', cle: 'insan' },
      { ar: 'خُسْر', tr: 'khusr', fr: 'perte, perdition', cle: 'khusr' },
      { ar: 'الصَّبْر', tr: 'aṣ-ṣabr', fr: 'la patience', cle: 'sabr' },
      { ar: 'الْحَقّ', tr: 'al-ḥaqq', fr: 'la vérité, le vrai', cle: 'haqq' },
    ],
    exercices: [
      { type: 'qcm', consigne: 'Que signifie إِنَّ en tête de verset ?',
        options: [{ texte: 'si' }, { texte: 'certes, vraiment' }, { texte: 'mais' }], bonne: 1, cles: ['inna'],
        explication: 'inna renforce l\'affirmation : « certes ».' },
      { type: 'qcm', consigne: 'Que signifie خُسْر ?',
        options: [{ texte: 'abondance' }, { texte: 'perdition, perte' }, { texte: 'patience' }], bonne: 1, cles: ['khusr'],
        explication: 'khusr : la perte, la perdition.' },
      { type: 'appariement', consigne: 'Reliez chaque mot à son sens.',
        paires: [ { ar: 'الْكَوْثَر', fr: 'l\'abondance', cle: 'kawthar' }, { ar: 'الْإِنْسَان', fr: 'l\'être humain', cle: 'insan' }, { ar: 'الصَّبْر', fr: 'la patience', cle: 'sabr' }, { ar: 'الْحَقّ', fr: 'la vérité', cle: 'haqq' } ] },
      { type: 'glisser', consigne: 'Reconstituez « par le Temps, l\'être humain est en perdition ».',
        ordre: ['وَالْعَصْرِ', 'إِنَّ', 'الْإِنْسَانَ', 'لَفِي', 'خُسْرٍ'], traduction: 'Par le Temps, l\'être humain est certes en perdition', cles: ['insan','khusr','inna'] },
      { type: 'decomposition', consigne: 'Décomposez لَفِي : la particule d\'insistance et la préposition.',
        segments: [ { ar: 'لَـ', role: 'insistance' }, { ar: 'فِي', role: 'préposition' } ], roles: ['insistance','préposition'], cles: ['fi'] },
      { type: 'oral', consigne: 'Récitez al-ʿAṣr en entier, lentement.',
        phraseAr: 'وَالْعَصْرِ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ', translit: 'wa-l-ʿaṣr, inna l-insāna la-fī khusr', cles: ['insan','khusr'] },
    ],
    memoriser: { ar: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ', tr: 'inna l-insāna la-fī khusr', fr: 'L\'être humain est certes en perdition. (al-ʿAṣr, 2)' },
    recap: [
      'al-Kawthar : la plus courte sourate, trois versets.',
      'al-ʿAṣr : un serment par le Temps, puis la voie du salut.',
      'إِنَّ renforce l\'affirmation ; le nom qui suit prend la fatḥa.',
      'لَـ ajoute encore de l\'insistance : la-fī khusr.',
    ],
  },

};
