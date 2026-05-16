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

  // Checklist toggle
  document.querySelectorAll('.checklist li').forEach(function (li) {
    li.addEventListener('click', function () { li.classList.toggle('is-checked'); });
  });

  // Hub search + category filter
  var search = document.getElementById('hubSearch');
  var chips = document.querySelectorAll('[data-cat-chip]');
  var cards = document.querySelectorAll('[data-guide]');
  var noResults = document.querySelector('.no-results');
  var activeCat = 'all';
  var activeQuery = '';

  function applyFilter() {
    var shown = 0;
    cards.forEach(function (card) {
      var cat = (card.getAttribute('data-cat') || '').toLowerCase();
      var title = (card.getAttribute('data-title') || card.textContent || '').toLowerCase();
      var tags = (card.getAttribute('data-tags') || '').toLowerCase();
      var matchCat = activeCat === 'all' || cat === activeCat;
      var matchQ = !activeQuery || title.indexOf(activeQuery) >= 0 || tags.indexOf(activeQuery) >= 0;
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
    search.addEventListener('input', function () {
      activeQuery = search.value.trim().toLowerCase();
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
