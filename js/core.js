/*!
 * core.js — 0xDaVinci shared core
 * Markdown renderer + page templates.
 * Used by the site (cards), the local editor and tools/rebuild-posts.js (Node).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DV = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ========== SITE ========== //
  var SITE = {
    name: '0xDaVinci',
    url: 'https://davinci0x01.github.io/',
    tagline: 'No noise. Just signal.',
    social: [
      { name: 'GitHub', handle: 'DaVinci0x01', url: 'https://github.com/DaVinci0x01' },
      { name: 'X / Twitter', handle: '@DaVinci0x01', url: 'https://twitter.com/DaVinci0x01' },
      { name: 'YouTube', handle: '@davinci0x01', url: 'https://youtube.com/@davinci0x01' },
      { name: 'TikTok', handle: '@davinci0x01', url: 'https://tiktok.com/@davinci0x01' }
    ]
  };
  var MARK_VIEWBOX = '238 242 546 531';
  var MARK_PATH = 'M509.6 756.2C508.6 752.0 504.1 739.0 499.5 727.5C471.5 656.9 467.2 646.6 443.0 592.0C438.5 581.8 433.1 569.7 431.0 565.0C428.9 560.3 423.9 549.5 419.8 540.9L412.3 525.3L416.6 522.6C419.0 521.1 424.0 517.6 427.7 514.9C431.4 512.2 434.7 510.0 435.1 510.0C436.1 510.0 441.8 523.5 463.7 577.5C481.6 621.7 487.4 635.7 496.9 658.0C502.0 669.8 507.3 682.3 508.7 685.7L511.4 692.0L517.7 676.2C521.2 667.6 528.3 650.6 533.5 638.5C545.3 610.7 543.6 614.8 561.0 572.5C569.1 552.7 578.4 530.3 581.5 522.8L587.2 509.1L592.3 512.9C595.2 515.0 600.5 518.6 604.2 520.9L610.8 525.1L604.8 537.8C568.9 613.8 522.5 724.5 514.5 753.5C513.0 759.0 511.7 763.6 511.5 763.7C511.4 763.9 510.6 760.5 509.6 756.2ZM509.7 612.3C508.9 610.2 502.6 596.8 495.8 582.5C488.9 568.2 481.9 553.6 480.3 550.0C478.6 546.4 471.5 531.7 464.6 517.2C451.8 490.5 451.2 489.0 453.1 489.0C454.4 489.0 466.2 481.1 467.5 479.2C468.8 477.6 467.6 475.4 480.0 502.5C491.1 526.4 501.5 548.8 507.2 560.7L511.6 569.8L526.4 537.7C534.6 520.0 544.0 499.3 547.4 491.7C552.3 480.6 553.7 478.3 554.6 479.5C555.9 481.2 566.4 488.2 569.3 489.3C570.3 489.7 571.0 490.3 570.8 490.8C570.6 491.2 569.1 494.2 567.6 497.5C550.8 533.7 544.5 547.0 534.5 568.0C528.1 581.5 520.6 597.5 517.8 603.5C511.6 617.0 511.6 617.0 509.7 612.3ZM609.5 514.1C606.8 512.0 598.2 505.9 590.5 500.5C582.8 495.1 575.0 489.4 573.2 487.8C571.4 486.3 565.2 481.9 559.5 478.0C553.8 474.2 544.4 467.8 538.8 463.8C523.8 453.3 512.7 446.0 511.4 446.0C510.8 446.0 502.7 451.2 493.4 457.7C484.1 464.1 471.8 472.5 466.0 476.4C460.2 480.2 451.0 486.8 445.5 491.0C435.7 498.5 409.3 517.0 408.5 517.0C408.2 517.0 406.2 513.3 403.9 508.8L399.8 500.7L402.2 498.8C415.9 488.0 476.9 444.7 487.8 438.0C490.6 436.2 493.0 434.3 493.0 433.8C493.0 433.0 485.1 427.7 453.5 407.5C444.9 402.0 435.2 395.5 431.8 393.2C428.5 390.8 425.9 389.2 426.1 389.7C427.1 392.0 439.5 417.6 448.1 435.0L457.7 454.5L451.3 458.5C447.8 460.7 444.0 463.3 442.9 464.3L440.9 466.1L434.9 453.3C427.0 436.8 416.4 412.7 403.8 383.1C398.3 370.1 391.8 355.1 389.4 349.7C384.2 338.2 384.2 338.2 387.8 341.0C390.6 343.3 409.1 355.4 445.2 378.5C470.7 394.9 475.8 398.2 496.0 411.2C504.2 416.6 511.2 421.0 511.5 421.0C511.7 421.0 520.4 415.5 530.7 408.7C541.0 401.9 559.1 390.3 570.8 382.9C595.0 367.7 632.1 343.8 636.2 340.9C638.9 339.0 640.1 339.5 638.1 341.6C637.5 342.1 634.9 347.7 632.1 354.0C629.4 360.3 624.6 371.4 621.5 378.5C618.4 385.6 613.2 397.6 610.1 405.0C605.0 416.7 583.2 464.9 582.4 465.9C582.2 466.1 581.5 465.6 580.7 464.8C579.9 464.0 576.3 461.5 572.6 459.1C567.0 455.4 566.1 454.4 566.6 452.7C567.0 451.5 574.0 437.1 582.1 420.6C590.3 404.1 596.8 390.5 596.6 390.3C596.4 390.1 589.5 394.3 581.4 399.6C555.0 416.8 538.6 427.5 533.7 430.6L528.8 433.7L537.2 439.3C541.8 442.3 548.9 447.2 553.1 450.2C557.3 453.1 568.3 460.8 577.6 467.3C592.8 477.9 612.8 492.4 620.4 498.3L623.3 500.5L618.9 509.1L614.5 517.8L609.5 514.1ZM388.5 477.3C346.5 395.3 296.5 314.5 254.8 261.1C251.1 256.4 248.3 252.4 248.5 252.1C248.7 251.9 251.1 253.5 253.7 255.7C256.3 257.9 260.8 261.1 263.5 262.9C266.2 264.8 282.9 276.3 300.5 288.5C318.1 300.7 339.9 315.9 349.0 322.1L365.4 333.5L372.2 348.5C380.2 366.3 392.7 397.4 400.5 419.0C403.6 427.5 409.0 441.8 412.6 450.7C416.1 459.7 419.9 469.2 420.9 472.0L422.8 476.9L415.1 481.7C410.9 484.3 405.3 487.9 402.5 489.7C399.8 491.5 397.3 493.0 397.0 493.0C396.7 493.0 392.9 485.9 388.5 477.3ZM614.9 486.1C609.1 482.3 603.3 478.9 602.1 478.5C601.0 478.2 600.0 477.6 600.0 477.2C600.0 476.2 603.9 466.1 617.0 433.0C623.2 417.3 631.1 397.3 634.5 388.5C641.4 370.9 652.4 345.1 656.1 337.8L658.5 333.1L684.5 315.3C722.2 289.3 734.7 280.7 741.5 275.9C744.8 273.6 751.1 269.2 755.5 266.2C759.9 263.2 766.2 258.6 769.4 256.1C776.3 250.9 776.2 251.2 766.0 264.5C747.7 288.3 708.6 346.9 688.8 380.0C672.2 407.8 645.6 455.8 633.6 479.8C630.0 487.0 626.7 493.0 626.2 493.0C625.8 493.0 620.7 489.9 614.9 486.1Z';
  var FONTS = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
  var HLJS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ========== UTILS ========== //
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function stripTags(html) { return String(html).replace(/<[^>]*>/g, ''); }
  function safeUrl(u) {
    var s = String(u || '').trim();
    var flat = s.replace(/[\s\u0000-\u001f]/g, '').toLowerCase();
    if (/^(javascript|vbscript):/.test(flat)) return '#';
    if (/^data:/.test(flat) && !/^data:image\//.test(flat)) return '#';
    return s;
  }
  function isExternal(u) { return /^https?:\/\//i.test(u); }
  function hostOf(u) {
    var m = String(u).match(/^https?:\/\/(?:www\.)?([^\/?#:]+)/i);
    return m ? m[1] : String(u);
  }
  function headingId(text) {
    return String(text).toLowerCase()
      .replace(/&[a-z0-9#]+;/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim().replace(/\s+/g, '-').replace(/-+/g, '-') || 'section';
  }
  // ASCII-only slug for file names (blog/<slug>.html)
  function fileSlug(text) {
    return String(text || '').toLowerCase().normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .trim().replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64);
  }
  function formatDate(iso) {
    var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return MONTHS[+m[2] - 1] + ' ' + m[3] + ', ' + m[1];
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function wordCount(md) {
    var m = String(md || '').match(/[\p{L}\p{N}]+/gu);
    return m ? m.length : 0;
  }
  function readingTime(md) { return Math.max(1, Math.ceil(wordCount(md) / 180)); }

  // ========== INLINE ========== //
  function link(url, html, title) {
    var href = safeUrl(url);
    return '<a href="' + esc(href) + '"' +
      (title ? ' title="' + esc(title) + '"' : '') +
      (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '') +
      '>' + html + '</a>';
  }
  function resolve(url, ctx) {
    var r = ctx && ctx.resolveAsset ? ctx.resolveAsset(url) : null;
    return safeUrl(r || url);
  }
  // Emphasis on already-escaped text
  function fmt(s) {
    return s
      .replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>')
      .replace(/__(?=\S)([\s\S]*?\S)__/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*(?=\S)([^*]*?\S)\*(?![*\w])/g, '$1<em>$2</em>')
      .replace(/(^|[^_\p{L}\p{N}])_(?=\S)([^_]*?\S)_(?![_\p{L}\p{N}])/gu, '$1<em>$2</em>')
      .replace(/~~(?=\S)([\s\S]*?\S)~~/g, '<del>$1</del>')
      .replace(/==(?=\S)([\s\S]*?\S)==/g, '<mark>$1</mark>');
  }
  function inline(src, ctx) {
    var store = [];
    function hold(html) { store.push(html); return '\u0000' + (store.length - 1) + '\u0000'; }
    var s = String(src);
    // `code`
    s = s.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g, function (_, t, c) {
      return hold('<code>' + esc(c.trim()) + '</code>');
    });
    // \* escapes
    s = s.replace(/\\([\\`*_{}\[\]()#+\-.!~=|>])/g, function (_, ch) { return hold(esc(ch)); });
    // [[Ctrl+C]] -> keys
    s = s.replace(/\[\[([^\]\n]+)\]\]/g, function (_, k) {
      return hold('<span class="keys">' + k.split('+').map(function (x) {
        return '<kbd>' + esc(x.trim()) + '</kbd>';
      }).join('<i>+</i>') + '</span>');
    });
    // ![alt](src "title")
    s = s.replace(/!\[([^\]]*)\]\(\s*<?([^\s)>]+)>?(?:\s+"([^"]*)")?\s*\)/g, function (_, alt, url, title) {
      return hold('<img src="' + esc(resolve(url, ctx)) + '" alt="' + esc(alt) + '"' +
        (title ? ' title="' + esc(title) + '"' : '') + ' loading="lazy" decoding="async">');
    });
    // [text](url "title")
    s = s.replace(/\[([^\]]+)\]\(\s*<?([^\s)>]+)>?(?:\s+"([^"]*)")?\s*\)/g, function (_, text, url, title) {
      return hold(link(url, fmt(esc(text)), title));
    });
    // <https://...>
    s = s.replace(/<(https?:\/\/[^\s>]+)>/g, function (_, url) { return hold(link(url, esc(url))); });
    // bare URLs
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<]*[^\s<.,:;"')\]])/g, function (_, pre, url) {
      return pre + hold(link(url, esc(url)));
    });
    s = fmt(esc(s));
    for (var guard = 0; /\u0000\d+\u0000/.test(s) && guard < 8; guard++) {
      s = s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return store[+i]; });
    }
    return s;
  }

  // ========== BLOCKS ========== //
  var RE = {
    fence: /^(\s*)(`{3,}|~{3,})\s*([\w#+.-]*)\s*(.*)$/,
    container: /^\s*:::\s*([\w-]+)\s*(.*)$/,
    heading: /^(#{1,4})\s+(.+?)\s*#*\s*$/,
    hr: /^\s*([-*_])(?:\s*\1){2,}\s*$/,
    youtube: /^\s*!youtube\(\s*(.+?)\s*\)\s*$/i,
    image: /^\s*!\[([^\]]*)\]\(\s*<?([^\s)>]+)>?(?:\s+"([^"]*)")?\s*\)\s*$/,
    quote: /^\s*>/,
    list: /^(\s*)([-*+]|\d{1,3}[.)])\s+(.*)$/,
    html: /^\s*<\/?(div|section|details|summary|figure|iframe|table|p|ul|ol|blockquote|pre|aside|video|audio|center|hr|img|h[1-6]|nav|br)\b/i,
    tableSep: /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/
  };
  var CALLOUTS = { note: 'Note', info: 'Info', tip: 'Tip', warning: 'Warning', danger: 'Danger', success: 'Done' };
  var TERMINAL = { terminal: 1, term: 1, console: 1, 'shell-session': 1, shell: 1 };

  function indentOf(l) { return l.match(/^\s*/)[0].length; }
  function isTableStart(lines, i) {
    return lines[i].indexOf('|') !== -1 && i + 1 < lines.length && RE.tableSep.test(lines[i + 1]) && lines[i + 1].indexOf('-') !== -1;
  }
  function startsBlock(lines, i) {
    var l = lines[i];
    return RE.fence.test(l) && /^\s*(`{3,}|~{3,})/.test(l) || RE.container.test(l) || RE.heading.test(l) ||
      RE.hr.test(l) || RE.youtube.test(l) || RE.quote.test(l) || RE.list.test(l) || RE.html.test(l) || isTableStart(lines, i);
  }

  function codeBlock(code, lang, title) {
    lang = (lang || '').toLowerCase();
    var term = !!TERMINAL[lang];
    var label = term ? 'terminal' : (lang || 'text');
    var body;
    if (term) {
      body = code.split('\n').map(function (l) {
        var m = l.match(/^(\$|#|>|PS>|❯)\s?(.*)$/);
        if (m) return '<span class="tl tl-cmd"><span class="tl-prompt" aria-hidden="true">' + esc(m[1]) + '</span><span class="tl-text">' + esc(m[2]) + '</span></span>';
        return '<span class="tl tl-out">' + esc(l) + '</span>';
      }).join('\n');
    } else {
      body = esc(code);
    }
    return '<figure class="code' + (term ? ' code--term' : '') + '" dir="ltr">' +
      '<figcaption class="code-head"><span class="code-lang">' + esc(label) + '</span>' +
      (title ? '<span class="code-title">' + esc(title) + '</span>' : '') +
      '<button type="button" class="code-copy" aria-label="Copy code">copy</button></figcaption>' +
      '<pre><code class="' + (term || !lang || lang === 'text' ? 'nohighlight' : 'language-' + esc(lang)) + '">' + body + '</code></pre></figure>';
  }

  function linkGrid(arg, body) {
    var cards = body.map(function (l) { return l.replace(/^\s*[-*+]\s+/, '').trim(); }).filter(Boolean).map(function (l) {
      var title, url, desc = '';
      var m = l.match(/^\[([^\]]+)\]\(\s*([^\s)]+)\s*\)\s*(?:[—–:|-]+\s*(.*))?$/);
      if (m) { title = m[1]; url = m[2]; desc = m[3] || ''; }
      else {
        var parts = l.split('|').map(function (p) { return p.trim(); });
        var ui = parts.findIndex(function (p) { return /^https?:\/\//i.test(p); });
        if (ui === -1) return '';
        url = parts[ui];
        var rest = parts.filter(function (_, k) { return k !== ui; });
        title = rest[0] || hostOf(url);
        desc = rest.slice(1).join(' · ');
      }
      return '<a class="link-card" href="' + esc(safeUrl(url)) + '"' + (isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
        '<span class="link-card-host">' + esc(hostOf(url)) + '</span>' +
        '<span class="link-card-title">' + fmt(esc(title)) + '</span>' +
        (desc ? '<span class="link-card-desc">' + fmt(esc(desc)) + '</span>' : '') +
        '<span class="link-card-go" aria-hidden="true">↗</span></a>';
    });
    return '<div class="link-grid">' + (arg ? '<div class="link-grid-label">' + fmt(esc(arg)) + '</div>' : '') + cards.join('') + '</div>';
  }

  function container(kind, arg, body, ctx) {
    if (CALLOUTS[kind]) {
      return '<aside class="callout callout--' + kind + '"><div class="callout-label">' + (arg ? inline(arg, ctx) : CALLOUTS[kind]) +
        '</div><div class="callout-body">' + renderBlocks(body, ctx) + '</div></aside>';
    }
    if (kind === 'details' || kind === 'spoiler') {
      return '<details class="spoiler"><summary>' + (arg ? inline(arg, ctx) : 'Show') + '</summary><div class="spoiler-body">' +
        renderBlocks(body, ctx) + '</div></details>';
    }
    if (kind === 'links' || kind === 'resources') return linkGrid(arg, body);
    return '<div class="block block--' + esc(kind) + '">' + renderBlocks(body, ctx) + '</div>';
  }

  function youtubeId(u) {
    var m = String(u).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(u) ? u : null);
  }

  function splitRow(row) {
    return row.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(function (c) { return c.trim(); });
  }
  function table(rows, ctx) {
    var head = splitRow(rows[0]);
    var aligns = splitRow(rows[1]).map(function (c) {
      return /^:-+:$/.test(c) ? 'center' : /-:$/.test(c) ? 'end' : /^:-/.test(c) ? 'start' : '';
    });
    function cell(tag, c, k) {
      return '<' + tag + (aligns[k] ? ' style="text-align:' + aligns[k] + '"' : '') + '>' + inline(c, ctx) + '</' + tag + '>';
    }
    return '<div class="table-wrap"><table><thead><tr>' + head.map(function (c, k) { return cell('th', c, k); }).join('') +
      '</tr></thead><tbody>' + rows.slice(2).map(function (r) {
        return '<tr>' + splitRow(r).map(function (c, k) { return cell('td', c, k); }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  function parseList(lines, i, ctx) {
    var first = lines[i].match(RE.list);
    var base = first[1].length;
    var ordered = /\d/.test(first[2]);
    var start = ordered ? parseInt(first[2], 10) : 1;
    var items = [];
    while (i < lines.length) {
      var m = lines[i].match(RE.list);
      if (!m || m[1].length !== base || /\d/.test(m[2]) !== ordered) break;
      var item = [m[3]];
      var contentIndent = m[1].length + m[2].length + 1;
      i++;
      while (i < lines.length) {
        var l = lines[i];
        if (!l.trim()) {
          var j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && indentOf(lines[j]) > base) { item.push(''); i++; continue; }
          break;
        }
        if (indentOf(l) > base) { item.push(l.slice(Math.min(indentOf(l), contentIndent))); i++; continue; }
        if (!startsBlock(lines, i)) { item.push(l.trim()); i++; continue; }
        break;
      }
      items.push(item);
    }
    var html = items.map(function (item) {
      var inner = renderBlocks(item, ctx);
      var single = inner.match(/^<p>([\s\S]*)<\/p>$/);
      if (single && single[1].indexOf('<p>') === -1) inner = single[1];
      return '<li>' + inner + '</li>';
    }).join('');
    var tag = ordered ? 'ol' : 'ul';
    return { i: i, html: '<' + tag + (ordered && start !== 1 ? ' start="' + start + '"' : '') + '>' + html + '</' + tag + '>' };
  }

  function renderBlocks(lines, ctx) {
    var out = [];
    var i = 0, m;
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }

      if ((m = line.match(RE.fence)) && /^\s*(`{3,}|~{3,})/.test(line)) {
        var fence = m[2], ind = m[1].length, body = [];
        i++;
        while (i < lines.length && lines[i].trim().indexOf(fence) !== 0) {
          body.push(lines[i].slice(Math.min(ind, indentOf(lines[i]))));
          i++;
        }
        i++;
        out.push(codeBlock(body.join('\n'), m[3], m[4].trim()));
        continue;
      }
      if ((m = line.match(RE.container))) {
        var cbody = [], depth = 1;
        i++;
        while (i < lines.length) {
          var t = lines[i].trim();
          if (/^:::\s*[\w-]+/.test(t)) depth++;
          else if (t === ':::') { depth--; if (!depth) break; }
          cbody.push(lines[i]);
          i++;
        }
        i++;
        out.push(container(m[1].toLowerCase(), m[2].trim(), cbody, ctx));
        continue;
      }
      if ((m = line.match(RE.heading))) {
        var lvl = Math.max(2, m[1].length);
        var hh = inline(m[2], ctx);
        var id = headingId(stripTags(hh));
        if (ctx.ids[id]) id += '-' + (++ctx.ids[id]); else ctx.ids[id] = 1;
        if (lvl <= 3) ctx.headings.push({ level: lvl, id: id, text: stripTags(hh) });
        out.push('<h' + lvl + ' id="' + esc(id) + '">' + hh + '</h' + lvl + '>');
        i++;
        continue;
      }
      if (RE.hr.test(line)) { out.push('<hr>'); i++; continue; }
      if ((m = line.match(RE.youtube))) {
        var vid = youtubeId(m[1]);
        out.push(vid
          ? '<figure class="embed"><div class="embed-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + vid +
            '" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></figure>'
          : '<p>' + inline(m[1], ctx) + '</p>');
        i++;
        continue;
      }
      if ((m = line.match(RE.image))) {
        out.push('<figure class="figure"><img src="' + esc(resolve(m[2], ctx)) + '" alt="' + esc(m[1]) + '" loading="lazy" decoding="async">' +
          (m[3] ? '<figcaption>' + inline(m[3], ctx) + '</figcaption>' : '') + '</figure>');
        i++;
        continue;
      }
      if (RE.quote.test(line)) {
        var q = [];
        while (i < lines.length && RE.quote.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        out.push('<blockquote>' + renderBlocks(q, ctx) + '</blockquote>');
        continue;
      }
      if (isTableStart(lines, i)) {
        var rows = [];
        while (i < lines.length && lines[i].indexOf('|') !== -1 && lines[i].trim()) { rows.push(lines[i]); i++; }
        out.push(table(rows, ctx));
        continue;
      }
      if (RE.list.test(line)) {
        var res = parseList(lines, i, ctx);
        i = res.i;
        out.push(res.html);
        continue;
      }
      if (RE.html.test(line)) {
        var h = [];
        while (i < lines.length && lines[i].trim()) { h.push(lines[i]); i++; }
        out.push(h.join('\n'));
        continue;
      }
      var para = [];
      while (i < lines.length && lines[i].trim() && (para.length === 0 || !startsBlock(lines, i))) {
        para.push(lines[i].trim());
        i++;
      }
      out.push('<p>' + para.map(function (p) { return inline(p, ctx); }).join('<br>') + '</p>');
    }
    return out.join('\n');
  }

  function renderMarkdown(md, opts) {
    var ctx = { headings: [], ids: {}, resolveAsset: opts && opts.resolveAsset };
    var lines = String(md || '').replace(/\r\n?/g, '\n').replace(/\t/g, '    ').split('\n');
    return { html: renderBlocks(lines, ctx), headings: ctx.headings };
  }

  // ========== POSTS INDEX ========== //
  function normalizeMeta(meta, md) {
    meta = meta || {};
    var lang = meta.lang === 'en' ? 'en' : 'ar';
    var tags = Array.isArray(meta.tags) ? meta.tags : String(meta.tags || '').split(',');
    return {
      slug: fileSlug(meta.slug) || 'untitled',
      title: String(meta.title || 'Untitled').trim(),
      description: String(meta.description || '').trim(),
      date: /^\d{4}-\d{2}-\d{2}$/.test(meta.date || '') ? meta.date : today(),
      tags: tags.map(function (t) { return String(t).trim().replace(/^#/, ''); }).filter(Boolean),
      cover: String(meta.cover || '').trim(),
      lang: lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      readingTime: md != null ? readingTime(md) : (meta.readingTime || 1)
    };
  }
  function postEntry(meta, md) {
    var m = normalizeMeta(meta, md);
    return { slug: m.slug, title: m.title, description: m.description, date: m.date, tags: m.tags, cover: m.cover, lang: m.lang, readingTime: m.readingTime };
  }
  function sortPosts(posts) {
    return posts.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
  }
  function parsePostsFile(text) {
    var m = String(text).match(/\/\*POSTS:BEGIN\*\/([\s\S]*?)\/\*POSTS:END\*\//);
    if (!m) throw new Error('js/posts.js: POSTS markers not found');
    return JSON.parse(m[1]);
  }
  function postsFile(posts) {
    return '/*\n * posts.js — 0xDaVinci article index.\n' +
      ' * Managed by the local editor. Keep the JSON between the markers valid.\n */\n' +
      'window.POSTS = /*POSTS:BEGIN*/' + JSON.stringify(sortPosts(posts), null, 2) + '/*POSTS:END*/;\n';
  }

  // ========== TEMPLATES ========== //
  function assetUrl(path, root) {
    if (!path) return '';
    return /^(https?:|data:|blob:)/i.test(path) ? path : root + String(path).replace(/^(\.\.\/|\.\/|\/)+/, '');
  }
  function sprite() {
    return '<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false"><symbol id="dv-mark" viewBox="' + MARK_VIEWBOX +
      '"><path fill="currentColor" fill-rule="evenodd" d="' + MARK_PATH + '"/></symbol></svg>';
  }
  var ICON_THEME = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor"/></svg>';

  function headerHtml(root, active) {
    function a(href, label, key) {
      return '<li><a href="' + root + href + '"' + (active === key ? ' aria-current="page"' : '') + '>' + label + '</a></li>';
    }
    return '<header class="site-header" id="top">\n  <div class="wrap header-inner">\n' +
      '    <a class="brand" href="' + root + 'index.html" aria-label="0xDaVinci — home"><svg class="brand-mark" aria-hidden="true"><use href="#dv-mark"/></svg><span class="brand-name">0xDaVinci</span></a>\n' +
      '    <nav class="nav" aria-label="Main">\n      <ul class="nav-links" id="nav-links">' +
      a('index.html#articles', 'Articles', 'articles') + a('info.html', 'About', 'about') +
      '</ul>\n      <button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle light / dark">' + ICON_THEME + '</button>\n' +
      '      <button class="icon-btn hamburger" type="button" id="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>\n' +
      '    </nav>\n  </div>\n</header>';
  }
  function footerHtml(root) {
    return '<footer class="site-footer">\n  <div class="wrap footer-inner">\n' +
      '    <div class="footer-brand"><svg class="brand-mark" aria-hidden="true"><use href="#dv-mark"/></svg><div><strong>0xDaVinci</strong><span>' + SITE.tagline + '</span></div></div>\n' +
      '    <ul class="footer-links">' + SITE.social.map(function (s) {
        return '<li><a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.name + '</a></li>';
      }).join('') + '</ul>\n' +
      '    <div class="footer-meta">© <span data-year>' + new Date().getFullYear() + '</span> 0xDaVinci</div>\n' +
      '  </div>\n</footer>';
  }
  function themeInit() {
    return '<script>(function(){try{var t=localStorage.getItem("dv-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()</script>';
  }
  function headCommon(root) {
    return '<link rel="icon" type="image/x-icon" href="' + root + 'assets/favicon.ico">\n' +
      '<link rel="icon" type="image/png" sizes="32x32" href="' + root + 'assets/brand/icons/favicon-32x32.png">\n' +
      '<link rel="apple-touch-icon" href="' + root + 'assets/brand/icons/apple-touch-icon.png">\n' +
      '<link rel="manifest" href="' + root + 'assets/brand/icons/site.webmanifest">\n' +
      '<meta name="theme-color" content="#050505">\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="stylesheet" href="' + FONTS + '">\n' +
      '<link rel="stylesheet" href="' + root + 'css/style.css">\n' + themeInit();
  }

  function tagsHtml(tags) {
    return tags.map(function (t) { return '<span class="tag">#' + esc(t) + '</span>'; }).join('');
  }

  // Article header (shared by the page template and the editor preview)
  function articleHead(meta, root, opts) {
    var m = meta;
    var cover = opts && opts.cover != null ? opts.cover : assetUrl(m.cover, root);
    return '<header class="article-head">\n' +
      '  <a class="back-link" href="' + root + 'index.html#articles" dir="ltr"><span aria-hidden="true">←</span> all articles</a>\n' +
      (m.tags.length ? '  <div class="article-tags">' + tagsHtml(m.tags) + '</div>\n' : '') +
      '  <h1 class="article-title">' + esc(m.title) + '</h1>\n' +
      (m.description ? '  <p class="article-desc">' + esc(m.description) + '</p>\n' : '') +
      '  <div class="article-meta" dir="ltr"><time datetime="' + m.date + '">' + formatDate(m.date) + '</time><span>' + m.readingTime +
      ' min read</span><span>by 0xDaVinci</span></div>\n' +
      (cover ? '  <figure class="article-cover"><img src="' + esc(cover) + '" alt="" decoding="async"></figure>\n' : '') +
      '</header>';
  }
  function tocHtml(headings) {
    if (headings.length < 2) return '';
    return '<aside class="toc" aria-label="Contents"><div class="toc-inner"><div class="toc-label">contents</div><ol>' +
      headings.map(function (h) {
        return '<li class="toc-l' + h.level + '"><a href="#' + esc(h.id) + '">' + h.text + '</a></li>';
      }).join('') + '</ol></div></aside>';
  }

  function cardHtml(post, root, index, featured) {
    var p = normalizeMeta(post);
    var cover = assetUrl(p.cover, root);
    return '<a class="card' + (featured ? ' card--featured' : '') + '" href="' + root + 'blog/' + p.slug + '.html" data-slug="' + p.slug + '">' +
      '<div class="card-media">' + (cover ? '<img src="' + esc(cover) + '" alt="" loading="lazy" decoding="async">' : '<svg class="card-placeholder" aria-hidden="true"><use href="#dv-mark"/></svg>') +
      '<span class="card-index">' + String(index + 1).padStart(2, '0') + '</span></div>' +
      '<div class="card-body" lang="' + p.lang + '" dir="' + p.dir + '">' +
      (p.tags.length ? '<div class="card-tags">' + tagsHtml(p.tags) + '</div>' : '') +
      '<h3 class="card-title">' + esc(p.title) + '</h3>' +
      (p.description ? '<p class="card-desc">' + esc(p.description) + '</p>' : '') +
      '<div class="card-meta" dir="ltr"><time datetime="' + p.date + '">' + formatDate(p.date) + '</time><span>' + p.readingTime + ' min</span><span class="card-go" aria-hidden="true">→</span></div>' +
      '</div><i class="tick tick--tl"></i><i class="tick tick--tr"></i><i class="tick tick--bl"></i><i class="tick tick--br"></i></a>';
  }

  function jsonScript(obj) {
    return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/[\u2028\u2029]/g, function (c) { return '\\u' + c.charCodeAt(0).toString(16); });
  }

  function buildArticlePage(meta, md) {
    var m = normalizeMeta(meta, md);
    var r = renderMarkdown(md);
    var root = '../';
    var url = SITE.url + 'blog/' + m.slug + '.html';
    var image = m.cover ? (isExternal(m.cover) ? m.cover : SITE.url + m.cover.replace(/^(\.\.\/|\.\/|\/)+/, '')) : SITE.url + 'assets/brand/og.jpg';
    var title = m.title + ' | 0xDaVinci';
    var ld = {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: m.title, description: m.description, image: image, datePublished: m.date, inLanguage: m.lang,
      keywords: m.tags.join(', '), mainEntityOfPage: url,
      author: { '@type': 'Person', name: '0xDaVinci', url: SITE.url }
    };
    var share = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(m.title) + '&url=' + encodeURIComponent(url);
    return '<!DOCTYPE html>\n<html lang="' + m.lang + '" data-root="../">\n<head>\n' +
      '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(title) + '</title>\n' +
      '<meta name="description" content="' + esc(m.description) + '">\n' +
      (m.tags.length ? '<meta name="keywords" content="' + esc(m.tags.join(', ')) + '">\n' : '') +
      '<meta name="author" content="0xDaVinci">\n<link rel="canonical" href="' + url + '">\n' +
      '<meta property="og:type" content="article">\n<meta property="og:url" content="' + url + '">\n' +
      '<meta property="og:title" content="' + esc(m.title) + '">\n<meta property="og:description" content="' + esc(m.description) + '">\n' +
      '<meta property="og:image" content="' + esc(image) + '">\n<meta property="article:published_time" content="' + m.date + '">\n' +
      '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + esc(m.title) + '">\n' +
      '<meta name="twitter:description" content="' + esc(m.description) + '">\n<meta name="twitter:image" content="' + esc(image) + '">\n' +
      headCommon(root) + '\n' +
      '<script type="application/ld+json">' + jsonScript(ld) + '</script>\n' +
      '</head>\n<body class="page-article" data-slug="' + m.slug + '">\n' + sprite() + '\n' +
      '<a class="skip" href="#main">Skip to content</a>\n<div class="progress" aria-hidden="true"><span></span></div>\n' +
      headerHtml(root, 'articles') + '\n' +
      '<main id="main" class="article-main">\n<div class="wrap article-layout" dir="' + m.dir + '">\n' +
      '<article class="article" lang="' + m.lang + '" dir="' + m.dir + '">\n' + articleHead(m, root) + '\n' +
      '<div class="prose">\n' + r.html + '\n</div>\n' +
      '<footer class="article-foot" dir="ltr">' + (m.tags.length ? '<div class="article-tags">' + tagsHtml(m.tags) + '</div>' : '') +
      '<div class="article-actions"><button type="button" class="btn btn--ghost" data-copy-link>copy link</button>' +
      '<a class="btn btn--ghost" href="' + esc(share) + '" target="_blank" rel="noopener noreferrer">share on X</a>' +
      '<a class="btn btn--ghost" href="#top">↑ top</a></div></footer>\n' +
      '</article>\n' + tocHtml(r.headings) + '\n</div>\n' +
      '<section class="wrap more" data-more hidden><div class="section-head"><h2 class="section-title">Keep reading</h2></div><div class="more-grid"></div></section>\n' +
      '</main>\n' + footerHtml(root) + '\n' +
      '<script type="application/json" id="dv-source">' + jsonScript({ meta: postEntry(m, md), markdown: String(md) }) + '</script>\n' +
      '<script src="../js/posts.js"></script>\n<script src="../js/core.js"></script>\n<script src="../js/main.js"></script>\n' +
      '<script src="' + HLJS + '" defer></script>\n' +
      '</body>\n</html>\n';
  }

  return {
    SITE: SITE, HLJS: HLJS, MARK_PATH: MARK_PATH, MARK_VIEWBOX: MARK_VIEWBOX,
    esc: esc, fileSlug: fileSlug, formatDate: formatDate, today: today,
    wordCount: wordCount, readingTime: readingTime, youtubeId: youtubeId,
    renderMarkdown: renderMarkdown, normalizeMeta: normalizeMeta, postEntry: postEntry,
    sortPosts: sortPosts, parsePostsFile: parsePostsFile, postsFile: postsFile,
    assetUrl: assetUrl, sprite: sprite, headerHtml: headerHtml, footerHtml: footerHtml, headCommon: headCommon,
    articleHead: articleHead, tocHtml: tocHtml, cardHtml: cardHtml, buildArticlePage: buildArticlePage
  };
});
