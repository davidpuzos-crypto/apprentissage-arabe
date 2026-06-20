/* =========================================================================
   versets.js — sourates courtes utilisées dans le parcours
   Texte arabe ALIGNÉ EXACTEMENT sur la référence fournie (Tanzil quran-simple,
   riwāya Ḥafṣ), vérifié verset par verset. La basmala initiale, incluse dans le
   premier verset de la source, est retirée (sauf pour al-Fātiḥa où elle est le
   verset 1). Translittération DIN 31635 simplifiée, traduction sobre.
   ========================================================================= */

const Versets = {
  ikhlas: {
    numero: 112,
    nom: "al-Ikhlāṣ",
    nomFr: "Le Monothéisme pur",
    versets: [
      { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", tr: "qul huwa llāhu aḥad", fr: "Dis : il est Allah, Unique." },
      { ar: "اللَّهُ الصَّمَدُ", tr: "allāhu ṣ-ṣamad", fr: "Allah, le Soutien universel." },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", tr: "lam yalid wa-lam yūlad", fr: "Il n'a pas engendré et n'a pas été engendré." },
      { ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", tr: "wa-lam yakun lahu kufuwan aḥad", fr: "Et nul ne Lui est égal." },
    ],
  },

  falaq: {
    numero: 113,
    nom: "al-Falaq",
    nomFr: "L'Aube naissante",
    versets: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tr: "qul aʿūdhu bi-rabbi l-falaq", fr: "Dis : je cherche refuge auprès du Seigneur de l'aube." },
      { ar: "مِن شَرِّ مَا خَلَقَ", tr: "min sharri mā khalaq", fr: "contre le mal de ce qu'Il a créé," },
      { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", tr: "wa-min sharri ghāsiqin idhā waqab", fr: "contre le mal de l'obscurité quand elle s'étend," },
      { ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tr: "wa-min sharri n-naffāthāti fī l-ʿuqad", fr: "contre le mal de celles qui soufflent sur les nœuds," },
      { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", tr: "wa-min sharri ḥāsidin idhā ḥasad", fr: "et contre le mal de l'envieux quand il envie." },
    ],
  },

  nas: {
    numero: 114,
    nom: "an-Nās",
    nomFr: "Les Hommes",
    versets: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tr: "qul aʿūdhu bi-rabbi n-nās", fr: "Dis : je cherche refuge auprès du Seigneur des hommes," },
      { ar: "مَلِكِ النَّاسِ", tr: "maliki n-nās", fr: "le Roi des hommes," },
      { ar: "إِلَـٰهِ النَّاسِ", tr: "ilāhi n-nās", fr: "le Dieu des hommes," },
      { ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tr: "min sharri l-waswāsi l-khannās", fr: "contre le mal du tentateur furtif," },
      { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tr: "alladhī yuwaswisu fī ṣudūri n-nās", fr: "qui souffle le mal dans les poitrines des hommes," },
      { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", tr: "mina l-jinnati wa-n-nās", fr: "qu'il soit des djinns ou des hommes." },
    ],
  },

  kawthar: {
    numero: 108,
    nom: "al-Kawthar",
    nomFr: "L'Abondance",
    versets: [
      { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", tr: "innā aʿṭaynāka l-kawthar", fr: "Nous t'avons certes accordé l'abondance." },
      { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", tr: "fa-ṣalli li-rabbika wa-nḥar", fr: "Prie donc ton Seigneur et sacrifie." },
      { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", tr: "inna shāni'aka huwa l-abtar", fr: "Celui qui te hait sera, lui, sans postérité." },
    ],
  },

  asr: {
    numero: 103,
    nom: "al-ʿAṣr",
    nomFr: "Le Temps",
    versets: [
      { ar: "وَالْعَصْرِ", tr: "wa-l-ʿaṣr", fr: "Par le Temps." },
      { ar: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", tr: "inna l-insāna la-fī khusr", fr: "L'être humain est certes en perdition," },
      { ar: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", tr: "illā lladhīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr", fr: "sauf ceux qui croient, accomplissent les bonnes œuvres, s'enjoignent mutuellement la vérité et s'enjoignent mutuellement la patience." },
    ],
  },

  fatiha: {
    numero: 1,
    nom: "al-Fātiḥa",
    nomFr: "L'Ouverture",
    versets: [
      { ar: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ", tr: "bismi llāhi r-raḥmāni r-raḥīm", fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux." },
      { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "al-ḥamdu li-llāhi rabbi l-ʿālamīn", fr: "Louange à Allah, Seigneur des mondes," },
      { ar: "الرَّحْمَـٰنِ الرَّحِيمِ", tr: "ar-raḥmāni r-raḥīm", fr: "le Tout Miséricordieux, le Très Miséricordieux," },
      { ar: "مَالِكِ يَوْمِ الدِّينِ", tr: "māliki yawmi d-dīn", fr: "Maître du Jour de la rétribution." },
      { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tr: "iyyāka naʿbudu wa-iyyāka nastaʿīn", fr: "C'est Toi que nous adorons, et c'est Toi dont nous implorons le secours." },
      { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tr: "ihdinā ṣ-ṣirāṭa l-mustaqīm", fr: "Guide-nous vers le droit chemin," },
      { ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tr: "ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn", fr: "le chemin de ceux que Tu as comblés de grâces, non de ceux qui ont encouru Ta colère, ni des égarés." },
    ],
  },

};
