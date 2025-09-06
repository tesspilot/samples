// Auto-generated sample mapping for Strudel
addSamples('life', {
  1: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life1.wav',
  2: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life2.wav',
  3: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life3.wav',
  4: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life4.wav',
  5: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life5.wav',
  6: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life6.wav',
  7: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life7.wav',
  8: 'https://raw.githubusercontent.com/tesspilot/samples/main/clean/life8.wav'
});

// Example usage patterns
// s('life:1 2 3 4')
// s('life:[1..8]').often(0.3, _ => _.rev())
// s('life:[1 3 5 7]').euclid(5,8)

/***********************
 * Extended Usage Patterns
 * Copy any snippet into your Strudel editor.
 ***********************/

// 1. Simple cycling with variation
// Steady quarter notes then occasional reversed fill.
s('[life:1 life:2 life:3 life:4]')
  .often(0.25, _ => _.rev())
  .gain(1)

// 2. Euclidean texture across a subset
s('life:[1 3 5 7]').euclid(5,8)
  .rate("[1 0.5 1.5 1]" )
  .when(0.3, _ => _.rev())

// 3. Layer (stack) multiple roles
stack(
  // Main pulse
  s('life:1 ~ life:2 ~').fast(2),
  // Syncopated off-beats with occasional reverse
  s('~ life:4 ~ life:3').often(0.2, _ => _.rev()),
  // Ambient scatter slowed
  s('life:[5 6 7 8]').sometimes( _ => _.slow(2)).density(0.75)
)

// 4. Random walk through all 8
s('life:[1..8]').choose()
  .often(0.4, _ => _.rate('[1 0.5 2 1.5]'))
  .sometimes(_ => _.rev())

// 5. Chopped granulation style (if chop available)
s('life:5').chop(8).rate('[1 0.5 1.25]')
  .often(0.3, _ => _.rev())

// 6. Alternating density macro
s('life:[1 2 3 4]')
  .slow(2)
  .every(4, _ => _.density(4))
  .every(8, _ => _.rev())

// 7. Conditional transformation (within segment of cycle)
s('life:[1 2 3 4 5 6 7 8]')
  .within(0.5,1, _ => _.rev().rate(0.75))

// 8. Rate glide idea (manual sequence)
s('life:1 life:1 life:1 life:1')
  .rate('[0.5 0.75 1 1.5]')

// 9. Accent pattern using gain cycles
s('life:[1 2 3 4]').gain('[1 0.8 1.2 0.8]')

// 10. Euclid layering with different subsets
stack(
  s('life:[1 3 5]').euclid(5,8),
  s('life:[2 4 6 8]').euclid(3,8).slow(2)
).rate('[1 0.5 1.5]')

// 11. Sparse ambient drift using slow & random picks
s('life:[1..8]').slow(4).sometimes(_ => _.rev())
  .often(0.3, _ => _.rate('[0.5 1 2]'))

// 12. Build-up sequence with increasing density
s('life:[1 2 3 4]')
  .segment(4)
  .struct('[1 2 3 4]') // pattern of segment indices
  .every(4, _ => _.density(3))

// 13. Mini-break every 8 cycles
s('life:[1..4]').every(8, _ => s('life:[5 6 7 8]').fast(2))

// 14. Function to launch a demo stack
function lifeDemo() {
  return stack(
    s('life:[1 2 3 4]').gain('[1 0.9 1 0.85]').every(4, _ => _.rev()),
    s('life:[5 6 7 8]').euclid(5,8).rate('[1 0.5 1.5]'),
    s('life:[1..8]').slow(8).sometimes(_ => _.rev()).gain(0.7)
  );
}
// Call: lifeDemo()

// 15. Pseudo fill insertion using when (random 20%)
s('life:[1 2 3 4]').when(0.2, _ => s('life:[5 6 7 8]').fast(2))

// 16. Alternating reverse per cycle
s('life:[1..8]').every(2, _ => _.rev())

// 17. Combining choose with subsets for evolving texture
s('life:[1 2 3] life:[4 5] life:[6 7 8]')
  .choose()
  .often(0.25, _ => _.rev())

// 18. Stutter effect (manual repeat)
s('life:2').fast(4).every(4, _ => _.fast(8).slice(0,0.25))

// 19. Reverse only higher-numbered samples
s('life:[1..8]').map(ev => ev.sampleIndex > 4 ? ev.rev() : ev)

// 20. Gentle polymetric overlay
stack(
  s('life:[1 2 3 4]'),
  s('life:[5 6 7 8]').slow(3)
)

/***********************
 * End of extended patterns
 ***********************/
