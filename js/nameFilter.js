// ═══════════════════════════════════════════════════════════
// e-zvířátka — nameFilter.js
// Client-side profanity filter for pet names
// ═══════════════════════════════════════════════════════════

function _normalizeName(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/4/g,'a').replace(/3/g,'e').replace(/0/g,'o').replace(/1/g,'i')
    .replace(/\$/g,'s').replace(/@/g,'a').replace(/!/g,'i').replace(/€/g,'e')
    .replace(/[^a-z]/g,'');
}

var _BANNED = [
  'mrdka','mrdak','mrdas','mrdat','mrdacka','mrdani',
  'pica','picka','picicka','pic','picu','pici','picat','picani','picovina','picovity',
  'kunda','kundicka','kundak',
  'kokot','kokotek','kokotec','kokotina','kokotko',
  'kurva','kurvicka','kurvak','kurvit','kurvin','kurvina',
  'zkurvit','zkurveny','zkurvysyn','prokurva','skurvak','skurvenec',
  'hovno','hovnivec','hovnicka','hovnak','hovnival','hounak',
  'hajzl','hajzlik','hajzlak',
  'pinda','pindicka','pindik','pida','pidicka','pidik',
  'curak','curaci','curas','curat','curek',
  'prdel','prdelka','prdelacek','prdelas','prdit','prdos','prdoch','prd','prdec','prdik',
  'srat','sracka','sracek','sralek','sral','sralec',
  'negr','negrik','negrus','negros',
  'retard','retardik','retardovan',
  'debil','debilek','debilak','debiloid','debilko',
  'idiot','idiotka','idiotek',
  'kreten','kretenoid','moron','imbecil',
  'blbec','blbecek','blbak','blbas','blboun','blbol','blbos',
  'svine','svinak','svinas','svinstvo',
  'prase','prasak','prasan',
  'zmrd','zmrdak',
  'kourit','kourace','sasat','sasani','prasit','soulozit','souloz',
  'jebat','jebaci','jebak','sukat','sukani',
  'dopicat','napicat','vyjebat','ojebat','pojebat',
  'vymrdat','namrdat','vysrat','posrat','nasrat',
  'vyprdnout','poprdnout','posrany','vysrany','jebnuty',
  'hitler','nacik','nacista','heil','fasista',
  'cigosh','cigos','cigan','zidak',
  'lump','lumpes','mizera','gauner','bastard','hajzlak','spros','sprotak',
];

var _SUGGESTIONS = [
  'Kulička','Hvězdička','Bublinka','Chomáček','Chlupáček',
  'Flíček','Šikulka','Mazlíček','Skákavec','Rychlonožka',
  'Cvalík','Chomouš','Flekáč','Cupitka','Zlatíček',
];

function checkName(name) {
  var norm = _normalizeName(name);
  var found = _BANNED.find(function(w) { return norm.indexOf(w) !== -1; });
  if (!found) return { ok: true };
  var suggestion = _SUGGESTIONS[Math.floor(Math.random() * _SUGGESTIONS.length)];
  return { ok: false, suggestion: suggestion };
}
