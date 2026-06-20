/* =========================================================================
   exercices.js — générateurs et rendu des exercices interactifs
   Types : qcm, appariement, glisser, trous, saisie, oral, racine, decomposition
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

    const liste = el('div', 'options-qcm');
    let repondu = false;
    exo.options.forEach((opt, i) => {
      const b = el('button', 'option');
      b.type = 'button';
      if (opt.ar) {
        const s = el('span', 'ar-opt'); s.textContent = opt.ar; b.appendChild(s);
      }
      if (opt.texte) b.appendChild(document.createTextNode(opt.texte));
      b.addEventListener('click', () => {
        if (repondu) return;
        repondu = true;
        const reussi = i === exo.bonne;
        Array.from(liste.children).forEach((c) => c.classList.add('fige'));
        b.classList.add(reussi ? 'juste' : 'faux');
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

    function choisir(jeton, cote) {
      if (jeton.classList.contains('apparie')) return;
      if (!selection) {
        selection = { jeton, cote };
        jeton.classList.add('selection');
        return;
      }
      if (selection.jeton === jeton) { jeton.classList.remove('selection'); selection = null; return; }
      if (selection.cote === cote) {
        selection.jeton.classList.remove('selection');
        selection = { jeton, cote };
        jeton.classList.add('selection');
        return;
      }
      // Tentative d'appariement
      if (selection.jeton.dataset.i === jeton.dataset.i) {
        jeton.classList.add('apparie');
        selection.jeton.classList.add('apparie');
        selection.jeton.classList.remove('selection');
        apparies++;
        Parole.prononcer(exo.paires[+jeton.dataset.i].ar, { rate: Parole.rateSelonLecon(idLecon) });
        if (apparies === exo.paires.length) {
          const reussi = erreurs <= 1; // une hésitation tolérée
          montrerRetour(retour, reussi,
            'Toutes les paires sont reconstituées. Bien vu.',
            'Les paires sont faites, mais après quelques essais. Revoyez ces mots.');
          const cles = exo.paires.map((p) => p.cle).filter(Boolean);
          surReponse(reussi, cles);
        }
      } else {
        erreurs++;
        selection.jeton.classList.remove('selection');
        jeton.classList.add('faux');
        setTimeout(() => jeton.classList.remove('faux'), 500);
      }
      selection = null;
    }

    zone.appendChild(colA); zone.appendChild(colB);
    carte.appendChild(zone);
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

  /* ---- Aiguillage ---- */
  const types = { qcm, appariement, glisser, trous, saisie, oral, racine, decomposition, phonetique };

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
  }

  return { rendre, melanger };
})();
