// M&M IPO Advisory — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Highlight active nav link
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === here) a.classList.add('active');
  });

  // Reveal-on-scroll: progressive enhancement only.
  // Elements are visible by default (CSS); JS hides them just before
  // observing so a crawler, print view, or JS failure never loses content.
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('pre-in'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.remove('pre-in');
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Client list "show more"
  var clientGrid = document.getElementById('clientGrid');
  var showMoreBtn = document.getElementById('showMoreClients');
  if (clientGrid && showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      clientGrid.classList.remove('collapsed');
      showMoreBtn.style.display = 'none';
    });
  }

  // Contact form -> mailto (static site, no backend; always goes to info@mehta-mehta.com)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.fullName.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      var body = [
        'Name: ' + name,
        'Email: ' + email,
        '',
        message
      ].join('\n');

      var mailto = 'mailto:info@mehta-mehta.com'
        + '?subject=' + encodeURIComponent('IPO Advisory Enquiry — ' + name)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      var success = document.getElementById('formSuccess');
      if (success) success.classList.add('show');
    });
  }

  // Footer year
  var yr = document.getElementById('yearNow');
  if (yr) yr.textContent = new Date().getFullYear();
});
