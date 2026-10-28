/* Photo galleries -------------------------------------------------- */
document.querySelectorAll('.gallery').forEach(function (gallery) {
  var slides = Array.prototype.slice.call(gallery.querySelectorAll('img'));
  if (!slides.length) return;

  var counter = gallery.querySelector('.count');
  var index = 0;

  function load(i) {
    var img = slides[i];
    if (img && img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
  }

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (img, n) { img.classList.toggle('on', n === index); });
    load(index);
    load((index + 1) % slides.length);
    load((index - 1 + slides.length) % slides.length);
    if (counter) counter.textContent = (index + 1) + ' / ' + slides.length;
  }

  var prev = gallery.querySelector('.prev');
  var next = gallery.querySelector('.next');
  if (prev) prev.addEventListener('click', function () { show(index - 1); });
  if (next) next.addEventListener('click', function () { show(index + 1); });

  gallery.setAttribute('tabindex', '0');
  gallery.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { show(index - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { show(index + 1); e.preventDefault(); }
  });

  var startX = null;
  gallery.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(dx < 0 ? index + 1 : index - 1);
    startX = null;
  });

  if (slides.length < 2) {
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    if (counter) counter.hidden = true;
  }

  show(0);
});

/* Search (ctrl + k) ------------------------------------------------- */
(function () {
  var INDEX = [
    { t: 'Home', d: 'Glory K. Bagai \u2014 research and volunteering', u: 'index.html' },
    { t: 'About', d: 'Mechatronics engineering, optimisation, efficient model design', u: 'about.html' },
    { t: 'Research', d: 'Research statement: theory and efficiency', u: 'research.html' },
    { t: 'Publications', d: 'Conference, workshop and preprint papers', u: 'publications.html' },
    { t: 'Presentations', d: 'Talks, posters and orals', u: 'presentations.html' },
    { t: 'News', d: 'Recent updates', u: 'news.html' },
    { t: 'Volunteering', d: 'Female STEM advocacy across Nigeria', u: 'volunteering.html' },
    { t: 'Does Muon\u2019s Advantage Survive Fine-Tuning?', d: 'Workshop paper, OPT at NeurIPS', u: 'publications.html' },
    { t: 'Benchmarking Classification Performance for Binary-Class Fault Detection', d: 'IndabaX Nigeria 2026, PMLR 319', u: 'publications.html' },
    { t: 'A Lightweight Machine Learning Framework for Predictive Maintenance', d: 'SPE Nigeria Annual International Conference', u: 'publications.html' },
    { t: 'Domain-Shift-Aware Parameter-Efficient Fine-Tuning for Malaria Detection', d: 'IEEE NigerCON 2026', u: 'publications.html' },
    { t: 'Building Real-Time Voice Agents in Python', d: 'Short talk, PyCon Africa 2026', u: 'presentations.html' },
    { t: 'FUTMinna MATLAB Space', d: 'Community Lead, 2024\u20132026', u: 'volunteering.html#matlab' },
    { t: 'Technovation Girls', d: 'Student Ambassador and Mentor', u: 'volunteering.html#technovation' },
    { t: 'IEEE Student Branch \u2014 FUTMinna', d: 'TryEngineering, Summer With Her', u: 'volunteering.html#ieee' },
    { t: 'WAAW Foundation', d: 'Community Outreach Lead, FUTMinna chapter', u: 'volunteering.html#waaw' },
    { t: 'Enactus FUTMinna', d: 'Project Manager, Schneider Battery Challenge', u: 'volunteering.html#enactus' },
    { t: 'SPE FUTMinna Student Chapter', d: 'ChangeMakers, World Environment Day', u: 'volunteering.html#spe' }
  ];

  var back = document.querySelector('.search-back');
  if (!back) return;
  var input = back.querySelector('input');
  var list = back.querySelector('.search-results');

  function render(q) {
    var query = q.trim().toLowerCase();
    var hits = query
      ? INDEX.filter(function (r) { return (r.t + ' ' + r.d).toLowerCase().indexOf(query) > -1; })
      : INDEX.slice(0, 4);
    list.innerHTML = hits.length
      ? hits.map(function (r) {
          return '<li><a href="' + r.u + '">' + r.t + '<small>' + r.d + '</small></a></li>';
        }).join('')
      : '<li class="search-empty">No matches.</li>';
  }

  function open() {
    back.setAttribute('open-modal', '');
    render('');
    input.value = '';
    input.focus();
  }

  function close() { back.removeAttribute('open-modal'); }

  document.querySelectorAll('.search-open').forEach(function (b) {
    b.addEventListener('click', open);
  });

  input.addEventListener('input', function () { render(input.value); });

  back.addEventListener('click', function (e) { if (e.target === back) close(); });

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });

  list.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();

/* Cursor: dot that tracks, ring that eases behind ----------------- */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || still) return;

  var dot = document.createElement('div');
  var ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    document.body.classList.add('cursor-on');
  });

  document.addEventListener('mouseleave', function () {
    document.body.classList.remove('cursor-on');
  });

  function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  var HOT = 'a, button, input, .gallery, summary, [role="button"]';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(HOT)) ring.classList.add('hot');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(HOT)) ring.classList.remove('hot');
  });
})();

/* Theme toggle ----------------------------------------------------- */
(function () {
  var root = document.documentElement;
  function set(mode) {
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch (e) {}
  }
  document.querySelectorAll('.theme-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      set(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });
})();

/* Cursor field: drifting points linked by lines near the pointer --- */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || still) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'cursor-field';
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext('2d');

  var w, h, dpr, pts = [];
  var mouse = { x: -9999, y: -9999 };
  var REACH = 165;

  function ink() {
    var css = getComputedStyle(document.documentElement);
    return (css.getPropertyValue('--accent') || '#2a3f7a').trim();
  }
  var stroke = ink();

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [42, 63, 122];
  }
  var rgb = hexToRgb(stroke);

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = Math.round(Math.min(90, (w * h) / 17000));
    pts = [];
    for (var i = 0; i < target; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    var i, j, a, b, dx, dy, d;

    for (i = 0; i < pts.length; i++) {
      a = pts[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;

      dx = a.x - mouse.x;
      dy = a.y - mouse.y;
      d = Math.sqrt(dx * dx + dy * dy);
      if (d < REACH) {
        var near = 1 - d / REACH;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(a.x, a.y);
        ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (near * 0.4) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (near * 0.55) + ')';
        ctx.fill();

        for (j = i + 1; j < pts.length; j++) {
          b = pts[j];
          var bx = b.x - a.x, by = b.y - a.y;
          var bd = Math.sqrt(bx * bx + by * by);
          if (bd < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' +
                              (near * (1 - bd / 110) * 0.28) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', size);
  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', function () {
    mouse.x = mouse.y = -9999;
  });
  document.querySelectorAll('.theme-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      setTimeout(function () { rgb = hexToRgb(ink()); }, 30);
    });
  });

  size();
  requestAnimationFrame(frame);
})();
