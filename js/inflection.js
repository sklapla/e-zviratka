// ═══════════════════════════════════════════════════════════
// e-zvířátka — inflection.js
// AI-powered Czech instrumental inflection via Worker + local cache
// ═══════════════════════════════════════════════════════════

var INFLECT_URL = 'https://e-zviratka-analytics.sklapla.workers.dev/inflect';

function getInflectedName(name, gender) {
  var localKey = 'inflection_' + name.toLowerCase() + '_' + gender;
  var localCached = localStorage.getItem(localKey);
  if (localCached) return Promise.resolve({ inflected: localCached, approved: true });

  return fetch(INFLECT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, gender: gender })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    localStorage.setItem(localKey, data.inflected);
    return data; // { inflected, approved, fromCache }
  })
  .catch(function() {
    return { inflected: name, approved: true }; // fallback
  });
}
