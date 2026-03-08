// ═══════════════════════════════════════════════════════════
// e-zvířátka — i18n.js
// Internationalisation: Czech (cs) and English (en)
// ═══════════════════════════════════════════════════════════

const I18n = (function() {
  const translations = {
    cs: {
      // Screens
      welcome:           'Vítej v e-zvířátkách!',
      subtitle:          'Starej se o zvířátka a získej leoparda!',
      create_avatar:     'Vytvoř si postavu',
      choose_animal:     'Vyber si zvíře',
      my_collection:     'Moje kolekce',
      final_reward_title:'Výjimečná odměna!',

      // Buttons
      btn_start:           'Začít hrát',
      btn_next:            'Pokračovat',
      btn_back:            'Zpět',
      btn_view_collection: 'Moje kolekce',
      btn_continue:        'Pokračovat',
      btn_play_again:      'Hrát znovu',
      btn_stay_collection: 'Zůstat v kolekci',
      btn_care:            'Pečovat',

      // Avatar creation
      label_boy:           'Kluk',
      label_girl:          'Holka',
      label_name:          'Tvoje jméno',
      label_hair_color:    'Barva vlasů',
      label_hair_style:    'Styl vlasů',
      label_clothing_color:'Barva oblečení',
      label_clothing_style:'Styl oblečení',
      label_accessory:     'Doplněk',
      label_none:          'Nic',
      name_placeholder:    'Zadej jméno...',
      name_required:       'Zadej prosím své jméno!',
      name_too_long:       'Jméno může mít nejvýše 12 znaků.',

      // Actions
      feed:  'Nakrmit',
      pet:   'Pohladit',
      play:  'Hrát si',
      sleep: 'Spát',
      clean: 'Uklidit',

      // Mood labels
      mood_sad:     'Smutné 😢',
      mood_neutral: 'Spokojené 😐',
      mood_happy:   'Šťastné 😊',
      mood_ecstatic:'Nadšené 🤩',

      // Care screen
      happiness:      'Štěstí',
      current_animal: 'Aktuální zvíře',

      // Notification bubbles
      bubble_feed:      'Mňam, dobré! 😋',
      bubble_pet:       'Purrrr... 😻',
      bubble_play:      'Jupí! Hrajeme si! 🎉',
      bubble_sleep:     'Zzzz... 💤',
      bubble_clean:     'Ufff, čistota! ✨',
      bubble_need_care: 'Potřebuji víc péče! 🥺',
      bubble_reward_wait: 'Potřebuji víc péče než dostanu odměnu! 🥺',

      // Reward
      new_animal:      'Získal/a jsi nového kamaráda!',
      new_animal_name: 'Nový přítel: %1!',

      // Final reward
      final_reward:    'Jsi skvělý/á pečovatel/ka!\nZískal/a jsi leoparda!',
      leopard_incoming:'Leopard přichází...',

      // Animal names
      animal_dog:      'Pes',
      animal_cat:      'Kočka',
      animal_rabbit:   'Králík',
      animal_hamster:  'Křeček',
      animal_guinea:   'Morče',
      animal_snake:    'Had',
      animal_parrot:   'Papoušek',
      animal_turtle:   'Želva',
      animal_fish:     'Rybička',
      animal_hedgehog: 'Ježek',
      animal_leopard:  'Leopard',

      // Collection
      locked_animal: 'Zamčené',
      animals_count: 'Zvířata: %1 / 10',

      // Accessory names
      accessory_0: 'Nic',
      accessory_1: 'Čepice',
      accessory_2: 'Brýle',
      accessory_3: 'Čelenka',
      accessory_4: 'Hvězda',
    },

    en: {
      // Screens
      welcome:           'Welcome to e-animals!',
      subtitle:          'Care for animals and unlock the leopard!',
      create_avatar:     'Create your character',
      choose_animal:     'Choose your animal',
      my_collection:     'My Collection',
      final_reward_title:'Special Reward!',

      // Buttons
      btn_start:           'Start Playing',
      btn_next:            'Continue',
      btn_back:            'Back',
      btn_view_collection: 'My Collection',
      btn_continue:        'Continue',
      btn_play_again:      'Play Again',
      btn_stay_collection: 'Stay in Collection',
      btn_care:            'Care for',

      // Avatar creation
      label_boy:           'Boy',
      label_girl:          'Girl',
      label_name:          'Your name',
      label_hair_color:    'Hair color',
      label_hair_style:    'Hair style',
      label_clothing_color:'Clothing color',
      label_clothing_style:'Clothing style',
      label_accessory:     'Accessory',
      label_none:          'None',
      name_placeholder:    'Enter name...',
      name_required:       'Please enter your name!',
      name_too_long:       'Name can be at most 12 characters.',

      // Actions
      feed:  'Feed',
      pet:   'Pet',
      play:  'Play',
      sleep: 'Sleep',
      clean: 'Clean',

      // Mood labels
      mood_sad:     'Sad 😢',
      mood_neutral: 'Okay 😐',
      mood_happy:   'Happy 😊',
      mood_ecstatic:'Ecstatic 🤩',

      // Care screen
      happiness:      'Happiness',
      current_animal: 'Current animal',

      // Notification bubbles
      bubble_feed:      'Yummy! 😋',
      bubble_pet:       'Purrrr... 😻',
      bubble_play:      'Yay! Let\'s play! 🎉',
      bubble_sleep:     'Zzzz... 💤',
      bubble_clean:     'So fresh! ✨',
      bubble_need_care: 'I need more care! 🥺',
      bubble_reward_wait: 'I need more care before I can give you a reward! 🥺',

      // Reward
      new_animal:      'You got a new friend!',
      new_animal_name: 'New friend: %1!',

      // Final reward
      final_reward:    'You\'re an amazing caretaker!\nYou got the leopard!',
      leopard_incoming:'The leopard is coming...',

      // Animal names
      animal_dog:      'Dog',
      animal_cat:      'Cat',
      animal_rabbit:   'Rabbit',
      animal_hamster:  'Hamster',
      animal_guinea:   'Guinea Pig',
      animal_snake:    'Snake',
      animal_parrot:   'Parrot',
      animal_turtle:   'Turtle',
      animal_fish:     'Fish',
      animal_hedgehog: 'Hedgehog',
      animal_leopard:  'Leopard',

      // Collection
      locked_animal: 'Locked',
      animals_count: 'Animals: %1 / 10',

      // Accessory names
      accessory_0: 'None',
      accessory_1: 'Cap',
      accessory_2: 'Glasses',
      accessory_3: 'Headband',
      accessory_4: 'Star',
    }
  };

  function getCurrentLang() {
    try {
      const state = Storage.load();
      return state.language || 'cs';
    } catch (e) {
      return 'cs';
    }
  }

  function setLang(lang) {
    const state = Storage.load();
    state.language = lang;
    Storage.save(state);
    if (typeof App !== 'undefined' && App.renderCurrentScreen) {
      App.renderCurrentScreen();
    }
    updateLangSwitcher();
  }

  function t(key) {
    const lang = getCurrentLang();
    let str = (translations[lang] && translations[lang][key])
              || (translations['cs'] && translations['cs'][key])
              || key;
    // Replace positional placeholders %1, %2, ...
    const args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function(arg, i) {
      str = str.replace('%' + (i + 1), arg);
    });
    return str;
  }

  function updateLangSwitcher() {
    const lang = getCurrentLang();
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function init() {
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
      const lang = getCurrentLang();
      switcher.innerHTML =
        '<button class="lang-btn ' + (lang === 'cs' ? 'active' : '') + '" data-lang="cs">CZ</button>' +
        '<button class="lang-btn ' + (lang === 'en' ? 'active' : '') + '" data-lang="en">EN</button>';

      switcher.addEventListener('click', function(e) {
        const btn = e.target.closest('.lang-btn');
        if (btn) setLang(btn.dataset.lang);
      });
    }
  }

  return { t: t, getCurrentLang: getCurrentLang, setLang: setLang, init: init, updateLangSwitcher: updateLangSwitcher };
})();
