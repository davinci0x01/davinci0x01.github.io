// main.js — 0xDaVinci site behaviour
// Theme, navigation, loader, article index (search + tags) and article enhancements.
(function () {
  'use strict';

  var root = document.documentElement.getAttribute('data-root') || '';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var POSTS = (window.DV && window.POSTS) ? DV.sortPosts(window.POSTS) : [];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  // ========== TOAST ========== //
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove(); resolve();
    });
  }
  window.DVUI = { toast: toast, copyText: copyText };

  // ========== THEME ========== //
  $$('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      store('dv-theme', next);
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f7f7f5' : '#050505');
    });
  });

  // ========== HEADER + NAV ========== //
  var header = $('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (progress) updateProgress();
  }
  var hamburger = $('#hamburger');
  var navLinks = $('#nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ========== REVEAL ========== //
  var revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { settle(entry.target); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
  // fade in, then drop the reveal classes so hover transitions are not delayed
  function settle(el) {
    el.classList.add('in');
    setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 1000 + (parseInt(el.style.transitionDelay, 10) || 0));
  }
  function reveal(els) {
    els.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
      if (revealObserver && !reduceMotion) revealObserver.observe(el); else settle(el);
    });
  }

  // ========== LOADER — system initialization ========== //
  function runLoader(done) {
    var loader = $('#loader');
    if (!loader) return done();
    var seen = false;
    try { seen = sessionStorage.getItem('dv-init') === '1'; sessionStorage.setItem('dv-init', '1'); } catch (e) { /* ignore */ }
    if (seen || reduceMotion) { loader.remove(); return done(); }
    document.documentElement.classList.add('booting');

    var pct = $('[data-loader-pct]', loader);
    var bar = $('.loader-bar span', loader);
    var images = POSTS.map(function (p) { return DV.assetUrl(p.cover, root); }).filter(Boolean);
    var loaded = 0;
    images.forEach(function (src) {
      var img = new Image();
      img.onload = img.onerror = function () { loaded++; };
      img.src = src;
    });
    var start = performance.now();
    var minTime = 1500;
    (function tick(now) {
      var t = Math.min(1, (now - start) / minTime);
      var assets = images.length ? loaded / images.length : 1;
      var p = Math.min(t, 0.85 + assets * 0.15);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(eased * 100);
      pct.textContent = String(value).padStart(3, '0');
      bar.style.transform = 'scaleX(' + eased + ')';
      if (p < 1 && now - start < 4000) return requestAnimationFrame(tick);
      pct.textContent = '100';
      bar.style.transform = 'scaleX(1)';
      setTimeout(function () {
        loader.classList.add('done');
        document.documentElement.classList.remove('booting');
        done();
        setTimeout(function () { loader.remove(); }, 800);
      }, 260);
    })(start);
  }

  // ========== ARTICLE INDEX ========== //
  // Arabic-aware normalization so "احمد" matches "أحمد"
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[ً-ٰٟ]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  }
  function initIndex() {
    var list = $('[data-posts]');
    if (!list) return;
    var search = $('[data-search]');
    var tagBox = $('[data-tags]');
    var count = $('[data-count]');
    var activeTag = '';

    $$('[data-stat="posts"]').forEach(function (el) { el.textContent = String(POSTS.length).padStart(2, '0'); });
    var allTags = [];
    POSTS.forEach(function (p) { (p.tags || []).forEach(function (t) { if (allTags.indexOf(t) === -1) allTags.push(t); }); });
    $$('[data-stat="topics"]').forEach(function (el) { el.textContent = String(allTags.length).padStart(2, '0'); });
    $$('[data-stat="latest"]').forEach(function (el) { if (POSTS[0]) el.textContent = DV.formatDate(POSTS[0].date).replace(/^\d+\s/, ''); });

    if (tagBox) {
      tagBox.innerHTML = ['<button type="button" class="chip" data-tag="" aria-pressed="true">الكل</button>']
        .concat(allTags.map(function (t) { return '<button type="button" class="chip" data-tag="' + DV.esc(t) + '" aria-pressed="false">#' + DV.esc(t) + '</button>'; }))
        .join('');
      tagBox.addEventListener('click', function (e) {
        var b = e.target.closest('[data-tag]');
        if (!b) return;
        activeTag = b.getAttribute('data-tag');
        $$('[data-tag]', tagBox).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        render(false);
      });
    }

    function render(animate) {
      var q = norm(search ? search.value.trim() : '');
      var filtered = POSTS.filter(function (p) {
        if (activeTag && (p.tags || []).indexOf(activeTag) === -1) return false;
        if (!q) return true;
        return norm([p.title, p.description, (p.tags || []).join(' ')].join(' ')).indexOf(q) !== -1;
      });
      var featured = !q && !activeTag;
      list.innerHTML = filtered.length
        ? filtered.map(function (p, i) { return DV.cardHtml(p, root, POSTS.indexOf(p), featured && i === 0); }).join('')
        : '<div class="empty">لا توجد نتائج لـ «' + DV.esc(search ? search.value : '') + '»</div>';
      if (count) count.textContent = filtered.length + ' من ' + POSTS.length;
      if (animate) $$('.card', list).forEach(function (c) { c.classList.add('reveal'); });
    }
    render(true);

    if (search) {
      search.addEventListener('input', function () { render(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === '/' && document.activeElement !== search && !/input|textarea|select/i.test(document.activeElement.tagName)) {
          e.preventDefault();
          search.focus();
        } else if (e.key === 'Escape' && document.activeElement === search) {
          search.value = '';
          render(false);
          search.blur();
        }
      });
    }
    return function () { reveal($$('.card', list)); };
  }

  // ========== ARTICLE ENHANCEMENTS ========== //
  var progress = $('.progress span');
  function updateProgress() {
    var article = $('.article');
    if (!article) return;
    var rect = article.getBoundingClientRect();
    var total = rect.height - window.innerHeight * 0.6;
    var p = Math.max(0, Math.min(1, -rect.top / (total > 0 ? total : 1)));
    progress.style.transform = 'scaleX(' + p + ')';
  }

  function enhanceProse(scope) {
    // heading anchors
    $$('.prose h2[id], .prose h3[id], .prose h4[id]', scope).forEach(function (h) {
      if ($('.h-anchor', h)) return;
      var a = document.createElement('a');
      a.className = 'h-anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-hidden', 'true');
      a.tabIndex = -1;
      a.textContent = '#';
      h.insertBefore(a, h.firstChild);
    });
    // syntax highlight
    if (window.hljs) {
      $$('pre code[class*="language-"]', scope).forEach(function (el) {
        if (el.dataset.highlighted) return;
        try { window.hljs.highlightElement(el); } catch (e) { /* unknown language */ }
      });
    }
  }

  // copy buttons (delegated: works for the editor preview too)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.code-copy');
    if (btn) {
      var fig = btn.closest('.code');
      var code = $('code', fig);
      var text = fig.classList.contains('code--term')
        ? $$('.tl-cmd .tl-text', fig).map(function (s) { return s.textContent; }).join('\n')
        : code.textContent;
      copyText(text).then(function () {
        btn.textContent = 'تم النسخ';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'نسخ'; btn.classList.remove('copied'); }, 1600);
      });
      return;
    }
    var link = e.target.closest('[data-copy-link]');
    if (link) copyText(location.href.split('#')[0]).then(function () { toast('تم نسخ الرابط'); });
  });

  function initArticle() {
    var article = $('.article');
    if (!article) return;
    enhanceProse(article);
    if (!window.hljs) {
      var hl = $('script[src*="highlight"]');
      if (hl) hl.addEventListener('load', function () { enhanceProse(article); });
    }

    // TOC active section
    var tocLinks = $$('.toc a');
    if (tocLinks.length && 'IntersectionObserver' in window) {
      var map = {};
      tocLinks.forEach(function (a) { map[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
      var visible = {};
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
        var heads = $$('.prose h2[id], .prose h3[id]');
        var current = null;
        for (var i = 0; i < heads.length; i++) {
          if (heads[i].getBoundingClientRect().top < window.innerHeight * 0.35) current = heads[i].id;
        }
        tocLinks.forEach(function (a) { a.classList.remove('active'); });
        if (current && map[current]) map[current].classList.add('active');
      }, { rootMargin: '0px 0px -60% 0px', threshold: [0, 1] });
      $$('.prose h2[id], .prose h3[id]').forEach(function (h) { obs.observe(h); });
    }

    // keep reading
    var more = $('[data-more]');
    var slug = document.body.getAttribute('data-slug');
    if (more && POSTS.length > 1) {
      var others = POSTS.filter(function (p) { return p.slug !== slug; }).slice(0, 2);
      $('.more-grid', more).innerHTML = others.map(function (p) { return DV.cardHtml(p, root, POSTS.indexOf(p), false); }).join('');
      more.hidden = false;
      reveal($$('.card', more));
    }
  }

  // ========== BOOT ========== //
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  var revealCards = initIndex();
  initArticle();
  runLoader(function () {
    document.body.classList.add('ready');
    if (revealCards) revealCards();
    reveal($$('[data-reveal]'));
  });

  window.DVUI.enhanceProse = enhanceProse;
})();
