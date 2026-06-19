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

};
