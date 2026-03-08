// ═══════════════════════════════════════════════════════════
// e-zvířátka — analytics.js
// Sends game events to Cloudflare Worker analytics endpoint
// ═══════════════════════════════════════════════════════════

// Anonymní session ID — náhodné, neváže se na osobu
function getSessionId() {
  var sid = sessionStorage.getItem('ez_session');
  if (!sid) {
    sid = Math.random().toString(36).substring(2, 12);
    sessionStorage.setItem('ez_session', sid);
  }
  return sid;
}

var ANALYTICS_URL = 'https://e-zviratka-analytics.sklapla.workers.dev';

function trackEvent(event, payload) {
  // Sleduj pouze pokud dal souhlas
  if (localStorage.getItem('ezvíratka_analytics_consent') !== 'true') return;

  var body = JSON.stringify({
    event: event,
    payload: Object.assign({}, payload || {}, { sessionId: getSessionId() })
  });

  fetch(ANALYTICS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  }).catch(function(e) {
    // Selhání analytiky nesmí rozbít hru — tiše ignoruj
    console.warn('Analytics failed:', e);
  });
}

// Backward-compat wrapper (starý kód volá Analytics.track / Analytics.trackAppOpen)
var Analytics = {
  trackEvent: trackEvent,
  track: function(event, payload) { trackEvent(event, payload || {}); },
  trackAppOpen: function() {
    var isReturn = !!(localStorage.getItem('ezvíratka_save'));
    trackEvent('app_open', { is_return_player: isReturn });
  }
};
