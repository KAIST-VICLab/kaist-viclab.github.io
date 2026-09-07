# SOfA — project page

Source for <https://kaist-viclab.github.io/SOfA_site/>, the project page for
**"One for All: Generalist Foundation Model for Cross-Sensor Skeleton Representation Learning."**

## Deploy

This page lives as the `SOfA_site/` directory inside
[`KAIST-VICLab/kaist-viclab.github.io`](https://github.com/KAIST-VICLab/kaist-viclab.github.io),
the organization's Pages site — the same arrangement as `SLiM_site/` and the other project pages
there. Publishing is just a commit to that repository's `main` branch:

```bash
git clone https://github.com/KAIST-VICLab/kaist-viclab.github.io.git
cp -r SOfA_site kaist-viclab.github.io/
cd kaist-viclab.github.io
git add SOfA_site && git commit -m "Update SOfA project page" && git push
```

It is served at <https://kaist-viclab.github.io/SOfA_site/> within a minute or two of the push.

## Layout

```
index.html              the whole page — content, tables and captions live here
static/css/sofa.css     paper-style tables (booktabs rules, yellow!15 highlight rows) + KPI cards
static/css/index.css    Nerfies base styles
static/image/           logo variants and figures exported from the paper PDFs
```

Figures are cropped PNG exports of the paper's `figures/*.pdf` and `figures_supple/*.pdf`.
`datasets_2.png` and `datasets_3.png` are additional dataset visualizations that are exported
but not currently placed in `index.html`.

## Updating a result

All numbers are native HTML tables in `index.html` — no images to re-render. Bold marks the best
result (`<span class="best">`) and underline the second best (`<span class="second">`), matching
the paper's convention. Rows for our method carry `class="ours"` for the yellow highlight.

## Credit

Template adapted from [Nerfies](https://github.com/nerfies/nerfies.github.io), following
[SLiM](https://kaist-viclab.github.io/SLiM_site/).
