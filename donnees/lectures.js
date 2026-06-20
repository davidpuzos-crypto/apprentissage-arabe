/* =========================================================================
   lectures.js — programme progressif de « Lecture du jour »
   Une fois la lecture acquise, on lit chaque jour un peu plus : un mot, puis
   un verset court, un verset plus long, une petite sourate, une plus grande.
   Chaque étape donne l'arabe (mis en avant), la phonétique (révélable), la
   traduction, et un commentaire mêlant langue, étymologie et spiritualité.

   Note d'adab : les commentaires spirituels sont offerts avec humilité, à
   titre d'ouverture. Ils ne remplacent pas l'enseignement vivant d'un maître
   ni les grands tafsīr. Vérifiez, approfondissez, et demandez à vos guides.
   ========================================================================= */

const Lectures = [
  {
    type: 'Mot', titre: 'Le Nom suprême', ar: 'اللَّه', tr: 'allāh', fr: 'Allah',
    commentaire:
      'Commençons par le mot le plus présent du Coran, et le plus immense : اللَّه.\n' +
      'Les savants de la langue diffèrent sur son origine. Beaucoup y voient al-ilāh, « la divinité » par excellence, contracté en un seul mot que rien d\'autre ne peut porter. C\'est le Nom qui rassemble tous les autres noms.\n' +
      'À l\'oral, observez le lām emphatique et appuyé, puis le souffle final du hā. Dans la tradition spirituelle, la simple évocation de ce Nom, le dhikr, est une lumière pour le cœur. Prononcez-le lentement, en conscience.',
  },
  {
    type: 'Mot', titre: 'Le Tout Miséricordieux', ar: 'الرَّحْمَـٰن', tr: 'ar-raḥmān', fr: 'le Tout Miséricordieux',
    commentaire:
      'ar-Raḥmān vient de la racine ر-ح-م, qui désigne aussi le sein maternel, raḥim. La miséricorde divine y est comparée, en plus immense encore, à la tendresse d\'une mère.\n' +
      'ar-Raḥmān dit une miséricorde débordante qui embrasse toute la création, croyants et non-croyants. Son frère ar-Raḥīm, que nous verrons, dit une miséricorde continue et particulière.\n' +
      'Méditez ce point : avant de Se nommer Juge ou Puissant dans l\'ouverture du Livre, Allah Se nomme par la miséricorde. C\'est le climat dans lequel tout le Coran se lit.',
  },
  {
    type: 'Verset', titre: 'La basmala', ar: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ', tr: 'bismi llāhi r-raḥmāni r-raḥīm',
    fr: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.', source: 'Ouverture de presque toute sourate',
    commentaire:
      'Voici la formule par laquelle s\'ouvre presque chaque sourate, et que le croyant prononce avant chaque acte. بِسْمِ se décompose en بِـ (au, par) et اسْم (nom).\n' +
      'Commencer « au nom d\'Allah », c\'est placer son acte sous Son regard et puiser à Sa force, non à la sienne propre. La tradition enseigne qu\'un acte entamé sans elle reste comme tronqué.\n' +
      'Remarquez les deux noms de miséricorde côte à côte, ar-Raḥmān et ar-Raḥīm : l\'immense et le continu. Le croyant entre dans son action enveloppé de cette double miséricorde.',
  },
  {
    type: 'Verset', titre: 'L\'unicité', ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ', tr: 'qul huwa llāhu aḥad',
    fr: 'Dis : il est Allah, Unique.', source: 'al-Ikhlāṣ, 1',
    commentaire:
      'Le mot أَحَد ne signifie pas seulement « un » comme un nombre. Il dit l\'Unicité absolue, sans second, sans partie, sans semblable. Le mot wāḥid compte, le mot aḥad exclut tout autre.\n' +
      'Le verset s\'ouvre par قُلْ, « dis » : c\'est un ordre adressé au Prophète, et à travers lui à chacun. La foi se proclame.\n' +
      'Cette sourate, dit-on, équivaut au tiers du Coran, car elle en contient le cœur : la connaissance d\'Allah dans Son Unicité. La répéter, c\'est revenir à l\'essentiel.',
  },
  {
    type: 'Verset', titre: 'le Soutien', ar: 'اللَّهُ الصَّمَدُ', tr: 'allāhu ṣ-ṣamad',
    fr: 'Allah, le Soutien universel.', source: 'al-Ikhlāṣ, 2',
    commentaire:
      'aṣ-Ṣamad est un mot dense, difficile à traduire d\'un seul terme. Il désigne Celui vers qui tout se tourne dans le besoin, qui ne dépend de rien et dont tout dépend.\n' +
      'On le rend par le Soutien, l\'Absolu, le Recours. La créature a faim, soif, fatigue ; le Ṣamad n\'a aucun manque, aucune brèche.\n' +
      'Spirituellement, ce nom enseigne le tawakkul, la remise confiante : c\'est vers Lui seul que se dirige le cœur dans la détresse, car Lui seul ne fait jamais défaut.',
  },
  {
    type: 'Verset', titre: 'L\'adoration exclusive', ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', tr: 'iyyāka naʿbudu wa-iyyāka nastaʿīn',
    fr: 'C\'est Toi que nous adorons, et c\'est Toi dont nous implorons le secours.', source: 'al-Fātiḥa, 5',
    commentaire:
      'En arabe, placer إِيَّاكَ (Toi) avant le verbe crée une exclusivité : Toi, et nul autre. C\'est le cœur battant de la Fātiḥa et de tout l\'islam.\n' +
      'Notez le passage au « nous » : naʿbudu, nastaʿīn. Le croyant ne prie pas seul, il se tient dans la communauté, devant son Seigneur.\n' +
      'Les maîtres relèvent l\'ordre des deux verbes : d\'abord l\'adoration, ensuite la demande de secours. On donne à Allah Son dû avant de demander pour soi. L\'aide vient à qui se tourne d\'abord vers Lui.',
  },
  {
    type: 'Sourate', titre: 'al-Ikhlāṣ, le Monothéisme pur (112)',
    ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    tr: 'qul huwa llāhu aḥad · allāhu ṣ-ṣamad · lam yalid wa-lam yūlad · wa-lam yakun lahu kufuwan aḥad',
    fr: 'Dis : il est Allah, Unique. Allah, le Soutien universel. Il n\'a pas engendré et n\'a pas été engendré, et nul ne Lui est égal.',
    commentaire:
      'Votre première sourate entière en lecture suivie. Quatre versets qui posent la doctrine de l\'Unicité par la négation de toute ressemblance.\n' +
      'لَمْ يَلِدْ وَلَمْ يُولَدْ écarte la filiation : Allah n\'a ni père ni fils. كُفُوًا أَحَد écarte l\'égal et le semblable : rien dans la création ne Lui ressemble.\n' +
      'Lisez-la lentement, trois fois si vous le pouvez. C\'est une purification du regard intérieur : on ôte de l\'idée d\'Allah tout ce qui appartient aux créatures.',
  },
  {
    type: 'Sourate', titre: 'al-ʿAṣr, le Temps (103)',
    ar: 'وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    tr: 'wa-l-ʿaṣr · inna l-insāna la-fī khusr · illā lladhīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr',
    fr: 'Par le Temps, l\'être humain est certes en perdition, sauf ceux qui croient, accomplissent les bonnes œuvres, s\'enjoignent mutuellement la vérité et s\'enjoignent mutuellement la patience.',
    commentaire:
      'Imam ash-Shāfiʿī disait que si les gens méditaient cette seule sourate, elle leur suffirait. En trois versets, tout le chemin du salut.\n' +
      'Allah jure par le ʿaṣr, le temps qui s\'écoule : notre capital le plus précieux et le plus vite perdu. Tout être y est en perte, sauf quatre exceptions.\n' +
      'Quatre piliers se répondent : la foi (intérieure), l\'œuvre bonne (extérieure), puis deux recommandations mutuelles, la vérité et la patience. La voie ne se marche pas seul : on s\'encourage les uns les autres.',
  },
  {
    type: 'Sourate', titre: 'al-Falaq, l\'Aube (113)',
    ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    tr: 'qul aʿūdhu bi-rabbi l-falaq · min sharri mā khalaq · wa-min sharri ghāsiqin idhā waqab · wa-min sharri n-naffāthāti fī l-ʿuqad · wa-min sharri ḥāsidin idhā ḥasad',
    fr: 'Dis : je cherche refuge auprès du Seigneur de l\'aube, contre le mal de ce qu\'Il a créé, contre le mal de l\'obscurité quand elle s\'étend, contre le mal de celles qui soufflent sur les nœuds, et contre le mal de l\'envieux quand il envie.',
    commentaire:
      'al-Falaq est l\'une des deux sourates de protection, al-muʿawwidhatān. Le mot falaq désigne la fente de l\'aube qui déchire la nuit : une image d\'espérance et de délivrance.\n' +
      'On y cherche refuge contre quatre maux qui vont du général au plus subtil : le mal de la création, celui de la nuit, celui des sortilèges, enfin celui de l\'envie.\n' +
      'Notez que l\'on se réfugie auprès du Rabb, l\'Éducateur qui prend soin. Le croyant ne combat pas le mal par ses seules forces : il s\'abrite auprès de son Seigneur. La récitation au coucher est une pratique recommandée.',
  },
  {
    type: 'Sourate', titre: 'an-Nās, les Hommes (114)',
    ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَـٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    tr: 'qul aʿūdhu bi-rabbi n-nās · maliki n-nās · ilāhi n-nās · min sharri l-waswāsi l-khannās · alladhī yuwaswisu fī ṣudūri n-nās · mina l-jinnati wa-n-nās',
    fr: 'Dis : je cherche refuge auprès du Seigneur des hommes, le Roi des hommes, le Dieu des hommes, contre le mal du tentateur furtif qui souffle le mal dans les poitrines des hommes, qu\'il soit des djinns ou des hommes.',
    commentaire:
      'La sourate qui clôt le Coran. Elle se réfugie contre le mal le plus intérieur de tous : le murmure, al-waswās, qui se glisse dans la poitrine.\n' +
      'Trois noms divins montent en intensité : Rabb (le Seigneur qui éduque), Malik (le Roi qui possède), Ilāh (le Dieu qu\'on adore). Trois degrés de refuge pour un ennemi qui agit dans le secret du cœur.\n' +
      'al-khannās, « le furtif », est celui qui recule et disparaît dès que l\'on évoque Allah. Voilà l\'arme du croyant contre le murmure : le dhikr. Au souvenir d\'Allah, le tentateur bat en retraite.',
  },
  {
    type: 'Sourate', titre: 'al-Kawthar, l\'Abondance (108)',
    ar: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    tr: 'innā aʿṭaynāka l-kawthar · fa-ṣalli li-rabbika wa-nḥar · inna shāni\'aka huwa l-abtar',
    fr: 'Nous t\'avons certes accordé l\'abondance. Prie donc ton Seigneur et sacrifie. Celui qui te hait sera, lui, sans postérité.',
    commentaire:
      'La plus courte sourate du Coran, et l\'une des plus douces. al-Kawthar, de la racine ك-ث-ر (abondance), désigne un bien immense donné au Prophète, et notamment un fleuve du Paradis.\n' +
      'La réponse au don n\'est pas l\'orgueil mais la gratitude en acte : fa-ṣalli, « prie donc », wa-nḥar, « et sacrifie ». Recevoir une grâce appelle à se tourner davantage vers Celui qui donne.\n' +
      'Le dernier verset console : c\'est l\'ennemi du bien qui restera sans suite, tandis que la voie du Prophète, elle, ne cesse de fructifier à travers les siècles.',
  },
  {
    type: 'Sourate', titre: 'al-Fātiḥa, l\'Ouverture (1)',
    ar: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَـٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    tr: 'bismi llāhi r-raḥmāni r-raḥīm · al-ḥamdu li-llāhi rabbi l-ʿālamīn · ar-raḥmāni r-raḥīm · māliki yawmi d-dīn · iyyāka naʿbudu wa-iyyāka nastaʿīn · ihdinā ṣ-ṣirāṭa l-mustaqīm · ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn',
    fr: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux. Louange à Allah, Seigneur des mondes, le Tout Miséricordieux, le Très Miséricordieux, Maître du Jour de la rétribution. C\'est Toi que nous adorons et c\'est Toi dont nous implorons le secours. Guide-nous vers le droit chemin, le chemin de ceux que Tu as comblés de grâces, non de ceux qui ont encouru Ta colère, ni des égarés.',
    commentaire:
      'L\'Ouverture, récitée dans chaque unité de prière, est appelée Umm al-Kitāb, la Mère du Livre, car elle en résume tout le sens.\n' +
      'Elle se partage en deux : la première moitié est louange et reconnaissance d\'Allah (Seigneur, Miséricordieux, Maître du Jour) ; la seconde est demande (guide-nous). Entre les deux, le verset charnière إِيَّاكَ نَعْبُدُ unit l\'adorateur à son Seigneur.\n' +
      'La grande demande de toute la sourate tient en un mot : ihdinā, « guide-nous », vers le ṣirāṭ mustaqīm, le chemin droit. Tout le reste de la vie spirituelle découle de cette requête répétée jour et nuit.\n' +
      'Vous voici au terme du programme : vous lisez et comprenez la sourate qui ouvre le Coran. Reprenez-la souvent ; chaque retour en dévoile une saveur nouvelle.',
  },
];
