/* SkateFormer project page: the paper-figure carousel (prev / thumbnail strip / next), strip edge fades,
   thumbnail loading, and links into tabbed content. Vanilla JS, no dependencies. Runs after family.js (nav,
   hero, tabs, tables, disclosures, image lightbox, BibTeX), whose helpers it takes from window.Family. The
   switcher is the MotionMaestro page's component without its video handling (as on the SOfA page); a link (or
   the URL hash) that points into a hidden tab panel first selects that panel's tab (as on the SLiM page). */
(function () {
  'use strict';

  var F = window.Family;
  var $ = F.$, $$ = F.$$;
  var hasIO = 'IntersectionObserver' in window;

  /* ------------------------------------------------------------------
     Switchers: [data-switch] > [role=tablist] > [role=tab] with
        aria-controls -> panel id. Optional [data-prev] [data-next]
        [data-count] inside the same [data-switch].
     ------------------------------------------------------------------ */
  function own(root, sel) {
    return $$(sel, root).filter(function (el) { return el.closest('[data-switch]') === root; });
  }
  function keepTabVisible(tab) {
    F.revealInRow(tab.closest('.hscroll, .chip-row, .tablist'), tab, 32);
  }
  function initSwitchers() {
    $$('[data-switch]').forEach(function (root) {
      var list = own(root, '[role="tablist"]')[0];
      if (!list) return;
      var tabs = $$('[role="tab"]', list);
      var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
      var current = 0;

      function select(i, focus, silent) {
        i = (i + tabs.length) % tabs.length;
        current = i;
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (panels[k]) panels[k].hidden = !on;
        });
        if (focus) tabs[i].focus({ preventScroll: true });
        if (!silent) keepTabVisible(tabs[i]);
        own(root, '[data-count]').forEach(function (c) { c.textContent = (i + 1) + ' / ' + tabs.length; });
      }

      tabs.forEach(function (t, k) {
        t.addEventListener('click', function () { select(k); });
        t.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight') n = current + 1;
          else if (e.key === 'ArrowLeft') n = current - 1;
          else if (e.key === 'Home') n = 0;
          else if (e.key === 'End') n = tabs.length - 1;
          if (n !== null) { e.preventDefault(); select(n, true); }
        });
      });
      own(root, '[data-prev]').forEach(function (b) { b.addEventListener('click', function () { select(current - 1); }); });
      own(root, '[data-next]').forEach(function (b) { b.addEventListener('click', function () { select(current + 1); }); });

      var initial = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
      select(initial < 0 ? 0 : initial, false, true);
    });
  }

  /* ------------------------------------------------------------------
     Horizontal scroll edges: thumbnail strips fade at the side that
     has more (tables: family.js)
     ------------------------------------------------------------------ */
  function initScrollEdges() {
    var ro = 'ResizeObserver' in window ? new ResizeObserver(function (es) { es.forEach(function (e) { if (e.target.__edge) e.target.__edge(); }); }) : null;
    $$('.hscroll').forEach(function (sc) {
      var fn = function () {
        var max = sc.scrollWidth - sc.clientWidth;
        sc.classList.toggle('fade-l', max > 2 && sc.scrollLeft > 2);
        sc.classList.toggle('fade-r', max > 2 && sc.scrollLeft < max - 2);
      };
      sc.__edge = fn;
      sc.addEventListener('scroll', fn, { passive: true });
      if (ro) ro.observe(sc);
      window.addEventListener('resize', fn);
      fn();
    });
  }

  /* ------------------------------------------------------------------
     Thumbnail strips: once a strip is near the viewport, load all of
         its thumbnails, including those still scrolled off to the side
     ------------------------------------------------------------------ */
  function initThumbs() {
    var strips = $$('.thumbs');
    var eager = function (strip) { $$('img[loading="lazy"]', strip).forEach(function (img) { img.loading = 'eager'; }); };
    if (!hasIO) { strips.forEach(eager); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { eager(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '400px 0px' });
    strips.forEach(function (s) { io.observe(s); });
  }


  /* ------------------------------------------------------------------
     Links into hidden tab panels: select the tab first, so the target
     is visible when the page scrolls to it
     ------------------------------------------------------------------ */
  function revealTab(id) {
    var el = id && document.getElementById(id);
    if (!el) return;
    for (var n = el; n; n = n.parentElement) {
      if (n.getAttribute && n.getAttribute('role') === 'tabpanel' && n.hidden) {
        var tab = document.querySelector('[role="tab"][aria-controls="' + n.id + '"]');
        if (tab) tab.click();
      }
    }
  }
  function initTabLinks() {
    // capture phase: runs before the default fragment scroll
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && a.hash.length > 1) revealTab(decodeURIComponent(a.hash.slice(1)));
    }, true);
    function fromHash() {
      if (location.hash.length < 2) return;
      var id = decodeURIComponent(location.hash.slice(1));
      var el = document.getElementById(id);
      if (!el || !el.closest('[role="tabpanel"][hidden]')) return;
      revealTab(id);
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  F.onReady(function () {
    initSwitchers();
    initScrollEdges();
    initThumbs();
    initTabLinks();
  });
})();
