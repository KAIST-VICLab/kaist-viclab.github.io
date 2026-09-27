# SOfA project page

Source of the project page for **One for All: Generalist Foundation Model for Cross-Sensor Skeleton Representation Learning**
(SOfA, Skeleton One for All; Jeonghyeok Do, Yun Chen, Munchurl Kim; KAIST; arXiv preprint, 2026).

- Live page: https://kaist-viclab.github.io/SOfA_site/
- Paper: https://arxiv.org/abs/2609.07078
- Code repository: https://github.com/KAIST-VICLab/SOfA

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd SOfA_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: headline figure, paper figures, quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page of the series)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      SOfA brand colours (top of the file) and the figure strip, table pairs and SOfA table rows
static/js/main.js         paper-figure carousel (thumbnail strip with previous / next), strip edge fades, thumbnail loading
static/images/            figures (web sizes + *_full.jpg for the lightbox, *_thumb.jpg for the strip), og.jpg (social preview)
                          and the logo files
static/paper/SOfA.pdf     the paper
```

## Logo

The SOfA logo is included: `static/images/logo.webp` is the hero title (the sofa mark and the "SOfA" wordmark of the
original stacked logo, set side by side), `icon.png` is the navigation and footer mark, and `favicon-32.png`,
`favicon-64.png` and `apple-touch-icon.png` are the browser and home-screen icons. The page title and headings use the
typeface of the series, Outfit (loaded from Google Fonts), and the logo's colours (ink `#1C2738`, red `#CD3719`,
green `#349028`).

## Links

The Paper button opens `static/paper/SOfA.pdf`; the arXiv button, the footer's arXiv link and the BibTeX entry use
arXiv:2609.07078; the Code button links to https://github.com/KAIST-VICLab/SOfA.
