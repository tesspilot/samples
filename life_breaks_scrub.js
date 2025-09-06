// @title life breaks with scrub()
// @by tesspilot

setcpm(160/4)
samples('github:tesspilot/samples#life')
samples({'reese':'https://cdn.freesound.org/previews/236/236932_4212462-lq.mp3'})

let seq1 = "< 4@3 4@5 4@3 4@1 3@2 6@2 >*8" // straight ahead
let seq2 = "< 0@3 <0 3>@5 2@3 2@3 4@2 >*8" // alt slices every2 bars

let break1 = s("life:1/4").fit().scrub(seq1.div(8))
let break2 = s("life:3/2").fit().scrub(seq2.div(8))
let break3 = s("life:5/3").fit().scrub(seq1.div(8))

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
