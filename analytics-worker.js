// ═══════════════════════════════════════════════════════════
// e-zvířátka — analytics-worker.js
// Cloudflare Worker: analytics, AI inflection, hall of fame
// ═══════════════════════════════════════════════════════════

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/inflect')      return handleInflect(request, env);
    if (url.pathname === '/analytics')    return handleAnalytics(request, env);
    if (url.pathname === '/hall-of-fame') return handleHallOfFame(request, env);

    // Legacy root POST → analytics (backward compat)
    if (request.method === 'POST') return handleAnalytics(request, env);

    return new Response('Method not allowed', { status: 405 });
  }
};

// ── Analytics ────────────────────────────────────────────────────────────────

async function handleAnalytics(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  try {
    const data = await request.json();
    const { event, payload } = data;

    env.ANALYTICS.writeDataPoint({
      blobs: [
        event,
        payload.sessionId    || '',
        payload.animalId     || '',
        payload.petName      || '',
        payload.avatarName   || '',
        payload.gender       || '',
      ],
      doubles: [
        payload.happiness      || 0,
        payload.actionCount    || 0,
        payload.unlockedCount  || 0,
        payload.sessionDuration || 0,
      ],
      indexes: [event],
    });

    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}

// ── AI Inflection + KV cache ─────────────────────────────────────────────────

async function handleInflect(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { name, gender } = await request.json();
  if (!name) return new Response(JSON.stringify({ inflected: name }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });

  const cacheKey = name.toLowerCase().replace(/\s+/g, '_') + '_' + gender;

  // KV cache
  const cached = await env.INFLECTION_CACHE.get(cacheKey);
  if (cached) {
    return new Response(JSON.stringify({ inflected: cached, fromCache: true, approved: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // Claude Haiku — moderace
  const modResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 5,
      messages: [{
        role: 'user',
        content: `Je jméno mazlíčka "${name}" vhodné pro děti 6-10 let? Odpověz pouze YES nebo NO.`
      }]
    })
  });
  const modData = await modResponse.json();
  const approved = modData.content[0].text.trim().toUpperCase().startsWith('YES');

  // Claude Haiku — skloňování
  const inflectResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 20,
      messages: [{
        role: 'user',
        content: `Dej mi české jméno nebo přezdívku "${name}" (pohlaví mazlíčka: ${gender === 'male' ? 'kluk' : 'holka'}) v 7. pádu (instrumentálu). Příklady: Fracek→Frackem, Micka→Mickou, Fifi→Fifi. Odpověz pouze samotným skloňovaným slovem, nic jiného.`
      }]
    })
  });
  const inflectData = await inflectResponse.json();
  const inflected = inflectData.content[0].text.trim();

  // Ulož do KV cache (1 rok)
  await env.INFLECTION_CACHE.put(cacheKey, inflected, { expirationTtl: 31536000 });

  // Síň slávy — zapiš počet použití (jen pro schválená jména)
  if (approved) {
    const hofKey = 'hof_' + cacheKey;
    const existing = await env.INFLECTION_CACHE.get(hofKey);
    const count = existing ? parseInt(existing) + 1 : 1;
    await env.INFLECTION_CACHE.put(hofKey, count.toString());
  }

  return new Response(JSON.stringify({ inflected, fromCache: false, approved }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

// ── Hall of Fame ─────────────────────────────────────────────────────────────

async function handleHallOfFame(request, env) {
  const list = await env.INFLECTION_CACHE.list({ prefix: 'hof_' });
  const entries = await Promise.all(
    list.keys.map(async (key) => {
      const count = await env.INFLECTION_CACHE.get(key.name);
      const parts = key.name.replace('hof_', '').split('_');
      return {
        name:   parts[0],
        gender: parts[1],
        count:  parseInt(count) || 1
      };
    })
  );
  entries.sort((a, b) => b.count - a.count);
  return new Response(JSON.stringify(entries.slice(0, 50)), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
