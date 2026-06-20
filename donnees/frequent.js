/* =========================================================================
   frequent.js — vocabulaire coranique le plus fréquent
   Dans l'esprit de « 80% des mots du Coran ». Les mots sont classés par
   thème et, à l'intérieur, à peu près par fréquence décroissante. Chaque
   entrée porte une note brève (sens, étymologie ou repère spirituel) quand
   c'est utile. Les clés sont préfixées « f_ » pour cohabiter avec le
   vocabulaire des leçons dans la répétition espacée.
   Orthographe vérifiée, translittération DIN 31635 simplifiée.
   ========================================================================= */

const Frequent = {
  groupes: [
    {
      titre: 'Outils grammaticaux les plus fréquents',
      intro: 'Ces petits mots reviennent à chaque page du Coran. Les reconnaître au premier coup d\'œil change tout.',
      mots: [
        { ar: 'مِنْ', tr: 'min', fr: 'de, provenant de', cle: 'f_min' },
        { ar: 'فِي', tr: 'fī', fr: 'dans, en', cle: 'f_fi' },
        { ar: 'مَا', tr: 'mā', fr: 'ce que ; ne... pas', cle: 'f_ma' },
        { ar: 'لَا', tr: 'lā', fr: 'non, ne... pas', cle: 'f_la' },
        { ar: 'إِنَّ', tr: 'inna', fr: 'certes, vraiment', cle: 'f_inna' },
        { ar: 'عَلَىٰ', tr: 'ʿalā', fr: 'sur', cle: 'f_ala' },
        { ar: 'إِلَىٰ', tr: 'ilā', fr: 'vers, jusqu\'à', cle: 'f_ila' },
        { ar: 'الَّذِينَ', tr: 'alladhīna', fr: 'ceux qui', cle: 'f_alladhina' },
        { ar: 'مَنْ', tr: 'man', fr: 'qui, celui qui', cle: 'f_man' },
        { ar: 'كُلّ', tr: 'kull', fr: 'tout, chaque', cle: 'f_kull' },
        { ar: 'إِذَا', tr: 'idhā', fr: 'lorsque, quand', cle: 'f_idha' },
        { ar: 'إِنْ', tr: 'in', fr: 'si (condition)', cle: 'f_in' },
        { ar: 'قَدْ', tr: 'qad', fr: 'certes, déjà', cle: 'f_qad' },
        { ar: 'بَعْدَ', tr: 'baʿda', fr: 'après', cle: 'f_bada' },
        { ar: 'بَيْنَ', tr: 'bayna', fr: 'entre', cle: 'f_bayna' },
      ],
    },
    {
      titre: 'Allah et les noms divins',
      intro: 'Le mot le plus présent du Coran, et quelques-uns de Ses plus beaux noms.',
      mots: [
        { ar: 'اللَّه', tr: 'allāh', fr: 'Allah', cle: 'f_allah', note: 'Le Nom suprême. Présent près de trois mille fois dans le Coran.' },
        { ar: 'رَبّ', tr: 'rabb', fr: 'Seigneur, Éducateur', cle: 'f_rabb', note: 'Racine ر-ب-ب : celui qui nourrit, élève et mène une chose à sa perfection.' },
        { ar: 'الرَّحْمَـٰن', tr: 'ar-raḥmān', fr: 'le Tout Miséricordieux', cle: 'f_rahman', note: 'Miséricorde immense, embrassant toute la création.' },
        { ar: 'الرَّحِيم', tr: 'ar-raḥīm', fr: 'le Très Miséricordieux', cle: 'f_rahim', note: 'Miséricorde agissante, continue, en particulier envers les croyants.' },
        { ar: 'الْعَلِيم', tr: 'al-ʿalīm', fr: 'l\'Omniscient', cle: 'f_alim', note: 'Racine ع-ل-م du savoir.' },
        { ar: 'الْحَكِيم', tr: 'al-ḥakīm', fr: 'le Sage', cle: 'f_hakim' },
        { ar: 'الْغَفُور', tr: 'al-ghafūr', fr: 'le Pardonneur', cle: 'f_ghafur' },
        { ar: 'الْعَزِيز', tr: 'al-ʿazīz', fr: 'le Tout-Puissant', cle: 'f_aziz' },
      ],
    },
    {
      titre: 'La création d\'Allah',
      intro: 'Les grands mots qui désignent le monde et ses signes.',
      mots: [
        { ar: 'يَوْم', tr: 'yawm', fr: 'jour', cle: 'f_yawm' },
        { ar: 'النَّاس', tr: 'an-nās', fr: 'les gens, les hommes', cle: 'f_nas' },
        { ar: 'أَرْض', tr: 'arḍ', fr: 'terre', cle: 'f_ard' },
        { ar: 'سَمَاء', tr: 'samāʾ', fr: 'ciel', cle: 'f_sama' },
        { ar: 'آيَة', tr: 'āya', fr: 'signe, verset', cle: 'f_aya', note: 'Désigne à la fois un verset et un signe d\'Allah dans la création.' },
        { ar: 'لَيْل', tr: 'layl', fr: 'nuit', cle: 'f_layl' },
        { ar: 'نَار', tr: 'nār', fr: 'feu', cle: 'f_nar' },
        { ar: 'جَنَّة', tr: 'janna', fr: 'jardin, Paradis', cle: 'f_janna', note: 'Racine ج-ن-ن, l\'idée de ce qui est voilé, couvert de verdure.' },
        { ar: 'مَاء', tr: 'māʾ', fr: 'eau', cle: 'f_maa' },
      ],
    },
    {
      titre: 'Religion, foi et actes',
      intro: 'Le vocabulaire du cœur et de la pratique.',
      mots: [
        { ar: 'دِين', tr: 'dīn', fr: 'religion, rétribution', cle: 'f_din' },
        { ar: 'إِيمَان', tr: 'īmān', fr: 'foi', cle: 'f_iman', note: 'Racine ء-م-ن, liée à la sécurité et à la confiance du cœur.' },
        { ar: 'حَقّ', tr: 'ḥaqq', fr: 'vérité, droit', cle: 'f_haqq' },
        { ar: 'عَمَل', tr: 'ʿamal', fr: 'œuvre, action', cle: 'f_amal' },
        { ar: 'رَحْمَة', tr: 'raḥma', fr: 'miséricorde', cle: 'f_rahma' },
        { ar: 'عَذَاب', tr: 'ʿadhāb', fr: 'châtiment', cle: 'f_adhab' },
        { ar: 'كِتَاب', tr: 'kitāb', fr: 'livre, Écriture', cle: 'f_kitab' },
        { ar: 'قَلْب', tr: 'qalb', fr: 'cœur', cle: 'f_qalb', note: 'Racine ق-ل-ب, ce qui se retourne, se transforme : siège de la foi.' },
        { ar: 'نَفْس', tr: 'nafs', fr: 'âme, soi', cle: 'f_nafs' },
        { ar: 'خَيْر', tr: 'khayr', fr: 'bien, meilleur', cle: 'f_khayr' },
      ],
    },
    {
      titre: 'Les personnes',
      intro: 'Ceux que le Coran nomme et appelle.',
      mots: [
        { ar: 'رَسُول', tr: 'rasūl', fr: 'messager, envoyé', cle: 'f_rasul' },
        { ar: 'نَبِيّ', tr: 'nabī', fr: 'prophète', cle: 'f_nabi' },
        { ar: 'قَوْم', tr: 'qawm', fr: 'peuple, communauté', cle: 'f_qawm' },
        { ar: 'مُؤْمِن', tr: 'muʾmin', fr: 'croyant', cle: 'f_mumin' },
        { ar: 'عَبْد', tr: 'ʿabd', fr: 'serviteur, adorateur', cle: 'f_abd' },
        { ar: 'وَلَد', tr: 'walad', fr: 'enfant', cle: 'f_walad' },
        { ar: 'أُمّ', tr: 'umm', fr: 'mère', cle: 'f_umm' },
      ],
    },
    {
      titre: 'Verbes très fréquents',
      intro: 'Le moteur des récits coraniques.',
      mots: [
        { ar: 'قَالَ', tr: 'qāla', fr: 'il a dit', cle: 'f_qala', note: 'Le verbe le plus fréquent du Coran : les paroles y abondent.' },
        { ar: 'كَانَ', tr: 'kāna', fr: 'il était, il fut', cle: 'f_kana' },
        { ar: 'آمَنَ', tr: 'āmana', fr: 'il a cru', cle: 'f_amana' },
        { ar: 'خَلَقَ', tr: 'khalaqa', fr: 'il a créé', cle: 'f_khalaqa' },
        { ar: 'جَعَلَ', tr: 'jaʿala', fr: 'il a fait, il a placé', cle: 'f_jaala' },
        { ar: 'عَلِمَ', tr: 'ʿalima', fr: 'il a su', cle: 'f_alima' },
        { ar: 'عَبَدَ', tr: 'ʿabada', fr: 'il a adoré', cle: 'f_abada' },
        { ar: 'كَفَرَ', tr: 'kafara', fr: 'il a mécru, il a renié', cle: 'f_kafara', note: 'Racine ك-ف-ر, l\'idée de couvrir, donc de voiler la vérité.' },
        { ar: 'أَنْزَلَ', tr: 'anzala', fr: 'il a fait descendre, révélé', cle: 'f_anzala' },
        { ar: 'هَدَىٰ', tr: 'hadā', fr: 'il a guidé', cle: 'f_hada' },
      ],
    },
  ],

  // Liste à plat (pratique pour la révision et les statistiques)
  tous() {
    const out = [];
    this.groupes.forEach((g) => g.mots.forEach((m) => out.push(m)));
    return out;
  },
};
