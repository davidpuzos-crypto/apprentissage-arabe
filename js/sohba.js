/* =========================================================================
   sohba.js — Génération de carousels Instagram à partir d'une sohba
   Format : 1080×1350 px (portrait 4:5 Instagram)
   ========================================================================= */

const Sohba = (function () {
  'use strict';

  /* ---- Constantes de rendu ---- */
  const W = 1080, H = 1350;
  const PAD = 90;

  const C = {
    bg:       '#0f0f0f',
    white:    '#ffffff',
    teal:     '#5ce1e6',
    gris:     '#b0b0b0',
    grisF:    '#777777',
    filet:    '#2e2e2e',
  };

  let _structure  = null;  // JSON retourné par Claude
  _canvases       = [];    // Canvas générés
  let _photo      = null;  // Image de couverture (HTMLImageElement|null)

  /* ================================================================
     UTILITAIRES CANVAS
     ================================================================ */

  /* Découpe un texte en lignes pour un maxWidth donné */
  function lignes(ctx, texte, maxW) {
    const mots = texte.split(' ').filter(Boolean);
    const res = [];
    let ligne = '';
    for (const mot of mots) {
      const test = ligne ? ligne + ' ' + mot : mot;
      if (ctx.measureText(test).width > maxW && ligne) {
        res.push(ligne);
        ligne = mot;
      } else {
        ligne = test;
      }
    }
    if (ligne) res.push(ligne);
    return res;
  }

  /* Taille de fonte optimale pour ne pas dépasser maxLignes */
  function tailleOptimale(ctx, texte, maxW, maxLignes, baseSize, fontStyle) {
    let taille = baseSize;
    while (taille > 38) {
      ctx.font = fontStyle(taille);
      if (lignes(ctx, texte, maxW).length <= maxLignes) break;
      taille -= 6;
    }
    return taille;
  }

  /* Texte avec retour à la ligne, retourne le Y final */
  function drawWrapped(ctx, texte, x, y, maxW, lh) {
    const ls = lignes(ctx, texte, maxW);
    for (const l of ls) { ctx.fillText(l, x, y); y += lh; }
    return y;
  }

  /* Texte avec mots-accent en teal, retourne le Y final */
  function drawAccented(ctx, texte, accentMots, couleurN, couleurA, font, x, y, maxW, lh) {
    ctx.font = font;
    const espaceW = ctx.measureText(' ').width;
    const acLow   = (accentMots || []).map(m => m.toLowerCase().replace(/[«»",.!?:;()]/g, ''));

    // Construire les lignes mot par mot
    const mots  = texte.split(' ').filter(Boolean);
    const lList = []; // tableau de tableaux de mots
    let ligneM  = [];
    let ligneW  = 0;

    for (const mot of mots) {
      const mw = ctx.measureText(mot).width;
      if (ligneW + mw > maxW && ligneM.length) {
        lList.push(ligneM);
        ligneM = [mot];
        ligneW = mw + espaceW;
      } else {
        ligneM.push(mot);
        ligneW += mw + espaceW;
      }
    }
    if (ligneM.length) lList.push(ligneM);

    // Rendre chaque ligne mot par mot
    let curY = y;
    for (const lmots of lList) {
      let curX = x;
      for (const mot of lmots) {
        const motNet = mot.toLowerCase().replace(/[«»",.!?:;()]/g, '');
        const estAccent = acLow.some(a => motNet === a || motNet.includes(a));
        ctx.fillStyle = estAccent ? couleurA : couleurN;
        ctx.font = font;
        ctx.fillText(mot, curX, curY);
        curX += ctx.measureText(mot).width + espaceW;
      }
      curY += lh;
    }
    return curY;
  }

  /* Ligne horizontale */
  function drawFilet(ctx, x, y, largeur) {
    ctx.save();
    ctx.strokeStyle = C.filet;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + largeur, y);
    ctx.stroke();
    ctx.restore();
  }

  /* Cercle avec flèche → ou ↓ */
  function drawFleche(ctx, cx, cy, rayon, dir = 'droite') {
    ctx.save();
    // Cercle blanc
    ctx.beginPath();
    ctx.arc(cx, cy, rayon, 0, Math.PI * 2);
    ctx.fillStyle = C.white;
    ctx.fill();

    // Flèche dessinée avec des paths
    ctx.strokeStyle = C.bg;
    ctx.lineWidth   = Math.max(3, rayon * 0.1);
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    const s = rayon * 0.32;
    ctx.beginPath();
    if (dir === 'droite') {
      ctx.moveTo(cx - s, cy);
      ctx.lineTo(cx + s, cy);
      ctx.moveTo(cx + s - s * 0.75, cy - s * 0.65);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx + s - s * 0.75, cy + s * 0.65);
    } else {
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx, cy + s);
      ctx.moveTo(cx - s * 0.65, cy + s - s * 0.75);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx + s * 0.65, cy + s - s * 0.75);
    }
    ctx.stroke();
    ctx.restore();
  }

  /* ================================================================
     RENDU SLIDE COUVERTURE
     ================================================================ */

  function renderCouverture(canvas, data) {
    const ctx = canvas.getContext('2d');
    canvas.width  = W;
    canvas.height = H;

    /* --- Fond --- */
    if (_photo) {
      const ratio = Math.max(W / _photo.width, H / _photo.height);
      const pw = _photo.width * ratio;
      const ph = _photo.height * ratio;
      ctx.drawImage(_photo, (W - pw) / 2, (H - ph) / 2, pw, ph);

      // Dégradé sombre par-dessus
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0,    'rgba(0,0,0,0.82)');
      grad.addColorStop(0.55, 'rgba(0,0,0,0.52)');
      grad.addColorStop(1,    'rgba(0,0,0,0.80)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      // Fond sombre avec légère nuance
      const grad = ctx.createLinearGradient(0, 0, W * 0.6, H);
      grad.addColorStop(0,   '#1a1c24');
      grad.addColorStop(0.5, '#0f0f0f');
      grad.addColorStop(1,   '#0a1020');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Vignette subtile
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.4, H * 0.1, W * 0.5, H * 0.5, H * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.textBaseline = 'top';
    ctx.textAlign    = 'left';

    /* --- Titre --- */
    const titre     = (data.cover && data.cover.titre)     || '';
    const motAccent = (data.cover && data.cover.motAccent) || '';
    const maxW      = W - PAD * 2;

    const tailleTitre = tailleOptimale(
      ctx, titre, maxW, 4, 110,
      t => `900 ${t}px Montserrat, Inter, sans-serif`
    );
    const fontTitre = `900 ${tailleTitre}px Montserrat, Inter, sans-serif`;
    const lhTitre   = tailleTitre * 1.12;

    let y = PAD + 20;
    y = drawAccented(ctx, titre, [motAccent], C.white, C.teal, fontTitre, PAD, y, maxW, lhTitre);

    /* --- Filet séparateur --- */
    y += 36;
    drawFilet(ctx, PAD, y, W * 0.52);
    y += 28;

    /* --- Métadonnées --- */
    const metadata  = (data.cover && data.cover.metadata) || '';
    const metaParts = metadata.split('·').map(s => s.trim()).filter(Boolean);

    ctx.font      = `600 26px Montserrat, Inter, sans-serif`;
    ctx.fillStyle = '#bbbbbb';
    ctx.letterSpacing = '0.06em';
    for (const part of metaParts) {
      ctx.fillText(part.toUpperCase(), PAD, y);
      y += 38;
    }
    ctx.letterSpacing = '0em';

    /* --- Flèche bas-droite --- */
    drawFleche(ctx, W - PAD - 42, H - 72, 42, 'droite');

    /* --- Filet bas --- */
    drawFilet(ctx, PAD, H - 56, W - PAD * 2);
  }

  /* ================================================================
     RENDU SLIDE CONTENU
     ================================================================ */

  function renderSlideContenu(canvas, slide, numSlide, totalSlides) {
    const ctx = canvas.getContext('2d');
    canvas.width  = W;
    canvas.height = H;

    const estDernier = numSlide === totalSlides;

    /* --- Fond --- */
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    // Lueur teal subtile coin supérieur droit
    const lueur = ctx.createRadialGradient(W * 0.85, H * 0.08, 0, W * 0.7, H * 0.2, W * 0.65);
    lueur.addColorStop(0, 'rgba(92,225,230,0.055)');
    lueur.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lueur;
    ctx.fillRect(0, 0, W, H);

    ctx.textBaseline = 'top';
    ctx.textAlign    = 'left';

    /* --- Numéro de slide --- */
    ctx.font      = `700 58px Montserrat, Inter, sans-serif`;
    ctx.fillStyle = C.white;
    ctx.fillText(`${numSlide}.`, PAD, PAD);

    /* --- Points de suspension (si pas dernier) --- */
    if (!estDernier) {
      ctx.font      = `700 44px Montserrat, Inter, sans-serif`;
      ctx.fillStyle = C.grisF;
      ctx.textAlign = 'right';
      ctx.fillText('•  •  •', W - PAD, PAD);
      ctx.textAlign = 'left';
    }

    /* --- Citation principale --- */
    const citation   = slide.citation   || '';
    const motsAccent = slide.motsAccent || [];
    const maxW       = W - PAD * 2;
    const startY     = PAD + 110;

    const tailleQ = tailleOptimale(
      ctx, citation, maxW, 5, 84,
      t => `800 ${t}px Montserrat, Inter, sans-serif`
    );
    const fontQ = `800 ${tailleQ}px Montserrat, Inter, sans-serif`;
    const lhQ   = tailleQ * 1.14;

    let y = drawAccented(ctx, citation, motsAccent, C.white, C.teal, fontQ, PAD, startY, maxW, lhQ);

    y += 34;

    /* --- Référence (Coran / Hadith) --- */
    if (slide.source) {
      ctx.font      = `600 italic 36px Montserrat, Inter, sans-serif`;
      ctx.fillStyle = C.teal;
      ctx.fillText(slide.source, PAD, y);
      y += 58;
    }

    /* --- Explication --- */
    if (slide.explication) {
      const tailleExp = tailleOptimale(
        ctx, slide.explication, maxW, 5, 40,
        t => `400 ${t}px Montserrat, Inter, sans-serif`
      );
      ctx.font      = `400 ${tailleExp}px Montserrat, Inter, sans-serif`;
      ctx.fillStyle = C.gris;
      drawWrapped(ctx, slide.explication, PAD, y + 6, maxW, tailleExp * 1.45);
    }

    /* --- Filet bas --- */
    drawFilet(ctx, PAD, H - 102, W - PAD * 2);

    /* --- Flèche --- */
    const dirFleche = estDernier ? 'bas' : 'droite';
    drawFleche(ctx, W - PAD - 42, H - 58, 42, dirFleche);

    /* --- Handle (dernier slide uniquement) --- */
    if (estDernier) {
      ctx.font         = `500 30px Montserrat, Inter, sans-serif`;
      ctx.fillStyle    = C.grisF;
      ctx.textBaseline = 'bottom';
      ctx.fillText(document.getElementById('meta-handle').value || '@AS-SADIK', PAD, H - 62);
      ctx.textBaseline = 'top';
    }
  }

  /* ================================================================
     ORCHESTRATION DU RENDU
     ================================================================ */

  function rendreTout(structure) {
    _canvases = [];

    const conteneurSlides = document.getElementById('carousel-slides');
    const placeholder     = document.getElementById('placeholder-vide');
    conteneurSlides.innerHTML = '';
    conteneurSlides.style.display = 'flex';
    placeholder.style.display     = 'none';

    // Slide de couverture
    const cvsCouv = creerCanvas();
    renderCouverture(cvsCouv, structure);
    ajouterVignette(cvsCouv, 'Couverture', 'couverture', conteneurSlides);
    _canvases.push({ canvas: cvsCouv, nom: 'couverture' });

    // Slides de contenu
    const slides = structure.slides || [];
    slides.forEach((slide, i) => {
      const c = creerCanvas();
      renderSlideContenu(c, slide, i + 1, slides.length);
      const libelle = i + 1 === slides.length ? `Slide ${i + 1} · fin` : `Slide ${i + 1}`;
      ajouterVignette(c, libelle, `slide-${i + 1}`, conteneurSlides);
      _canvases.push({ canvas: c, nom: `slide-${i + 1}` });
    });

    // Légende
    const zoneLeg = document.getElementById('zone-legende');
    const legTxt  = document.getElementById('legende-texte');
    if (structure.legende) {
      const btn = document.createElement('button');
      btn.className = 'btn-copier';
      btn.id        = 'btn-copier-legende';
      btn.textContent = 'Copier';
      btn.onclick   = () => Sohba.copierLegende();

      legTxt.innerHTML = '';
      legTxt.appendChild(btn);
      legTxt.appendChild(document.createTextNode(structure.legende));
      zoneLeg.style.display = '';
    }
  }

  function creerCanvas() {
    const c = document.createElement('canvas');
    c.width  = W;
    c.height = H;
    return c;
  }

  function ajouterVignette(canvas, libelle, nom, conteneur) {
    const wrap = document.createElement('div');
    wrap.className = 'vignette-slide';

    canvas.title = `Télécharger ${libelle}`;
    canvas.addEventListener('click', () => telecharger(canvas, nom));

    const label = document.createElement('div');
    label.className   = 'vignette-label';
    label.textContent = libelle;

    wrap.appendChild(canvas);
    wrap.appendChild(label);
    conteneur.appendChild(wrap);
  }

  /* ================================================================
     APPEL API CLAUDE
     ================================================================ */

  async function analyserSohba(texte, meta) {
    const cle = localStorage.getItem('anthropic_api_key');
    if (!cle) throw new Error('Clé API Anthropic manquante — sauvegardez-la ci-dessus.');

    const nb = Math.min(6, Math.max(3, parseInt(meta.slides) || 4));

    const prompt =
`Tu es un expert en création de contenus Instagram pour des enseignements spirituels islamiques.

Voici une sohba de ${meta.sheikh || 'un Shaikh'}${meta.date ? ', donnée le ' + meta.date : ''}${meta.lieu ? ' à ' + meta.lieu : ''}${meta.moment ? ' lors de ' + meta.moment : ''} :

---
${texte}
---

Crée un carousel Instagram avec exactement ${nb} slides de contenu.

Réponds UNIQUEMENT avec le JSON suivant (aucun texte avant ou après) :

{
  "cover": {
    "titre": "Titre court et percutant (5-8 mots, style accroche Instagram)",
    "motAccent": "le mot ou groupe le plus fort du titre (1-3 mots max)",
    "metadata": "${meta.sheikh || 'Shaikh'} · ${meta.date || ''} · ${meta.moment || ''} · ${meta.lieu || ''}"
  },
  "slides": [
    {
      "citation": "Enseignement clé, direct et percutant (10-22 mots max)",
      "motsAccent": ["mot-cle1", "mot-cle2"],
      "source": "Coran, X:Y ou null",
      "explication": "Développement bref et profond (20-40 mots)"
    }
  ],
  "legende": "Légende Instagram complète (150-220 mots). Commence par une accroche forte. Développe les points clés. Termine par un appel à lire la sohba. Hashtags en français et en arabe à la fin."
}

Règles :
- Exactement ${nb} éléments dans "slides"
- Tout en français (citations arabes admises si elles figurent dans la sohba)
- Les citations sont des condensés des enseignements les plus forts
- Les motsAccent sont les 1-3 mots les plus chargés spirituellement
- Le dernier slide est la conclusion/leçon principale de la sohba
- JSON valide strict, aucun commentaire`;

    const reponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': cle,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 2400,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!reponse.ok) {
      const detail = await reponse.text();
      throw new Error(`Erreur API ${reponse.status} : ${detail}`);
    }

    const data   = await reponse.json();
    const texteR = data.content[0].text;

    const match = texteR.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('La réponse ne contient pas de JSON valide.');

    return JSON.parse(match[0]);
  }

  /* ================================================================
     TÉLÉCHARGEMENT
     ================================================================ */

  function telecharger(canvas, nom) {
    const a      = document.createElement('a');
    a.download   = `sohba-${nom}.png`;
    a.href       = canvas.toDataURL('image/png');
    a.click();
  }

  async function telechargerTout() {
    for (let i = 0; i < _canvases.length; i++) {
      telecharger(_canvases[i].canvas, _canvases[i].nom);
      await new Promise(r => setTimeout(r, 350));
    }
  }

  function copierLegende() {
    const legTxt = document.getElementById('legende-texte');
    const texte  = legTxt.innerText.replace(/^Copier\n?/, '').trim();
    navigator.clipboard.writeText(texte).then(() => {
      const btn = document.getElementById('btn-copier-legende');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = 'Copié ✓';
      setTimeout(() => { btn.textContent = orig; }, 1800);
    });
  }

  /* ================================================================
     ÉTAT UI
     ================================================================ */

  function setEtat(msg, enChargement = false) {
    const el = document.getElementById('etat-gen');
    if (!el) return;
    el.innerHTML = enChargement
      ? `<div class="spinner"></div><span>${msg}</span>`
      : `<span>${msg}</span>`;
  }

  /* ================================================================
     INITIALISATION
     ================================================================ */

  function init() {
    // Restaurer la clé API
    const cleSauvee = localStorage.getItem('anthropic_api_key');
    if (cleSauvee) document.getElementById('input-cle').value = cleSauvee;

    // Sauvegarder la clé
    document.getElementById('btn-sauver-cle').addEventListener('click', () => {
      const cle = document.getElementById('input-cle').value.trim();
      if (!cle) return;
      localStorage.setItem('anthropic_api_key', cle);
      const btn = document.getElementById('btn-sauver-cle');
      btn.textContent = 'Sauvegardé ✓';
      setTimeout(() => { btn.textContent = 'Sauvegarder'; }, 2000);
    });

    // Upload photo de couverture
    document.getElementById('input-photo').addEventListener('change', function () {
      const fichier = this.files[0];
      if (!fichier) return;
      document.getElementById('texte-upload').textContent = `📷 ${fichier.name}`;
      const reader  = new FileReader();
      reader.onload = e => {
        const img   = new Image();
        img.onload  = () => { _photo = img; };
        img.src     = e.target.result;
      };
      reader.readAsDataURL(fichier);
    });

    // Générer le carousel
    document.getElementById('btn-generer').addEventListener('click', async () => {
      const texte = document.getElementById('texte-sohba').value.trim();
      if (!texte) {
        setEtat('Veuillez coller le texte de la sohba.');
        return;
      }

      const meta = {
        sheikh:  document.getElementById('meta-sheikh').value.trim(),
        date:    document.getElementById('meta-date').value.trim(),
        lieu:    document.getElementById('meta-lieu').value.trim(),
        moment:  document.getElementById('meta-moment').value.trim(),
        handle:  document.getElementById('meta-handle').value.trim(),
        slides:  document.getElementById('meta-slides').value,
      };

      const btnGen = document.getElementById('btn-generer');
      btnGen.disabled = true;

      try {
        setEtat('Analyse de la sohba par Claude…', true);
        _structure = await analyserSohba(texte, meta);

        setEtat('Rendu des slides…', true);
        await document.fonts.ready;
        rendreTout(_structure);

        setEtat(`✓ ${_canvases.length} slides générées — cliquez pour télécharger.`);
      } catch (err) {
        setEtat(`Erreur : ${err.message}`);
        console.error('[Sohba]', err);
      } finally {
        btnGen.disabled = false;
      }
    });

    // Télécharger tout
    document.getElementById('btn-tout-telecharger').addEventListener('click', telechargerTout);
  }

  return { init, copierLegende, telechargerTout };
})();
