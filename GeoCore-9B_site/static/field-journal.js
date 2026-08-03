const asset = (name) => `static/assets/${name}`;

const gsdStudies = {
  overview: {
    src: asset("figure-gsd-control.webp"),
    alt: "Full scale GSD comparison",
    label: "Fig. 03 · Full scale study",
    caption: "GeoCore-9B changes visual granularity across 1–32 m GSD while preserving scene identity.",
  },
  built: {
    src: asset("figure-gsd-built.webp"),
    alt: "Cities and industry GSD comparison",
    label: "Fig. 03 · Cities and industry",
    caption: "Building and roof density evolve with the requested physical resolution.",
  },
  land: {
    src: asset("figure-gsd-landcover.webp"),
    alt: "Water and settlement GSD comparison",
    label: "Fig. 03 · Water and settlement",
    caption: "Lakes, vegetation, and sparse settlements remain geographically plausible across scale.",
  },
  terrain: {
    src: asset("figure-gsd-terrain.webp"),
    alt: "Mountain and sea ice GSD comparison",
    label: "Fig. 03 · Mountain and sea ice",
    caption: "Natural structures transition from local texture to broad land-cover patterns.",
  },
};

document.querySelectorAll("[data-gsd]").forEach((button) => {
  button.addEventListener("click", () => {
    const study = gsdStudies[button.dataset.gsd];
    const figure = document.querySelector("#gsd-figure");
    figure.querySelector("img").src = study.src;
    figure.querySelector("img").alt = study.alt;
    figure.querySelector("figcaption span").textContent = study.label;
    figure.querySelector("figcaption p").textContent = study.caption;
    document.querySelectorAll("[data-gsd]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  });
});

const taskStudies = {
  cloud: {
    title: "Clouds out. Structure retained.",
    body: "GeoCore-9B reconstructs roads, fields, and boundaries beneath severe cloud contamination.",
    first: asset("figure-cloud-removal-1.webp"),
    second: asset("figure-cloud-removal-2.webp"),
    altFirst: "Cloud removal comparison set one",
    altSecond: "Cloud removal comparison set two",
  },
  sar: {
    title: "From SAR measurements to optical structure.",
    body: "The adapted model maps noisy SAR inputs to RGB optical outputs with sharper man-made structure.",
    first: asset("figure-sar-translation-1.webp"),
    second: asset("figure-sar-translation-2.webp"),
    altFirst: "SAR-to-optical comparison set one",
    altSecond: "SAR-to-optical comparison set two",
  },
};

document.querySelectorAll("[data-task]").forEach((button) => {
  button.addEventListener("click", () => {
    const task = taskStudies[button.dataset.task];
    document.querySelector("#task-title").textContent = task.title;
    document.querySelector("#task-body").textContent = task.body;
    const images = document.querySelectorAll("#task-figures img");
    images[0].src = task.first;
    images[0].alt = task.altFirst;
    images[1].src = task.second;
    images[1].alt = task.altSecond;
    document.querySelectorAll("[data-task]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  });
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.querySelector(button.dataset.copyTarget);
    try {
      await navigator.clipboard.writeText(source.textContent);
      const previous = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => { button.textContent = previous; }, 1600);
    } catch {
      button.textContent = "Select text";
    }
  });
});

document.querySelectorAll(".menu nav a").forEach((link) => {
  link.addEventListener("click", () => link.closest("details").removeAttribute("open"));
});
