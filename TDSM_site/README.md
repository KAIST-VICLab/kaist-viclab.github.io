# TDSM project page

Source of the project page for **Bridging the Skeleton-Text Modality Gap: Diffusion-Powered Modality Alignment for
Zero-shot Skeleton-based Action Recognition** (TDSM, Triplet Diffusion for Skeleton-Text Matching; Jeonghyeok Do,
Munchurl Kim; KAIST; ICCV 2025).

- Live page: https://kaist-viclab.github.io/TDSM_site/
- Paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Do_Bridging_the_Skeleton-Text_Modality_Gap_Diffusion-Powered_Modality_Alignment_for_Zero-shot_ICCV_2025_paper.pdf
- arXiv: https://arxiv.org/abs/2411.10745
- Code repository: https://github.com/KAIST-VICLab/TDSM

The page is plain HTML, CSS and JavaScript with no build step and no dependencies other than Google Fonts.
GitHub Pages serves it from the repository root (`.nojekyll` turns off Jekyll processing).

## Preview locally

Serve the folder over HTTP rather than opening `index.html` from disk, so that every path resolves as it does on GitHub Pages:

```bash
cd TDSM_site
python3 -m http.server 8000
# then open localhost:8000 in a browser
```

## Layout

```
index.html                the page (results first: main benchmark table, paper figures, quantitative results, then a compact method overview)
static/css/family.css     styles shared with the other pages of the series (the same file on every page)
static/js/family.js       scripts shared with those pages: navigation, abstract toggle, BibTeX copy, image lightbox,
                          tabs, table scroll cues
static/css/style.css      TDSM brand colours (top of the file) and the figure strip, table grids and check-mark tables
static/js/main.js         paper-figure carousel (thumbnail strip with previous / next), strip edge fades, thumbnail loading
static/images/            figures (web sizes + *_full.jpg for the lightbox, *_thumb.jpg for the strip), og.jpg (social preview)
                          and the logo files
```

## Logo

`static/images/logo.svg` is the hero title: the page's icon (skull, bridge and document: skeleton, bridge, text) next to
the "TDSM" wordmark. `icon.png` is the navigation and footer mark, `mark.png` (the skull alone) replaces it in the
navigation on phones, and `favicon-32.png`, `favicon-64.png` and `apple-touch-icon.png` (the skull) are the browser and
home-screen icons. The wordmark and headings use the typeface of the series, Outfit (loaded from Google Fonts); the
wordmark is plain gray (`#6B7385`), and the title accents use the icon's colours (green `#34A853`, blue `#1082D9`)
with the ink `#1C2738`.

## Links

- Paper (CVF open access): https://openaccess.thecvf.com/content/ICCV2025/papers/Do_Bridging_the_Skeleton-Text_Modality_Gap_Diffusion-Powered_Modality_Alignment_for_Zero-shot_ICCV_2025_paper.pdf
- Supplementary material: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Do_Bridging_the_Skeleton-Text_ICCV_2025_supplemental.pdf
- arXiv: https://arxiv.org/abs/2411.10745
- Video: https://youtu.be/QD8Kbo6Eh1I
- Code: https://github.com/KAIST-VICLab/TDSM
