(() => {
  // =========================================================
  // I18N — applique les traductions à tout élément [data-i18n*]
  // Persisté dans localStorage (clé "styleme_lang"), défaut: fr.
  // =========================================================
  const LANG_KEY = 'styleme_lang';
  let currentLang = (function () {
    try { return localStorage.getItem(LANG_KEY) || 'fr'; }
    catch (_) { return 'fr'; }
  })();

  // Whitelist des balises autorisées dans les valeurs i18n (typographie).
  // Évite tout XSS si une chaîne traduite est un jour issue d'une source non
  // de confiance (community-contributed translations, etc.).
  const I18N_ALLOWED_TAGS = new Set(['BR', 'EM', 'STRONG']);

  function setSafeI18nHTML(el, html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = String(html);
    (function walk(node) {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 1) {
          if (!I18N_ALLOWED_TAGS.has(child.tagName)) {
            // remplace l'élément non-whitelisté par ses enfants textuels
            child.replaceWith(...child.childNodes);
          } else {
            // strip tous les attributs (pas d'event handlers, pas d'href)
            while (child.attributes.length) child.removeAttribute(child.attributes[0].name);
            walk(child);
          }
        } else if (child.nodeType !== 3) {
          // garde uniquement éléments + texte, supprime comments etc.
          child.remove();
        }
      });
    })(tpl.content);
    el.textContent = '';
    el.appendChild(tpl.content);
  }

  function t(key, vars) {
    const dict = (window.STYLEME_I18N || {})[currentLang] || {};
    let str = dict[key];
    if (str == null) return key;
    if (vars) for (const k in vars) str = str.split('{' + k + '}').join(vars[k]);
    return str;
  }

  function applyI18n(lang) {
    const dict = (window.STYLEME_I18N || {})[lang];
    if (!dict) return;
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) { /* private mode */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = dict.dir || 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (dict[key] != null) setSafeI18nHTML(el, dict[key]);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key] != null) el.placeholder = dict[key];
    });

    refreshQuizCounter();
  }

  function refreshQuizCounter() {
    const el = document.querySelector('[data-quiz-counter]');
    if (!el) return;
    // quizQ peut ne pas être initialisé au tout premier applyI18n() — guard.
    const n = (typeof quizQ === 'number') ? quizQ : 1;
    el.textContent = t('onb.quiz.qnum', { n });
  }

  // =========================================================
  // ONBOARDING — 4 étapes avant l'app
  // Étape 2 = quiz × 3 questions (on reste sur le même DOM,
  // on incrémente juste le compteur jusqu'à 3)
  // =========================================================
  const onboarding = document.getElementById('onboarding');
  const appWrap = document.getElementById('appWrap');
  const steps = document.querySelectorAll('.onb-step');
  const bars = document.querySelectorAll('.onb-bar');

  let currentStep = 1;
  let quizQ = 1;            // sous-compteur pour l'étape 2
  const TOTAL_QUIZ = 3;

  function showStep(n) {
    steps.forEach(s => s.classList.toggle('is-active', Number(s.dataset.step) === n));
    bars.forEach((b, i) => b.classList.toggle('is-active', i < n));
    currentStep = n;
    const active = document.querySelector(`.onb-step[data-step="${n}"] .onb-body`);
    if (active) active.scrollTop = 0;
  }

  function finishOnboarding() {
    onboarding.style.transition = 'opacity .4s ease';
    onboarding.style.opacity = '0';
    setTimeout(() => {
      onboarding.hidden = true;
      onboarding.style.display = 'none';
      appWrap.hidden = false;
    }, 380);
  }

  // Bouton "Commencer" / "Continuer" sur étape 1 et 3
  document.querySelectorAll('.onb-next').forEach(btn => {
    btn.addEventListener('click', () => showStep(currentStep + 1));
  });

  // Bouton "Passer la présentation" (étape 1)
  document.querySelector('.onb-skip')?.addEventListener('click', finishOnboarding);

  // Boutons "J'ai pris ma première photo" / "Je le ferai plus tard" (étape 4)
  document.querySelectorAll('.onb-finish').forEach(btn => {
    btn.addEventListener('click', finishOnboarding);
  });

  // Quiz : 3 questions, mêmes cartes — on change juste le compteur
  // et on remet une nouvelle paire à chaque clic
  const quizCards = document.querySelectorAll('.quiz-card');
  const quizPairs = [
    [['#d4a5a5','#deca9f','#f7f2ea','Doux et naturel'], ['#1b1b1b','#b96a46','#2a2a2a','Affirmé et contrasté']],
    [['#9eb094','#deca9f','#1b1b1b','Terre et nature'], ['#e8c8b3','#d4a5a5','#f7f2ea','Pastel et lumière']],
    [['#1b1b1b','#1b1b1b','#d4a5a5','Sobre avec un éclat'], ['#bbd1da','#deca9f','#b96a46','Énergique et coloré']],
  ];
  function paintQuizPair() {
    const pair = quizPairs[quizQ - 1] || quizPairs[0];
    quizCards.forEach((card, idx) => {
      card.classList.remove('is-picked');
      const data = pair[idx];
      const pieces = card.querySelectorAll('.quiz-p');
      pieces.forEach((p, i) => { p.style.setProperty('--c', data[i]); });
      // Label du card : pour la démo on garde les étiquettes en français
      card.querySelector('.quiz-label').textContent = data[3];
    });
    refreshQuizCounter();
  }
  quizCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('is-picked');
      setTimeout(() => {
        if (quizQ < TOTAL_QUIZ) {
          quizQ++;
          paintQuizPair();
        } else {
          showStep(3);
        }
      }, 350);
    });
  });

  // =========================================================
  // APP — navigation entre les 4 écrans (tab bar)
  // =========================================================
  const tabs = document.querySelectorAll('.tab');
  const screens = document.querySelectorAll('.screen');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.toggle('is-active', t === tab));
      screens.forEach(s => s.classList.toggle('is-active', s.dataset.screen === target));
      const scroller = document.querySelector(`.screen[data-screen="${target}"] .screen-scroll`);
      if (scroller) scroller.scrollTop = 0;
    });
  });

  // Mood chips (Ce matin)
  document.querySelectorAll('.mood-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  // Filter chips (Dressing)
  document.querySelectorAll('.filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  // J'adopte → toast
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.trim() === "J'adopte") {
      btn.addEventListener('click', () => {
        btn.textContent = "✓ Ajoutée à mes tenues";
        btn.disabled = true;
        btn.style.opacity = "0.7";
        setTimeout(() => {
          btn.textContent = "J'adopte";
          btn.disabled = false;
          btn.style.opacity = "";
        }, 2200);
      });
    }
  });

  // =========================================================
  // BOTTOM SHEETS — langue + drawer burger
  // =========================================================
  const langSheet = document.getElementById('langSheet');
  const burgerDrawer = document.getElementById('burgerDrawer');

  function openSheet(el) {
    el.hidden = false;
  }
  function closeSheet(el) {
    el.hidden = true;
  }

  // Ouvrir la langue (chip + drawer item)
  document.querySelectorAll('[data-open-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Si on est dans le drawer, on ferme le drawer d'abord
      if (btn.closest('.drawer')) closeSheet(burgerDrawer);
      openSheet(langSheet);
    });
  });

  // Fermer une sheet (clic sur backdrop ou bouton close)
  document.querySelectorAll('.sheet-backdrop').forEach(sheet => {
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet || e.target.matches('[data-close-sheet]')) {
        closeSheet(sheet);
      }
    });
  });

  // Choix d'une langue → met à jour chips + drawer + applique i18n
  document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      const flag = item.dataset.flag;
      const code = item.dataset.code;
      const name = item.querySelector('.lang-name').textContent;
      document.querySelectorAll('.lang-item').forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const chip = document.querySelector('.lang-chip');
      if (chip) {
        chip.querySelector('.lang-flag').textContent = flag;
        chip.querySelector('.lang-code').textContent = code;
      }
      const drawerSub = document.querySelector('.drawer-sub');
      if (drawerSub) {
        drawerSub.textContent = '';
        const flagSpan = document.createElement('span');
        flagSpan.className = 'lang-flag-mini';
        flagSpan.textContent = flag;
        drawerSub.appendChild(flagSpan);
        drawerSub.appendChild(document.createTextNode(' ' + name));
      }
      // 🌐 Traduction effective de toute l'interface
      applyI18n(lang);
      setTimeout(() => closeSheet(langSheet), 250);
    });
  });

  // Burger ouvre le drawer (au lieu de confirm())
  document.querySelector('.burger')?.addEventListener('click', () => {
    openSheet(burgerDrawer);
  });

  // Drawer → "Recommencer la visite"
  document.getElementById('restartOnb')?.addEventListener('click', () => {
    closeSheet(burgerDrawer);
    appWrap.hidden = true;
    onboarding.hidden = false;
    onboarding.style.display = '';
    onboarding.style.opacity = '1';
    quizQ = 1;
    paintQuizPair();
    showStep(1);
  });

  // Init i18n : reprend la langue choisie au dernier passage (localStorage)
  applyI18n(currentLang);
  // Si la langue persistée n'est pas FR, marque la lang-item correspondante
  // active dans la sheet et met à jour la chip + le drawer.
  if (currentLang !== 'fr') {
    const item = document.querySelector(`.lang-item[data-lang="${currentLang}"]`);
    if (item) {
      document.querySelectorAll('.lang-item').forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const flag = item.dataset.flag;
      const code = item.dataset.code;
      const name = item.querySelector('.lang-name').textContent;
      const chip = document.querySelector('.lang-chip');
      if (chip) {
        chip.querySelector('.lang-flag').textContent = flag;
        chip.querySelector('.lang-code').textContent = code;
      }
      const drawerSub = document.querySelector('.drawer-sub');
      if (drawerSub) {
        drawerSub.innerHTML = '';
        const flagSpan = document.createElement('span');
        flagSpan.className = 'lang-flag-mini';
        flagSpan.textContent = flag;
        drawerSub.appendChild(flagSpan);
        drawerSub.appendChild(document.createTextNode(' ' + name));
      }
    }
  }
})();
