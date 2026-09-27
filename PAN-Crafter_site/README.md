# PAN-Crafter project page

Source of the project page for **PAN-Crafter: Learning Modality-Consistent Alignment for PAN-Sharpening**
(Jeonghyeok Do, Sungpyo Kim, Geunhyuk Youk, Jaehyup Lee, Munchurl Kim; KAIST and Kyungpook National University; ICCV 2025).

- Live page: https://kaist-viclab.github.io/PAN-Crafter_site/
- Paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Do_PAN-Crafter_Learning_Modality-Consistent_Alignment_for_PAN-Sharpening_ICCV_2025_paper.pdf
- Code repository: https://github.com/KAIST-VICLab/PAN-Crafter

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd PAN-Crafter_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: headline figure, interactive galleries and paper figures,
                          quantitative results, then a compact method overview)
static/css/family.css     styles shared with the GeoSET, GeoCR and MotionMaestro pages (the same file on every page of the series)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, pending links, BibTeX copy,
                          image lightbox, tabs, table scroll cues
static/css/style.css      PAN-Crafter brand colours (top of the file) and the gallery, comparison slider, figure strip and
                          table view toggle
static/js/main.js         interactive galleries (tile strips in carousels), comparison slider, table view toggle,
                          paper-figure carousel (thumbnail strip with previous / next)
static/images/            figures (web sizes + *_full.jpg for the lightbox, *_thumb.jpg for the strip), og.jpg (social
                          preview) and the logo files
static/tiles/             the zoomed-in crops of the paper's full-resolution figures, one folder per dataset and scene
static/scenes/            whole 512 x 512 full-resolution scenes: input LRMS, CANConv and PAN-Crafter
```

## Logo

The PAN-Crafter logo is included: `static/images/logo.svg` is the hero title (the planet icon and the "PAN-Crafter"
wordmark), `icon.png` is the navigation and footer mark, and `favicon-32.png`, `favicon-64.png` and
`apple-touch-icon.png` are the browser and home-screen icons. The page title and headings use the typeface of the
series, Outfit (loaded from Google Fonts), and the icon's colours (Mars red `#E0634B`, navy `#27536B`; ink `#1C2738`).

## Links

- Paper (CVF open access): https://openaccess.thecvf.com/content/ICCV2025/papers/Do_PAN-Crafter_Learning_Modality-Consistent_Alignment_for_PAN-Sharpening_ICCV_2025_paper.pdf
- Supplementary material: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Do_PAN-Crafter_Learning_Modality-Consistent_ICCV_2025_supplemental.pdf
- arXiv: https://arxiv.org/abs/2505.23367
- Video: https://youtu.be/kQeZz6X5ag8
- Code: https://github.com/KAIST-VICLab/PAN-Crafter
