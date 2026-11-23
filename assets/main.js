(function () {
  'use strict';

  var root = document.documentElement;

  // ---- theme toggle ----
  var toggle = document.querySelector('.theme-toggle');
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }

  function syncThemeColor() {
    var bg = getComputedStyle(document.body).backgroundColor;
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', bg);
      m.removeAttribute('media');
    });
  }

  function updateToggleLabel() {
    if (!toggle) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    toggle.setAttribute('title', 'Switch to ' + next + ' theme');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      updateToggleLabel();
      syncThemeColor();
    });
    updateToggleLabel();
  }
  if (darkQuery && darkQuery.addEventListener) {
    darkQuery.addEventListener('change', updateToggleLabel);
  }

  // ---- header border once scrolled ----
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- footer year ----
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  if (!('IntersectionObserver' in window)) return;

  // ---- highlight the nav link of the section in view ----
  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = links[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(links).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  // ---- grow the thesis chart bars when the chart scrolls into view ----
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chart = document.querySelector('.chart');
  if (reduce || !chart) return;
  root.classList.add('js');
  var chartObserver = new IntersectionObserver(function (entries) {
    if (entries.some(function (e) { return e.isIntersecting; })) {
      chart.classList.add('visible');
      chartObserver.disconnect();
    }
  }, { threshold: 0.2 });
  chartObserver.observe(chart);
})();
