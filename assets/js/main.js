/* ---------- Google Analytics 4 ---------- */
(function () {
  'use strict';
  var GA_ID = 'G-PWLM7321K5';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  // Custom event: WhatsApp CTA clicks (any wa.me / api.whatsapp.com link)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
      gtag('event', 'whatsapp_click', {
        link_url: href,
        link_text: (a.textContent || '').trim().slice(0, 80),
        page_path: location.pathname
      });
    }
  }, { passive: true });

  // Custom event: which calculator tab a visitor opened (calculators.html only)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.calc-tab');
    if (!btn) return;
    gtag('event', 'calc_used', {
      calc_name: btn.getAttribute('data-tab') || (btn.textContent || '').trim(),
      page_path: location.pathname
    });
  }, { passive: true });
})();

/* Aarvya Consulting — interactions
   Lightweight, no-framework, ~3KB minified */
(function () {
  'use strict';

  // ---------- Sticky header shadow ----------
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu ----------
  var toggle = document.querySelector('.nav__toggle');
  var panel  = document.querySelector('.mobile-panel');
  var close  = document.querySelector('.mobile-panel__close');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
    var closeMenu = function () {
      panel.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    if (close) close.addEventListener('click', closeMenu);
    panel.addEventListener('click', function (e) {
      if (e.target === panel) closeMenu();
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var isOpen = item.classList.contains('is-open');
      // close others in same group
      var group = q.closest('.faq');
      if (group) group.querySelectorAll('.faq__item').forEach(function (i) { i.classList.remove('is-open'); });
      if (!isOpen) item.classList.add('is-open');
    });
  });

  // ---------- Counter animation ----------
  var counted = false;
  var counterEls = document.querySelectorAll('[data-count]');
  function runCounters() {
    if (counted || !counterEls.length) return;
    counted = true;
    counterEls.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var dur = 1600;
      var start = performance.now();
      function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('en-IN');
      }
      requestAnimationFrame(tick);
    });
  }

  // ---------- IntersectionObserver: reveal + counter trigger ----------
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          if (en.target.classList.contains('counters')) runCounters();
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal, .counters').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    runCounters();
  }

  // ---------- Form submit (mailto fallback + WhatsApp option) ----------
  document.querySelectorAll('form[data-form="lead"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var service = (data.get('service') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();

      if (!name || !phone) {
        alert('Please share your name and mobile number so we can call you back.');
        return;
      }

      var waNumber = (form.getAttribute('data-wa') || '919999999999').replace(/\D/g, '');
      var waText = encodeURIComponent(
        'Hello Aarvya Consulting, I would like a consultation.' +
        '\n\nName: ' + name +
        '\nPhone: ' + phone +
        (email ? '\nEmail: ' + email : '') +
        (service ? '\nService: ' + service : '') +
        (message ? '\nMessage: ' + message : '')
      );
      // Open WhatsApp with prefilled message — primary path for instant response
      window.open('https://wa.me/' + waNumber + '?text=' + waText, '_blank', 'noopener');
      form.reset();
      var ok = form.querySelector('.form-success');
      if (ok) { ok.style.display = 'block'; setTimeout(function () { ok.style.display = 'none'; }, 6000); }
    });
  });

  // ---------- Active nav highlight ----------
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    if (a.getAttribute('data-nav') === path) a.classList.add('is-active');
  });

  // ---------- Year ----------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
