document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Connect With Us form handling (placeholder — wire up to a backend or Formspree later)
  var form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.querySelector('.form-status');
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.className = 'form-status error';
        return;
      }

      // TODO: replace with real submission endpoint
      status.textContent = 'Thank you — your message has been received. We will be in touch shortly.';
      status.className = 'form-status success';
      form.reset();
    });
  }

  // Bar Council of India mandatory disclaimer gate — shown once per browser session
  var overlay = document.querySelector('.disclaimer-overlay');
  if (overlay) {
    if (sessionStorage.getItem('mm_disclaimer_agreed') === 'true') {
      overlay.remove();
    } else {
      document.body.classList.add('disclaimer-pending');
      var agreeBtn = overlay.querySelector('.btn-agree');
      var disagreeBtn = overlay.querySelector('.btn-disagree');

      agreeBtn.addEventListener('click', function () {
        try {
          sessionStorage.setItem('mm_disclaimer_agreed', 'true');
        } catch (err) { /* sessionStorage unavailable — continue anyway */ }
        document.body.classList.remove('disclaimer-pending');
        overlay.remove();
      });

      disagreeBtn.addEventListener('click', function () {
        window.location.href = 'https://www.barcouncilofindia.org/';
      });
    }
  }
});
