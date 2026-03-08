// ═══════════════════════════════════════════════════════════
// e-zvířátka — app.js
// SPA router and all screen renderers
// ═══════════════════════════════════════════════════════════

const App = (function() {
  let _currentScreen = null;
  let _currentParams = {};
  var _sessionStart      = Date.now();
  var _totalActionCount  = 0;

  function _getUnlockedCount() {
    var state = Storage.load();
    return Object.keys(state.animals).filter(function(id) {
      return state.animals[id] && state.animals[id].unlocked;
    }).length;
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  function navigate(screen, params) {
    Game.teardown();
    _currentScreen = screen;
    _currentParams = params || {};
    _render(screen, _currentParams);
  }

  function renderCurrentScreen() {
    _render(_currentScreen, _currentParams);
  }

  function _render(screen, params) {
    const app = document.getElementById('app');
    app.innerHTML = '';
    I18n.updateLangSwitcher();
    // Lang switcher only visible on splash
    var _ls = document.getElementById('lang-switcher');
    if (_ls) _ls.style.display = (screen === 'SPLASH') ? '' : 'none';

    const div = document.createElement('div');
    div.className = 'screen screen-enter';

    switch (screen) {
      case 'SPLASH':        div.innerHTML = _renderSplash();               break;
      case 'AVATAR':        div.innerHTML = _renderAvatar();               break;
      case 'ANIMAL_SELECT': div.innerHTML = _renderAnimalSelect();              break;
      case 'NAME_ANIMAL':   div.innerHTML = _renderNameAnimal(params);         break;
      case 'CARE':          div.innerHTML = _renderCare(params.animalId);      break;
      case 'REWARD':        div.innerHTML = _renderReward(params.animalId);break;
      case 'UNLOCK_NOTIFY': div.innerHTML = _renderUnlockNotify(params); break;
      case 'COLLECTION':    div.innerHTML = _renderCollection();            break;
      case 'LEOPARD':       div.innerHTML = _renderLeopard();              break;
      default:              div.innerHTML = _renderSplash();
    }

    app.appendChild(div);
    _attachListeners(screen, params);
  }

  // ─── SPLASH ──────────────────────────────────────────────────────────────────

  function _renderSplash() {
    var hasConsent = localStorage.getItem('ezvíratka_analytics_consent') === 'true';
    var noticeHTML = hasConsent ? '' :
      '<p class="analytics-notice">' +
        'Hra si ukládá, jak se staráš o zvířátka — abychom ji mohli zlepšovat. ' +
        'Žádné osobní údaje nesdílíme.' +
      '</p>';
    var btnLabel = hasConsent ? I18n.t('btn_start') : 'Rozumím, jdeme na to! 🐾';
    return '' +
      '<div class="splash-screen">' +
        '<div class="game-title">e-zv&#237;&#345;&#225;tka</div>' +
        '<div style="font-size:48px">&#x1F43E;</div>' +
        '<p class="subtitle">' + I18n.t('subtitle') + '</p>' +
        noticeHTML +
        '<button class="btn-primary" id="btn-start">' + btnLabel + '</button>' +
      '</div>';
  }

  // ─── AVATAR CREATION ─────────────────────────────────────────────────────────

  function _renderAvatar() {
    const state = Storage.load();
    const av    = state.avatar;
    const HAIR_COLORS     = ['#8B4513','#FFD700','#1a1a2e','#DC143C','#808080','#FFA07A'];
    const CLOTHING_COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#DDA0DD','#F7DC6F'];

    function swatchesHTML(colorArr, selectedIdx, type) {
      return colorArr.map(function(c, i) {
        return '<button class="color-swatch ' + (i === selectedIdx ? 'selected' : '') + '" ' +
               'style="background:' + c + '" ' +
               'data-type="' + type + '" data-idx="' + i + '" ' +
               'aria-label="Color ' + (i + 1) + '" ' +
               'aria-pressed="' + (i === selectedIdx) + '"></button>';
      }).join('');
    }

    var accessories = [0,1,2,3,4].map(function(i) {
      return '<button class="btn-secondary accessory-btn ' + (av.accessory === i ? 'active-acc' : '') + '" ' +
             'data-acc="' + i + '" style="min-width:var(--size-touch);font-size:12px">' +
             I18n.t('accessory_' + i) +
             '</button>';
    }).join('');

    var hairStyles = [0,1,2,3,4,5].map(function(i) {
      return '<button class="btn-secondary hair-style-btn ' + (av.hairStyle === i ? 'active-acc' : '') + '" ' +
             'data-style="' + i + '" style="min-width:var(--size-touch);font-size:10px">' +
             (i + 1) +
             '</button>';
    }).join('');

    var clothingSets = [0,1,2,3,4].map(function(i) {
      return '<button class="btn-secondary clothing-set-btn ' + (av.clothingSet === i ? 'active-acc' : '') + '" ' +
             'data-set="' + i + '" style="min-width:var(--size-touch);font-size:10px">' +
             (i + 1) +
             '</button>';
    }).join('');

    return '' +
      '<div class="avatar-screen">' +
        '<div class="avatar-panel">' +
          '<h2 style="font-size:10px">' + I18n.t('create_avatar') + '</h2>' +
          '<div class="avatar-container pixel-border" id="avatar-preview">' +
            _buildAvatarLayers(av) +
          '</div>' +
        '</div>' +

        '<div class="avatar-options" id="avatar-options">' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_name') + '</div>' +
            '<input type="text" id="avatar-name" maxlength="12" ' +
                   'value="' + _escapeHtml(av.name) + '" ' +
                   'placeholder="' + I18n.t('name_placeholder') + '" ' +
                   'autocomplete="off">' +
            '<div class="error-msg" id="name-error" style="display:none"></div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">Gender</div>' +
            '<div style="display:flex;gap:8px">' +
              '<button class="btn-secondary gender-btn ' + (av.gender === 'boy'  ? 'active-acc' : '') + '" data-gender="boy">' +
                I18n.t('label_boy') + ' &#x1F466;' +
              '</button>' +
              '<button class="btn-secondary gender-btn ' + (av.gender === 'girl' ? 'active-acc' : '') + '" data-gender="girl">' +
                I18n.t('label_girl') + ' &#x1F467;' +
              '</button>' +
            '</div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_hair_style') + '</div>' +
            '<div class="swatches-row">' + hairStyles + '</div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_hair_color') + '</div>' +
            '<div class="swatches-row">' + swatchesHTML(HAIR_COLORS, av.hairColor, 'hairColor') + '</div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_clothing_style') + '</div>' +
            '<div class="swatches-row">' + clothingSets + '</div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_clothing_color') + '</div>' +
            '<div class="swatches-row">' + swatchesHTML(CLOTHING_COLORS, av.clothingColor, 'clothingColor') + '</div>' +
          '</div>' +

          '<div class="section">' +
            '<div class="label">' + I18n.t('label_accessory') + '</div>' +
            '<div class="swatches-row">' + accessories + '</div>' +
          '</div>' +

          '<button class="btn-primary" id="btn-create-avatar">' + I18n.t('btn_next') + '</button>' +
          '<div style="height:16px"></div>' +

        '</div>' +
      '</div>';
  }

  function _buildAvatarLayers(av) {
    const HUE_OFFSETS = [0, 30, 60, 150, 200, 270];
    const hairHue  = HUE_OFFSETS[av.hairColor  !== undefined ? av.hairColor  : 0];
    const clothHue = HUE_OFFSETS[av.clothingColor !== undefined ? av.clothingColor : 0];
    // Render order: body → clothing → hair → face (always on top) → accessory
    return '' +
      '<img class="avatar-layer" src="assets/avatars/body-' + av.gender + '.svg" alt="">' +
      '<img class="avatar-layer" src="assets/avatars/clothing-' + av.clothingSet + '.svg" ' +
           'style="filter:hue-rotate(' + clothHue + 'deg)" alt="">' +
      '<img class="avatar-layer" src="assets/avatars/hair-' + av.hairStyle + '.svg" ' +
           'style="filter:hue-rotate(' + hairHue + 'deg)" alt="">' +
      '<img class="avatar-layer" src="assets/avatars/face-' + av.gender + '.svg" alt="">' +
      (av.accessory > 0
        ? '<img class="avatar-layer" src="assets/avatars/accessory-' + av.accessory + '.svg" alt="">'
        : '');
  }

  function _escapeHtml(str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;');
  }

  // ─── ANIMAL SELECT ────────────────────────────────────────────────────────────

  function _renderAnimalSelect() {
    const state = Storage.load();
    const order = state.unlockOrder || ANIMALS.filter(function(a) { return !a.isFinal; }).map(function(a) { return a.id; });

    // Unlocked animals first, then locked — both in their unlock order
    const unlocked = order.filter(function(id) { return state.animals[id] && state.animals[id].unlocked; });
    const locked   = order.filter(function(id) { return !state.animals[id] || !state.animals[id].unlocked; });
    const sortedIds = unlocked.concat(locked);
    const regularAnimals = sortedIds.map(function(id) { return getAnimalById(id); }).filter(Boolean);

    const cards = regularAnimals.map(function(animal) {
      const isUnlocked = state.animals[animal.id] && state.animals[animal.id].unlocked;
      return '' +
        '<button class="animal-card ' + (isUnlocked ? '' : 'locked') + '" ' +
                'data-animal-id="' + animal.id + '"' +
                (isUnlocked ? '' : ' disabled aria-disabled="true"') +
                ' aria-label="' + I18n.t('animal_' + animal.id) +
                (isUnlocked ? '' : ' - ' + I18n.t('locked_animal')) + '">' +
          '<img src="assets/animals/' + animal.id + '.svg" alt="' + I18n.t('animal_' + animal.id) + '">' +
          '<span class="animal-name">' + I18n.t('animal_' + animal.id) + '</span>' +
          (isUnlocked ? '' : '<span class="lock-icon" aria-hidden="true">&#x1F512;</span>') +
        '</button>';
    }).join('');

    const unlockedCount = regularAnimals.filter(function(a) {
      return state.animals[a.id] && state.animals[a.id].unlocked;
    }).length;

    return '' +
      '<h2>' + I18n.t('choose_animal') + '</h2>' +
      '<p style="font-size:12px;color:var(--color-text-dim)">' + I18n.t('animals_count', unlockedCount) + '</p>' +
      '<div class="animals-grid">' + cards + '</div>' +
      '<div style="height:16px"></div>';
  }

  // ─── CARE SCREEN ─────────────────────────────────────────────────────────────

  function _renderCare(animalId) {
    const state  = Storage.load();
    const animal = state.animals[animalId];
    if (!animal) return _renderAnimalSelect();

    const mood      = Game.getMood(animal.happiness);
    const moodEmoji = Game.getMoodEmoji(animal.happiness);

    return '' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<button class="btn-secondary" id="btn-to-collection" ' +
                'style="font-size:10px;padding:8px 12px;min-height:var(--size-touch)">' +
          '&#x1F43E; ' + I18n.t('my_collection') +
        '</button>' +
        '<span style="font-family:var(--font-heading);font-size:9px;color:var(--color-text-dim)">' +
          I18n.t('animal_' + animalId) + (animal.petName ? ' \u2022 ' + animal.petName : '') +
        '</span>' +
      '</div>' +

      '<div class="care-screen">' +
        '<div class="animal-display" id="animal-display">' +
          '<div class="notification-bubble" id="notification-bubble"></div>' +
          '<img class="animal-sprite-img" id="animal-sprite" ' +
               'src="assets/animals/' + animalId + '.svg" ' +
               'alt="' + I18n.t('animal_' + animalId) + '">' +
        '</div>' +

        '<div style="font-size:28px" id="mood-emoji">' + moodEmoji + '</div>' +

        '<div class="section" style="max-width:100%">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">' +
            '<span style="font-family:var(--font-heading);font-size:9px">' + I18n.t('happiness') + '</span>' +
            '<span style="font-family:var(--font-heading);font-size:9px" id="happiness-value">' + animal.happiness + '</span>' +
          '</div>' +
          '<div class="happiness-bar-container" role="progressbar" ' +
               'aria-valuenow="' + animal.happiness + '" aria-valuemin="0" aria-valuemax="100" ' +
               'aria-label="' + I18n.t('happiness') + '">' +
            '<div class="happiness-bar ' + mood + '" id="happiness-bar" style="width:' + animal.happiness + '%"></div>' +
          '</div>' +
        '</div>' +

        '<div class="action-buttons">' +
          (function() {
            var actions   = getAnimalActions(animalId);
            var animalSt  = state.animals[animalId];
            var charges   = (animalSt && animalSt.charges)      || {};
            var cooldowns = (animalSt && animalSt.cooldownUntil) || {};
            var now       = Date.now();
            return actions.map(function(action) {
              var key     = action.key;
              var cfg     = Game.CHARGE_CONFIG[key];
              var maxC    = cfg ? cfg.max : 2;
              var curC    = (charges[key] !== undefined) ? charges[key] : maxC;
              var cdUntil = cooldowns[key];
              if (cdUntil && now >= cdUntil) { curC = maxC; cdUntil = null; }
              var inCD = !!(cdUntil && now < cdUntil);
              var dots = '';
              for (var d = 0; d < maxC; d++) dots += (d < curC) ? '●' : '○';
              return '<button class="btn-action' + (inCD ? ' btn-action-cooldown' : '') + '" ' +
                     'data-action="' + key + '" ' +
                     'data-response="' + _escapeHtml(action.response || '') + '" ' +
                     'aria-label="' + action.label + '">' +
                     action.emoji + ' ' + action.label +
                     '<span class="charge-dots">' + dots + '</span>' +
                     '</button>';
            }).join('');
          })() +
        '</div>' +
      '</div>';
  }

  // ─── REWARD SCREEN ────────────────────────────────────────────────────────────

  function _renderReward(animalId) {
    const animalData = getAnimalById(animalId);
    const animalName = I18n.t('animal_' + animalId);
    const emoji      = animalData ? animalData.emoji : '&#x1F43E;';

    return '' +
      '<div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:24px;padding:24px 0">' +
        '<div style="font-size:64px">' + emoji + '</div>' +
        '<h2 style="color:var(--color-accent)">' + I18n.t('new_animal') + '</h2>' +
        '<p style="font-family:var(--font-heading);font-size:12px;color:var(--color-secondary)">' +
          I18n.t('new_animal_name', animalName) +
        '</p>' +
        '<img src="assets/animals/' + animalId + '.svg" alt="' + animalName + '" ' +
             'style="width:128px;height:128px;image-rendering:pixelated">' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;width:100%">' +
          '<button class="btn-secondary" id="btn-to-collection-reward" style="flex:1;min-width:140px">' +
            I18n.t('btn_view_collection') +
          '</button>' +
          '<button class="btn-primary" id="btn-continue-care" style="flex:1;min-width:140px">' +
            I18n.t('btn_continue') +
          '</button>' +
        '</div>' +
      '</div>';
  }

  // ─── UNLOCK NOTIFICATION ─────────────────────────────────────────────────────

  function _renderUnlockNotify(params) {
    var lang        = I18n.getCurrentLang();
    var curAnimal   = getAnimalById(params.currentAnimalId);
    var state       = Storage.load();
    var curAnimalSt = state.animals[params.currentAnimalId];
    var petName     = curAnimalSt && curAnimalSt.petName;
    var accusative  = petName
      ? petName
      : (curAnimal ? (lang === 'en' ? curAnimal.accusativeEN : curAnimal.accusativeCS) : (params.currentAnimalId || ''));

    var msg = lang === 'en'
      ? 'You take great care of ' + accusative + '! \uD83C\uDF1F'
      : 'O ' + accusative + ' se star\u00e1\u0161 moc hezky! \uD83C\uDF1F';

    return '' +
      '<div class="unlock-notify" id="unlock-notify">' +
        '<div id="unlock-stars"></div>' +
        '<div style="font-size:72px;margin-bottom:8px">' + (curAnimal ? curAnimal.emoji : '\uD83D\uDC3E') + '</div>' +
        '<h2 style="color:var(--color-accent);text-align:center;line-height:1.8">' + msg + '</h2>' +
        '<p style="color:var(--color-text-dim);font-size:14px;text-align:center;margin:8px 0 24px">' +
          (lang === 'en' ? 'Choose your next animal!' : 'Vyber si dal\u0161\u00ed zv\u00ed\u0159\u00e1tko!') +
        '</p>' +
        '<button class="btn-primary" id="btn-pick-animal" style="max-width:280px">' +
          (lang === 'en' ? 'Choose animal \u2192' : 'Vybrat zv\u00ed\u0159\u00e1tko \u2192') +
        '</button>' +
      '</div>';
  }

  // ─── COLLECTION ───────────────────────────────────────────────────────────────

  function _renderCollection() {
    const state      = Storage.load();
    const allAnimals = ANIMALS.filter(function(a) {
      return !a.isFinal || state.leopardUnlocked;
    });

    const cards = allAnimals.map(function(animal) {
      const animalState = state.animals[animal.id];
      if (!animalState || !animalState.unlocked) return '';
      const mood      = Game.getMood(animalState.happiness);
      const barBg     = mood === 'sad'      ? '#ff4444'
                      : mood === 'neutral'  ? '#ffaa00'
                      : mood === 'happy'    ? 'var(--color-secondary)'
                      : 'var(--color-accent)';
      return '' +
        '<button class="animal-card" data-animal-id="' + animal.id + '" aria-label="' + I18n.t('animal_' + animal.id) + '">' +
          '<img src="assets/animals/' + animal.id + '.svg" alt="' + I18n.t('animal_' + animal.id) + '">' +
          '<span class="animal-name">' + I18n.t('animal_' + animal.id) + '</span>' +
          '<div class="card-happiness-bar" role="progressbar" ' +
               'aria-valuenow="' + animalState.happiness + '" aria-valuemin="0" aria-valuemax="100">' +
            '<div class="card-happiness-fill" style="width:' + animalState.happiness + '%;background:' + barBg + '"></div>' +
          '</div>' +
          '<span style="font-size:16px">' + Game.getMoodEmoji(animalState.happiness) + '</span>' +
        '</button>';
    }).filter(Boolean).join('');

    const unlockedCount = ANIMALS.filter(function(a) {
      return !a.isFinal && state.animals[a.id] && state.animals[a.id].unlocked;
    }).length;

    return '' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<h2>' + I18n.t('my_collection') + '</h2>' +
        '<button class="btn-secondary" id="btn-to-select" ' +
                'style="font-size:10px;padding:8px 12px;min-height:var(--size-touch)">' +
          '+ ' + I18n.t('choose_animal') +
        '</button>' +
      '</div>' +
      '<p style="font-size:12px;color:var(--color-text-dim);margin-bottom:8px">' + I18n.t('animals_count', unlockedCount) + '</p>' +
      '<div class="animals-grid">' + (cards || '<p style="color:var(--color-text-dim)">No animals yet</p>') + '</div>' +
      '<div style="height:16px"></div>';
  }

  // ─── UNLOCK STARS animation ──────────────────────────────────────────────────

  function _spawnUnlockStars() {
    var container = document.getElementById('unlock-stars');
    if (!container) return;
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden';
    var symbols = ['⭐','🌟','✨','💫'];
    for (var i = 0; i < 24; i++) {
      var star = document.createElement('div');
      var sym  = symbols[Math.floor(Math.random() * symbols.length)];
      var size = 16 + Math.random() * 20;
      star.textContent = sym;
      star.style.cssText =
        'position:absolute;' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:-30px;' +
        'font-size:' + size + 'px;' +
        'animation:confetti-fall ' + (2.5 + Math.random() * 2) + 's ease-in forwards;' +
        'animation-delay:' + (Math.random() * 1.5) + 's;';
      container.appendChild(star);
    }
    setTimeout(function() {
      if (container.parentNode) container.style.display = 'none';
    }, 5000);
  }

  // ─── LEOPARD CUTSCENE ─────────────────────────────────────────────────────────

  function _renderLeopard() {
    return '' +
      '<div id="leopard-cutscene" role="dialog" aria-label="' + I18n.t('final_reward_title') + '">' +
        '<div class="cutscene-stars" aria-hidden="true" id="stars-container"></div>' +
        '<div id="leopard-img-wrapper" style="opacity:0;width:160px;height:160px">' +
          '<img src="assets/animals/leopard.svg" alt="Leopard" ' +
               'style="width:160px;height:160px;image-rendering:pixelated">' +
        '</div>' +
        '<div class="cutscene-title" id="cutscene-text" style="opacity:0;white-space:pre-line">' +
          I18n.t('final_reward') +
        '</div>' +
        '<div id="cutscene-buttons" style="opacity:0;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;width:100%">' +
          '<button class="btn-secondary" id="btn-play-again" style="flex:1;min-width:140px">' +
            I18n.t('btn_play_again') +
          '</button>' +
          '<button class="btn-primary" id="btn-stay-collection" style="flex:1;min-width:140px">' +
            I18n.t('btn_stay_collection') +
          '</button>' +
        '</div>' +
      '</div>';
  }

  // ─── EVENT LISTENERS ──────────────────────────────────────────────────────────

  function _attachListeners(screen, params) {
    switch (screen) {
      case 'SPLASH':
        Analytics.trackAppOpen();
        document.getElementById('btn-start') &&
          document.getElementById('btn-start').addEventListener('click', function() {
            // Ulož souhlas s analytikou (první kliknutí = souhlas)
            localStorage.setItem('ezvíratka_analytics_consent', 'true');
            var state = Storage.load();
            trackEvent('session_start', {
              avatarName:    state.avatar ? state.avatar.name : '',
              gender:        state.avatar ? state.avatar.gender : '',
              unlockedCount: _getUnlockedCount(),
              isReturn:      !!(state.avatar && state.avatar.name)
            });
            if (state.avatar.name) {
              navigate('COLLECTION');
            } else {
              navigate('AVATAR');
            }
          });
        break;

      case 'AVATAR':
        _attachAvatarListeners();
        break;

      case 'ANIMAL_SELECT':
        document.querySelectorAll('.animal-card:not(.locked)').forEach(function(card) {
          card.addEventListener('click', function() {
            var animalId  = card.dataset.animalId;
            var state     = Storage.load();
            state.currentAnimalId = animalId;
            Storage.save(state);
            var animalSt  = state.animals[animalId];
            if (!animalSt || !animalSt.petName) {
              navigate('NAME_ANIMAL', { animalId: animalId });
            } else {
              navigate('CARE', { animalId: animalId });
            }
          });
        });
        break;

      case 'NAME_ANIMAL': {
        var nameInput  = document.getElementById('pet-name-input');
        var nameBtn    = document.getElementById('btn-confirm-name');
        if (nameInput) {
          nameInput.focus();
          nameInput.addEventListener('input', function() {
            var has = nameInput.value.trim().length > 0;
            nameBtn.disabled    = !has;
            nameBtn.style.opacity = has ? '1' : '0.5';
          });
          nameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') nameBtn.click();
          });
        }
        if (nameBtn) {
          nameBtn.addEventListener('click', function() {
            var petName = nameInput ? nameInput.value.trim() : '';
            if (!petName) return;
            var s = Storage.load();
            if (s.animals[params.animalId]) {
              s.animals[params.animalId].petName = petName;
              Storage.save(s);
              trackEvent('animal_named', {
                animalId:   params.animalId,
                petName:    petName,
                avatarName: s.avatar ? s.avatar.name : ''
              });
            }
            navigate('CARE', { animalId: params.animalId });
          });
        }
        break;
      }

      case 'CARE':
        _attachCareListeners(params.animalId);
        break;

      case 'REWARD':
        document.getElementById('btn-to-collection-reward') &&
          document.getElementById('btn-to-collection-reward').addEventListener('click', function() {
            navigate('COLLECTION');
          });
        document.getElementById('btn-continue-care') &&
          document.getElementById('btn-continue-care').addEventListener('click', function() {
            const state = Storage.load();
            navigate('CARE', { animalId: state.currentAnimalId || 'dog' });
          });
        _spawnConfetti();
        break;

      case 'COLLECTION':
        document.querySelectorAll('.animal-card').forEach(function(card) {
          card.addEventListener('click', function() {
            _showAnimalDetail(card.dataset.animalId);
          });
        });
        document.getElementById('btn-to-select') &&
          document.getElementById('btn-to-select').addEventListener('click', function() {
            navigate('ANIMAL_SELECT');
          });
        break;

      case 'LEOPARD':
        _runLeopardCutscene();
        break;

      case 'UNLOCK_NOTIFY':
        document.getElementById('btn-pick-animal') &&
          document.getElementById('btn-pick-animal').addEventListener('click', function() {
            navigate('ANIMAL_SELECT');
          });
        _spawnUnlockStars();
        break;
    }
  }

  // ─── Avatar listeners ─────────────────────────────────────────────────────────

  function _attachAvatarListeners() {
    const state = Storage.load();
    const av    = state.avatar;

    function updatePreview() {
      const preview = document.getElementById('avatar-preview');
      if (preview) preview.innerHTML = _buildAvatarLayers(av);
    }

    function markActive(selector, value, attr) {
      document.querySelectorAll(selector).forEach(function(btn) {
        const btnVal  = String(
          btn.dataset[attr] !== undefined ? btn.dataset[attr]
          : btn.dataset.idx  !== undefined ? btn.dataset.idx
          : btn.dataset.set  !== undefined ? btn.dataset.set
          : btn.dataset.style !== undefined ? btn.dataset.style
          : btn.dataset.acc  !== undefined ? btn.dataset.acc
          : btn.dataset.gender
        );
        const isActive = btnVal === String(value);
        btn.classList.toggle('active-acc', isActive);
        if (btn.classList.contains('color-swatch')) {
          btn.classList.toggle('selected', isActive);
          btn.setAttribute('aria-pressed', isActive);
        }
      });
    }

    // Gender
    document.querySelectorAll('.gender-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.gender = btn.dataset.gender;
        markActive('.gender-btn', av.gender, 'gender');
        updatePreview();
      });
    });

    // Hair style
    document.querySelectorAll('.hair-style-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.hairStyle = parseInt(btn.dataset.style, 10);
        markActive('.hair-style-btn', av.hairStyle, 'style');
        updatePreview();
      });
    });

    // Hair color
    document.querySelectorAll('.color-swatch[data-type="hairColor"]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.hairColor = parseInt(btn.dataset.idx, 10);
        var HUE = [0,30,60,150,200,270];
        console.log('[Avatar] Barva vlasů změněna:', av.hairColor, '→ hue-rotate(' + (HUE[av.hairColor]||0) + 'deg)');
        markActive('.color-swatch[data-type="hairColor"]', av.hairColor, 'idx');
        updatePreview();
      });
    });

    // Clothing set
    document.querySelectorAll('.clothing-set-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.clothingSet = parseInt(btn.dataset.set, 10);
        markActive('.clothing-set-btn', av.clothingSet, 'set');
        updatePreview();
      });
    });

    // Clothing color
    document.querySelectorAll('.color-swatch[data-type="clothingColor"]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.clothingColor = parseInt(btn.dataset.idx, 10);
        var HUE = [0,30,60,150,200,270];
        console.log('[Avatar] Barva oblečení změněna:', av.clothingColor, '→ hue-rotate(' + (HUE[av.clothingColor]||0) + 'deg)');
        markActive('.color-swatch[data-type="clothingColor"]', av.clothingColor, 'idx');
        updatePreview();
      });
    });

    // Accessory
    document.querySelectorAll('.accessory-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        av.accessory = parseInt(btn.dataset.acc, 10);
        markActive('.accessory-btn', av.accessory, 'acc');
        updatePreview();
      });
    });

    // Continue / create avatar
    document.getElementById('btn-create-avatar') &&
      document.getElementById('btn-create-avatar').addEventListener('click', function() {
        const nameInput = document.getElementById('avatar-name');
        const errorEl   = document.getElementById('name-error');
        const name      = nameInput.value.trim();
        if (!name) {
          errorEl.textContent    = I18n.t('name_required');
          errorEl.style.display  = 'block';
          nameInput.focus();
          return;
        }
        errorEl.style.display = 'none';
        av.name = name;
        const s = Storage.load();
        s.avatar = av;
        Storage.save(s);
        navigate('ANIMAL_SELECT');
      });

    // Live name sync
    document.getElementById('avatar-name') &&
      document.getElementById('avatar-name').addEventListener('input', function(e) {
        av.name = e.target.value;
      });
  }

  // ─── Care listeners ───────────────────────────────────────────────────────────

  function _attachCareListeners(animalId) {
    document.getElementById('btn-to-collection') &&
      document.getElementById('btn-to-collection').addEventListener('click', function() {
        navigate('COLLECTION');
      });

    Game.initCareScreen(animalId, {
      onHappinessChange: function(happiness, mood, moodEmoji) {
        const bar  = document.getElementById('happiness-bar');
        const val  = document.getElementById('happiness-value');
        const emo  = document.getElementById('mood-emoji');
        const cont = bar && bar.parentElement;
        if (bar) {
          bar.style.width = happiness + '%';
          bar.className   = 'happiness-bar ' + mood;
        }
        if (val)  val.textContent  = happiness;
        if (emo)  emo.textContent  = moodEmoji;
        if (cont) cont.setAttribute('aria-valuenow', happiness);
      },
      onNeedMoreCare: function() {
        _showBubble(I18n.t('bubble_reward_wait'), 3000);
      },
      onComplaint: function(msg) {
        _showBubble(msg, 4000);
      },
      onRewardFired: function(newAnimalId) {
        var st = Storage.load();
        trackEvent('animal_unlocked', {
          animalId:      newAnimalId,
          unlockedCount: _getUnlockedCount(),
          avatarName:    st.avatar ? st.avatar.name : ''
        });
        navigate('UNLOCK_NOTIFY', { currentAnimalId: animalId, newAnimalId: newAnimalId });
      },
      onLeopardUnlocked: function() {
        const state = Storage.load();
        state.leopardCutsceneSeen = true;
        Storage.save(state);
        navigate('LEOPARD');
      }
    });

    document.querySelectorAll('.btn-action').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var action = btn.dataset.action;
        var result = Game.doAction(animalId, action);
        if (!result) return;

        // Refusal — show animal-specific rejection bubble
        if (result.refusal) {
          _showBubble(getAnimalRefusal(animalId, action), 2000);
          _refreshChargeButtons(animalId);
          return;
        }

        _totalActionCount++;
        trackEvent('care_action', {
          animalId:    animalId,
          actionType:  action,
          happiness:   result.happiness,
          actionCount: _totalActionCount
        });

        // Update happiness UI
        var bar  = document.getElementById('happiness-bar');
        var val  = document.getElementById('happiness-value');
        var emo  = document.getElementById('mood-emoji');
        var cont = bar && bar.parentElement;
        if (bar) {
          bar.style.width = result.happiness + '%';
          bar.className   = 'happiness-bar ' + result.mood;
        }
        if (val)  val.textContent  = result.happiness;
        if (emo)  emo.textContent  = result.moodEmoji;
        if (cont) cont.setAttribute('aria-valuenow', result.happiness);

        // Trigger animation on the display container
        var display = document.getElementById('animal-display');
        if (display) {
          display.className = 'animal-display action-' + action;
          setTimeout(function() { display.className = 'animal-display'; }, 800);
        }

        // Show per-animal response bubble
        _showBubble(btn.dataset.response || I18n.t('bubble_' + action));

        // Update charge dots on this button
        var dotsEl = btn.querySelector('.charge-dots');
        if (dotsEl) {
          var str = '';
          for (var d = 0; d < result.maxCharges; d++) str += (d < result.chargesLeft) ? '●' : '○';
          dotsEl.textContent = str;
        }
        btn.classList.toggle('btn-action-cooldown', !!result.inCooldown);

        // Brief input lockout
        document.querySelectorAll('.btn-action').forEach(function(b) { b.disabled = true; });
        setTimeout(function() {
          document.querySelectorAll('.btn-action').forEach(function(b) { b.disabled = false; });
        }, 600);
      });
    });

    // Poll every 2s to refresh charge dots when cooldowns expire
    var chargesRefreshTimer = setInterval(function() {
      if (!document.querySelector('.btn-action')) { clearInterval(chargesRefreshTimer); return; }
      _refreshChargeButtons(animalId);
    }, 2000);
  }

  // ─── Refresh charge dot indicators on all action buttons ─────────────────────

  function _refreshChargeButtons(animalId) {
    var state      = Storage.load();
    var animalSt   = state.animals[animalId];
    if (!animalSt || !animalSt.charges) return;

    var now     = Date.now();
    var changed = false;

    document.querySelectorAll('.btn-action').forEach(function(btn) {
      var key    = btn.dataset.action;
      var cfg    = Game.CHARGE_CONFIG[key];
      if (!cfg) return;

      var cdUntil = animalSt.cooldownUntil && animalSt.cooldownUntil[key];

      // Refill if cooldown expired
      if (cdUntil && now >= cdUntil) {
        animalSt.charges[key]       = cfg.max;
        animalSt.cooldownUntil[key] = null;
        cdUntil = null;
        changed = true;
      }

      var curC  = (animalSt.charges[key] !== undefined) ? animalSt.charges[key] : cfg.max;
      var inCD  = !!(cdUntil && now < cdUntil);

      var dotsEl = btn.querySelector('.charge-dots');
      if (dotsEl) {
        var str = '';
        for (var d = 0; d < cfg.max; d++) str += (d < curC) ? '●' : '○';
        dotsEl.textContent = str;
      }
      btn.classList.toggle('btn-action-cooldown', inCD);
    });

    if (changed) Storage.save(state);
  }

  // ─── Notification bubble ─────────────────────────────────────────────────────

  function _showBubble(text, duration) {
    const bubble = document.getElementById('notification-bubble');
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.add('visible');
    setTimeout(function() { bubble.classList.remove('visible'); }, duration || 1500);
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  // Pick 2 random items from arr, avoiding last shown indices (sessionStorage)
  function _pickRandom2(arr, sessionKey) {
    if (!arr || arr.length === 0) return [];
    if (arr.length <= 2) return arr.slice();
    var last = [];
    try { last = JSON.parse(sessionStorage.getItem(sessionKey) || '[]'); } catch(e) {}
    var pool = arr.map(function(_, i) { return i; }).filter(function(i) { return last.indexOf(i) === -1; });
    if (pool.length < 2) pool = arr.map(function(_, i) { return i; });
    pool.sort(function() { return Math.random() - 0.5; });
    var picks = [pool[0], pool[1 < pool.length ? 1 : 0]];
    try { sessionStorage.setItem(sessionKey, JSON.stringify(picks)); } catch(e) {}
    return [arr[picks[0]], arr[picks[1]]];
  }

  // ─── NAME ANIMAL screen ──────────────────────────────────────────────────────

  function _renderNameAnimal(params) {
    var animalId = params.animalId;
    var animal   = getAnimalById(animalId);
    var emoji    = animal ? animal.emoji : '🐾';
    var lang     = I18n.getCurrentLang();
    var species  = I18n.t('animal_' + animalId);
    var question = lang === 'en'
      ? 'What will your ' + species + ' be called?'
      : 'Jak se bude jmenovat tvůj/tvoje ' + species + '?';
    var placeholder = lang === 'en' ? 'Enter a name...' : 'Napiš jméno...';
    var btnLabel    = lang === 'en' ? 'Confirm \u2192' : 'Potvrdit \u2192';

    return '' +
      '<div class="name-animal-screen">' +
        '<div style="font-size:80px;line-height:1;margin-bottom:8px">' + emoji + '</div>' +
        '<h2 style="font-size:14px;text-align:center;line-height:1.7;margin:0 0 20px">' + question + '</h2>' +
        '<input type="text" id="pet-name-input" maxlength="12" autocomplete="off" ' +
               'placeholder="' + placeholder + '" class="pet-name-input">' +
        '<button class="btn-primary" id="btn-confirm-name" disabled ' +
                'style="opacity:0.5;max-width:240px;width:100%">' + btnLabel + '</button>' +
      '</div>';
  }

  // ─── ANIMAL DETAIL modal ─────────────────────────────────────────────────────

  function _showAnimalDetail(animalId) {
    var state    = Storage.load();
    var animal   = getAnimalById(animalId);
    var animalSt = state.animals[animalId];
    if (!animal || !animalSt) return;

    var lang        = I18n.getCurrentLang();
    var species     = I18n.t('animal_' + animalId);
    var petName     = animalSt.petName;
    var displayName = petName ? (petName + ' \u2022 ' + species) : species;
    // "Jít za X" — with name: use name; without: use accusative form
    var goName      = petName
      ? petName.toUpperCase()
      : (lang === 'en'
          ? animal.accusativeEN.toUpperCase()
          : ('ZA ' + animal.accusativeCS).toUpperCase().replace('ZA ZA ','ZA '));
    var goLabel     = lang === 'en' ? 'GO TO ' + goName + ' \u2192' : 'J\u00cdT ' + goName + ' \u2192';
    var closeLabel  = lang === 'en' ? 'Close' : 'Zav\u0159\u00edt';
    var factsTitle  = lang === 'en' ? '📚 Did you know...' : '📚 V\u011bd\u011bl/a jsi, \u017ee...';
    var funTitle    = lang === 'en' ? '😄 Fun fact!' : '😄 Z\u00e1bavn\u00e9!';
    var renameLabel = lang === 'en' ? 'Rename' : 'P\u0159ejmenovat';

    // Random 2 from facts, 2 from funFacts — avoid repeating last pair
    var shownFacts   = _pickRandom2(animal.facts    || [], '_lastFacts_'    + animalId);
    var shownFunFacts = _pickRandom2(animal.funFacts || [], '_lastFunFacts_' + animalId);

    var factsHTML   = shownFacts.map(function(f)    { return '<li class="fact-item">' + f + '</li>'; }).join('');
    var funHTML     = shownFunFacts.map(function(f) { return '<li class="fact-item fun">' + f + '</li>'; }).join('');

    var overlay = document.createElement('div');
    overlay.id = 'animal-detail-overlay';
    overlay.className = 'animal-detail-overlay';
    overlay.innerHTML = '' +
      '<div class="animal-detail-modal">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">' +
          '<div style="font-size:56px;line-height:1">' + animal.emoji + '</div>' +
          '<button class="btn-secondary" id="btn-close-detail" style="padding:6px 12px;font-size:11px">' + closeLabel + '</button>' +
        '</div>' +
        '<div class="detail-name-row" id="detail-name-row">' +
          '<span id="detail-name-text" style="font-family:var(--font-heading);font-size:13px">' + displayName + '</span>' +
          '<button class="edit-name-btn" id="btn-edit-petname" title="' + renameLabel + '" aria-label="' + renameLabel + '">✏️</button>' +
        '</div>' +
        '<div style="margin:12px 0 8px">' +
          '<div class="fact-section-title accent">' + factsTitle + '</div>' +
          '<ul class="fact-list">' + factsHTML + '</ul>' +
        '</div>' +
        '<div style="margin-bottom:20px">' +
          '<div class="fact-section-title secondary">' + funTitle + '</div>' +
          '<ul class="fact-list">' + funHTML + '</ul>' +
        '</div>' +
        '<button class="btn-primary" id="btn-go-to-care-detail" style="width:100%;margin-bottom:8px">' + goLabel + '</button>' +
      '</div>';

    document.body.appendChild(overlay);

    // Close
    document.getElementById('btn-close-detail').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

    // Go to care
    document.getElementById('btn-go-to-care-detail').addEventListener('click', function() {
      overlay.remove();
      var s = Storage.load();
      s.currentAnimalId = animalId;
      Storage.save(s);
      var aSt = s.animals[animalId];
      if (!aSt || !aSt.petName) {
        navigate('NAME_ANIMAL', { animalId: animalId });
      } else {
        navigate('CARE', { animalId: animalId });
      }
    });

    // Edit pet name inline
    document.getElementById('btn-edit-petname').addEventListener('click', function() {
      var row = document.getElementById('detail-name-row');
      var currentName = animalSt.petName || '';
      row.innerHTML = '' +
        '<input type="text" id="inline-pet-name" value="' + _escapeHtml(currentName) + '" maxlength="12" class="pet-name-input" style="width:140px">' +
        '<button class="btn-primary" id="btn-save-petname" style="padding:6px 14px;font-size:11px;margin-left:8px">\u2713</button>';
      var inp = document.getElementById('inline-pet-name');
      inp.focus(); inp.select();
      document.getElementById('btn-save-petname').addEventListener('click', function() {
        var newName = inp.value.trim();
        if (!newName) return;
        var s = Storage.load();
        s.animals[animalId].petName = newName;
        Storage.save(s);
        animalSt.petName = newName;
        // Update go-to button label
        var goBtn = document.getElementById('btn-go-to-care-detail');
        if (goBtn) goBtn.textContent = (lang === 'en' ? 'Go to ' + newName + ' \u2192' : 'J\u00edt za ' + newName + ' \u2192');
        var newDisplay = newName + ' \u2022 ' + species;
        row.innerHTML = '<span id="detail-name-text" style="font-family:var(--font-heading);font-size:13px">' + newDisplay + '</span>' +
          '<button class="edit-name-btn" id="btn-edit-petname" title="' + renameLabel + '" aria-label="' + renameLabel + '">✏️</button>';
        // Re-bind edit button
        document.getElementById('btn-edit-petname').addEventListener('click', arguments.callee.bind(null, animalId));
      });
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') document.getElementById('btn-save-petname').click();
      });
    });
  }

  // ─── Confetti ─────────────────────────────────────────────────────────────────

  function _spawnConfetti() {
    const colors    = ['#FF6B6B','#4ECDC4','#FFE66D','#FF8E53','#A8E6CF','#FFB6C1'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden';

    for (var i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      const size  = Math.random() * 8 + 6;
      piece.style.cssText =
        'position:absolute;' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:-10px;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'animation:confetti-fall ' + (2 + Math.random() * 2) + 's ease-in forwards;' +
        'animation-delay:' + (Math.random()) + 's;' +
        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';';
      container.appendChild(piece);
    }

    document.body.appendChild(container);
    setTimeout(function() { container.remove(); }, 4000);
  }

  // ─── Leopard cutscene ─────────────────────────────────────────────────────────

  function _runLeopardCutscene() {
    // Stars
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
      starsContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none';
      for (var i = 0; i < 30; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.style.cssText =
          'position:absolute;' +
          'left:' + (Math.random() * 100) + '%;' +
          'top:'  + (Math.random() * 100) + '%;' +
          'font-size:' + (8 + Math.random() * 16) + 'px;' +
          'color:var(--color-accent);' +
          'animation:star-twinkle 2s ease-in-out infinite;' +
          'animation-delay:' + (Math.random() * 2) + 's;';
        starsContainer.appendChild(star);
      }
    }

    // Leopard slides in
    setTimeout(function() {
      const wrapper = document.getElementById('leopard-img-wrapper');
      if (wrapper) {
        wrapper.style.opacity = '1';
        const img = wrapper.querySelector('img');
        if (img) img.classList.add('leopard-slide-in');
      }
    }, 500);

    // Confetti
    setTimeout(function() { _spawnConfetti(); }, 2000);

    // Text fades in
    setTimeout(function() {
      const text = document.getElementById('cutscene-text');
      if (text) {
        text.style.cssText = 'opacity:1;transition:opacity 0.5s ease;white-space:pre-line';
      }
    }, 2500);

    // Buttons appear + wire up
    setTimeout(function() {
      const btns = document.getElementById('cutscene-buttons');
      if (btns) {
        btns.style.cssText = 'opacity:1;transition:opacity 0.5s ease;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;width:100%';
      }

      document.getElementById('btn-play-again') &&
        document.getElementById('btn-play-again').addEventListener('click', function() {
          Storage.reset();
          navigate('SPLASH');
        });

      document.getElementById('btn-stay-collection') &&
        document.getElementById('btn-stay-collection').addEventListener('click', function() {
          navigate('COLLECTION');
        });
    }, 3500);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    I18n.init();
    navigate('SPLASH');

    window.addEventListener('beforeunload', function() {
      var duration = Math.floor((Date.now() - _sessionStart) / 1000);
      var st = Storage.load();
      trackEvent('session_end', {
        sessionDuration: duration,
        unlockedCount:   _getUnlockedCount(),
        avatarName:      st.avatar ? (st.avatar.name || '') : ''
      });
    });

    var resetBtn     = document.getElementById('btn-dev-reset');
    var resetConfirm = document.getElementById('reset-confirm');
    var resetYes     = document.getElementById('btn-reset-yes');
    var resetNo      = document.getElementById('btn-reset-no');

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        resetConfirm.style.display = 'flex';
        resetNo.focus();
      });
    }
    if (resetYes) {
      resetYes.addEventListener('click', function() {
        resetConfirm.style.display = 'none';
        Storage.reset();
        navigate('SPLASH');
      });
    }
    if (resetNo) {
      resetNo.addEventListener('click', function() {
        resetConfirm.style.display = 'none';
      });
    }
    if (resetConfirm) {
      resetConfirm.addEventListener('click', function(e) {
        if (e.target === resetConfirm) resetConfirm.style.display = 'none';
      });
    }
  }

  return {
    navigate:            navigate,
    renderCurrentScreen: renderCurrentScreen,
    init:                init
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
