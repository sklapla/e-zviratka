// ═══════════════════════════════════════════════════════════
// e-zvířátka — analytics-worker.js
// Cloudflare Worker: receives game events, writes to Analytics Engine
// Deploy as separate Worker: wrangler deploy --config analytics-wrangler.toml
// ═══════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    // CORS pro same-origin i localhost
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const data = await request.json();
      const { event, payload } = data;

      // Zapsat do Analytics Engine
      env.ANALYTICS.writeDataPoint({
        blobs: [
          event,                              // typ události
          payload.sessionId || '',            // anonymní session ID
          payload.animalId || '',             // které zvíře
          payload.petName || '',              // jak ho pojmenoval
          payload.avatarName || '',           // jméno avatara
          payload.gender || '',               // pohlaví avatara
        ],
        doubles: [
          payload.happiness || 0,            // štěstí zvířete
          payload.actionCount || 0,          // počet akcí celkem
          payload.unlockedCount || 0,        // počet odemčených zvířat
          payload.sessionDuration || 0,      // délka session v sekundách
        ],
        indexes: [event],
      });

      return new Response('ok', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      return new Response('Error: ' + e.message, { status: 500 });
    }
  }
};
