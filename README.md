# Sample Pack: Life Slices

This repo hosts the `slices/` folder containing 8 processed WAV samples.

## 1. (Optional) Simplify Filenames
Current names contain spaces, parentheses, and timestamps, which make URLs verbose. You can keep them, but cleaner names help in live coding.

Rename (optional):
```zsh
mkdir -p clean
i=1
for f in slices/Life-*_\\(processed\\)*.wav; do 
  cp "$f" "clean/life${i}.wav" 
  i=$((i+1))
done
```
Commit either the original or the `clean/` versions.

## 2. Add / Commit / Push
Initialize (if not already) and push to GitHub (replace YOURUSER / REPO):
```zsh
git init
git add .
git commit -m "Add life slices"
git branch -M main
git remote add origin git@github.com:YOURUSER/REPO.git
git push -u origin main
```

## 3. (Optional) Use Git LFS for Large WAVs
```zsh
brew install git-lfs   # if needed
git lfs install
git lfs track "*.wav"
echo "*.wav filter=lfs diff=lfs merge=lfs -text" >> .gitattributes
git add .gitattributes *.wav
git commit -m "Track wav with LFS"
git push
```

## 4. Raw File URLs
Each file is accessible at:
```
https://raw.githubusercontent.com/YOURUSER/REPO/main/slices/Life-1_(processed)%202025-09-03_155626.wav
```
(URL-encoded spaces become %20, parentheses are fine.)

If you used the `clean/` copies:
```
https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life1.wav
```

## 5. Strudel Integration
In your Strudel (web) session you can dynamically add samples:
```js
// Define a compact sample set
addSamples('life', {
  1: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life1.wav',
  2: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life2.wav',
  3: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life3.wav',
  4: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life4.wav',
  5: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life5.wav',
  6: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life6.wav',
  7: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life7.wav',
  8: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/clean/life8.wav'
});

// Basic pattern examples
s('life:1 2 3 4').rate(1)

// Cycle randomly through all 8
s('life:[1..8]').often(0.3, _ => _.rev())

// Euclidean rhythm over selected subset
s('life:[1 3 5 7]').euclid(5,8)
```

If you keep original filenames (verbose keys):
```js
addSamples('life', {
  a: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/slices/Life-1_(processed)%202025-09-03_155626.wav',
  b: 'https://raw.githubusercontent.com/YOURUSER/REPO/main/slices/Life-2_(processed)%202025-09-03_155626.wav'
  // ...etc
});
```
Then call with `s('life:a b')`.

## 6. Preloading (Optional)
To ensure latency-free first hits:
```js
Promise.all(Object.values(strudel.samples.life).map(url => fetch(url).then(r=>r.arrayBuffer())));
```

## 7. Versioning Tip
Tag releases when you finalize a pack:
```zsh
git tag -a v1 -m "First release"
git push --tags
```
Then you can pin to a tag for immutable URLs:
```
https://raw.githubusercontent.com/YOURUSER/REPO/v1/clean/life1.wav
```

## 8. Quick Checklist
- [ ] (Optional) Rename to simple `lifeN.wav`
- [ ] Commit & push (use LFS if big)
- [ ] Replace YOURUSER/REPO in Strudel code
- [ ] Add sample mapping via `addSamples`
- [ ] Jam!

---
Minimal and ready for Strudel.
