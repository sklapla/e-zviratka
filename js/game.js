// ═══════════════════════════════════════════════════════════
// e-zvířátka — game.js
// Core game logic: care actions, decay, reward system
// ═══════════════════════════════════════════════════════════

const Game = (function() {
  const ACTION_POINTS = {
    feed:  3,
    pet:   4,
    play:  5,
    sleep: 2,
    clean: 2
  };

  const CHARGE_CONFIG = {
    feed:  { max: 2, cooldown: 90000  },
    pet:   { max: 3, cooldown: 45000  },
    play:  { max: 2, cooldown: 60000  },
    sleep: { max: 2, cooldown: 120000 },
    clean: { max: 2, cooldown: 150000 }
  };

  let _activeAnimalId    = null;
  let _callbacks         = {};
  let _decayTimer        = null;
  let _rewardTimer       = null;
  let _pollTimer         = null;
  let _complainTimer     = null;
  let _complainPenaltyTimer = null;
  let _actionCooldown    = false;

  // ── Mood helpers ───────────────────────────────────────────
  function getMood(happiness) {
    if (happiness <= 30) return 'sad';
    if (happiness <= 60) return 'neutral';
    if (happiness <= 85) return 'happy';
    return 'ecstatic';
  }

  function getMoodEmoji(happiness) {
    if (happiness <= 30) return '😢';
    if (happiness <= 60) return '😐';
    if (happiness <= 85) return '😊';
    return '🤩';
  }

  // ── Care action ────────────────────────────────────────────
  function doAction(animalId, action) {
    if (_actionCooldown) return null;

    const config = CHARGE_CONFIG[action];
    const points = ACTION_POINTS[action];
    if (!config || !points) return null;

    const state  = Storage.load();
    const animal = state.animals[animalId];
    if (!animal) return null;

    const now = Date.now();

    // Initialize charges/cooldowns if missing (migration guard)
    if (!animal.charges) {
      animal.charges     = { feed: CHARGE_CONFIG.feed.max, pet: CHARGE_CONFIG.pet.max, play: CHARGE_CONFIG.play.max, sleep: CHARGE_CONFIG.sleep.max, clean: CHARGE_CONFIG.clean.max };
      animal.cooldownUntil = { feed: null, pet: null, play: null, sleep: null, clean: null };
    }
    if (!animal.cooldownUntil) {
      animal.cooldownUntil = { feed: null, pet: null, play: null, sleep: null, clean: null };
    }

    // Refill charges if cooldown expired
    if (animal.cooldownUntil[action] && now >= animal.cooldownUntil[action]) {
      animal.charges[action]       = config.max;
      animal.cooldownUntil[action] = null;
      Storage.save(state);
    }

    // Still in cooldown → refusal
    if (animal.cooldownUntil[action] && now < animal.cooldownUntil[action]) {
      return { refusal: true };
    }

    // No charges left → start cooldown + refusal
    if (animal.charges[action] <= 0) {
      animal.cooldownUntil[action] = now + config.cooldown;
      Storage.save(state);
      return { refusal: true };
    }

    // Use a charge
    animal.charges[action]--;
    const chargesLeft = animal.charges[action];
    const inCooldown  = chargesLeft === 0;
    if (inCooldown) {
      animal.cooldownUntil[action] = now + config.cooldown;
    }

    _actionCooldown = true;
    setTimeout(function() { _actionCooldown = false; }, 600);

    animal.happiness           = Math.min(100, animal.happiness + points);
    animal.lastCareTimestamp   = Date.now();
    Storage.save(state);

    // Cancel pending complaint penalty (player responded)
    if (_complainPenaltyTimer) {
      clearTimeout(_complainPenaltyTimer);
      _complainPenaltyTimer = null;
    }

    return {
      happiness:   animal.happiness,
      mood:        getMood(animal.happiness),
      moodEmoji:   getMoodEmoji(animal.happiness),
      chargesLeft: chargesLeft,
      maxCharges:  config.max,
      inCooldown:  inCooldown
    };
  }

  // ── Reward scheduling ─────────────────────────────────────
  function _scheduleReward(state) {
    var order = state.unlockOrder || [];
    var unlockedCount = order.filter(function(id) {
      return state.animals[id] && state.animals[id].unlocked;
    }).length;
    var isFirstReward = unlockedCount <= 1;
    var min = isFirstReward ? 45000 : 120000;
    var max = isFirstReward ? 90000 : 300000;
    var delay = Math.random() * (max - min) + min;
    state.nextRewardTimestamp = Date.now() + delay;
    Storage.save(state);
    return state.nextRewardTimestamp;
  }

  function _checkReward() {
    const state = Storage.load();
    const now   = Date.now();

    if (!state.nextRewardTimestamp) {
      _scheduleReward(state);
      return;
    }

    if (now < state.nextRewardTimestamp) return; // not yet

    const animal = state.animals[_activeAnimalId];
    if (!animal) return;

    if (animal.happiness <= 40) {
      // Animal not happy enough — defer and hint
      _scheduleReward(state);
      if (_callbacks.onNeedMoreCare) _callbacks.onNeedMoreCare();
      return;
    }

    _triggerReward(state);
  }

  function _triggerReward(state) {
    var order = state.unlockOrder || ['dog','cat','rabbit','hamster','guinea','snake','parrot','turtle','fish','hedgehog'];

    // Count how many regular animals are currently unlocked
    var unlockedCount = order.filter(function(id) {
      return state.animals[id] && state.animals[id].unlocked;
    }).length;

    // Next to unlock is at index unlockedCount
    var nextId = unlockedCount < order.length ? order[unlockedCount] : null;

    if (nextId) {
      state.animals[nextId].unlocked          = true;
      state.animals[nextId].happiness         = 50;
      state.animals[nextId].lastCareTimestamp = Date.now();
    }

    // Leopard unlocks after 5 regular animals
    var newUnlockedCount = order.filter(function(id) {
      return state.animals[id] && state.animals[id].unlocked;
    }).length;

    var leopardShouldUnlock = newUnlockedCount >= 5 && !state.leopardUnlocked;
    if (leopardShouldUnlock) {
      state.leopardUnlocked                   = true;
      state.animals.leopard.unlocked          = true;
      state.animals.leopard.happiness         = 50;
      state.animals.leopard.lastCareTimestamp = Date.now();
    }

    state.nextRewardTimestamp = null;
    Storage.save(state);
    teardown();

    if (leopardShouldUnlock && !state.leopardCutsceneSeen) {
      if (_callbacks.onLeopardUnlocked) _callbacks.onLeopardUnlocked();
    } else if (nextId) {
      if (_callbacks.onRewardFired) _callbacks.onRewardFired(nextId);
    }
  }

  // ── Offline decay ──────────────────────────────────────────
  function _applyOfflineDecay(animalId) {
    const state  = Storage.load();
    const animal = state.animals[animalId];
    if (!animal || !animal.lastCareTimestamp) return;

    const elapsedSeconds = Math.floor((Date.now() - animal.lastCareTimestamp) / 1000);
    const decayPoints    = Math.floor(elapsedSeconds / 5); // 1 point per 5s interval

    if (decayPoints > 0) {
      animal.happiness          = Math.max(0, animal.happiness - decayPoints);
      animal.lastCareTimestamp  = Date.now();
      Storage.save(state);
    }
  }

  // ── Tab visibility ─────────────────────────────────────────
  function _onVisibilityChange() {
    if (!document.hidden && _activeAnimalId) {
      _applyOfflineDecay(_activeAnimalId);
      const state  = Storage.load();
      const animal = state.animals[_activeAnimalId];
      if (animal && _callbacks.onHappinessChange) {
        _callbacks.onHappinessChange(
          animal.happiness,
          getMood(animal.happiness),
          getMoodEmoji(animal.happiness)
        );
      }
    }
  }

  // ── Init care screen ───────────────────────────────────────
  function initCareScreen(animalId, callbacks) {
    _activeAnimalId = animalId;
    _callbacks      = callbacks || {};

    _applyOfflineDecay(animalId);

    const state = Storage.load();

    if (!state.nextRewardTimestamp) {
      _scheduleReward(state);
    }

    // Happiness decay: 1 point every 5 seconds (12/min)
    _decayTimer = setInterval(function() {
      const s = Storage.load();
      const a = s.animals[animalId];
      if (!a) return;
      a.happiness          = Math.max(0, a.happiness - 1);
      a.lastCareTimestamp  = Date.now();
      Storage.save(s);
      if (_callbacks.onHappinessChange) {
        _callbacks.onHappinessChange(a.happiness, getMood(a.happiness), getMoodEmoji(a.happiness));
      }
    }, 5000);

    // Random complaints: fires every 30–60s, with 10s penalty if ignored
    function _scheduleNextComplaint() {
      var delay = 30000 + Math.random() * 30000; // 30–60s
      _complainTimer = setTimeout(function() {
        var s = Storage.load();
        var a = s.animals[_activeAnimalId];
        if (!a) return;

        var pool = getAnimalComplaints(_activeAnimalId);
        var msg  = pool[Math.floor(Math.random() * pool.length)];
        if (_callbacks.onComplaint) _callbacks.onComplaint(msg);

        // Penalty if ignored for 10s
        _complainPenaltyTimer = setTimeout(function() {
          var s2 = Storage.load();
          var a2 = s2.animals[_activeAnimalId];
          if (!a2) return;
          a2.happiness = Math.max(0, a2.happiness - 5);
          a2.lastCareTimestamp = Date.now();
          Storage.save(s2);
          if (_callbacks.onHappinessChange) {
            _callbacks.onHappinessChange(a2.happiness, getMood(a2.happiness), getMoodEmoji(a2.happiness));
          }
          _complainPenaltyTimer = null;
        }, 10000);

        _scheduleNextComplaint();
      }, delay);
    }
    _scheduleNextComplaint();

    // Poll for reward every 10 seconds
    _pollTimer = setInterval(_checkReward, 10000);

    // Precise timeout for the reward
    const remaining = state.nextRewardTimestamp - Date.now();
    if (remaining > 0) {
      _rewardTimer = setTimeout(_checkReward, remaining + 100);
    } else {
      _checkReward();
    }

    document.addEventListener('visibilitychange', _onVisibilityChange);

    const animal = state.animals[animalId];
    return {
      happiness: animal.happiness,
      mood:      getMood(animal.happiness),
      moodEmoji: getMoodEmoji(animal.happiness)
    };
  }

  // ── Teardown ───────────────────────────────────────────────
  function teardown() {
    if (_decayTimer)          { clearInterval(_decayTimer);          _decayTimer           = null; }
    if (_rewardTimer)         { clearTimeout(_rewardTimer);          _rewardTimer          = null; }
    if (_pollTimer)           { clearInterval(_pollTimer);           _pollTimer            = null; }
    if (_complainTimer)       { clearTimeout(_complainTimer);        _complainTimer        = null; }
    if (_complainPenaltyTimer){ clearTimeout(_complainPenaltyTimer); _complainPenaltyTimer = null; }
    document.removeEventListener('visibilitychange', _onVisibilityChange);
    _activeAnimalId = null;
    _callbacks      = {};
    _actionCooldown = false;
  }

  return {
    initCareScreen: initCareScreen,
    doAction:       doAction,
    teardown:       teardown,
    getMood:        getMood,
    getMoodEmoji:   getMoodEmoji,
    ACTION_POINTS:  ACTION_POINTS,
    CHARGE_CONFIG:  CHARGE_CONFIG
  };
})();
