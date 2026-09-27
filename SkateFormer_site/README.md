# SkateFormer project page

Source of the project page for **SkateFormer: Skeletal-Temporal Transformer for Human Action Recognition**
(SkateFormer; Jeonghyeok Do, Munchurl Kim; KAIST; ECCV 2024).

- Live page: https://kaist-viclab.github.io/SkateFormer_site/
- Paper: https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/05796.pdf
- arXiv: https://arxiv.org/abs/2403.09508
- Video: https://www.youtube.com/watch?v=kbYexZ-LfTM
- Code repository: https://github.com/KAIST-VICLab/SkateFormer
- Pretrained models: https://huggingface.co/JeonghyeokDo/SkateFormer

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd SkateFormer_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: the partition-specific attention figure, paper figures, quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page of the series)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      SkateFormer brand colours (top of the file), the figure carousel and the table variants
static/js/main.js         the paper-figure carousel, and links into tabbed content (a link to a table in a hidden tab opens that tab)
static/images/            figures (web sizes + *_full.jpg for the lightbox, *_thumb.jpg for the carousel strip),
                          og.jpg (social preview) and the logo files
```

## Logo

`static/images/logo.svg` is the hero lockup: the SkateFormer skater icon next to the "SkateFormer" wordmark
(set in Outfit and converted to outlines, so it needs no web font). `icon.png` is the navigation and footer mark, and
`favicon-32.png`, `favicon-64.png` and `apple-touch-icon.png` are the browser and home-screen icons. The page title and
headings use Outfit (loaded from Google Fonts), and the colours of the original SkateFormer title: ink `#1C2738`,
red `#D91421` ("Ska", Skeletal) and blue `#1484D9` ("te", Temporal).
