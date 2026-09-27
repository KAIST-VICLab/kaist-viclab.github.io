# ReFlowSET project page

Source of the project page for **ReFlowSET: Representation-Aligned Latent Flow Matching for SAR-to-EO Image Translation**
(Jeonghyeok Do, Seungchul Lee, Munchurl Kim; KAIST and Stellarvision Inc.; arXiv preprint, 2026).

- Live page: https://kaist-viclab.github.io/ReFlowSET_site/
- Code repository: https://github.com/KAIST-VICLab/ReFlowSET

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd ReFlowSET_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: headline figure, interactive gallery and the codec audit,
                          quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on all of them)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      ReFlowSET brand colours (top of the file) and the gallery, comparison slider, codec figure and
                          table view toggle
static/js/main.js         interactive gallery (tile strips in carousels), comparison slider, table view toggle
static/images/            figures (web size + *_full for the lightbox), og.jpg (social preview) and the logo files
static/tiles/             per-method image tiles of the qualitative comparison for the interactive gallery
static/paper/             the paper (PDF)
```

## Logo

The ReFlowSET logo is included: `static/images/logo.webp` is the hero title (mark and wordmark), `icon.png` is the
navigation and footer mark, and `favicon-32.png`, `favicon-64.png` and `apple-touch-icon.png` are the browser and
home-screen icons. The page title and headings use the typeface of the family pages, Outfit (loaded from Google Fonts),
and the logo's colours (ink `#1C2738`, blue `#0055B4`).

## Links

- Paper: `static/paper/ReFlowSET.pdf`
- arXiv: https://arxiv.org/abs/2609.00968
- Code: https://github.com/KAIST-VICLab/ReFlowSET
- Models: https://huggingface.co/JeonghyeokDo/ReFlowSET (checkpoints of the retrained baselines:
  https://huggingface.co/JeonghyeokDo/ReFlowSET/tree/main/baselines)
