// @title life breaks with scrub()
// @by tesspilot

setcpm(160/4)
samples('github:tesspilot/samples')
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
