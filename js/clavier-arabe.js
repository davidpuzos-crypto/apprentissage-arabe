/* =========================================================================
   clavier-arabe.js — clavier virtuel pour les exercices de saisie
   28 lettres + voyelles courtes (haraka) + espace + retour arrière.
   Aucune dépendance à un clavier physique arabe.
   ========================================================================= */

const ClavierArabe = (function () {
  const rangees = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
    ['ئ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ', 'د'],
    ['ذ', 'أ', 'إ', 'آ', 'ز', 'ث', 'ه'],
  ];
  // Voyelles courtes et signes (haraka)
  const haraka = [
    { c: 'َ', n: 'fatḥa' }, { c: 'ِ', n: 'kasra' }, { c: 'ُ', n: 'ḍamma' },
    { c: 'ْ', n: 'sukūn' }, { c: 'ّ', n: 'shadda' }, { c: 'ً', n: 'tanwīn a' },
    { c: 'ٍ', n: 'tanwīn i' }, { c: 'ٌ', n: 'tanwīn u' },
  ];

  let cibleActive = null;
  let conteneur = null;

  function construire() {
    if (conteneur) return conteneur;
    conteneur = document.createElement('div');
    conteneur.className = 'clavier-arabe';
    conteneur.setAttribute('role', 'group');
    conteneur.setAttribute('aria-label', 'Clavier arabe virtuel');

    const rangeesEl = document.createElement('div');
    rangeesEl.className = 'clavier-rangees';

    [rangees[0], rangees[1], rangees[2]].forEach((rangee) => {
      const r = document.createElement('div');
      r.className = 'clavier-rangee';
      rangee.forEach((lettre) => r.appendChild(faireTouche(lettre)));
      rangeesEl.appendChild(r);
    });

    // Rangée des haraka
    const rHaraka = document.createElement('div');
    rHaraka.className = 'clavier-rangee';
    haraka.forEach((h) => {
      const t = faireTouche('◌' + h.c, h.c);
      t.title = h.n;
      rHaraka.appendChild(t);
    });
    rangeesEl.appendChild(rHaraka);

    // Rangée de fonction
    const rFonction = document.createElement('div');
    rFonction.className = 'clavier-rangee';
    rFonction.appendChild(faireFonction('espace', () => inserer(' ')));
    rFonction.appendChild(faireFonction('effacer', effacer));
    rFonction.appendChild(faireFonction('fermer', fermer));
    rangeesEl.appendChild(rFonction);

    conteneur.appendChild(rangeesEl);
    document.body.appendChild(conteneur);
    return conteneur;
  }

  function faireTouche(libelle, valeur) {
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'touche-ar';
    t.textContent = libelle;
    t.addEventListener('click', () => inserer(valeur != null ? valeur : libelle));
    return t;
  }

  function faireFonction(libelle, action) {
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'touche-ar touche-fonction';
    t.textContent = libelle;
    t.addEventListener('click', action);
    return t;
  }

  function inserer(car) {
    if (!cibleActive) return;
    const debut = cibleActive.selectionStart ?? cibleActive.value.length;
    const fin = cibleActive.selectionEnd ?? cibleActive.value.length;
    const v = cibleActive.value;
    cibleActive.value = v.slice(0, debut) + car + v.slice(fin);
    const pos = debut + car.length;
    cibleActive.setSelectionRange(pos, pos);
    cibleActive.focus();
    cibleActive.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function effacer() {
    if (!cibleActive) return;
    const debut = cibleActive.selectionStart ?? cibleActive.value.length;
    const fin = cibleActive.selectionEnd ?? cibleActive.value.length;
    const v = cibleActive.value;
    if (debut === fin && debut > 0) {
      cibleActive.value = v.slice(0, debut - 1) + v.slice(fin);
      cibleActive.setSelectionRange(debut - 1, debut - 1);
    } else {
      cibleActive.value = v.slice(0, debut) + v.slice(fin);
      cibleActive.setSelectionRange(debut, debut);
    }
    cibleActive.focus();
    cibleActive.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function ouvrir(champ) {
    construire();
    cibleActive = champ;
    conteneur.classList.add('ouvert');
    document.body.classList.add('clavier-ouvert');
    // Sur mobile, le clavier fixe peut masquer le champ : on le remonte
    // explicitement juste au-dessus du clavier pour qu'il reste visible.
    setTimeout(() => positionner(champ), 90);
  }

  // Fait défiler la page pour que le champ se tienne au-dessus du clavier.
  function positionner(champ) {
    if (!conteneur) return;
    const kbH = conteneur.offsetHeight || 280;
    const rect = champ.getBoundingClientRect();
    const basVisible = window.innerHeight - kbH - 18; // bord bas de la zone visible
    if (rect.bottom > basVisible || rect.top < 8) {
      const cible = window.scrollY + rect.top - Math.max(12, basVisible - rect.height - 8);
      try { window.scrollTo({ top: Math.max(0, cible), behavior: 'smooth' }); }
      catch (e) { window.scrollTo(0, Math.max(0, cible)); }
    }
  }

  function fermer() {
    if (conteneur) conteneur.classList.remove('ouvert');
    document.body.classList.remove('clavier-ouvert');
  }

  // Branche automatiquement le clavier sur un champ de saisie.
  function attacher(champ) {
    champ.setAttribute('inputmode', 'none'); // évite le clavier système concurrent
    champ.addEventListener('focus', () => ouvrir(champ));
  }

  return { attacher, ouvrir, fermer };
})();
