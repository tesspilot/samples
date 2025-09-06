// @title life breaks with scrub()
// @by tesspilot

setcpm(160/4)
samples('github:tesspilot/samples')

let seq1 = "< 4@3 4@5 4@3 4@1 3@2 6@2 >*8" // straight ahead
let seq2 = "< 0@3 <0 3>@5 2@3 2@3 4@2 >*8" // alt slices every2 bars

// Using individual sample keys (life1, life3, life5) as defined in strudel.json
let break1 = s("life1").fit().scrub(seq1.div(8))
let break2 = s("life3").fit().scrub(seq2.div(8))
let break3 = s("life5").fit().scrub(seq1.div(8))

$: arrange(
[7, break3.color("blue")],
[1, break1.color("red")],
[3, break3.color("blue")],
[1, break2.color("green")],

)._pianoroll({labels:1,cycles:2})
