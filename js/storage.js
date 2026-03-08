// ═══════════════════════════════════════════════════════════
// e-zvířátka — storage.js
// Persistent save/load via localStorage
// ═══════════════════════════════════════════════════════════

const Storage = (function() {
  const KEY     = 'ezvíratka_save';
  const VERSION = 2;

  // Default charges per action
  const DEFAULT_CHARGES = { feed: 2, pet: 3, play: 2, sleep: 2, clean: 2 };

  function _makeAnimalState(unlocked, happiness) {
    return {
      unlocked:          unlocked,
      happiness:         happiness,
      petName:           null,
      lastCareTimestamp: null,
      charges:           { feed: 2, pet: 3, play: 2, sleep: 2, clean: 2 },
      cooldownUntil:     { feed: null, pet: null, play: null, sleep: null, clean: null }
    };
  }

  function getDefaultState() {
    // Shuffle unlock order for regular animals (leopard always last)
    var ids = ['dog','cat','rabbit','hamster','guinea','snake','parrot','turtle','fish','hedgehog'];
    for (var i = ids.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = ids[i]; ids[i] = ids[j]; ids[j] = tmp;
    }
    var firstId = ids[0];

    var animalsState = {
      dog:      _makeAnimalState(false, 0),
      cat:      _makeAnimalState(false, 0),
      rabbit:   _makeAnimalState(false, 0),
      hamster:  _makeAnimalState(false, 0),
      guinea:   _makeAnimalState(false, 0),
      snake:    _makeAnimalState(false, 0),
      parrot:   _makeAnimalState(false, 0),
      turtle:   _makeAnimalState(false, 0),
      fish:     _makeAnimalState(false, 0),
      hedgehog: _makeAnimalState(false, 0),
      leopard:  _makeAnimalState(false, 0)
    };
    animalsState[firstId].unlocked  = true;
    animalsState[firstId].happiness = 50;

    return {
      version: VERSION,
      avatar: {
        name: '', gender: 'girl',
        hairStyle: 0, hairColor: 0,
        clothingSet: 0, clothingColor: 0,
        accessory: 0
      },
      currentAnimalId:    firstId,
      unlockOrder:        ids,
      animals:            animalsState,
      nextRewardTimestamp: null,
      leopardUnlocked:    false,
      leopardCutsceneSeen: false,
      language:           'cs'
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== VERSION) return getDefaultState();
      return parsed;
    } catch (e) {
      return getDefaultState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable — silent fail
    }
  }

  function reset() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
    return getDefaultState();
  }

  return { load, save, reset, getDefaultState };
})();
