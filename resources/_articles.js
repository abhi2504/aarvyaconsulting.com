/* Aarvya Resources — engagement & filtering
   Loaded only on /resources/* pages. */
(function () {
  'use strict';

  // Reading progress bar
  var fill = document.querySelector('.read-progress__fill');
  if (fill) {
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      fill.style.width = Math.min(100, Math.max(0, p)) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Checklist toggle (classic .checklist + the icon-based .doc-check)
  document.querySelectorAll('.checklist li, .doc-check li').forEach(function (li) {
    li.addEventListener('click', function () { li.classList.toggle('is-checked'); });
  });

  // Hub search + category filter
  var search = document.getElementById('hubSearch');
  var chips = document.querySelectorAll('[data-cat-chip]');
  var cards = document.querySelectorAll('[data-guide]');
  var noResults = document.querySelector('.no-results');
  var activeCat = 'all';
  var activeQuery = '';

  // Full-text content index — lazy-loaded the first time the user
  // intends to search. Lets the box match words inside the guide body,
  // not just the title & tags. If it fails to load, title/tag search
  // keeps working, so search is never broken by a missing index.
  var contentIndex = null;
  var indexState = 'idle'; // idle | loading | ready | failed

  function loadIndex() {
    if (indexState === 'loading' || indexState === 'ready') return;
    indexState = 'loading';
    fetch('search-index.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) { indexState = 'failed'; return; }
        contentIndex = {};
        data.forEach(function (item) {
          contentIndex[item.u] = (item.t + ' ' + item.x).toLowerCase();
        });
        indexState = 'ready';
        if (activeQuery) applyFilter(); // re-run now that content is searchable
      })
      .catch(function () { indexState = 'failed'; });
  }

  function matchesContent(card) {
    if (!contentIndex) return false;
    var txt = contentIndex[card.getAttribute('href') || ''];
    return !!txt && txt.indexOf(activeQuery) >= 0;
  }

  function applyFilter() {
    var shown = 0;
    cards.forEach(function (card) {
      var cat = (card.getAttribute('data-cat') || '').toLowerCase();
      var title = (card.getAttribute('data-title') || card.textContent || '').toLowerCase();
      var tags = (card.getAttribute('data-tags') || '').toLowerCase();
      var matchCat = activeCat === 'all' || cat === activeCat;
      var matchQ = !activeQuery
        || title.indexOf(activeQuery) >= 0
        || tags.indexOf(activeQuery) >= 0
        || matchesContent(card);
      if (matchCat && matchQ) { card.classList.remove('is-filtered-out'); shown++; }
      else { card.classList.add('is-filtered-out'); }
    });
    if (noResults) noResults.classList.toggle('is-visible', shown === 0);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      activeCat = chip.getAttribute('data-cat-chip').toLowerCase();
      applyFilter();
    });
  });

  if (search) {
    search.addEventListener('focus', loadIndex, { once: true });
    search.addEventListener('input', function () {
      activeQuery = search.value.trim().toLowerCase();
      if (activeQuery && indexState === 'idle') loadIndex();
      applyFilter();
    });
  }

  // Lazy-load Mermaid only if there's a mermaid block
  if (document.querySelector('pre.mermaid, code.mermaid, .mermaid')) {
    var s = document.createElement('script');
    s.type = 'module';
    s.textContent =
      "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';" +
      "mermaid.initialize({ startOnLoad: true, theme: 'base', " +
        "flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', padding: 14 }, " +
        "themeVariables: {" +
          "primaryColor: '#0a1f44', primaryTextColor: '#fff', primaryBorderColor: '#c9a961'," +
          "lineColor: '#5a6478', secondaryColor: '#c9a961', tertiaryColor: '#f8f9fb'," +
          "fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '17px'" +
        "}});";
    document.head.appendChild(s);
  }
})();
