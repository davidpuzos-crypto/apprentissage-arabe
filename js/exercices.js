/* =========================================================================
   exercices.js — générateurs et rendu des exercices interactifs
   Types : qcm, appariement, glisser, trous, saisie, oral, racine,
           decomposition, phonetique,
           texteLibre (saisie d'un mot manquant au clavier),
           contexte (sélection grammaticale selon le sujet de la phrase),
           dialogue (compréhension d'une question/réplique : choix ou saisie).
   Aide : tout exercice peut porter `aides:[{ar,fr}]` ; un bouton discret
          « Aide : voir la traduction » est alors injecté automatiquement.
   Interface : Exercices.rendre(exo, index, conteneur, surReponse, idLecon)
   surReponse(reussi, cles) est appelé une seule fois, à la validation.
   ========================================================================= */

const Exercices = (function () {

  function melanger(tab) {
    const a = tab.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, classe, contenu) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (contenu != null) e.innerHTML = contenu;
    return e;
  }

  function boutonAudio(texte, idLecon) {
    const b = el('button', 'btn-audio');
    b.type = 'button';
    b.innerHTML = '&#9834;';
    b.setAttribute('aria-label', 'Écouter');
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      Parole.prononcer(texte, { rate: Parole.rateSelonLecon(idLecon || 1) });
    });
    return b;
  }

  // Crée le bloc retour + bouton vérifier, gère le verrouillage unique.
  function cadre(exo, index, conteneur) {
    const carte = el('div', 'exercice apparait');
    const num = el('span', 'exercice-numero', 'Exercice ' + romain(index + 1));
    const consigne = el('div', 'consigne', exo.consigne || '');
    carte.appendChild(num);
    carte.appendChild(consigne);
    conteneur.appendChild(carte);
    return carte;
  }

  function ajouterRetour(carte) {
    const retour = el('div', 'retour-exo');
    carte.appendChild(retour);
    return retour;
  }

  function montrerRetour(retour, reussi, msgBon, msgMoins) {
    retour.className = 'retour-exo visible ' + (reussi ? 'bon' : 'moins');
    retour.innerHTML = reussi
      ? (msgBon || 'Très bien. C\'est exact.')
      : (msgMoins || 'Pas tout à fait. Observez la correction et reprenez à tête reposée.');
  }

  function romain(n) {
    const v = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return v[n] || String(n);
  }

  /* Aide à la traduction (discrète) : un bouton « Traduction » révèle le sens
     français. `aide` peut être une chaîne (traduction de la phrase) ou un
     tableau de gloses [{ar, fr}] pour expliquer mot à mot le vocabulaire neuf.
     Sert à ne jamais bloquer l'utilisateur et à introduire plus de vocabulaire. */
  function ajouterAide(carte, aide) {
    if (!aide) return;
    const wrap = el('div', 'aide-trad');
    const btn = el('button', 'aide-bouton'); btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span aria-hidden="true">💡</span> Traduction';
    const contenu = el('div', 'aide-contenu');
    if (Array.isArray(aide)) {
      aide.forEach((g) => {
        const m = el('span', 'aide-mot');
        const ar = el('span', 'aide-ar'); ar.textContent = g.ar;
        const fr = el('span', 'aide-fr'); fr.textContent = g.fr;
        m.appendChild(ar); m.appendChild(fr); contenu.appendChild(m);
      });
    } else {
      contenu.textContent = aide;
    }
    btn.addEventListener('click', () => {
      const ouvert = wrap.classList.toggle('ouvert');
      btn.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
    wrap.appendChild(btn); wrap.appendChild(contenu);
    carte.appendChild(wrap);
  }

  /* ====================================================================
     1. QCM de reconnaissance
     { type:'qcm', consigne, enonceAr?, enonce?, options:[{ar?,texte?}], bonne, explication?, cles? }
     ==================================================================== */
  function qcm(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.enonceAr) {
      const e = el('div', 'enonce-ar');
      e.appendChild(document.createTextNode(exo.enonceAr));
      e.appendChild(boutonAudio(exo.enonceAr, idLecon));
      carte.appendChild(e);
    }
    if (exo.enonce) carte.appendChild(el('p', null, exo.enonce));
    ajouterAide(carte, exo.aide);

    const liste = el('div', 'options-qcm');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option');
      b.type = 'button';
      if (opt.ar) {
        const s = el('span', 'ar-opt'); s.textContent = opt.ar; b.appendChild(s);
      }
      if (opt.texte) b.appendChild(document.createTextNode(opt.texte));
      if (opt.aide) b.title = opt.aide; // survol discret : aide à la traduction
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
        b.classList.add(reussi ? 'anim-pop' : 'anim-secousse');
        if (!reussi) liste.children[exo.bonne].classList.add('juste');
        montrerRetour(retour, reussi,
          'Très bien, c\'est exact.',
          'La bonne réponse est mise en évidence.');
        surReponse(reussi, exo.cles);
      });
      liste.appendChild(b);
    });
    carte.appendChild(liste);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     2. Appariement (mot arabe <-> traduction)
     { type:'appariement', consigne, paires:[{ar, fr, cle?}] }
     ==================================================================== */
  function appariement(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const zone = el('div', 'zone-appariement');
    const colA = el('div', 'colonne-app');
    const colB = el('div', 'colonne-app');

    const gauche = melanger(exo.paires.map((p, i) => ({ ...p, i })));
    const droite = melanger(exo.paires.map((p, i) => ({ ...p, i })));

    let selection = null;
    let apparies = 0;
    let erreurs = 0;

    gauche.forEach((p) => {
      const j = el('div', 'jeton-app');
      const s = el('span', 'ar-j'); s.textContent = p.ar; j.appendChild(s);
      j.dataset.i = p.i;
      j.addEventListener('click', () => choisir(j, 'g'));
      colA.appendChild(j);
    });
    droite.forEach((p) => {
      const j = el('div', 'jeton-app', p.fr);
      j.dataset.i = p.i;
      j.addEventListener('click', () => choisir(j, 'd'));
      colB.appendChild(j);
    });

    zone.appendChild(colA); zone.appendChild(colB);
    carte.appendChild(zone);

    // Consigne tactile, essentielle sur mobile : le geste « toucher un mot,
    // puis sa correspondance » n'est pas évident. Elle guide à chaque étape,
    // et la colonne où il faut toucher ensuite est mise en valeur (.guide).
    const consigneTactile = el('div', 'app-consigne');
    const TXT_DEFAUT = 'Touchez un mot, puis sa correspondance dans l\'autre colonne.';
    consigneTactile.textContent = TXT_DEFAUT;
    carte.appendChild(consigneTactile);

    function majGuide() {
      colA.classList.toggle('guide', !!selection && selection.cote === 'd');
      colB.classList.toggle('guide', !!selection && selection.cote === 'g');
      if (!selection) {
        consigneTactile.textContent = TXT_DEFAUT;
        consigneTactile.classList.remove('actif');
        return;
      }
      consigneTactile.classList.add('actif');
      consigneTactile.textContent = selection.cote === 'g'
        ? 'Bien ! Touchez maintenant sa traduction, dans la colonne de droite.'
        : 'Bien ! Touchez maintenant le mot arabe correspondant, à gauche.';
    }

    function choisir(jeton, cote) {
      if (jeton.classList.contains('apparie')) return;
      if (!selection) { selection = { jeton, cote }; jeton.classList.add('selection'); majGuide(); return; }
      if (selection.jeton === jeton) { jeton.classList.remove('selection'); selection = null; majGuide(); return; }
      if (selection.cote === cote) {
        selection.jeton.classList.remove('selection');
        selection = { jeton, cote };
        jeton.classList.add('selection');
        majGuide();
        return;
      }
      // Tentative d'appariement (colonnes opposées)
      if (selection.jeton.dataset.i === jeton.dataset.i) {
        jeton.classList.add('apparie');
        selection.jeton.classList.add('apparie');
        selection.jeton.classList.remove('selection');
        apparies++;
        Parole.prononcer(exo.paires[+jeton.dataset.i].ar, { rate: Parole.rateSelonLecon(idLecon) });
        selection = null;
        if (apparies === exo.paires.length) {
          const msg = erreurs === 0
            ? 'Sans faute : toutes les paires reliées du premier coup.'
            : 'Bravo, toutes les paires sont reliées (après ' + erreurs + ' essai' + (erreurs > 1 ? 's' : '') + ' de trop). Ces mots se préciseront avec la répétition.';
          montrerRetour(retour, true, msg, msg);
          colA.classList.remove('guide'); colB.classList.remove('guide');
          consigneTactile.textContent = 'Toutes les paires sont reliées.';
          consigneTactile.classList.remove('actif');
          const cles = exo.paires.map((p) => p.cle).filter(Boolean);
          surReponse(true, cles);
          return;
        }
        majGuide();
      } else {
        erreurs++;
        selection.jeton.classList.remove('selection');
        jeton.classList.add('faux');
        setTimeout(() => jeton.classList.remove('faux'), 500);
        selection = null;
        majGuide();
      }
    }

    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     3. Glisser-déposer : reconstituer une phrase
     { type:'glisser', consigne, ordre:[mots arabes dans le bon ordre], traduction?, cles? }
     ==================================================================== */
  function glisser(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.traduction) carte.appendChild(el('p', 'muet', exo.traduction));

    const cible = el('div', 'zone-cible');
    cible.setAttribute('aria-label', 'Zone de construction de la phrase');
    const reserve = el('div', 'zone-mots');

    const melange = melanger(exo.ordre.map((m, i) => ({ m, i })));
    melange.forEach((o) => {
      const j = el('div', 'mot-glissable');
      j.textContent = o.m;
      j.dataset.i = o.i;
      j.draggable = true;
      // Clic : bascule réserve <-> cible (alternative tactile au glisser)
      j.addEventListener('click', () => {
        if (j.parentElement === reserve) cible.appendChild(j);
        else reserve.appendChild(j);
      });
      j.addEventListener('dragstart', () => j.classList.add('dragging'));
      j.addEventListener('dragend', () => j.classList.remove('dragging'));
      reserve.appendChild(j);
    });

    [cible, reserve].forEach((zone) => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        const apres = elementApres(zone, e.clientX);
        const enCours = document.querySelector('.dragging');
        if (!enCours) return;
        if (apres == null) zone.appendChild(enCours);
        else zone.insertBefore(enCours, apres);
      });
    });

    function elementApres(zone, x) {
      const jetons = [...zone.querySelectorAll('.mot-glissable:not(.dragging)')];
      return jetons.reduce((proche, enfant) => {
        const r = enfant.getBoundingClientRect();
        const decalage = x - r.left - r.width / 2;
        // RTL : on cherche le plus proche à droite
        if (decalage < 0 && decalage > proche.decalage) return { decalage, element: enfant };
        return proche;
      }, { decalage: -Infinity, element: null }).element;
    }

    const btn = el('button', 'btn btn-petit', 'Vérifier');
    btn.type = 'button';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      valide = true;
      const ordreActuel = [...cible.querySelectorAll('.mot-glissable')].map((j) => +j.dataset.i);
      const reussi = ordreActuel.length === exo.ordre.length &&
        ordreActuel.every((v, i) => v === i);
      if (reussi) {
        montrerRetour(retour, true, 'La phrase est correctement ordonnée.');
        Parole.prononcer(exo.ordre.join(' '), { rate: Parole.rateSelonLecon(idLecon) });
      } else {
        // Affiche le bon ordre
        cible.innerHTML = '';
        exo.ordre.forEach((m) => {
          const j = el('div', 'mot-glissable'); j.textContent = m; cible.appendChild(j);
        });
        reserve.innerHTML = '';
        montrerRetour(retour, false, null, 'Voici l\'ordre attendu. Lisez la phrase de droite à gauche.');
      }
      btn.disabled = true;
      surReponse(reussi, exo.cles);
    });

    carte.appendChild(cible);
    carte.appendChild(reserve);
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     4. Texte à trous
     { type:'trous', consigne, segments:[ 'texte' | {options:[...], bonne} ], traduction?, cles? }
     ==================================================================== */
  function trous(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.traduction) carte.appendChild(el('p', 'muet centre', exo.traduction));
    ajouterAide(carte, exo.aide);
    const phrase = el('div', 'texte-trous');
    const selects = [];
    exo.segments.forEach((seg) => {
      if (typeof seg === 'string') {
        phrase.appendChild(document.createTextNode(seg + ' '));
      } else {
        const trou = el('span', 'trou');
        const sel = document.createElement('select');
        sel.appendChild(new Option('…', ''));
        melanger(seg.options.map((o, i) => ({ o, i }))).forEach(({ o, i }) => {
          sel.appendChild(new Option(o, i));
        });
        trou.appendChild(sel);
        phrase.appendChild(trou);
        phrase.appendChild(document.createTextNode(' '));
        selects.push({ sel, bonne: seg.bonne });
      }
    });
    const btn = el('button', 'btn btn-petit', 'Vérifier');
    btn.type = 'button';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      valide = true;
      const reussi = selects.every((s) => +s.sel.value === s.bonne);
      selects.forEach((s) => {
        s.sel.value = s.bonne; // affiche la bonne réponse
        s.sel.disabled = true;
      });
      montrerRetour(retour, reussi,
        'Tous les mots manquants sont à leur place.',
        'Les bons mots sont désormais affichés. Relisez l\'ensemble.');
      btn.disabled = true;
      surReponse(reussi, exo.cles);
    });
    carte.appendChild(phrase);
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     5. Saisie au clavier (clavier arabe virtuel)
     { type:'saisie', consigne, indice?, reponse:'arabe attendu', cles? }
     ==================================================================== */
  function saisie(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.indice) carte.appendChild(el('p', 'centre', exo.indice));
    const champ = document.createElement('input');
    champ.type = 'text';
    champ.className = 'zone-saisie';
    champ.setAttribute('aria-label', 'Saisie en arabe');
    champ.dir = 'rtl';
    ClavierArabe.attacher(champ);
    const btn = el('button', 'btn btn-petit', 'Vérifier');
    btn.type = 'button';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      const score = Parole.similarite(exo.reponse, champ.value);
      const reussi = score >= 80;
      valide = true;
      champ.disabled = true;
      ClavierArabe.fermer();
      const corr = el('div', 'a-memoriser');
      corr.style.marginTop = '0.8rem';
      corr.innerHTML = '<div class="ar">' + exo.reponse + '</div>';
      carte.insertBefore(corr, retour);
      montrerRetour(retour, reussi,
        'Saisie correcte (' + score + '% de correspondance).',
        'Comparez votre saisie au modèle ci-dessus (' + score + '% de correspondance).');
      btn.disabled = true;
      surReponse(reussi, exo.cles);
    });
    carte.appendChild(champ);
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     6. Lecture à voix haute (reconnaissance vocale)
     { type:'oral', consigne, phraseAr, translit, cles? }
     ==================================================================== */
  function oral(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const zone = el('div', 'zone-orale');
    const phrase = el('div', 'enonce-ar');
    phrase.appendChild(document.createTextNode(exo.phraseAr));
    phrase.appendChild(boutonAudio(exo.phraseAr, idLecon));
    zone.appendChild(phrase);
    if (exo.translit) {
      const ph = el('p', 'centre');
      ph.innerHTML = (typeof App !== 'undefined') ? App.phon(exo.translit) : '<span class="translit">' + exo.translit + '</span>';
      zone.appendChild(ph);
    }

    if (!Parole.disponibleReconnaissance()) {
      const info = el('p', 'muet petit centre',
        'La reconnaissance vocale n\'est pas disponible sur ce navigateur. ' +
        'Écoutez le modèle, répétez à voix haute, puis validez par vous même.');
      zone.appendChild(info);
      const b = el('button', 'btn btn-petit', 'J\'ai répété cette phrase');
      b.type = 'button';
      let fait = false;
      b.addEventListener('click', () => { if (fait) return; fait = true; b.disabled = true; montrerRetour(retour, true, 'Continuez à répéter jusqu\'à l\'aisance.'); surReponse(true, exo.cles); });
      zone.appendChild(b);
      carte.appendChild(zone);
      const retour = ajouterRetour(carte);
      return;
    }

    const micro = el('button', 'btn-micro');
    micro.type = 'button';
    micro.innerHTML = '&#127908;';
    micro.setAttribute('aria-label', 'Parler');
    const detail = el('div', 'petit muet');
    detail.style.marginTop = '0.8rem';

    // Boutons réessayer / valider, affichés après une tentative ratée.
    const actions = el('div'); actions.style.cssText = 'display:flex;gap:0.6rem;justify-content:center;margin-top:0.8rem;flex-wrap:wrap;';
    const btnReessayer = el('button', 'btn btn-secondaire btn-petit', 'Réessayer');
    btnReessayer.type = 'button';
    const btnValider = el('button', 'btn-fantome petit', 'Valider et continuer');
    btnValider.type = 'button';
    actions.appendChild(btnReessayer); actions.appendChild(btnValider);
    actions.style.display = 'none';

    let succes = false, compte = false;

    function tenter() {
      if (succes) return;
      actions.style.display = 'none';
      micro.disabled = false;
      micro.classList.add('ecoute');
      detail.textContent = 'Je vous écoute, prononcez la phrase…';
      Parole.ecouter({
        surResultat: (alternatives) => {
          const { texte, score } = Parole.meilleureAlternative(exo.phraseAr, alternatives);
          const reussi = score >= 60;
          micro.classList.remove('ecoute');
          const mots = Parole.motsReconnus(exo.phraseAr, texte);
          const detailMots = mots.map((m) =>
            '<span style="color:' + (m.reconnu ? 'var(--succes)' : 'var(--erreur)') + '">' + m.mot + '</span>'
          ).join(' ');
          detail.innerHTML = 'Reconnu : <span class="arabe-inline">' + (texte || '—') +
            '</span><br>Score : ' + score + '%<br>Mots : ' + detailMots;
          if (reussi) {
            succes = true; micro.disabled = true;
            montrerRetour(retour, true, 'Prononciation reconnue à ' + score + '%. Beau travail.');
            if (!compte) { compte = true; surReponse(true, exo.cles); }
          } else {
            // On NE verrouille pas : l'élève peut réessayer autant qu'il veut.
            montrerRetour(retour, false, null, 'Score de ' + score + '%. Réécoutez le modèle, puis réessayez sans vous presser.');
            actions.style.display = 'flex';
          }
        },
        surErreur: () => {
          micro.classList.remove('ecoute');
          detail.textContent = 'La captation a échoué. Réessayez dans un endroit calme.';
          actions.style.display = 'flex';
        },
        surFin: () => micro.classList.remove('ecoute'),
      });
    }

    micro.addEventListener('click', tenter);
    btnReessayer.addEventListener('click', tenter);
    btnValider.addEventListener('click', () => {
      if (succes || compte) return;
      compte = true; micro.disabled = true; actions.style.display = 'none';
      montrerRetour(retour, false, null, 'Vous pourrez revenir prononcer cette phrase plus tard ; l\'aisance vient avec la répétition.');
      surReponse(false, exo.cles);
    });

    zone.appendChild(micro);
    zone.appendChild(detail);
    zone.appendChild(actions);
    carte.appendChild(zone);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     7. Identification de la racine (cycle 3+)
     { type:'racine', consigne, mot, racine:['ك','ت','ب'], lettres?:[pool], cles? }
     ==================================================================== */
  function racine(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const mot = el('div', 'enonce-ar');
    mot.appendChild(document.createTextNode(exo.mot));
    mot.appendChild(boutonAudio(exo.mot, idLecon));
    carte.appendChild(mot);

    const cases = el('div', 'cases-racine');
    const champs = exo.racine.map(() => {
      const c = document.createElement('input');
      c.className = 'case-racine'; c.maxLength = 1; c.dir = 'rtl';
      c.setAttribute('readonly', 'true');
      cases.appendChild(c);
      return c;
    });
    carte.appendChild(cases);

    // Réserve de lettres candidates
    const pool = exo.lettres || melanger([...new Set(exo.racine.concat(exo.distracteurs || []))]);
    const reserve = el('div', 'zone-decompo');
    reserve.style.marginTop = '1rem';
    let curseur = 0;
    melanger(pool).forEach((lettre) => {
      const t = el('button', 'touche-ar'); t.type = 'button'; t.textContent = lettre;
      t.style.flex = '0 0 auto'; t.style.minWidth = '52px'; t.style.height = '52px'; t.style.fontSize = '1.7rem';
      t.addEventListener('click', () => {
        if (curseur < champs.length) { champs[curseur].value = lettre; curseur++; }
      });
      reserve.appendChild(t);
    });
    carte.appendChild(reserve);

    const actions = el('div'); actions.style.marginTop = '0.8rem'; actions.style.display = 'flex'; actions.style.gap = '0.6rem';
    const btn = el('button', 'btn btn-petit', 'Vérifier'); btn.type = 'button';
    const reset = el('button', 'btn-secondaire btn-petit', 'Recommencer'); reset.type = 'button';
    reset.addEventListener('click', () => { champs.forEach((c) => c.value = ''); curseur = 0; });
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      valide = true;
      const saisi = champs.map((c) => c.value);
      const reussi = saisi.every((v, i) => v === exo.racine[i]);
      champs.forEach((c, i) => c.value = exo.racine[i]);
      montrerRetour(retour, reussi,
        'Racine identifiée : ' + exo.racine.join(' ') + '. Cette racine porte le sens du mot.',
        'La racine était ' + exo.racine.join(' ') + '. Repérez ces consonnes dans le mot.');
      btn.disabled = true; reset.disabled = true;
      surReponse(reussi, exo.cles);
    });
    actions.appendChild(btn); actions.appendChild(reset);
    carte.appendChild(actions);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     8. Décomposition de mot (préfixes, racine, suffixes — cycle 4+)
     { type:'decomposition', consigne, segments:[{ar, role}], roles:[...], cles? }
     ==================================================================== */
  function decomposition(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const roles = exo.roles || ['préfixe', 'racine', 'suffixe'];
    const zone = el('div', 'zone-decompo');
    const selects = [];
    exo.segments.forEach((seg) => {
      const bloc = el('div', 'segment');
      const ar = el('div', 'ar-s'); ar.textContent = seg.ar; bloc.appendChild(ar);
      const sel = document.createElement('select');
      sel.className = 'ui'; sel.style.fontSize = '0.8rem'; sel.style.marginTop = '0.4rem';
      sel.appendChild(new Option('rôle ?', ''));
      roles.forEach((r) => sel.appendChild(new Option(r, r)));
      bloc.appendChild(sel);
      zone.appendChild(bloc);
      selects.push({ sel, bon: seg.role });
    });
    carte.appendChild(zone);
    const btn = el('button', 'btn btn-petit', 'Vérifier'); btn.type = 'button';
    btn.style.marginTop = '0.8rem';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      valide = true;
      const reussi = selects.every((s) => s.sel.value === s.bon);
      selects.forEach((s) => { s.sel.value = s.bon; s.sel.disabled = true; });
      montrerRetour(retour, reussi,
        'Décomposition juste. Vous voyez comment le mot est bâti.',
        'Voici la bonne analyse. Le mot se lit : ' + exo.segments.map((s) => s.role).join(' + ') + '.');
      btn.disabled = true;
      surReponse(reussi, exo.cles);
    });
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     9. Phonétique : lire le mot arabe, choisir la bonne transcription
     { type:'phonetique', consigne, motAr, options:[translit...], bonne, cles? }
     L'arabe est mis en avant ; les options sont des transcriptions.
     ==================================================================== */
  function phonetique(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const e = el('div', 'enonce-ar');
    e.appendChild(document.createTextNode(exo.motAr));
    e.appendChild(boutonAudio(exo.motAr, idLecon));
    carte.appendChild(e);
    const liste = el('div', 'options-qcm');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option');
      b.type = 'button';
      const s = el('span', 'translit'); s.textContent = opt; b.appendChild(s);
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
        b.classList.add(reussi ? 'anim-pop' : 'anim-secousse');
        if (!reussi) liste.children[exo.bonne].classList.add('juste');
        montrerRetour(retour, reussi,
          'Bonne lecture. La transcription est exacte.',
          'La bonne transcription est mise en évidence. Réécoutez le mot.');
        surReponse(reussi, exo.cles);
      });
      liste.appendChild(b);
    });
    carte.appendChild(liste);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     10. Texte à trous LIBRE (saisie au clavier dans une phrase)
     { type:'trou_libre', consigne, segments:[ 'texte' | {reponse:'mot ar'} ],
       traduction?, indice?, aide?, cles? }
     L'utilisateur écrit lui-même le mot manquant (pas de liste).
     ==================================================================== */
  function trou_libre(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.traduction) carte.appendChild(el('p', 'muet centre', exo.traduction));
    ajouterAide(carte, exo.aide);
    const phrase = el('div', 'texte-trous');
    const champs = [];
    exo.segments.forEach((seg) => {
      if (typeof seg === 'string') {
        phrase.appendChild(document.createTextNode(seg + ' '));
      } else {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.className = 'trou-saisie'; inp.dir = 'rtl';
        inp.setAttribute('aria-label', 'mot manquant');
        if (typeof ClavierArabe !== 'undefined') ClavierArabe.attacher(inp);
        phrase.appendChild(inp);
        phrase.appendChild(document.createTextNode(' '));
        champs.push({ inp, reponse: seg.reponse });
      }
    });
    carte.appendChild(phrase);
    if (exo.indice) carte.appendChild(el('p', 'muet petit centre', 'Indice : ' + exo.indice));
    const btn = el('button', 'btn btn-petit', 'Vérifier'); btn.type = 'button';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return; valide = true;
      let bon = true;
      champs.forEach((c) => {
        const score = Parole.similarite(c.reponse, c.inp.value);
        const ok = score >= 80; if (!ok) bon = false;
        c.inp.classList.add(ok ? 'juste' : 'faux');
        c.inp.value = c.reponse; c.inp.disabled = true; // affiche la graphie attendue
      });
      if (typeof ClavierArabe !== 'undefined') ClavierArabe.fermer();
      montrerRetour(retour, bon,
        'Bien écrit, la graphie est juste.',
        'Voici la graphie attendue : comparez lettre à lettre.');
      btn.disabled = true;
      surReponse(bon, exo.cles);
    });
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     Aide à la traduction (discrète, générique)
     Toute consigne d'exercice peut porter un champ `aides:[{ar,fr}]`.
     On affiche alors un petit bouton « Aide au vocabulaire » qui dévoile,
     à la demande, la traduction française des mots employés. Ainsi
     l'apprenant n'est jamais bloqué et découvre du vocabulaire en contexte.
     Injecté automatiquement par `rendre`, sans toucher aux types.
     ==================================================================== */
  function construireAide(aides, idLecon) {
    const box = el('div', 'exo-aide');
    const b = el('button', 'exo-aide-bouton');
    b.type = 'button';
    b.setAttribute('aria-expanded', 'false');
    b.innerHTML = '<span class="aa-ic">💡</span> Aide&nbsp;: voir la traduction';
    const contenu = el('div', 'exo-aide-contenu');
    aides.forEach((a) => {
      const ligne = el('div', 'exo-aide-ligne');
      const ar = el('span', 'aa-ar');
      ar.textContent = a.ar;
      ar.appendChild(boutonAudio(a.ar, idLecon));
      const fr = el('span', 'aa-fr', a.fr);
      ligne.appendChild(ar);
      ligne.appendChild(fr);
      contenu.appendChild(ligne);
    });
    b.addEventListener('click', () => {
      const ouverte = box.classList.toggle('ouverte');
      b.setAttribute('aria-expanded', ouverte ? 'true' : 'false');
    });
    box.appendChild(b);
    box.appendChild(contenu);
    return box;
  }

  /* ====================================================================
     10. Texte à trous libre (saisie au clavier d'un mot manquant)
     { type:'texteLibre', consigne, avant?, apres?, reponse:'mot arabe',
       indice?, traduction?, aides?, cles? }
     L'apprenant écrit lui-même le mot manquant, il ne choisit pas.
     ==================================================================== */
  function texteLibre(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.traduction) carte.appendChild(el('p', 'muet centre', exo.traduction));

    const phrase = el('div', 'phrase-libre');
    if (exo.avant) phrase.appendChild(document.createTextNode(exo.avant + ' '));
    const champ = document.createElement('input');
    champ.type = 'text';
    champ.className = 'champ-trou';
    champ.dir = 'rtl';
    champ.setAttribute('aria-label', 'Mot à écrire');
    if (exo.indice) champ.placeholder = exo.indice;
    ClavierArabe.attacher(champ);
    phrase.appendChild(champ);
    if (exo.apres) phrase.appendChild(document.createTextNode(' ' + exo.apres));
    carte.appendChild(phrase);

    const btn = el('button', 'btn btn-petit', 'Vérifier');
    btn.type = 'button';
    let valide = false;
    btn.addEventListener('click', () => {
      if (valide) return;
      valide = true;
      const score = Parole.similarite(exo.reponse, champ.value);
      const reussi = score >= 80;
      champ.disabled = true;
      ClavierArabe.fermer();
      const corr = el('div', 'a-memoriser');
      corr.style.marginTop = '0.8rem';
      corr.innerHTML = '<div class="ar">' + exo.reponse + '</div>';
      carte.insertBefore(corr, retour);
      montrerRetour(retour, reussi,
        'Bien écrit (' + score + '% de correspondance).',
        'Le mot attendu est affiché ci-dessus (' + score + '% de correspondance). Comparez, puis réessayez à tête reposée.');
      btn.disabled = true;
      surReponse(reussi, exo.cles);
    });
    carte.appendChild(btn);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     11. Sélection contextuelle (article, préfixe, conjugaison, accord…)
     { type:'contexte', consigne, sujet?, avant?, apres?,
       options:[{ar, fr?}], bonne, traduction?, aides?, cles? }
     On choisit la bonne forme grammaticale selon le contexte de la phrase.
     Le bon choix vient se placer dans le trou de la phrase.
     ==================================================================== */
  function contexte(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.traduction) carte.appendChild(el('p', 'muet centre', exo.traduction));
    if (exo.sujet) {
      const s = el('div', 'contexte-sujet');
      s.innerHTML = 'Sujet de la phrase&nbsp;: <b>' + exo.sujet + '</b>';
      carte.appendChild(s);
    }

    const phrase = el('div', 'phrase-contexte');
    if (exo.avant) { const a = el('span'); a.textContent = exo.avant; phrase.appendChild(a); }
    const blanc = el('span', 'trou-inline'); blanc.textContent = '…';
    phrase.appendChild(blanc);
    if (exo.apres) { const a = el('span'); a.textContent = exo.apres; phrase.appendChild(a); }
    carte.appendChild(phrase);

    const valeur = (o) => (typeof o === 'string' ? o : o.ar);
    const liste = el('div', 'choix-contexte');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option option-contexte');
      b.type = 'button';
      const s = el('span', 'ar-opt'); s.textContent = valeur(opt); b.appendChild(s);
      if (opt.fr) { const g = el('span', 'gloss'); g.textContent = opt.fr; b.appendChild(g); }
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        blanc.textContent = valeur(exo.options[exo.bonne]);
        blanc.classList.add(reussi ? 'juste' : 'faux');
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
        if (!reussi) liste.children[exo.bonne].classList.add('juste');
        Parole.prononcer(valeur(exo.options[exo.bonne]), { rate: Parole.rateSelonLecon(idLecon) });
        montrerRetour(retour, reussi,
          'Bon choix : l\'accord est respecté.',
          'La forme correcte vient se placer dans la phrase. Observez l\'accord.');
        surReponse(reussi, exo.cles);
      });
      liste.appendChild(b);
    });
    carte.appendChild(liste);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     12. Compréhension de dialogue / question (deux schémas réunis)
     { type:'dialogue', consigne,
       echange?:[{qui:'A'|'B', ar, fr?}],         // affiche un échange
       contexte?, question? | questionAr?, questionTr?,
       mode?:'choix'|'saisie',
       options:[{ar?, texte?, fr?}], bonne,         // si choix
       reponse?:'arabe attendu',                    // si saisie
       indice?, aide?, aides?, cles? }
     Montre un échange ou une question en arabe ; on choisit (ou on écrit)
     la réponse logique. Couvre les deux schémas de dialogue du projet.
     ==================================================================== */
  function dialogue(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.contexte) carte.appendChild(el('p', 'muet petit centre', exo.contexte));
    if (exo.echange && exo.echange.length) {
      const conv = el('div', 'dialogue');
      exo.echange.forEach((t) => {
        const bulle = el('div', 'bulle ' + (t.qui === 'B' ? 'bulle-b' : 'bulle-a'));
        const ar = el('div', 'bulle-ar');
        ar.appendChild(document.createTextNode(t.ar));
        ar.appendChild(boutonAudio(t.ar, idLecon));
        bulle.appendChild(ar);
        if (t.fr) bulle.appendChild(el('span', 'bulle-fr', t.fr));
        conv.appendChild(bulle);
      });
      carte.appendChild(conv);
    }
    const questionTexte = exo.questionAr || exo.question;
    if (questionTexte) {
      const q = el('div', 'dialogue-q');
      const ar = el('div', 'bulle-ar');
      ar.appendChild(document.createTextNode(questionTexte));
      ar.appendChild(boutonAudio(questionTexte, idLecon));
      q.appendChild(ar);
      if (exo.questionTr) {
        q.insertAdjacentHTML('beforeend',
          (typeof App !== 'undefined') ? App.phon(exo.questionTr)
            : '<span class="translit">' + exo.questionTr + '</span>');
      }
      carte.appendChild(q);
    }
    ajouterAide(carte, exo.aide);
    carte.appendChild(el('p', 'muet petit centre', 'Quelle réponse convient ?'));

    if (exo.mode === 'saisie') {
      const champ = document.createElement('input');
      champ.type = 'text';
      champ.className = 'zone-saisie';
      champ.dir = 'rtl';
      champ.setAttribute('aria-label', 'Votre réponse en arabe');
      if (exo.indice) champ.placeholder = exo.indice;
      ClavierArabe.attacher(champ);
      const btn = el('button', 'btn btn-petit', 'Vérifier');
      btn.type = 'button';
      let valide = false;
      btn.addEventListener('click', () => {
        if (valide) return;
        valide = true;
        const score = Parole.similarite(exo.reponse, champ.value);
        const reussi = score >= 75;
        champ.disabled = true;
        ClavierArabe.fermer();
        const corr = el('div', 'a-memoriser');
        corr.style.marginTop = '0.8rem';
        corr.innerHTML = '<div class="ar">' + exo.reponse + '</div>';
        carte.insertBefore(corr, retour);
        montrerRetour(retour, reussi,
          'Réponse cohérente (' + score + '% de correspondance).',
          'Une réponse possible est affichée ci-dessus (' + score + '% de correspondance).');
        btn.disabled = true;
        surReponse(reussi, exo.cles);
      });
      carte.appendChild(champ);
      carte.appendChild(btn);
      const retour = ajouterRetour(carte);
      return;
    }

    const valeur = (o) => (o == null ? '' : (typeof o === 'string' ? o : (o.ar || '')));
    const liste = el('div', 'options-qcm');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option');
      b.type = 'button';
      const ar = valeur(opt);
      if (ar) { const s = el('span', 'ar-opt'); s.textContent = ar; b.appendChild(s); }
      if (opt && opt.texte) b.appendChild(document.createTextNode(opt.texte));
      if (opt && opt.fr) b.title = opt.fr;
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
        b.classList.add(reussi ? 'anim-pop' : 'anim-secousse');
        if (!reussi) liste.children[exo.bonne].classList.add('juste');
        const bonneVal = valeur(exo.options[exo.bonne]);
        if (bonneVal) Parole.prononcer(bonneVal, { rate: Parole.rateSelonLecon(idLecon) });
        montrerRetour(retour, reussi,
          'Réponse logique. L\'échange se tient.',
          'La réponse attendue est mise en évidence. Relisez la question.');
        surReponse(reussi, exo.cles);
      });
      liste.appendChild(b);
    });
    carte.appendChild(liste);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     13. Dictée (son → signe) — cœur du déchiffrage
     { type:'dictee', consigne, audio:'بَ', mode:'choix'|'saisie',
       options:[{ar}], bonne,   // si mode 'choix' (défaut)
       reponse:'بَ',            // si mode 'saisie'
       cles? }
     On entend une lettre/syllabe/mot ; le texte reste masqué jusqu'à la
     réponse. L'apprenant reconnaît le son et choisit (ou écrit) le signe.
     ==================================================================== */
  function dictee(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    const zone = el('div', 'zone-dictee');
    const ecoute = el('button', 'btn-ecoute');
    ecoute.type = 'button';
    ecoute.innerHTML = '&#9654;&nbsp;Écouter';
    ecoute.setAttribute('aria-label', 'Réécouter le son');
    const dire = () => Parole.prononcer(exo.audio, { rate: Parole.rateSelonLecon(idLecon || 1) });
    ecoute.addEventListener('click', (e) => { e.preventDefault(); dire(); });
    zone.appendChild(ecoute);
    carte.appendChild(zone);
    setTimeout(dire, 250); // on fait entendre le son d'emblée

    // On passe l'élément de retour en paramètre : en mode saisie comme en
    // mode choix, `retour` est local à sa branche (corrige un bug de portée).
    const reveler = (retourEl) => {
      const corr = el('div', 'a-memoriser');
      corr.style.marginTop = '0.8rem';
      corr.innerHTML = '<div class="ar">' + exo.audio + '</div>';
      carte.insertBefore(corr, retourEl);
    };

    if (exo.mode === 'saisie') {
      const champ = document.createElement('input');
      champ.type = 'text';
      champ.className = 'zone-saisie';
      champ.dir = 'rtl';
      champ.setAttribute('aria-label', 'Écrivez ce que vous entendez');
      ClavierArabe.attacher(champ);
      const btn = el('button', 'btn btn-petit', 'Vérifier');
      btn.type = 'button';
      let valide = false;
      btn.addEventListener('click', () => {
        if (valide) return;
        valide = true;
        const score = Parole.similarite(exo.reponse || exo.audio, champ.value);
        const reussi = score >= 80;
        champ.disabled = true;
        ClavierArabe.fermer();
        reveler(retour);
        montrerRetour(retour, reussi,
          'Bien entendu et bien écrit (' + score + '% de correspondance).',
          'Le signe attendu est affiché ci-dessus (' + score + '% de correspondance). Réécoutez, puis réessayez.');
        btn.disabled = true;
        surReponse(reussi, exo.cles);
      });
      carte.appendChild(champ);
      carte.appendChild(btn);
      const retour = ajouterRetour(carte);
      return;
    }

    const liste = el('div', 'options-qcm');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option');
      b.type = 'button';
      const s = el('span', 'ar-opt'); s.textContent = (typeof opt === 'string' ? opt : opt.ar); b.appendChild(s);
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
        b.classList.add(reussi ? 'anim-pop' : 'anim-secousse');
        if (!reussi) liste.children[exo.bonne].classList.add('juste');
        montrerRetour(retour, reussi,
          'Oui, c\'est bien ce son.',
          'Le bon signe est mis en évidence. Réécoutez pour fixer le lien son ↔ écriture.');
        surReponse(reussi, exo.cles);
      });
      liste.appendChild(b);
    });
    carte.appendChild(liste);
    const retour = ajouterRetour(carte);
  }

  /* ====================================================================
     14. Lecture d'un passage (jalon de fin de cycle)
     { type:'lecture', consigne, titre?, reference?,
       segments:[{ ar, tr?, fr? }], cles? }
     On lit un vrai passage, partie par partie, avec l'audio : chaque
     segment a son bouton d'écoute, et « Tout écouter » enchaîne la lecture
     en surlignant la partie en cours. On valide quand on a lu le passage.
     ==================================================================== */
  function lecture(exo, index, conteneur, surReponse, idLecon) {
    const carte = cadre(exo, index, conteneur);
    if (exo.titre) carte.appendChild(el('p', 'muet centre', exo.titre));

    const passage = el('div', 'passage');
    const lignes = [];
    exo.segments.forEach((seg) => {
      const ligne = el('div', 'passage-ligne');
      const ar = el('div', 'ar');
      ar.appendChild(document.createTextNode(seg.ar));
      ar.appendChild(boutonAudio(seg.ar, idLecon));
      ligne.appendChild(ar);
      if (seg.tr) {
        const tr = el('p', 'passage-tr');
        tr.innerHTML = (typeof App !== 'undefined') ? App.phon(seg.tr) : '<span class="translit">' + seg.tr + '</span>';
        ligne.appendChild(tr);
      }
      if (seg.fr) ligne.appendChild(el('p', 'passage-fr', seg.fr));
      passage.appendChild(ligne);
      lignes.push(ligne);
    });
    carte.appendChild(passage);

    if (exo.reference) carte.appendChild(el('p', 'muet petit centre', exo.reference));

    const actions = el('div', 'passage-actions');
    const tout = el('button', 'btn btn-secondaire btn-petit', '&#9654;&nbsp;Tout écouter, partie par partie');
    tout.type = 'button';
    tout.addEventListener('click', () => {
      lignes.forEach((l) => l.classList.remove('lit'));
      Parole.prononcerSuite(exo.segments.map((s) => s.ar), {
        rate: Parole.rateSelonLecon(idLecon || 6),
        surSegmentDebut: (i) => {
          lignes.forEach((l) => l.classList.remove('lit'));
          if (lignes[i]) lignes[i].classList.add('lit');
        },
        surFin: () => lignes.forEach((l) => l.classList.remove('lit')),
      });
    });
    actions.appendChild(tout);

    const valider = el('button', 'btn btn-petit', 'J\'ai lu ce passage');
    valider.type = 'button';
    let fait = false;
    valider.addEventListener('click', () => {
      if (fait) return;
      fait = true;
      valider.disabled = true;
      montrerRetour(retour, true,
        'Vous venez de lire un véritable passage du Coran, par vous-même. Le système d\'écriture n\'a plus de secret : place au sens et à la grammaire.');
      surReponse(true, exo.cles);
    });
    actions.appendChild(valider);
    carte.appendChild(actions);
    const retour = ajouterRetour(carte);
  }

  /* ---- Aiguillage ---- */
  const types = { qcm, appariement, glisser, trous, saisie, oral, racine, decomposition, phonetique, trou_libre, texteLibre, contexte, dialogue, dictee, lecture };

  function rendre(exo, index, conteneur, surReponse, idLecon) {
    const fn = types[exo.type];
    if (!fn) { console.warn('Type d\'exercice inconnu :', exo.type); return; }
    const avant = conteneur.children.length;
    // On garantit que surReponse n'est compté qu'une fois, et on ajoute
    // l'explication (contexte de la correction) au retour, pour tout type.
    let compte = false;
    const wrap = (reussi, cles) => {
      if (compte) return; compte = true;
      if (exo.explication) {
        const carte = conteneur.children[avant];
        const r = carte && carte.querySelector('.retour-exo');
        if (r) {
          const e = document.createElement('span');
          e.className = 'expl';
          e.innerHTML = exo.explication;
          r.appendChild(e);
        }
      }
      surReponse(reussi, cles);
    };
    fn(exo, index, conteneur, wrap, idLecon);
    // Aide à la traduction (discrète) : disponible pour tout type d'exercice
    // qui déclare un champ `aides`. On la place juste avant le bloc de retour.
    if (exo.aides && exo.aides.length) {
      const carte = conteneur.children[avant];
      if (carte) {
        const aide = construireAide(exo.aides, idLecon);
        const r = carte.querySelector('.retour-exo');
        if (r) carte.insertBefore(aide, r); else carte.appendChild(aide);
      }
    }
  }

  return { rendre, melanger };
})();
