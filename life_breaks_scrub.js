// @title life breaks with scrub()
// @by tesspilot

setcpm(160/4)
samples('github:tesspilot/samples')

// @title life breaks with scrub() - Complex
// @by tesspilot & Copilot

setcpm(180/4) // Faster tempo
samples('github:tesspilot/samples')

// --- More complex sequences for variation ---
let rhythmSeq = euclid(5, 8).struct("t(16,1,c)").slow(2)
let scrubSeq = "<[0 1 2 3]*2 [4 5 6 7]*2>".slow(4)
let textureSeq = "t(8,1,'<0 1 2 3 4 5 6 7>')".scramble().slow(8)

// --- Layer 1: Rhythmic Foundation ---
// Uses a variety of samples, with some velocity changes and euclidean rhythms
const layer1 = s("life1*4 life2*4 life4*4 life6*4")
    .segment(rhythmSeq.segment)
    .gain(rhythmSeq.velocity.scale(0.8, 1.2))
    .every(4, s => s.rev())
    .pan(sine.slow(8).scale(-0.8, 0.8))
    .lpf(3000)
    .hpf(100)

// --- Layer 2: Scrubbed Textures ---
// Uses different samples and scrubs through them with a dedicated sequence
const layer2 = s("life3 life7")
    .every(2, s => s.transpose(12))
    .scrub(scrubSeq)
    .gain(0.8)
    .delay(0.25)
    .delaytime(1/8)
    .delayfeedback(0.4)
    .room(0.7)

// --- Layer 3: Ambient Glitches & Long Samples ---
// Sparser, uses random samples, slowed down, with heavy effects
const layer3 = s("life5 life8")
    .choose() // randomly picks one
    .slow(textureSeq.slow)
    .sometimes(s => s.rev())
    .sometimes(s => s.sustain(4)) // let it play out
    .gain(0.7)
    .pan(tri.slow(12).scale(-1, 1))
    .vowel("a e i o u".slow(16))
    .crush(8)

// --- Combine all three layers to play simultaneously ---
stack(
    layer1,
    layer2,
    layer3
)._scope()
