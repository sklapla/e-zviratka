// ═══════════════════════════════════════════════════════════
// e-zvířátka — animals.js
// Static animal data: actions, complaints, refusals, facts
// ═══════════════════════════════════════════════════════════

const ANIMALS = [
  {
    id: 'dog', nameCS: 'Pes', nameEN: 'Dog', emoji: '🐕',
    accusativeCS: 'psa', accusativeEN: 'the dog',
    placeholderColor: '#4A90D9',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit',         emoji: '🍖', response: 'Mňam! 😋'       },
        { key: 'pet',   label: 'Pohladit',         emoji: '🤝', response: 'Woof! 🐶'       },
        { key: 'play',  label: 'Hrát si s míčem',  emoji: '⚽', response: 'Hurá! 🎉'       },
        { key: 'sleep', label: 'Venčit',           emoji: '🦮', response: 'Jupí! 🐾'       },
        { key: 'clean', label: 'Učesat',           emoji: '🪮', response: 'Krásný! ✨'     }
      ],
      en: [
        { key: 'feed',  label: 'Feed',             emoji: '🍖', response: 'Yummy! 😋'      },
        { key: 'pet',   label: 'Pet',              emoji: '🤝', response: 'Woof! 🐶'       },
        { key: 'play',  label: 'Play fetch',       emoji: '⚽', response: 'Yay! 🎉'        },
        { key: 'sleep', label: 'Walk',             emoji: '🦮', response: 'Woohoo! 🐾'     },
        { key: 'clean', label: 'Groom',            emoji: '🪮', response: 'Looking good! ✨'}
      ]
    },
    complaints: {
      cs: ['Chci na procházku! 🦮', 'Mám hlad! 🍖', 'Hraj si se mnou! ⚽', 'Jsem osamělý! 😢', 'Jsem špinavý! 🪮'],
      en: ['I wanna go for a walk! 🦮', 'I\'m hungry! 🍖', 'Play with me! ⚽', 'I\'m lonely! 😢', 'I\'m dirty! 🪮']
    },
    refusals: {
      cs: { feed: 'Teď nemám hlad! 🐾', pet: 'Teď ne, běžím! 🏃', play: 'Jsem unavený! 😴', sleep: 'Nechci spát! 🎾', clean: 'Ještě to jde! 😅' },
      en: { feed: 'Not hungry now! 🐾', pet: 'Not now, running! 🏃', play: 'I\'m tired! 😴', sleep: 'Don\'t wanna sleep! 🎾', clean: 'Still okay! 😅' }
    },
    facts: [
      'Psi žijí s lidmi už více než 15 000 let — jsou naši nejstarší přátelé mezi zvířaty.',
      'Psi mají čich až 100 000× silnější než my — poznají tě podle vůně z velké dálky.',
      'Psi mají tři oční víčka — třetí je schované v rohu oka.',
      'Čumák každého psa má unikátní vzor — jako otisk prstu u lidí.',
      'Psi sní — vědci to potvrdili sledováním mozkových vln během spánku.',
      'Psi vidí barvy, ale ne tak živě jako my — hlavně modrou a žlutou.',
      'Nejrychlejší pes na světě je chrt — běží až 72 km/h!',
      'Psi mají asi 1 700 chuťových pohárků — my máme 9 000, takže psi nevnímají chutě tak silně jako my a sní skoro cokoliv!',
      'Štěkání je způsob komunikace vyvinutý speciálně pro život s lidmi — divocí psi téměř neštěkají.',
      'Průměrný pes rozumí asi 165 slovům — nejchytřejší až 250!'
    ],
    funFacts: [
      'Když pes točí ocasem doprava, je šťastný. Když doleva, je trochu nervózní!',
      'Psi umí rozpoznat, kdy jsi smutný, a přijdou tě utěšit sami od sebe.'
    ]
  },
  {
    id: 'cat', nameCS: 'Kočka', nameEN: 'Cat', emoji: '🐈',
    accusativeCS: 'kočku', accusativeEN: 'the cat',
    placeholderColor: '#9B59B6',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit',             emoji: '🐟', response: 'Mňam! 😋'      },
        { key: 'pet',   label: 'Pohladit',             emoji: '🤝', response: 'Purrrr... 😻'  },
        { key: 'play',  label: 'Hrát si s klubíčkem',  emoji: '🧶', response: 'Hurá! 🎉'      },
        { key: 'sleep', label: 'Nechat být',           emoji: '😴', response: 'Zzz... 😴'     },
        { key: 'clean', label: 'Vyčistit toaletu',     emoji: '🧹', response: 'Uff, díky! 😅' }
      ],
      en: [
        { key: 'feed',  label: 'Feed',                emoji: '🐟', response: 'Yummy! 😋'      },
        { key: 'pet',   label: 'Pet',                 emoji: '🤝', response: 'Purrrr... 😻'   },
        { key: 'play',  label: 'Play with yarn',      emoji: '🧶', response: 'Yay! 🎉'        },
        { key: 'sleep', label: 'Leave alone',         emoji: '😴', response: 'Zzz... 😴'      },
        { key: 'clean', label: 'Clean litter',        emoji: '🧹', response: 'Phew, thanks! 😅'}
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🐟', 'Pohlaď mě! 🤝', 'Chci si hrát! 🧶', 'Toaleta je plná! 🧹', 'Nech mě spát! 😴'],
      en: ['I\'m hungry! 🐟', 'Pet me! 🤝', 'I wanna play! 🧶', 'Litter box is full! 🧹', 'Let me sleep! 😴']
    },
    refusals: {
      cs: { feed: 'Nemám hlad! 😒', pet: 'Nesahej na mě! 😾', play: 'Nechci si hrát! 😴', sleep: 'Nejsem unavená! 😼', clean: 'Nevadí mi to! 🐾' },
      en: { feed: 'Not hungry! 😒', pet: 'Don\'t touch me! 😾', play: 'Don\'t wanna play! 😴', sleep: 'I\'m not tired! 😼', clean: 'It\'s fine! 🐾' }
    },
    facts: [
      'Kočky spí 12–16 hodin denně — to je skoro celý den!',
      'Kočky mají v uších 32 svalů, takže mohou otáčet ušima jako radarem.',
      'Kočky mají 230 kostí — o 24 více než člověk.',
      'Kočka nikdy nesdílí pozdrav čumákem s kočkou, které nedůvěřuje.',
      'Kočky nemohou cítit sladkou chuť — nemají pro ni chuťové pohárky.',
      'Pomalé mrknutí kočky je "kočičí polibek" — znamená důvěru a lásku.',
      'Kočky chodí na špičkách — jsou to digitigradní živočichové.',
      'Kočka dokáže skočit do výšky 6× délky svého těla.',
      'Chůze kočky je jako chůze velblouda — nejdřív pohybuje oběma pravými nohama, pak oběma levými.',
      'Kočky tráví 30–50 % bdělého času čištěním srsti.'
    ],
    funFacts: [
      'Kočky přede, když jsou spokojené — ale taky když jsou nemocné nebo vystrašené. Předení je uklidňuje!',
      'Kočka nikdy nemňouká na jiné kočky — mňoukání vynalezly speciálně pro komunikaci s lidmi!'
    ]
  },
  {
    id: 'rabbit', nameCS: 'Králík', nameEN: 'Rabbit', emoji: '🐇',
    accusativeCS: 'králíka', accusativeEN: 'the rabbit',
    placeholderColor: '#E8A0BF',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit mrkví',   emoji: '🥕', response: 'Mňam! 😋'     },
        { key: 'pet',   label: 'Pohladit',         emoji: '🤝', response: 'Příjemné! 🥰' },
        { key: 'play',  label: 'Hrát si',          emoji: '🎾', response: 'Hopsa! 🎉'    },
        { key: 'sleep', label: 'Dát seno',         emoji: '🌾', response: 'Výborné! 😋'  },
        { key: 'clean', label: 'Vyčistit klec',    emoji: '🧹', response: 'Čisto! ✨'    }
      ],
      en: [
        { key: 'feed',  label: 'Feed carrot',     emoji: '🥕', response: 'Yummy! 😋'    },
        { key: 'pet',   label: 'Pet',             emoji: '🤝', response: 'So nice! 🥰'  },
        { key: 'play',  label: 'Play',            emoji: '🎾', response: 'Boing! 🎉'    },
        { key: 'sleep', label: 'Give hay',        emoji: '🌾', response: 'Yummy! 😋'    },
        { key: 'clean', label: 'Clean cage',      emoji: '🧹', response: 'So clean! ✨' }
      ]
    },
    complaints: {
      cs: ['Chci mrkev! 🥕', 'Klec smrdí! 🧹', 'Pohlaď mě! 🤝', 'Chci si hrát! 🎾', 'Chci seno! 🌾'],
      en: ['I want a carrot! 🥕', 'Cage stinks! 🧹', 'Pet me! 🤝', 'I wanna play! 🎾', 'I want hay! 🌾']
    },
    refusals: {
      cs: { feed: 'Dost mrkve! 🥕', pet: 'Nech mě být! 🐇', play: 'Jsem unavený! 😴', sleep: 'Nechci spát! 🎾', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Enough carrot! 🥕', pet: 'Leave me alone! 🐇', play: 'I\'m tired! 😴', sleep: 'Don\'t wanna sleep! 🎾', clean: 'Still clean! ✨' }
    },
    facts: [
      'Králíci mají oči po stranách hlavy a vidí skoro 360° kolem sebe — téměř za sebe!',
      'Zuby králíka nikdy nepřestanou růst — proto potřebují stále něco hlodát.',
      'Králíci nemohou zvracet — proto je důležité je krmit správně.',
      'Králík může zemřít strachy — jejich srdce je velmi citlivé na stres.',
      'Králíci mají 28 zubů a ty stále rostou celý život.',
      'Králík dokáže vidět téměř za sebe, ale má mrtvý úhel přímo před nosem.',
      'Divoký králík uběhne až 56 km/h — rychlejší než většina psů!',
      'Králíci jsou velmi chytří a lze je naučit přijít na zavolání.',
      'Králík dává najevo štěstí tím, že poskakuje a otáčí se ve vzduchu — říká se tomu "binky".',
      'Králíci jsou soumrační — nejvíce aktivní jsou ráno a večer.'
    ],
    funFacts: [
      'Když je králík velmi šťastný, dělá velký skok do vzduchu a otočí se — tomu se říká "binky"!',
      'Králíci jsou velmi čistotní a umývají se stejně pečlivě jako kočky.'
    ]
  },
  {
    id: 'hamster', nameCS: 'Křeček', nameEN: 'Hamster', emoji: '🐹',
    accusativeCS: 'křečka', accusativeEN: 'the hamster',
    placeholderColor: '#F39C12',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit',          emoji: '🌰', response: 'Mňam! 😋'      },
        { key: 'pet',   label: 'Pohladit',          emoji: '🤝', response: 'Příjemné! 🥰'  },
        { key: 'play',  label: 'Roztočit kolečko',  emoji: '🎡', response: 'Weeee! 🎡'     },
        { key: 'sleep', label: 'Dát vodu',          emoji: '💧', response: 'Osvěžení! 💧'  },
        { key: 'clean', label: 'Vyčistit klec',     emoji: '🧹', response: 'Čisto! ✨'     }
      ],
      en: [
        { key: 'feed',  label: 'Feed',             emoji: '🌰', response: 'Yummy! 😋'     },
        { key: 'pet',   label: 'Pet',              emoji: '🤝', response: 'So nice! 🥰'   },
        { key: 'play',  label: 'Spin wheel',       emoji: '🎡', response: 'Wheee! 🎡'     },
        { key: 'sleep', label: 'Give water',       emoji: '💧', response: 'Refreshing! 💧'},
        { key: 'clean', label: 'Clean cage',       emoji: '🧹', response: 'So clean! ✨'  }
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🌰', 'Klec je špinavá! 🧹', 'Chci točit kolečko! 🎡', 'Jsem žíznivý! 💧', 'Pohlaď mě! 🤝'],
      en: ['I\'m hungry! 🌰', 'Cage is dirty! 🧹', 'I wanna spin! 🎡', 'I\'m thirsty! 💧', 'Pet me! 🤝']
    },
    refusals: {
      cs: { feed: 'Mám plné tváře! 🐹', pet: 'Teď ne! 😤', play: 'Jsem na kolečku! 🎡', sleep: 'Jsem plný energie! ⚡', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Cheeks are full! 🐹', pet: 'Not now! 😤', play: 'I\'m on my wheel! 🎡', sleep: 'Full of energy! ⚡', clean: 'Still clean! ✨' }
    },
    facts: [
      'Křeček si do tváří dokáže nacpat jídlo, které váží skoro tolik co on sám!',
      'Křečci jsou noční zvířata — nejvíce aktivní jsou večer a v noci.',
      'Křeček v přírodě žije sám — je to samotář, který si brání své území.',
      'Křečci se orientují pomocí pachových žláz — zanechávají stopy.',
      'Tváře křečka se nazývají lícní váčky a sahají až k ramenům.',
      'Křeček vidí špatně — je krátkozraký a vnímá hlavně pohyb.',
      'V přírodě si křeček hloubí nory až 1 metr hluboké.',
      'Křeček může mít zásoby až 30 kg jídla schované v noře!',
      'Křečci se v přírodě dožívají jen 1–2 let, doma až 3–4 roky.',
      'Křeček dokáže zpomalit tep a dýchání při hibernaci na minimum.'
    ],
    funFacts: [
      'Křeček uběhne na kolečku až 8 km za noc — to je jako běžet z jednoho města do druhého!',
      'Křečci mají v přírodě zásoby jídla schované na různých místech, aby nezapomněli, kde co mají.'
    ]
  },
  {
    id: 'guinea', nameCS: 'Morče', nameEN: 'Guinea Pig', emoji: '🐾',
    accusativeCS: 'morče', accusativeEN: 'the guinea pig',
    placeholderColor: '#27AE60',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit zeleninou', emoji: '🥦', response: 'Mňam! 😋'     },
        { key: 'pet',   label: 'Pohladit',          emoji: '🤝', response: 'Příjemné! 🥰' },
        { key: 'play',  label: 'Hrát si',           emoji: '🎾', response: 'Hurá! 🎉'     },
        { key: 'sleep', label: 'Dát vodu',          emoji: '💧', response: 'Osvěžení! 💧' },
        { key: 'clean', label: 'Vyčistit výběh',    emoji: '🧹', response: 'Čisto! ✨'    }
      ],
      en: [
        { key: 'feed',  label: 'Feed veggies',     emoji: '🥦', response: 'Yummy! 😋'    },
        { key: 'pet',   label: 'Pet',              emoji: '🤝', response: 'So nice! 🥰'  },
        { key: 'play',  label: 'Play',             emoji: '🎾', response: 'Yay! 🎉'      },
        { key: 'sleep', label: 'Give water',       emoji: '💧', response: 'Refreshing! 💧'},
        { key: 'clean', label: 'Clean pen',        emoji: '🧹', response: 'So clean! ✨' }
      ]
    },
    complaints: {
      cs: ['Chci zeleninu! 🥦', 'Pohlaď mě! 🤝', 'Výběh smrdí! 🧹', 'Chci si hrát! 🎾', 'Jsem žíznivý/á! 💧'],
      en: ['I want veggies! 🥦', 'Pet me! 🤝', 'Pen stinks! 🧹', 'I wanna play! 🎾', 'I\'m thirsty! 💧']
    },
    refusals: {
      cs: { feed: 'Jsem plné! 🥦', pet: 'Nech mě být! 😤', play: 'Jsem unavené! 😴', sleep: 'Nechci spát! 🎾', clean: 'Ještě čisto! ✨' },
      en: { feed: 'I\'m full! 🥦', pet: 'Leave me alone! 😤', play: 'I\'m tired! 😴', sleep: 'Don\'t wanna sleep! 🎾', clean: 'Still clean! ✨' }
    },
    facts: [
      'Morčata jsou velmi společenská — v přírodě žijí ve velkých skupinách a osamělá jsou nešťastná.',
      'Morčata vydávají přes 11 různých zvuků — každý znamená něco jiného!',
      'Morčata nikdy nežijí v přírodě divoce — jsou to domestikovaná zvířata po tisíce let.',
      'Indiáni v Jižní Americe chovali morčata jako jídlo i jako mazlíčky.',
      'Morče se může učit jednoduché triky jako pes — třeba skočit přes překážku.',
      'Morčata mají velmi citlivý sluch a slyší zvuky, které my neslyšíme.',
      'Morče pije hodně vody — až 100 ml denně, což je hodně na tak malé zvíře.',
      'Morčata si vzájemně čistí srst — to je znak důvěry a přátelství.',
      'Morče může žít 4–8 let — to je pro tak malé zvíře velmi dlouho.',
      'Morčata nikdy nespí tvrdě — vždy jsou trochu ve střehu.'
    ],
    funFacts: [
      'Když je morče nadšené, poskakuje a třese se — tomu se říká "popcorning"!',
      'Morčata se rodí s otevřenýma očima a srstí — hned první den umí běhat!'
    ]
  },
  {
    id: 'snake', nameCS: 'Had', nameEN: 'Snake', emoji: '🐍',
    accusativeCS: 'hada', accusativeEN: 'the snake',
    placeholderColor: '#2ECC71',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit myší',      emoji: '🐭', response: 'Mňam! 😋'    },
        { key: 'pet',   label: 'Pozorovat',          emoji: '👀', response: 'Ssss... 👀'  },
        { key: 'play',  label: 'Postříkat vodou',    emoji: '💦', response: 'Ahhh! 💦'    },
        { key: 'sleep', label: 'Nechat vyhřát se',   emoji: '🌞', response: 'Teplo... 🌞' },
        { key: 'clean', label: 'Vyčistit terárium',  emoji: '🧹', response: 'Čisto! ✨'   }
      ],
      en: [
        { key: 'feed',  label: 'Feed mouse',        emoji: '🐭', response: 'Yummy! 😋'   },
        { key: 'pet',   label: 'Observe',           emoji: '👀', response: 'Ssss... 👀'  },
        { key: 'play',  label: 'Mist water',        emoji: '💦', response: 'Ahhhh! 💦'   },
        { key: 'sleep', label: 'Bask in warmth',    emoji: '🌞', response: 'So warm... 🌞'},
        { key: 'clean', label: 'Clean terrarium',   emoji: '🧹', response: 'So clean! ✨' }
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🐭', 'Je mi zima! 🌞', 'Terárium je špinavé! 🧹', 'Jsem suchý/á! 💦', 'Pozoruj mě! 👀'],
      en: ['I\'m hungry! 🐭', 'I\'m cold! 🌞', 'Terrarium is dirty! 🧹', 'I\'m dry! 💦', 'Watch me! 👀']
    },
    refusals: {
      cs: { feed: 'Ještě trávím! 🐭', pet: 'Nesahej! 😤', play: 'Nechci se hýbat! 😴', sleep: 'Jsem vzhůru! 👀', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Still digesting! 🐭', pet: 'Don\'t touch! 😤', play: 'Don\'t wanna move! 😴', sleep: 'I\'m awake! 👀', clean: 'Still clean! ✨' }
    },
    facts: [
      'Hadi nemají uši — vnímají vibrace země svým tělem a jazykem čichají vzduch.',
      'Had svléká kůži několikrát ročně — pod starou kůží mu roste nová, hezčí.',
      'Had nemá víčka — spí s otevřenýma očima.',
      'Hadi jsou chladnokrevní — jejich teplota závisí na okolí.',
      'Některé hady mají zbytky zadních nožiček schované pod kůží — evoluce!',
      'Had cítí teplo kořisti speciálními jamkami na hlavě — vidí "tepelný obraz".',
      'Hadí jazyk je rozštěpený proto, aby had zjistil, odkud přichází vůně.',
      'Největší had světa — anakonda — může vážit přes 200 kg.',
      'Hadi nepotřebují jíst každý den — velký had si vystačí s jedním jídlem za měsíc.',
      'Hadí šupiny jsou ze stejného materiálu jako naše nehty — keratin.'
    ],
    funFacts: [
      'Hadi umí spolknout kořist mnohem větší než jejich hlava — čelist se jim rozloží jako guma!',
      'Někteří hadi dovedou "létat" — plachtí mezi stromy tím, že zploští celé tělo!'
    ]
  },
  {
    id: 'parrot', nameCS: 'Papoušek', nameEN: 'Parrot', emoji: '🦜',
    accusativeCS: 'papouška', accusativeEN: 'the parrot',
    placeholderColor: '#E74C3C',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nasypat semínka',   emoji: '🌻', response: 'Mňam! 😋'   },
        { key: 'pet',   label: 'Pohladit',           emoji: '🤝', response: 'Krásné! 🥰' },
        { key: 'play',  label: 'Hrát si',            emoji: '🎾', response: 'Hurá! 🎉'   },
        { key: 'sleep', label: 'Naučit slovo',       emoji: '🗣️', response: 'Hola! 🗣️'  },
        { key: 'clean', label: 'Vyčistit klec',      emoji: '🧹', response: 'Čisto! ✨'  }
      ],
      en: [
        { key: 'feed',  label: 'Give seeds',        emoji: '🌻', response: 'Yummy! 😋'  },
        { key: 'pet',   label: 'Pet',               emoji: '🤝', response: 'Lovely! 🥰' },
        { key: 'play',  label: 'Play',              emoji: '🎾', response: 'Yay! 🎉'    },
        { key: 'sleep', label: 'Teach a word',      emoji: '🗣️', response: 'Hola! 🗣️'  },
        { key: 'clean', label: 'Clean cage',        emoji: '🧹', response: 'So clean! ✨'}
      ]
    },
    complaints: {
      cs: ['Chci semínka! 🌻', 'Mluv se mnou! 🗣️', 'Chci si hrát! 🎾', 'Klec je špinavá! 🧹', 'Jsem osamělý/á! 😢'],
      en: ['I want seeds! 🌻', 'Talk to me! 🗣️', 'I wanna play! 🎾', 'Cage is dirty! 🧹', 'I\'m lonely! 😢']
    },
    refusals: {
      cs: { feed: 'Dost semínek! 🌻', pet: 'Teď ne! 😤', play: 'Jsem unavený! 😴', sleep: 'Nechci spát! 🗣️', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Enough seeds! 🌻', pet: 'Not now! 😤', play: 'I\'m tired! 😴', sleep: 'Don\'t wanna sleep! 🗣️', clean: 'Still clean! ✨' }
    },
    facts: [
      'Papoušci jsou jedni z nejchytřejších ptáků na světě — někteří rozumí stovkám slov.',
      'Papoušci žijí velmi dlouho — velcí papoušci se mohou dožít až 80 let!',
      'Papoušci jsou jedni z mála živočichů, kteří se poznají v zrcadle.',
      'Papoušek ara může překousnout i tvrdý ořech svým zobákem.',
      'Papoušci tancují do rytmu hudby — jako my!',
      'Některé druhy papoušků létají v hejnech až 1 000 ptáků.',
      'Papoušek kea z Nového Zélandu je nejchytřejší pták světa.',
      'Papoušci mají jazyk podobný lidskému — proto dokážou napodobovat řeč.',
      'Žako šedý dokáže nejen opakovat, ale i chápat význam slov.',
      'Papoušci spí stojí na větvi — dokážou se zaaretovat, aby nespadli.'
    ],
    funFacts: [
      'Papoušci nenapodobují jen slova — dokážou napodobit zvuk mikrovlnky, telefonu nebo smíchu!',
      'Papoušci se navzájem učí písničky a předávají je dalším generacím — mají svou kulturu!'
    ]
  },
  {
    id: 'turtle', nameCS: 'Želva', nameEN: 'Turtle', emoji: '🐢',
    accusativeCS: 'želvu', accusativeEN: 'the turtle',
    placeholderColor: '#16A085',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit salát',     emoji: '🥗', response: 'Mňam! 😋'     },
        { key: 'pet',   label: 'Pohladit krunýř',   emoji: '🤝', response: 'Příjemné! 🥰' },
        { key: 'play',  label: 'Pustit do vody',    emoji: '💧', response: 'Splash! 💧'    },
        { key: 'sleep', label: 'Pohřát pod lampou', emoji: '🌞', response: 'Teplo... 🌞'   },
        { key: 'clean', label: 'Vyčistit terárium', emoji: '🧹', response: 'Čisto! ✨'     }
      ],
      en: [
        { key: 'feed',  label: 'Feed salad',        emoji: '🥗', response: 'Yummy! 😋'    },
        { key: 'pet',   label: 'Pet shell',         emoji: '🤝', response: 'So nice! 🥰'  },
        { key: 'play',  label: 'Let swim',          emoji: '💧', response: 'Splash! 💧'   },
        { key: 'sleep', label: 'Warm under lamp',   emoji: '🌞', response: 'So warm... 🌞'},
        { key: 'clean', label: 'Clean terrarium',   emoji: '🧹', response: 'So clean! ✨' }
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🥗', 'Terárium je špinavé! 🧹', 'Chci se koupat! 💧', 'Je mi zima! 🌞', 'Pohlaď můj krunýř! 🤝'],
      en: ['I\'m hungry! 🥗', 'Terrarium is dirty! 🧹', 'I wanna swim! 💧', 'I\'m cold! 🌞', 'Pet my shell! 🤝']
    },
    refusals: {
      cs: { feed: 'Pomalu trávím! 🥗', pet: 'Schovám se! 🐢', play: 'Jsem pomalá! 😴', sleep: 'Nespím! 🌞', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Still digesting! 🥗', pet: 'I\'ll hide! 🐢', play: 'I\'m too slow! 😴', sleep: 'I\'m awake! 🌞', clean: 'Still clean! ✨' }
    },
    facts: [
      'Želvy jsou jedni z nejstarších živočichů na Zemi — existují déle než dinosauři!',
      'Krunýř želvy je součástí její kostry — je pevně spojený s páteří, nelze ho sundat.',
      'Želvy existují na Zemi déle než 220 milionů let.',
      'Mořská želva se vždy vrátí na pláž, kde se narodila — i po 30 letech.',
      'Pohlaví želvy závisí na teplotě při líhnutí — teplo = samičky.',
      'Želvy slyší nízkofrekvenční zvuky, které my neslyšíme.',
      'Suchozemská želva neplave — v hluboké vodě by se utopila.',
      'Nejstarší zaznamenaná želva se dožila 255 let.',
      'Želva zatáhne hlavu do krunýře za méně než sekundu.',
      'Krunýř želvy obsahuje přes 60 kostí spojených dohromady.'
    ],
    funFacts: [
      'Některé želvy se dožijí přes 150 let — mohly by žít od dob tvých praprapraprababiček!',
      'Želvy nemají zuby — místo toho mají ostrý zobák, kterým dokážou ukousnout pořádný kus!'
    ]
  },
  {
    id: 'fish', nameCS: 'Rybička', nameEN: 'Fish', emoji: '🐠',
    accusativeCS: 'rybičku', accusativeEN: 'the fish',
    placeholderColor: '#3498DB',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit',            emoji: '🦐', response: 'Mňam! 😋'   },
        { key: 'pet',   label: 'Pozorovat',           emoji: '👀', response: 'Blub! 👀'   },
        { key: 'play',  label: 'Přidat kyslík',       emoji: '💨', response: 'Aaah! 💨'   },
        { key: 'sleep', label: 'Vyměnit vodu',        emoji: '💧', response: 'Svěží! 💧'  },
        { key: 'clean', label: 'Vyčistit akvárium',   emoji: '🧹', response: 'Čisto! ✨'  }
      ],
      en: [
        { key: 'feed',  label: 'Feed',               emoji: '🦐', response: 'Yummy! 😋'  },
        { key: 'pet',   label: 'Observe',            emoji: '👀', response: 'Blub! 👀'   },
        { key: 'play',  label: 'Add oxygen',         emoji: '💨', response: 'Aaah! 💨'   },
        { key: 'sleep', label: 'Change water',       emoji: '💧', response: 'So fresh! 💧'},
        { key: 'clean', label: 'Clean tank',         emoji: '🧹', response: 'So clean! ✨'}
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🦐', 'Voda je špinavá! 🧹', 'Potřebuji vzduch! 💨', 'Voda je stará! 💧', 'Pozoruj mě! 👀'],
      en: ['I\'m hungry! 🦐', 'Water is dirty! 🧹', 'I need air! 💨', 'Water is old! 💧', 'Watch me! 👀']
    },
    refusals: {
      cs: { feed: 'Dost jídla! 🦐', pet: 'Bublám spokojeně! 💧', play: 'Plavu si sama! 🐠', sleep: 'Nespím! 💨', clean: 'Voda je čistá! ✨' },
      en: { feed: 'Enough food! 🦐', pet: 'Happily bubbling! 💧', play: 'Swimming solo! 🐠', sleep: 'I\'m awake! 💨', clean: 'Water is clean! ✨' }
    },
    facts: [
      'Ryby mají boční linii — speciální smyslový orgán, kterým cítí pohyb vody kolem sebe.',
      'Ryby "dýchají" vodu — žábry z ní vytáhnou kyslík, stejně jako my z vzduchu.',
      'Ryby nemají hlasivky, ale vydávají zvuky pomocí plynového měchýře.',
      'Některé ryby mění pohlaví během života — podle potřeby hejna.',
      'Ryby mají šupiny jako letokruhy stromů — lze z nich odečíst věk.',
      'Létající ryba dokáže plachtit nad vodou až 45 sekund.',
      'Ryby spí, ale ne jako my — nemají víčka a sníží jen aktivitu.',
      'Mořský koník je jediná ryba, kde mládě nosí samec.',
      'Piranhy nejsou tak nebezpečné jak se říká — útočí jen když mají hlad.',
      'Nejmenší ryba světa je dlouhá jen 8 mm — menší než nehet.'
    ],
    funFacts: [
      'Zlatá rybka si pamatuje věci déle než 3 měsíce — ten mýtus o 3 vteřinách není pravda!',
      'Klaun ryba (jako Nemo) se může změnit z samce na samici — a to kdykoliv v životě!'
    ]
  },
  {
    id: 'hedgehog', nameCS: 'Ježek', nameEN: 'Hedgehog', emoji: '🦔',
    accusativeCS: 'ježka', accusativeEN: 'the hedgehog',
    placeholderColor: '#795548',
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit hmyzem',     emoji: '🪲', response: 'Mňam! 😋'     },
        { key: 'pet',   label: 'Pohladit opatrně',   emoji: '🤝', response: 'Opatrně! 🦔'  },
        { key: 'play',  label: 'Hrát si',            emoji: '🎾', response: 'Hurá! 🎉'      },
        { key: 'sleep', label: 'Dát vodu',           emoji: '💧', response: 'Osvěžení! 💧'  },
        { key: 'clean', label: 'Vyčistit pelíšek',   emoji: '🧹', response: 'Čisto! ✨'     }
      ],
      en: [
        { key: 'feed',  label: 'Feed insects',       emoji: '🪲', response: 'Yummy! 😋'    },
        { key: 'pet',   label: 'Pet gently',         emoji: '🤝', response: 'Careful! 🦔'  },
        { key: 'play',  label: 'Play',               emoji: '🎾', response: 'Yay! 🎉'      },
        { key: 'sleep', label: 'Give water',         emoji: '💧', response: 'Refreshing! 💧'},
        { key: 'clean', label: 'Clean bedding',      emoji: '🧹', response: 'So clean! ✨' }
      ]
    },
    complaints: {
      cs: ['Chci hmyz! 🪲', 'Pelíšek smrdí! 🧹', 'Chci si hrát! 🎾', 'Jsem žíznivý/á! 💧', 'Pohlaď mě opatrně! 🤝'],
      en: ['I want bugs! 🪲', 'Bedding stinks! 🧹', 'I wanna play! 🎾', 'I\'m thirsty! 💧', 'Pet me gently! 🤝']
    },
    refusals: {
      cs: { feed: 'Dost hmyzu! 🪲', pet: 'Píchnu tě! 🦔', play: 'Jsem unavený! 😴', sleep: 'Nechci spát! 🎾', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Enough bugs! 🪲', pet: 'I\'ll prick you! 🦔', play: 'I\'m tired! 😴', sleep: 'Don\'t wanna sleep! 🎾', clean: 'Still clean! ✨' }
    },
    facts: [
      'Ježek má na těle až 6 000 ostných trnů — každý trn je dutý a velmi pevný.',
      'Ježci jsou imunní vůči jedu mnoha hadů — had jim prakticky nemůže ublížit!',
      'Ježci jsou noční živočichové — přes den spí schovaní.',
      'Ježek v zimě hibernuje — jeho tep klesne z 190 na 20 tepů za minutu.',
      'Ježek uběhne za noc až 3 km při hledání potravy.',
      'Mládě ježka se rodí s trny schovanými pod kůží — aby neublížilo matce.',
      'Ježci jsou odolní vůči mnoha jedům včetně jedu zmije.',
      'Ježek vydá různé zvuky — funí, cvičí a křičí při nebezpečí.',
      'Ježci mají přirozené predátory — sovy a jezevce.',
      'Ježek srolovaný do kuličky je chráněn ze všech stran — nemá slabé místo.'
    ],
    funFacts: [
      'Ježci si natírají trny slinami s cizími pachy — vědci dodnes neví přesně proč!',
      'Ježek sní za jednu noc hmyzu, červů a plžů tolik, co sám váží!'
    ]
  },
  {
    id: 'leopard', nameCS: 'Leopard', nameEN: 'Leopard', emoji: '🐆',
    accusativeCS: 'leoparda', accusativeEN: 'the leopard',
    placeholderColor: '#F1C40F', isFinal: true,
    actions: {
      cs: [
        { key: 'feed',  label: 'Nakrmit masem',      emoji: '🥩', response: 'Mňam! 😋'   },
        { key: 'pet',   label: 'Pohladit',            emoji: '🤝', response: 'Grrr... 🐆' },
        { key: 'play',  label: 'Hrát si',             emoji: '🎾', response: 'Hurá! 🎉'   },
        { key: 'sleep', label: 'Venčit',              emoji: '🦮', response: 'Rychle! 🐾' },
        { key: 'clean', label: 'Vyčistit výběh',      emoji: '🧹', response: 'Čisto! ✨'  }
      ],
      en: [
        { key: 'feed',  label: 'Feed meat',          emoji: '🥩', response: 'Yummy! 😋'  },
        { key: 'pet',   label: 'Pet',                emoji: '🤝', response: 'Grrr... 🐆' },
        { key: 'play',  label: 'Play',               emoji: '🎾', response: 'Yay! 🎉'    },
        { key: 'sleep', label: 'Walk',               emoji: '🦮', response: 'Zoom! 🐾'   },
        { key: 'clean', label: 'Clean enclosure',    emoji: '🧹', response: 'So clean! ✨'}
      ]
    },
    complaints: {
      cs: ['Mám hlad! 🥩', 'Chci běžet! 🦮', 'Pohlaď mě! 🤝', 'Chci si hrát! 🎾', 'Výběh je špinavý! 🧹'],
      en: ['I\'m hungry! 🥩', 'I wanna run! 🦮', 'Pet me! 🤝', 'I wanna play! 🎾', 'Enclosure is dirty! 🧹']
    },
    refusals: {
      cs: { feed: 'Ještě trávím! 🥩', pet: 'Nesahej! 😾', play: 'Odpočívám! 😴', sleep: 'Nespím! 🐆', clean: 'Ještě čisto! ✨' },
      en: { feed: 'Still digesting! 🥩', pet: 'Don\'t touch! 😾', play: 'I\'m resting! 😴', sleep: 'I\'m awake! 🐆', clean: 'Still clean! ✨' }
    },
    facts: [
      'Leopard je nejsilnější velká kočkovitá šelma — dokáže vylézt na strom s kořistí těžší než on sám.',
      'Každý leopard má unikátní vzor skvrn — stejně jako my otisky prstů, žádní dva nejsou stejní.',
      'Leopard je nejlepší šplhač mezi velkými kočkami.',
      'Leopardi jsou samotáři — každý má své území, které brání.',
      'Leopard dokáže vidět v noci 7× lépe než člověk.',
      'Leopard unese kořist těžší než sám sebe na strom — aby ji ochránil před hyenami.',
      'Černý panter není jiný druh — je to leopard s tmavým zbarvením.',
      'Leopard dokáže běžet až 58 km/h a skočit 3 metry do výšky.',
      'Leopardi jsou velmi tiší — jejich řev slyšíte až ze 3 km.',
      'Leopard loví přes 90 různých druhů zvířat — je to velký oportunista.'
    ],
    funFacts: [
      'Leopardi umí plavat a docela to baví — někdy loví ryby přímo ve vodě!',
      'Leopard dokáže skočit do délky přes 6 metrů — to je délka celého pokoje!'
    ]
  }
];

function getAnimalById(id) {
  return ANIMALS.find(function(a) { return a.id === id; });
}

function getAnimalName(id) {
  return I18n.t('animal_' + id);
}

function getAnimalActions(id) {
  var lang   = typeof I18n !== 'undefined' ? I18n.getCurrentLang() : 'cs';
  var animal = getAnimalById(id);
  if (!animal) return [];
  return animal.actions[lang] || animal.actions.cs;
}

function getAnimalComplaints(id) {
  var lang   = typeof I18n !== 'undefined' ? I18n.getCurrentLang() : 'cs';
  var animal = getAnimalById(id);
  if (!animal) return [];
  return animal.complaints[lang] || animal.complaints.cs;
}

function getAnimalRefusal(id, actionKey) {
  var lang   = typeof I18n !== 'undefined' ? I18n.getCurrentLang() : 'cs';
  var animal = getAnimalById(id);
  if (!animal || !animal.refusals) return '...';
  var refusals = animal.refusals[lang] || animal.refusals.cs;
  return refusals[actionKey] || '...';
}
