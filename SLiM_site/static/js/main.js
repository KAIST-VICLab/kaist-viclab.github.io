/* SLiM project page: links into tabbed content.
 * Vanilla JS, no dependencies. Runs after family.js (nav, hero, tabs, tables, lightbox, BibTeX),
 * whose helpers it takes from window.Family. A link (or the URL hash) that points into a hidden
 * tab panel first selects that panel's tab, so the target is visible when the page scrolls to it. */
(function () {
  'use strict';
  var F = window.Family;
  if (!F) return;

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

  F.onReady(function () {
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
  });
})();
