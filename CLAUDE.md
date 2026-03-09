# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**e-zvířátka** — Czech children's virtual pet web game. Vanilla JS SPA, no build tools, deployed on Cloudflare Pages. Target audience: kids 6–10 years. UI language: Czech (primary), English (secondary).

## Deployment

```bash
# Deploy Cloudflare Worker (analytics + inflection + hall of fame)
CLOUDFLARE_API_TOKEN="T270e0bbZn8bxVrB9SCa_z8snBs2RtxRqx1fnH6F" \
CLOUDFLARE_ACCOUNT_ID="d5c5bc0d2e05f17e1db829fcf477784c" \
npx wrangler deploy --config analytics-wrangler.toml

# Set/update a Worker secret
echo "VALUE" | CLOUDFLARE_API_TOKEN="..." CLOUDFLARE_ACCOUNT_ID="..." \
  npx wrangler secret put SECRET_NAME --config analytics-wrangler.toml
```

The frontend deploys automatically via Cloudflare Pages on push to `main`.

There is no build step — edit files directly, commit, push.

## Architecture

### Frontend (`js/`)

Script load order matters (all `defer`, loaded in `index.html`):
1. `analytics.js` — `trackEvent(event, payload)`, consent gate
2. `inflection.js` — `getInflectedName(name, gender)` → Worker `/inflect`
3. `nameFilter.js` — `checkName(name)` → `{ ok, found, suggestion }`
4. `i18n.js` — `I18n.t(key)`, `I18n.setLang('cs'|'en')`
5. `animals.js` — `getAnimalById(id)`, `getAnimalComplaints(id)`, animal data
6. `storage.js` — `Storage.load()` / `Storage.save(state)` / `Storage.reset()`
7. `game.js` — `Game.initCareScreen(id, callbacks)`, `Game.doAction(id, action)`, `Game.teardown()`
8. `app.js` — SPA router + all screen renderers (`App.init()`, `App.navigate(screen, params)`)

### State (localStorage key: `ezvíratka_save`, VERSION=2)

```
state.animals[id] = {
  unlocked, happiness, petName, petGender, hofApproved,
  lastCareTimestamp, charges, cooldownUntil
}
state.avatar = { name, gender, hairStyle, hairColor, clothingSet, clothingColor, accessory }
state.unlockOrder        // shuffled array of 10 regular animal IDs
state.currentAnimalId
state.nextRewardTimestamp
state.leopardUnlocked / leopardCutsceneSeen
state.language           // 'cs' | 'en'
```

Analytics consent: `ezvíratka_analytics_consent` (localStorage).
Inflection cache: `inflection_{name}_{gender}` (localStorage) + Cloudflare KV (1yr TTL).
Fact rotation: `_lastFacts_{animalId}` (sessionStorage).

### Game loop

- **Happiness decay**: −1 every 5s (live timer in `game.js`), offline catch-up on focus
- **Charges**: each action has `max` charges + `cooldown` ms before refill (defined in `CHARGE_CONFIG`)
- **Reward**: unlocks next animal in `unlockOrder`; after 5 regular animals → leopard cutscene
- **Complaints**: random bubble every 30–60s; −5 happiness if ignored for 10s

### App screens

`SPLASH → AVATAR → ANIMAL_SELECT → NAME_ANIMAL → CARE → REWARD / UNLOCK_NOTIFY`
`COLLECTION` accessible from care screen.

`navigate(screen, params)` calls `Game.teardown()` then re-renders.

### Cloudflare Worker (`analytics-worker.js`)

Endpoints:
- `POST /inflect` — Claude Haiku moderation (YES/NO) + Czech instrumental inflection, KV cache
- `POST /analytics` — writes to Analytics Engine dataset `ez-analytics`
- `GET /hall-of-fame` — top 50 names from KV (`hof_` prefix = usage counts)
- `POST /` — legacy analytics alias

Worker secrets: `ANTHROPIC_API_KEY`
KV namespace binding: `INFLECTION_CACHE` (id: `0a43d1b6cbc142c199e0440c4a3475b9`)

### Czech grammar helpers (in `app.js`)

- `_petInstrumental(name, gender)` — 7th case (instrumentál) for named pets
- `_genderize(text, gender)` — resolves `Xý/á` patterns in UI strings
- Each animal in `animals.js` has `instrumentalCS` field for unnamed pet ("Jít za psem")

### Name filter (`js/nameFilter.js`)

- `normalize(str)` — lowercase + strip diacritics + leet substitutions (0→o, 3→e, 5→s, 7→t…)
- `BANNED_CLEAN` — deduped list, min length 3
- `EXCEPTIONS` — banned words that are innocent (ptak, ocas…)
- `SAFE_NAMES` — input name prefixes that allow false-positive matches (opic…)

### Animals (`js/animals.js`)

11 animals: `dog, cat, rabbit, hamster, guinea, snake, parrot, turtle, fish, hedgehog, leopard`
Each has: `id, emoji, name, instrumentalCS, facts[]` (15), `funFacts[]` (2), `complaints[]`, `refusals[]`
funFacts always show first 2 (no rotation); facts rotate randomly via `_pickRandom2()`.

### i18n

`I18n.t('key')` — Czech fallback if English key missing. Lang stored in `state.language`.

## Version

Current: `APP_VERSION = 'v1.9'` in `app.js` (shown in UI next to reset button).
Bump this constant when releasing a new version.
