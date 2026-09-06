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
    { t: 'About', d: 'Mechatronics engineering, optimisation, efficient model design', u: 'index.html' },
    { t: 'Research', d: 'Publications and presentations', u: 'research.html' },
    { t: 'News', d: 'Recent updates', u: 'news.html' },
    { t: 'Volunteering', d: 'Female STEM advocacy across Nigeria', u: 'volunteering.html' },
    { t: 'Does Muon\u2019s Advantage Survive Fine-Tuning?', d: 'Workshop paper, OPT at NeurIPS', u: 'research.html' },
    { t: 'Benchmarking Classification Performance for Binary-Class Fault Detection', d: 'IndabaX Nigeria 2026, PMLR 319', u: 'research.html' },
    { t: 'A Lightweight Machine Learning Framework for Predictive Maintenance', d: 'SPE Nigeria Annual International Conference', u: 'research.html' },
    { t: 'Domain-Shift-Aware Parameter-Efficient Fine-Tuning for Malaria Detection', d: 'IEEE NigerCON 2026', u: 'research.html' },
    { t: 'Building Real-Time Voice Agents in Python', d: 'Short talk, PyCon Africa 2026', u: 'research.html' },
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
