// ═══════════════════════════════════════════════════════════
// e-zvířátka — nameFilter.js  (v1.9)
// Client-side profanity filter — substring matching + leet normalization
// ═══════════════════════════════════════════════════════════

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/4/g, 'a').replace(/3/g, 'e')
    .replace(/0/g, 'o').replace(/1/g, 'i')
    .replace(/\$/g, 's').replace(/@/g, 'a')
    .replace(/!/g, 'i').replace(/€/g, 'e')
    .replace(/5/g, 's').replace(/7/g, 't')
    .replace(/8/g, 'b').replace(/6/g, 'g')
    .replace(/\+/g, 't').replace(/\|/g, 'i')
    .replace(/[^a-z]/g, '');
}

const BANNED = [
  // Mrdka
  'mrd','mrdat','mrdka','mrdak','mrdas','mrdacka','mrdani','mrdic',
  'vymrdat','namrdat','odmrdat','zmrdat','zmrd','zmrdak',
  // Pica
  'pic','pica','picka','pici','picu','picut','picat',
  'picovina','picovity','picacka',
  'dopicat','napicat','vypicat','zpicat',
  // Kunda
  'kund','kunda','kundic','kundicka','kundak','kundas',
  // Kokot
  'kokot','kokotek','kokotec','kokotina','kokotko','kokotit','kokotsky',
  // Kurva
  'kurv','kurva','kurvic','kurvicka','kurvak','kurvit','kurvin',
  'kurvina','zkurvit','zkurven','zkurvysyn','prokurva',
  'skurvak','skurvenec',
  // Hovno
  'hovn','hovno','hovniv','hovnicka','hovnak','hovnival',
  // Hajzl
  'hajzl','hajzlik','hajzlak','hajzlarna',
  // Pinda / Pida
  'pind','pinda','pindicka','pindik','pindas','pinder',
  'pid','pida','pidicka','pidik',
  // Curak
  'curak','curaci','curas','curat','curek','curacek',
  // Prdel
  'prdel','prdelka','prdelac','prdelas','prdelnik',
  'prdos','prdoch','prdec','prdik','prdit','prdnout','prdeni',
  // Srat
  'srat','sracka','sracek','sralek','sral','sralec',
  'sraci','srace','sraciste','srani',
  'vysrat','posrat','nasrat','zasrat','usrat','osrat',
  // Curat (moč)
  'curat','cureni','curani',
  // Chuj
  'chuj','chujec','chujovina',
  // Vůl
  'vul','volovina',
  // Buzna / homosexuální nadávky
  'buzna','buznak','buznacek',
  'teplous','teplik',
  'peder','pederast',
  'homous','homik','homac',
  'buzerant','buzerantsky',
  'lesba',
  // Rasistické
  'negr','negrik','negrus','negros','negroun',
  'cigos','cigosh','cigan','ciganit',
  'zid','zidak','zide',
  // Nacistické / extremistické
  'hitler','nacik','nacista','nacisticky',
  'heil','fasista','fasoun',
  'kkk',
  // Retard / Debil / Idiot
  'retard','retardik','retardovan',
  'debil','debilek','debilak','debiloid','debilko',
  'idiot','idiotka','idiotek',
  'kreten','kretenoid',
  'moron','imbecil',
  // Blbec
  'blbec','blbecek','blbak','blbas','blboun','blbol','blbos',
  'tupec','tupak','pitomec','pitomak','hlupak',
  // Svině / Prase
  'svine','svinak','svinas','svinstvo',
  'prase','prasak','prasan','prasarna','prasit',
  // Obecné nadávky
  'lump','lumpes','mizera','gauner','bastard','zkurvenec',
  'spros','sprotak','mrcha',
  // Sexuální akty
  'jebat','jebaci','jebak','jebnout','jebnuty',
  'ojebat','pojebat','vyjebat','najebat','zajebat',
  'sukat','sukani',
  'kourit','kourace','vykourit',
  'sasat','sasani',
  'soulozit','souloz',
  // Kombinace
  'posrany','vysrany','nasrany','usrany',
  'ojebnuty','pojebany','zkurvenej','vyprdeny',
  // Anglické
  'fuck','fucker','fucking',
  'shit','bullshit',
  'bitch','whore',
  'asshole','dick','cock','pussy',
  'cunt','twat',
  'nigger','nigga',
  'faggot',
  // Německé
  'scheisse','fick','ficken',
  'arschloch','wichser','hurensohn','schlampe',
];

// Deduplikace, min. délka 3
const BANNED_CLEAN = [...new Set(BANNED)].filter(w => w.length >= 3);

// Nevinná slova která by mohla být falešně zachycena
const EXCEPTIONS = ['ptak', 'ptacek', 'ocas', 'suka', 'osel'];

const _SUGGESTIONS = [
  'Kulička','Hvězdička','Bublinka','Chomáček','Chlupáček',
  'Flekatec','Flíček','Šikulka','Mazlíček','Chlupatec',
  'Skákavec','Rychlonožka','Cvalík','Chomouš','Zlatíček',
  'Smolíček','Chytráček','Culík','Puntík','Mňoukálka',
];

function checkName(name) {
  const norm = normalize(name);
  const found = BANNED_CLEAN.find(function(word) {
    if (EXCEPTIONS.includes(word)) return false;
    return norm.includes(word);
  });
  if (!found) return { ok: true };
  const suggestion = _SUGGESTIONS[Math.floor(Math.random() * _SUGGESTIONS.length)];
  return { ok: false, found: found, suggestion: suggestion };
}
