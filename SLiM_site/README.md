# SLiM project page

Source of the project page for **Less is More: Compact-Token Masked Feature Prediction for Skeleton Representation Learning**
(SLiM; Jeonghyeok Do, Yun Chen, Geunhyuk Youk, Munchurl Kim; KAIST; NeurIPS 2026).

- Live page: https://kaist-viclab.github.io/SLiM_site/
- arXiv: https://arxiv.org/abs/2603.10648
- Code repository: https://github.com/KAIST-VICLab/SLiM

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd SLiM_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: accuracy-efficiency trade-off, paper figures, quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page of the series)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      SLiM brand colours (top of the file), the trade-off layout and the table variants
static/js/main.js         links into tabbed content (a link to a figure or table in a hidden tab opens that tab)
static/images/            figures (web sizes + *_full.jpg for the lightbox), og.jpg (social preview) and the logo files
```

## Logo

The SLiM logo is included: `static/images/logo.webp` is the hero lockup (the logo's mark and "SLiM" wordmark side by side),
`icon.png` is the navigation and footer mark, and `favicon-32.png`, `favicon-64.png` and `apple-touch-icon.png` are the
browser and home-screen icons. The page title and headings use Outfit (loaded from Google Fonts), and the logo's colours
(ink `#1C2738`, blue `#1692BA`, orange `#EA5E3A`).

## Paper link

The NeurIPS paper is not linked yet. Until it is, the Paper button and the navigation bar's Paper link carry a `data-soon`
attribute: they are shown as pending (with a "soon" badge) and do not navigate, with or without JavaScript. To publish the
link, set the real URL as their `href` and remove `data-soon` in `index.html`; no CSS or JavaScript file needs editing.
