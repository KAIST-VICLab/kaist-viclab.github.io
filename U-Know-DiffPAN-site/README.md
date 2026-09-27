# U-Know-DiffPAN project page

Source of the project page for **U-Know-DiffPAN: An Uncertainty-aware Knowledge Distillation Diffusion Framework with
Details Enhancement for PAN-Sharpening** (Sungpyo Kim, Jeonghyeok Do, Jaehyup Lee, Munchurl Kim; KAIST and Kyungpook
National University; CVPR 2025).

- Live page: https://kaist-viclab.github.io/U-Know-DiffPAN-site/
- Code repository: https://github.com/KAIST-VICLab/U-Know-DiffPAN

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd U-Know-DiffPAN-site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: headline figure, LRMS-to-HRMS gallery and the paper's qualitative
                          figures, quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on all of them)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      U-Know-DiffPAN brand colours (top of the file) and the gallery, comparison slider, figure tabs
                          and table view toggle
static/js/main.js         interactive gallery (tile pairs in carousels), comparison slider, table view toggle
static/images/            figures (web sizes + *_full for the lightbox), og.jpg (social preview) and the logo files
static/samples/           LRMS inputs and U-Know-DiffPAN results (reduced and full resolution per satellite) for the gallery
```

## Logo

`static/images/logo.svg` is the hero title (the globe icon and the U-Know-DiffPAN wordmark), `icon.png` is the
navigation and footer icon, and `favicon-32.png`, `favicon-64.png` and `apple-touch-icon.png` are the browser and
home-screen icons. The page title and headings use the typeface of the family pages, Outfit (loaded from Google Fonts),
and the colours of the globe (blue `#1D5CAB`, green `#358A1C`).

## Links

- Paper (CVF open access): https://openaccess.thecvf.com/content/CVPR2025/papers/Kim_U-Know-DiffPAN_An_Uncertainty-aware_Knowledge_Distillation_Diffusion_Framework_with_Details_Enhancement_CVPR_2025_paper.pdf
- arXiv: https://arxiv.org/abs/2412.06243
- Video: https://www.youtube.com/watch?v=kO7KavOH6vw
- Code: https://github.com/KAIST-VICLab/U-Know-DiffPAN
