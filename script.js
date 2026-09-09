document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Connect With Us form handling — submits to Formspree via AJAX
  var form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.className = 'form-status error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = 'Thank you — your message has been received. We will be in touch shortly.';
            status.className = 'form-status success';
            form.reset();
          } else {
            status.textContent = 'Something went wrong. Please try again or email us directly.';
            status.className = 'form-status error';
          }
        })
        .catch(function () {
          status.textContent = 'Something went wrong. Please try again or email us directly.';
          status.className = 'form-status error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
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
