// Unified loader for the 'life' sample pack.
// Usage: paste this into Strudel (or include as a script) before using patterns.
// It tries pack syntax first (github:tesspilot/samples#life) then falls back to manual addSamples.

(async function loadLifeSamples(){
  const owner = 'tesspilot';
  const repo = 'samples';
  const packName = 'life';
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/main`;
  const simpleFiles = Array.from({length:8},(_,i)=>`clean/life${i+1}.wav`);
  const manualMap = Object.fromEntries(simpleFiles.map((p,i)=>[i+1, `${rawBase}/${p}`]));

  function alreadyLoaded(){
    return (globalThis.strudel && (strudel.samples[packName] || Object.keys(strudel.samples).some(k=>k.startsWith(packName))));
  }

  if (alreadyLoaded()) return console.log('[life] samples already present.');

  // 1. Try pack syntax
  const packSpec = `github:${owner}/${repo}#${packName}`;
  if (typeof globalThis.samples === 'function') {
    try {
      const maybe = globalThis.samples(packSpec);
      if (maybe && typeof maybe.then === 'function') {
        await maybe;
      }
      // Give it a brief tick to register
      if (alreadyLoaded()) {
        console.log(`[life] Loaded via pack spec: ${packSpec}`);
        return;
      }
    } catch (e) {
      console.warn('[life] Pack spec failed, falling back:', e);
    }
  }

  // 2. Try fetching samples.json and resolve packName there
  try {
    const res = await fetch(`${rawBase}/samples.json`);
    if (res.ok) {
      const json = await res.json();
      const group = json[packName];
      if (group) {
        const resolved = Object.fromEntries(Object.entries(group).map(([k,v]) => [k, `${rawBase}/${v}`]));
        if (typeof globalThis.addSamples === 'function') {
          addSamples(packName, resolved);
          console.log('[life] Loaded via samples.json');
          return;
        }
      }
    }
  } catch (e) {
    console.warn('[life] samples.json fetch failed:', e);
  }

  // 3. Final fallback: direct addSamples with numeric keys
  if (typeof globalThis.addSamples === 'function') {
    addSamples(packName, manualMap);
    console.log('[life] Loaded via direct addSamples fallback');
  } else if (typeof globalThis.samples === 'function') {
    // some builds only expose samples(object)
    globalThis.samples(Object.fromEntries(Object.entries(manualMap).map(([k,v])=>[`life${k}`, v])));
    console.log('[life] Loaded via samples(object) fallback');
  } else {
    console.error('[life] No known Strudel sample registration API found.');
  }
})();

// After this resolves you can do, for example:
// s('life:1 2 3 4')
// s('life:[1..8]').often(0.3, _ => _.rev())
