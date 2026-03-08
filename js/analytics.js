// ═══════════════════════════════════════════════════════════
// e-zvířátka — analytics.js
// Lightweight wrapper around Google Analytics 4 custom events
// Setup: replace G-XXXXXXXXXX in index.html with your GA4
// Measurement ID from https://analytics.google.com
// ═══════════════════════════════════════════════════════════

const Analytics = (function() {

  function track(eventName, props) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', eventName, props || {});
      }
    } catch(e) { /* silent */ }
  }

  // Called on SPLASH — tracks whether it's a returning player
  function trackAppOpen() {
    var isReturn = !!(localStorage.getItem('ezvíratka_save'));
    track('app_open', { is_return_player: isReturn });
  }

  return { track: track, trackAppOpen: trackAppOpen };
})();
