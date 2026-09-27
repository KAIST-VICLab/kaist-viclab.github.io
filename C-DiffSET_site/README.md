# C-DiffSET project page

Source of the project page for **C-DiffSET: Leveraging Latent Diffusion for SAR-to-EO Image Translation with
Confidence-Guided Reliable Object Generation** (Jeonghyeok Do, Jaehyup Lee, Seungchul Lee, Munchurl Kim; KAIST,
Kyungpook National University and Stellarvision Inc.; IEEE TCSVT 2026).

- Live page: https://kaist-viclab.github.io/C-DiffSET_site/
- Code repository: https://github.com/KAIST-VICLab/C-DiffSET

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd C-DiffSET_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: headline figure, two interactive galleries and the paper figures,
                          quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page of the series)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      C-DiffSET brand colours (top of the file) and the galleries, comparison slider, figure layouts
                          and table view toggle
static/js/main.js         interactive galleries (tile strips in carousels), comparison slider, table view toggle
static/images/            figures (web sizes + *_full for the lightbox), og.jpg (social preview) and the logo files
static/samples/           input SAR, cBBDM and C-DiffSET images of 21 scenes (the "SAR in, EO out" gallery)
static/tiles/             per-method image tiles of the paper's comparison figures (the "All methods, same scenes" gallery)
```

## Logo

The C-DiffSET logo is included: `static/images/logo.svg` is the hero title (the orange-slice mark and the "C-DiffSET"
wordmark), `icon.png` is the navigation and footer mark, and `favicon-32.png`, `favicon-64.png` and
`apple-touch-icon.png` are the browser and home-screen icons. The page title and headings use the typeface of the
series, Outfit (loaded from Google Fonts), and the logo's colours (ink `#1C2738`, amber `#D67900`, mark `#FFC000`).

## Links

- Paper: https://ieeexplore.ieee.org/document/11556318/ (DOI 10.1109/TCSVT.2026.3701447)
- arXiv: https://arxiv.org/abs/2411.10788
- Code: https://github.com/KAIST-VICLab/C-DiffSET
