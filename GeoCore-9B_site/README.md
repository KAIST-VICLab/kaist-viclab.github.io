# GeoCore-9B project page

Source of the project page for **GeoCore-9B: Towards Geo-Aware Generative Foundation Models in Earth Observation**
(Jeonghyeok Do, Munchurl Kim; KAIST; NeurIPS 2026).

- Live page: https://kaist-viclab.github.io/GeoCore-9B_site/
- Code repository: https://github.com/KAIST-VICLab/GeoCore-9B
- Model weights: https://huggingface.co/JeonghyeokDo/GeoCore-9B

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd GeoCore-9B_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: zero-shot generation from text, GSD and coordinates, the downstream
                          gallery for cloud removal and SAR-to-optical translation, quantitative results, then a compact
                          method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      GeoCore-9B brand colours (top of the file), the headline figures, the gallery, the comparison
                          slider and the table layouts
static/js/main.js         downstream gallery (tile strips in carousels) and comparison slider
static/images/            figures (web size *.webp + *_full.jpg for the lightbox), og.jpg (social preview) and the logo files
static/tiles/             per-method image tiles for the downstream gallery (cloud removal, SAR-to-optical)
```

## Logo

The GeoCore-9B logo is included: `static/images/logo.svg` is the hero title (the GeoCore-9B mark next to the
"GeoCore-9B" wordmark), `icon.png` is the navigation and footer mark, and `favicon-32.png`, `favicon-64.png` and
`apple-touch-icon.png` are the browser and home-screen icons. The page title and headings use the wordmark's typeface,
Outfit (loaded from Google Fonts), and the mark's colours (forest green `#0C4A32`, red `#C6421B`).

## Paper link

The NeurIPS paper link is not public yet. Until it is, the Paper button, the navigation bar's Paper link and the footer's
Paper link carry a `data-soon` attribute and `href="#"`; such a link is shown as pending (the Paper button carries a
"soon" badge) and does not navigate, with or without JavaScript. Once the paper is online, removing `data-soon` and
setting the real `href` on these three links in `index.html` is enough; no CSS or JavaScript file needs editing.
