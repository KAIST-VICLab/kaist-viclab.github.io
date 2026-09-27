/* ReFlowSET project page: gallery (tile strips in carousels, compare dialog) and the table view toggle.
 * Vanilla JS, no dependencies. Runs after family.js (nav, hero, tabs, tables, lightbox, BibTeX),
 * whose helpers it takes from window.Family. Every module is opt-in through markup and
 * silently does nothing when its markup is absent. */
(function () {
  'use strict';

  var F = window.Family;
  var $ = F.$, $$ = F.$$;
  var revealInRow = F.revealInRow, openDialog = F.openDialog, wireDialog = F.wireDialog, closeDialog = F.closeDialog;

  var ICON = {
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5L8 12l6.5 6.5"/></svg>',
    next: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5L16 12l-6.5 6.5"/></svg>',
    split: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>'
  };

  /* ------------------------------------------------------------------
   * Deferred media: <img data-src> gets its src only when shown.
   * ------------------------------------------------------------------ */
  function loadDeferred(scope) {
    if (!scope) return;
    $$('img[data-src]', scope).forEach(function (img) {
      img.classList.add('is-loading');
      img.addEventListener('load', function () { img.classList.remove('is-loading'); }, { once: true });
      img.addEventListener('error', function () { img.classList.remove('is-loading'); }, { once: true });
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  /* ------------------------------------------------------------------
   * Gallery builder: <script type="application/json" id="gallery-data">
   * + <div data-gallery="id"> hosts -> carousel of tile strips.
   * Tiles use data-src, so nothing is fetched
   * until a slide is actually shown.
   * ------------------------------------------------------------------ */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function initGallery() {
    var src = document.getElementById('gallery-data');
    if (!src) return;
    var data;
    try { data = JSON.parse(src.textContent); } catch (err) { return; }
    var byId = {};
    (data.datasets || []).forEach(function (d) { byId[d.id] = d; });
    $$('[data-gallery]').forEach(function (host) {
      var ds = byId[host.getAttribute('data-gallery')];
      if (!ds) return;
      var h = '<div class="carousel" data-carousel data-label="' + esc(ds.unit) + '" aria-label="' + esc(ds.name) + ' ' + esc(ds.unit.toLowerCase()) + 's">' +
              '<div class="carousel-viewport"><div class="carousel-track">';
      ds.scenes.forEach(function (sc, i) {
        var where = ds.name + ' · scene ' + (i + 1);
        var altWhere = ds.name + ' scene ' + (i + 1);
        h += '<div class="carousel-slide">' +
             '<div class="strip" data-title="' + esc(where) + '" data-compare-scale="' + (data.compareScale || 2) + '" style="--tile-min: ' + (data.tileMin || 160) + 'px">';
        ds.cols.forEach(function (c) {
          var role = c.k === 'input' ? ' tile--input' : c.k === 'gt' ? ' tile--gt' : c.k === 'ours' ? ' tile--ours' : '';
          var what = c.k === 'gt' ? 'Compare with the reference' : 'Compare ' + c.n + ' with the reference';
          h += '<figure class="tile' + role + '"><button class="tile-btn" type="button" aria-label="' + esc(what) + '">' +
               '<img data-src="' + esc(data.root + ds.dir + '/' + sc.dir + '/' + c.f) + '" width="' + c.w + '" height="' + c.h + '" decoding="async" alt="' + esc(c.n + ', ' + altWhere) + '">' +
               '</button><figcaption><span class="tile-m">' + esc(c.n) + '</span><span class="tile-v">' + esc(c.v) + '</span></figcaption></figure>';
        });
        h += '</div></div>';
      });
      h += '</div></div></div>';
      host.innerHTML = h;
    });
  }

  /* ------------------------------------------------------------------
   * Carousel  [data-carousel] > .carousel-viewport > .carousel-track
   *    > .carousel-slide.  Controls are generated: counter "Scene k / N",
   *    dots, prev/next.  Keyboard arrows when focus is inside; swipe.
   * ------------------------------------------------------------------ */
  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      var viewport = $('.carousel-viewport', root);
      var track = $('.carousel-track', root);
      var slides = track ? $$('.carousel-slide', track) : [];
      var n = slides.length;
      if (!n) return;
      var label = root.getAttribute('data-label') || 'Slide';
      var index = 0;

      root.setAttribute('role', 'region');
      root.setAttribute('aria-roledescription', 'carousel');
      if (!root.hasAttribute('tabindex')) root.tabIndex = 0;
      slides.forEach(function (s, i) {
        s.setAttribute('role', 'group');
        s.setAttribute('aria-roledescription', 'slide');
        if (!s.hasAttribute('aria-label')) s.setAttribute('aria-label', label + ' ' + (i + 1) + ' of ' + n);
      });

      var controls = $('.carousel-controls', root);
      if (!controls) {
        controls = document.createElement('div');
        controls.className = 'carousel-controls';
        root.insertBefore(controls, root.firstChild);
      }
      var dotsHtml = '';
      for (var i = 0; i < n; i++) {
        dotsHtml += '<button type="button" class="carousel-dot" aria-label="' + label + ' ' + (i + 1) + '"></button>';
      }
      controls.innerHTML =
        '<p class="carousel-status" aria-live="polite"><span class="carousel-counter"></span><span class="carousel-title"></span></p>' +
        '<div class="carousel-nav">' +
          '<div class="carousel-dots">' + dotsHtml + '</div>' +
          '<button type="button" class="carousel-btn carousel-prev" aria-label="Previous ' + label.toLowerCase() + '">' + ICON.prev + '</button>' +
          '<button type="button" class="carousel-btn carousel-next" aria-label="Next ' + label.toLowerCase() + '">' + ICON.next + '</button>' +
        '</div>';
      var counter = $('.carousel-counter', controls), titleEl = $('.carousel-title', controls);
      var dots = $$('.carousel-dot', controls);
      if (n < 2) { $('.carousel-nav', controls).hidden = true; }

      function offset(i) { return 'translateX(calc(' + (-100 * i) + '% - ' + (12 * i) + 'px))'; }
      // Media in slides is deferred (img[data-src]).  Only the slide on screen is loaded, and only
      // once the carousel is rendered (not in a hidden tab) and near the viewport.
      var near = false;
      function eager(i) { if (near) loadDeferred(slides[i]); }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          near = entries[entries.length - 1].isIntersecting;
          if (near) loadDeferred(slides[index]);
        }, { rootMargin: '360px 0px' }).observe(root);
      } else {
        near = true;
      }
      function go(i) {
        var prev = slides[index];
        var active = document.activeElement;
        var hadFocus = !!(prev && active && prev.contains(active));
        var k0 = hadFocus ? $$('.tile-btn', prev).indexOf(active) : -1;
        index = (i + n) % n;
        track.style.transform = offset(index);
        slides.forEach(function (s, k) {
          var on = k === index;
          s.classList.toggle('is-active', on);
          s.setAttribute('aria-hidden', String(!on));
          if (on) s.removeAttribute('inert'); else s.setAttribute('inert', '');
        });
        // keyboard users keep their place: the same tile on the new slide (or the carousel itself)
        if (hadFocus && slides[index] !== prev) {
          var target = (k0 >= 0 && $$('.tile-btn', slides[index])[k0]) || root;
          target.focus({ preventScroll: true });
        }
        dots.forEach(function (d, k) {
          if (k === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
        });
        counter.textContent = label + ' ' + (index + 1) + ' / ' + n;
        titleEl.textContent = slides[index].getAttribute('data-title') || '';
        eager(index);
      }
      root.carouselGo = go;

      $('.carousel-prev', controls).addEventListener('click', function () { go(index - 1); });
      $('.carousel-next', controls).addEventListener('click', function () { go(index + 1); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });

      root.addEventListener('keydown', function (e) {
        if (e.target.closest('input, textarea, select, [role="tablist"], [contenteditable]')) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
      });

      // touch / pen swipe (mouse users have the buttons)
      var sw = null, suppressClick = false;
      viewport.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' || n < 2) return;
        sw = { x: e.clientX, y: e.clientY, id: e.pointerId, active: false };
      });
      viewport.addEventListener('pointermove', function (e) {
        if (!sw || e.pointerId !== sw.id) return;
        var dx = e.clientX - sw.x, dy = e.clientY - sw.y;
        if (!sw.active) {
          if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            sw.active = true;
            root.classList.add('is-dragging');
            try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
          } else if (Math.abs(dy) > 10) { sw = null; return; }
        }
        if (sw && sw.active) track.style.transform = 'translateX(calc(' + (-100 * index) + '% - ' + (12 * index) + 'px + ' + dx + 'px))';
      });
      function endSwipe(e) {
        if (!sw) return;
        var s = sw; sw = null;
        root.classList.remove('is-dragging');
        if (!s.active) return;
        var dx = e.clientX - s.x;
        suppressClick = true;
        setTimeout(function () { suppressClick = false; }, 60);
        if (e.type !== 'pointercancel' && Math.abs(dx) > Math.min(80, viewport.clientWidth * 0.15)) go(index + (dx < 0 ? 1 : -1));
        else go(index);
      }
      viewport.addEventListener('pointerup', endSwipe);
      viewport.addEventListener('pointercancel', endSwipe);
      viewport.addEventListener('click', function (e) {
        if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
      }, true);

      go(0);
    });
  }

  /* ------------------------------------------------------------------
   * Tile strips: click a tile -> compare dialog (tile vs .tile--gt)
   *    with a drag divider and chips to switch the left-hand method.
   * ------------------------------------------------------------------ */
  var cmp = null;
  function tileInfo(tile) {
    var img = $('img', tile);
    var m = $('.tile-m', tile), v = $('.tile-v', tile);
    return {
      tile: tile,
      name: m ? m.textContent.trim() : (img ? img.alt : ''),
      venue: v ? v.textContent.trim() : '',
      src: img ? (img.getAttribute('data-full') || img.currentSrc || img.getAttribute('src') || img.getAttribute('data-src') || '') : '',
      w: img ? (img.naturalWidth || +img.getAttribute('width') || 256) : 256,
      h: img ? (img.naturalHeight || +img.getAttribute('height') || 256) : 256,
      ours: tile.classList.contains('tile--ours'),
      gt: tile.classList.contains('tile--gt')
    };
  }
  function labelOf(info) {
    return info.venue && !info.gt && !/^(ours|input|reference)$/i.test(info.venue) ? info.name + ' · ' + info.venue : info.name;
  }
  function buildCompare() {
    var d = document.createElement('dialog');
    d.className = 'cmp';
    d.setAttribute('aria-labelledby', 'cmp-title');
    d.innerHTML =
      '<div class="cmp-head">' +
        '<div><p class="cmp-kicker"></p><h2 class="cmp-title" id="cmp-title"></h2></div>' +
        '<button type="button" class="icon-btn cmp-close" aria-label="Close">' + ICON.close + '</button>' +
      '</div>' +
      '<div class="cmp-body">' +
        '<input class="cmp-range visually-hidden" type="range" min="0" max="100" step="1" value="50" aria-label="Divider position (percent of the image showing the left method)">' +
        '<div class="cmp-stage">' +
          '<img class="cmp-img cmp-img--b" alt="" draggable="false">' +
          '<img class="cmp-img cmp-img--a" alt="" draggable="false">' +
          '<span class="cmp-label cmp-label--a"></span><span class="cmp-label cmp-label--b"></span>' +
          '<span class="cmp-handle" aria-hidden="true"><span class="cmp-knob">' + ICON.split + '</span></span>' +
        '</div>' +
        '<div class="cmp-chips" role="group" aria-label="Method shown on the left"></div>' +
        '<p class="cmp-hint"><span class="hint-pointer">Drag across the image or use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> &middot; <kbd>Esc</kbd> closes</span>' +
          '<span class="hint-touch">Drag across the image to move the divider</span></p>' +
      '</div>';
    document.body.appendChild(d);
    var c = {
      dlg: d, stage: $('.cmp-stage', d), range: $('.cmp-range', d), a: $('.cmp-img--a', d), b: $('.cmp-img--b', d),
      la: $('.cmp-label--a', d), lb: $('.cmp-label--b', d), chips: $('.cmp-chips', d),
      kicker: $('.cmp-kicker', d), title: $('.cmp-title', d), items: [], ref: null
    };
    function setPos(p) {
      p = Math.max(0, Math.min(100, p));
      c.stage.style.setProperty('--pos', p + '%');
      c.range.value = String(Math.round(p));
    }
    c.setPos = setPos;
    c.range.addEventListener('input', function () { setPos(+c.range.value); });
    var dragging = false;
    function fromEvent(e) {
      var r = c.stage.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
    }
    c.stage.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      dragging = true;
      try { c.stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      fromEvent(e);
    });
    c.stage.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    ['pointerup', 'pointercancel'].forEach(function (t) {
      c.stage.addEventListener(t, function () { dragging = false; });
    });
    d.addEventListener('keydown', function (e) {
      if (e.target === c.range) return;                       // native range handles its keys
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (e.target.closest('.cmp-chips')) return;            // let chip row scroll/focus normally
        e.preventDefault();
        setPos(+c.range.value + (e.key === 'ArrowLeft' ? -5 : 5));
      }
    });
    c.chips.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (chip) showLeft(+chip.getAttribute('data-i'));
    });
    $('.cmp-close', d).addEventListener('click', function () { closeDialog(d); });
    d.addEventListener('click', function (e) { if (e.target === d) closeDialog(d); });   // backdrop
    wireDialog(d);

    function showLeft(i) {
      var it = c.items[i];
      if (!it) return;
      c.a.src = it.src;
      c.a.alt = it.name;
      c.la.textContent = labelOf(it);
      c.la.classList.toggle('is-ours', it.ours);
      c.title.innerHTML = '';
      c.title.appendChild(document.createTextNode(it.name + ' '));
      var vs = document.createElement('span'); vs.className = 'vs'; vs.textContent = 'vs';
      c.title.appendChild(vs);
      c.title.appendChild(document.createTextNode(' ' + c.ref.name));
      $$('.chip', c.chips).forEach(function (ch) {
        var on = +ch.getAttribute('data-i') === i;
        ch.setAttribute('aria-pressed', String(on));
        if (on) revealInRow(c.chips, ch, 40);
      });
    }
    c.showLeft = showLeft;
    return c;
  }

  function openCompare(strip, tile) {
    var tiles = $$('.tile', strip);
    var gtTile = tiles.filter(function (t) { return t.classList.contains('tile--gt'); })[0];
    if (!gtTile) return;
    if (tile === gtTile) tile = $('.tile--ours', strip) || $('.tile--input', strip) || tiles[0];
    if (!cmp) cmp = buildCompare();
    var c = cmp;
    c.ref = tileInfo(gtTile);
    c.items = tiles.filter(function (t) { return t !== gtTile; }).map(tileInfo);

    var scale = parseFloat(strip.getAttribute('data-compare-scale')) || 1.6;
    c.stage.style.setProperty('--cmp-w', Math.round(c.ref.w * scale) + 'px');
    c.stage.style.setProperty('--cmp-ar', String(c.ref.w / c.ref.h));
    c.b.src = c.ref.src;
    c.b.alt = c.ref.name;
    c.lb.textContent = c.ref.name;

    var slide = strip.closest('.carousel-slide');
    c.kicker.textContent = strip.getAttribute('data-title') ||
      (slide && (slide.getAttribute('data-title') || slide.getAttribute('aria-label'))) || 'Comparison';

    c.chips.innerHTML = '';
    c.items.forEach(function (it, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (it.ours ? ' chip--ours' : '');
      b.setAttribute('data-i', String(i));
      b.setAttribute('aria-pressed', 'false');
      b.textContent = it.name;
      if (it.venue && !/^(ours|input)$/i.test(it.venue)) b.title = it.venue;
      c.chips.appendChild(b);
    });
    var start = 0;
    c.items.forEach(function (it, i) { if (it.tile === tile) start = i; });
    c.setPos(50);
    openDialog(c.dlg);
    c.showLeft(start);
    c.range.focus({ preventScroll: true });
  }

  /* Balanced rows: pick the column count auto-fill would use, then spread
   * the tiles evenly over the resulting rows (19 tiles at 8 per row -> 7,7,5
   * instead of 8,8,3).  Never upscales a tile beyond data-max-scale (1.6x). */
  function balanceStrip(strip) {
    if (strip.hasAttribute('data-no-balance')) return;
    var tiles = $$('.tile', strip), N = tiles.length;
    var W = strip.clientWidth;
    if (!N || !W) return;
    var cs = getComputedStyle(strip);
    var min = parseFloat(cs.getPropertyValue('--tile-min')) || 140;
    min = Math.min(min, W / 3 - 7);
    var gap = parseFloat(cs.columnGap) || 10;
    var fit = Math.max(1, Math.floor((W + gap) / (min + gap)));
    var rows = Math.ceil(N / fit);
    var cols = Math.min(fit, Math.ceil(N / rows));
    var img = $('img', tiles[0]);
    var nat = img ? (+img.getAttribute('width') || img.naturalWidth || 0) : 0;
    var maxScale = parseFloat(strip.getAttribute('data-max-scale')) || 1.6;
    while (nat && cols < fit && (W - gap * (cols - 1)) / cols > nat * maxScale + 12) cols++;
    strip.style.setProperty('--cols', String(cols));
    strip.setAttribute('data-cols', String(cols));
  }

  function initStrips() {
    var strips = $$('.strip');
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (en) { balanceStrip(en.target); });
      });
      strips.forEach(function (s) { ro.observe(s); });
    } else {
      strips.forEach(balanceStrip);
      window.addEventListener('resize', function () { strips.forEach(balanceStrip); });
    }
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.tile-btn');
      if (!btn) return;
      var strip = btn.closest('.strip');
      if (strip) openCompare(strip, btn.closest('.tile'));
    });
  }

  /* Dataset view toggle: <div class="view-toggle" data-table="#id"> with
   * buttons data-view="all|g1|g2"; the table's .g1/.g2 cells are hidden
   * through a class on the table (nothing is removed from the DOM). */
  function initViewToggles() {
    $$('.view-toggle[data-table]').forEach(function (group) {
      var table = $(group.getAttribute('data-table'));
      if (!table) return;
      var btns = $$('button[data-view]', group);
      function set(view) {
        table.classList.remove('show-g1', 'show-g2');
        if (view !== 'all') table.classList.add('show-' + view);
        btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
        var sc = table.closest('.table-scroll');
        if (sc) { sc.scrollLeft = 0; sc.dispatchEvent(new Event('table:update')); }
      }
      btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-view')); }); });
    });
  }

  F.onReady(function () {
    initGallery();
    initCarousels();
    initStrips();
    initViewToggles();
  });
})();
