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
      'ar-Raḥmān vient de la racine ر-ح-م, qui désigne aussi la matrice maternelle, le raḥim (l\'utérus). La miséricorde divine y est comparée, en plus immense encore, à la tendresse d\'une mère pour l\'enfant qu\'elle porte.\n' +
      'ar-Raḥmān dit une miséricorde débordante qui embrasse toute la création, croyants et non-croyants. Son frère ar-Raḥīm, que nous verrons, dit une miséricorde continue et particulière.\n' +
      'Méditez ce point : avant de Se nommer Juge ou Puissant dans l\'ouverture du Livre, Allah Se nomme par la miséricorde. C\'est le climat dans lequel tout le Coran se lit.',
  },
  {
    type: 'Mot', titre: 'le Très Miséricordieux', ar: 'الرَّحِيم', tr: 'ar-raḥīm', fr: 'le Très Miséricordieux',
    commentaire:
      'ar-Raḥīm partage la racine ر-ح-م avec ar-Raḥmān, mais en dit une autre facette. Là où ar-Raḥmān embrasse toute la création, ar-Raḥīm désigne une miséricorde agissante et continue, tournée en particulier vers les croyants.\n' +
      'Le schème faʿīl (raḥīm, ʿalīm, ḥakīm) exprime souvent une qualité stable, installée. La miséricorde n\'est pas un éclat passager : elle dure.\n' +
      'Les deux noms se suivent dans la basmala, que nous lisons à l\'étape suivante : d\'abord l\'immense, puis le constant. Le croyant avance enveloppé des deux.',
  },
  {
    type: 'Mot', titre: 'le Seigneur', ar: 'رَبّ', tr: 'rabb', fr: 'Seigneur, Éducateur',
    commentaire:
      'رَبّ vient de la racine ر-ب-ب, qui dit bien plus que « maître ». Le rabb est celui qui possède, certes, mais surtout qui nourrit, élève, prend soin et mène une chose à sa perfection, degré après degré.\n' +
      'C\'est par ce nom que s\'ouvre la louange de la Fātiḥa : rabbi l-ʿālamīn, « Seigneur des mondes ». Et c\'est auprès du Rabb que l\'on cherche refuge dans al-Falaq et an-Nās.\n' +
      'Méditez la tendresse cachée dans ce nom : invoquer son Rabb, c\'est s\'adresser à Celui qui nous façonne avec soin, comme un éducateur attentif à chaque pas.',
  },
  {
    type: 'Invocation', titre: 'L\'istighfār — demander pardon', ar: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ', tr: 'astaghfiru llāha l-ʿaẓīm',
    fr: 'Je demande pardon à Allah, l\'Immense.', source: 'Dhikr quotidien',
    commentaire:
      'Voici quelques courtes invocations que l\'on récite régulièrement, seul ou à la suite de la prière. Elles sont brèves, faites de mots que vous connaissez déjà : les apprendre, c\'est nourrir la langue et le cœur en même temps.\n' +
      'Ce n\'est ici qu\'une ouverture, pour goûter et mémoriser quelques formules ; un recueil plus complet pourra venir plus tard.\n' +
      'أَسْتَغْفِرُ se construit sur la racine غ-ف-ر (le pardon, déjà vue dans al-Ghafūr). On commence souvent le dhikr par l\'istighfār : on déblaie le cœur avant d\'y faire entrer la lumière. On le répète volontiers trois fois, matin et soir.',
  },
  {
    type: 'Invocation', titre: 'La ṣalāt sur le Prophète ﷺ', ar: 'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ', tr: 'allāhumma ṣalli ʿalā sayyidinā Muḥammad',
    fr: 'Ô Allah, prie sur notre maître Muhammad.', source: 'Dhikr quotidien',
    commentaire:
      'اللَّهُمَّ (allāhumma) est la forme d\'appel : « Ô Allah ». صَلِّ est l\'impératif du verbe ṣallā, le même que dans fa-ṣalli li-rabbika (al-Kawthar). عَلَىٰ (sur) vous est familier, et سَيِّدِنَا signifie « notre maître ».\n' +
      'Envoyer la ṣalāt sur le Prophète ﷺ est un acte que le croyant multiplie ; on l\'accroît particulièrement le vendredi. C\'est une pierre angulaire de la prière et du dhikr de tout musulman.\n' +
      'On l\'allonge souvent : … وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلِّمْ (« … et sur sa famille et ses compagnons, et accorde-leur le salut »). Commencez par la forme courte, puis ajoutez la suite quand elle vous sera aisée.',
  },
  {
    type: 'Invocation', titre: 'La parole de l\'Unicité', ar: 'لَا إِلَـٰهَ إِلَّا اللَّهُ', tr: 'lā ilāha illā llāh',
    fr: 'Il n\'est de divinité sinon Allah.', source: 'Le dhikr par excellence',
    commentaire:
      'C\'est la parole la plus dense de l\'islam, et le cœur du dhikr. لَا (non) nie ; إِلَّا (sauf, déjà vu) excepte : on écarte toute fausse divinité, puis on n\'affirme que Lui.\n' +
      'On décrit souvent un mouvement intérieur : avec لَا إِلَـٰهَ on ôte du cœur tout ce qui n\'est pas Lui ; avec إِلَّا اللَّهُ on y installe Sa seule présence. La langue accompagne ce que le cœur accomplit.\n' +
      'Beaucoup la répètent en silence ou à voix basse, le regard intérieur tourné vers le cœur. Une seule phrase, et tout le tawḥīd y tient.',
  },
  {
    type: 'Invocation', titre: 'Tasbīḥ, taḥmīd, takbīr', ar: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَـٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ', tr: 'subḥāna llāh · wa-l-ḥamdu li-llāh · wa-lā ilāha illā llāh · wa-llāhu akbar',
    fr: 'Gloire à Allah, louange à Allah, il n\'est de divinité sinon Allah, et Allah est le plus grand.', source: 'al-bāqiyāt aṣ-ṣāliḥāt',
    commentaire:
      'Quatre formules enfilées par le وَ de liaison, qu\'on appelle les bāqiyāt aṣ-ṣāliḥāt, « les bonnes œuvres qui demeurent ». سُبْحَانَ اللَّهِ déclare Allah pur de tout défaut ; الْحَمْدُ لِلَّهِ Lui rend la louange (déjà vu) ; puis l\'Unicité ; puis اللَّهُ أَكْبَرُ, « Allah est plus grand » que tout.\n' +
      'On les récite souvent après chaque prière obligatoire, généralement trente-trois fois pour les premières. Elles tiennent dans la main, sur les phalanges ou le chapelet (subḥa).\n' +
      'Remarquez comme vous lisez maintenant une longue suite sans peine : article, annexion, négation, liaison — toute votre grammaire est là, au service du dhikr.',
  },
  {
    type: 'Invocation', titre: 'La ḥawqala — il n\'est de force qu\'en Allah', ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', tr: 'lā ḥawla wa-lā quwwata illā bi-llāh',
    fr: 'Il n\'est de puissance ni de force qu\'en Allah.', source: 'Dhikr de la remise confiante',
    commentaire:
      'On l\'appelle la ḥawqala. لَا … وَلَا … nie deux fois : ni ḥawl (le pouvoir de changer les choses), ni quwwa (la force), إِلَّا بِاللَّهِ « sinon par Allah ». La préposition collée بِـ dit le moyen : c\'est par Lui, non par soi.\n' +
      'On la dit dans l\'épreuve, la fatigue, ou devant une tâche qui dépasse ses forces : elle remet l\'affaire à Celui qui détient toute capacité. Un trésor du Paradis, selon le ḥadīth.\n' +
      'Spirituellement, elle éteint la prétention du « moi » : ce n\'est pas ma force, c\'est la Sienne. Le serviteur s\'efface, et trouve le repos dans cet effacement.',
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
    type: 'Verset', titre: 'La louange', ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', tr: 'al-ḥamdu li-llāhi rabbi l-ʿālamīn',
    fr: 'Louange à Allah, Seigneur des mondes.', source: 'al-Fātiḥa, 2',
    commentaire:
      'Le Livre s\'ouvre, après la basmala, par la louange. الْحَمْد, c\'est la louange qui est à la fois reconnaissance et amour : on loue Allah pour ce qu\'Il fait, et pour ce qu\'Il est.\n' +
      'Décomposez : al-ḥamdu (la louange) li-llāhi (à Allah, avec le لِـ d\'appartenance) rabbi l-ʿālamīn (Seigneur des mondes). Vous reconnaissez la préposition collée et l\'annexion rabbi + ʿālamīn.\n' +
      'Commencer par louer avant de demander : c\'est l\'ordre même de la Fātiḥa, et une politesse du cœur envers son Seigneur.',
  },
  {
    type: 'Verset', titre: 'le Maître du Jour', ar: 'مَالِكِ يَوْمِ الدِّينِ', tr: 'māliki yawmi d-dīn',
    fr: 'Maître du Jour de la rétribution.', source: 'al-Fātiḥa, 4',
    commentaire:
      'Trois mots, deux annexions emboîtées : mālik (maître) de yawm (jour) de d-dīn (la rétribution). Le génie de l\'arabe : enchaîner les noms sans préposition pour dire « le maître du jour de la rétribution ».\n' +
      'Le mot دِين porte ici le sens de « rétribution, jugement », mais c\'est le même mot que « religion » : la religion est ce selon quoi l\'on sera jugé.\n' +
      'Après la miséricorde vient la justice : Allah est Raḥmān et Raḥīm, et Il est aussi Maître du Jour où chacun retrouvera ses actes. Crainte et espérance, les deux ailes du croyant.',
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
    type: 'Verset', titre: 'La grande demande', ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', tr: 'ihdinā ṣ-ṣirāṭa l-mustaqīm',
    fr: 'Guide-nous vers le droit chemin.', source: 'al-Fātiḥa, 6',
    commentaire:
      'Voici le cœur de la prière : une demande, ihdinā, « guide-nous ». Le verbe hadā (guider), que vous connaissez, reçoit le pronom suffixe ـنَا (nous).\n' +
      'الصِّرَاط est le chemin large et droit ; مُسْتَقِيم (droit, qui se tient droit) est son adjectif épithète, qui le suit et reprend l\'article. On reconnaît la structure : nom défini + adjectif défini.\n' +
      'De tout ce qu\'il pourrait demander, le croyant demande d\'abord la guidance. Le reste — santé, subsistance, réussite — n\'a de valeur que sur le chemin droit. On répète cette demande dans chaque prière, jour après jour.',
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
  {
    type: 'Sourate', titre: 'an-Naṣr, le Secours (110) — pour continuer',
    ar: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا',
    tr: 'idhā jāʾa naṣru llāhi wa-l-fatḥ · wa-raʾayta n-nāsa yadkhulūna fī dīni llāhi afwājā · fa-sabbiḥ bi-ḥamdi rabbika wa-staghfirhu innahu kāna tawwābā',
    fr: 'Lorsque viennent le secours d\'Allah et la victoire, et que tu vois les gens entrer en foule dans la religion d\'Allah, alors glorifie ton Seigneur par la louange et implore Son pardon. Certes, Il est Celui qui accueille le repentir.',
    commentaire:
      'Une nouvelle sourate, pour montrer que la route continue. Vous y reconnaissez déjà beaucoup : naṣr (le secours), an-nās (les gens), dīn (la religion), yadkhulūna (ils entrent, de dakhala), bi-ḥamdi (par la louange), rabbika (ton Seigneur, avec le suffixe ـكَ).\n' +
      'On la dit révélée vers la fin de la vie du Prophète ﷺ : à l\'heure du triomphe, l\'ordre n\'est pas de se glorifier, mais de glorifier Allah et de demander pardon. La victoire véritable rend humble.\n' +
      'تَوَّاب, sur le schème intensif faʿʿāl, dit Celui qui ne cesse d\'accueillir le repentir, encore et encore. Quel que soit l\'éloignement, la porte du retour reste ouverte. Voilà de quoi reprendre, demain, une sourate de plus.',
  },
];
