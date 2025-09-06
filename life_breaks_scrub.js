// @title life breaks with scrub()
// @by tesspilot

setcpm(160/4)
// Hybrid loader: try pack (strudel.json) then fallback to direct URLs (no errors)
;(async function ensureLifePack(){
  const packSpec = 'github:tesspilot/samples';
  const base = 'https://raw.githubusercontent.com/tesspilot/samples/main/clean';
  const direct = Array.from({length:8}, (_,i)=>`life${i+1}`);
  let loaded = false;
  if (typeof samples === 'function') {
    try {
      const maybe = samples(packSpec);
      if (maybe && maybe.then) await maybe;
      // Heuristic: first key exists
      if (typeof window !== 'undefined' && window.strudel && strudel.samples.life1) {
        console.log('[life] pack loaded via strudel.json');
        loaded = true;
      }
    } catch (e) {
      console.warn('[life] pack load failed, falling back', e);
    }
  }
  if (!loaded) {
    // Fallback: register manually (life1..life8)
    const mapObj = Object.fromEntries(direct.map((k,i)=>[k, `${base}/life${i+1}.wav`]));
    if (typeof samples === 'function') {
      samples(mapObj);
      console.log('[life] manual fallback loaded');
    } else if (typeof addSamples === 'function') {
      // Provide numeric keys too if addSamples is around
      addSamples('life', Object.fromEntries(direct.map((k,i)=>[i+1, `${base}/life${i+1}.wav`])))
      console.log('[life] addSamples fallback loaded');
    }
  }
})();

// External bass sample (kept separate so failure above doesn't block)
typeof samples==='function' && samples({'reese':'https://cdn.freesound.org/previews/236/236932_4212462-lq.mp3'})

let seq1 = "< 4@3 4@5 4@3 4@1 3@2 6@2 >*8" // straight ahead
let seq2 = "< 0@3 <0 3>@5 2@3 2@3 4@2 >*8" // alt slices every2 bars

// Using life1, life3, life5 keys (pack or fallback) with slice notation
let break1 = s("life1:0/4").fit().scrub(seq1.div(8))
let break2 = s("life3:0/2").fit().scrub(seq2.div(8))
let break3 = s("life5:0/3").fit().scrub(seq1.div(8))

let pads = chord("<E13sus _ A13sus _ C13sus _ G13sus _ >").voicing()
  .s('supersaw').attack(.5).release(.5)
  .gain(.5).room(3).phaser(1).phaserdepth(0.3).postgain(.2)
.early(.1)

let bass = note("<e2 _ c#3 _ c3 _ g2 _ >").s('reese').transpose(-12)
  // .struct("<1 _ _  1 _ _ 1 _ >*8")
  .s("reese")
  .clip(1)
  .vib("3:.4")
  .distort(1)
  .phaser(1)
  .phaserdepth(.1)
  .lpf(300)
  .postgain(.6)
  ._scope()
$: pads
$: bass

$: arrange(
[7, break3.color("blue")],
[1, break1.color("red")],
[3, break3.color("blue")],
[1, break2.color("green")],

)._pianoroll({labels:1,cycles:2})
