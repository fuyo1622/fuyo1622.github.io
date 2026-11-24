# fuyo1622.github.io

Personal website of fuyo1622: **https://fuyo1622.github.io/**

Plain HTML, CSS and a little JavaScript. No build step: GitHub Pages serves the `main` branch as is.

| File | What it is |
|---|---|
| `index.html` | All page content |
| `assets/style.css` | Styles, light and dark themes |
| `assets/main.js` | Theme toggle, active nav link, thesis chart animation |
| `assets/tfv-demo.mp4`, `assets/tfv-demo-poster.jpg` | Translate from Voice demo video (1080p, 76 s) and its poster frame, shown at the top of its project card. The clip in it is CC BY 3.0 and credited under the video. |
| `resume.pdf` | Resume linked from the page (phone number removed). Replace it with a new export when the resume changes. |
| `favicon.svg` | Tab icon |
| `.nojekyll` | Tells Pages to skip Jekyll processing |

## Edit and preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Push to `main` to publish; the site updates within a minute or two.
