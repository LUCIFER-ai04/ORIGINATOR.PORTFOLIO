/* ================================================================
   GYM HUSTLES — script.js
   Handles: Nav, Counters, Progress Bars, WhatsApp Booking
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Sticky Header Shadow ─────────────────────────────── */
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ── 2. Hamburger / Mobile Nav ───────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var mobNav    = document.getElementById('mob-nav');

  if (hamburger && mobNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close drawer when any link is tapped */
    mobNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    /* Close drawer on outside click */
    document.addEventListener('click', function (e) {
      if (mobNav.classList.contains('open') &&
          !mobNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 3. Active Nav Link Highlight ───────────────────────── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.classList.add('active');
    }
  });

  /* ── 4. Counter Animation (hero stats + metrics) ─────────── */
  var counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { countObs.observe(el); });
  }

  function animateCount(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800;
    var start    = null;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOut(progress) * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* ── 5. Skill Progress Bars ──────────────────────────────── */
  var skillBars = document.querySelectorAll('.skill-bar[data-width]');

  if (skillBars.length > 0 && 'IntersectionObserver' in window) {
    var barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width') + '%';
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(function (bar) { barObs.observe(bar); });
  }

  /* ── 6. Fade-in on Scroll ────────────────────────────────── */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) { fadeObs.observe(el); });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 7. WhatsApp Booking Form ───────────────────────────── */
  var form = document.getElementById('booking-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('f-name').value.trim();
      var age     = document.getElementById('f-age').value.trim();
      var weight  = document.getElementById('f-weight').value.trim();
      var goal    = document.getElementById('f-goal').value;
      var pkg     = document.getElementById('f-package').value;

      /* Basic validation */
      if (!name || !age || !weight || !goal || !pkg) {
        showFormError('Please fill in all fields before submitting.');
        return;
      }
      if (isNaN(age) || parseInt(age) < 10 || parseInt(age) > 100) {
        showFormError('Please enter a valid age between 10 and 100.');
        return;
      }
      if (isNaN(weight) || parseFloat(weight) < 20 || parseFloat(weight) > 300) {
        showFormError('Please enter a valid weight in kg.');
        return;
      }

      /* Build WhatsApp message */
      var message =
        '\uD83C\uDFCB\uFE0F *New Coaching Enquiry \u2014 Gym Hustles*\n\n' +
        '\uD83D\uDC64 *Name:* ' + name + '\n' +
        '\uD83C\uDF82 *Age:* ' + age + ' years\n' +
        '\u2696\uFE0F *Current Weight:* ' + weight + ' kg\n' +
        '\uD83C\uDFAF *Fitness Goal:* ' + goal + '\n' +
        '\uD83D\uDCE6 *Selected Package:* ' + pkg + '\n\n' +
        'I am ready to start my transformation! Please get in touch. \uD83D\uDCAA\n\n' +
        '\u2014 Sent via GymHustles.com';

      var encoded = encodeURIComponent(message);
      var url     = 'https://wa.me/919363508499?text=' + encoded;

      window.open(url, '_blank', 'noopener,noreferrer');

      /* Show success state */
      showFormSuccess();
    });
  }

  function showFormError(msg) {
    var el = document.getElementById('form-feedback');
    if (el) {
      el.textContent = msg;
      el.style.color = '#E01A2D';
      el.style.display = 'block';
      setTimeout(function () { el.style.display = 'none'; }, 4000);
    } else {
      alert(msg);
    }
  }

  function showFormSuccess() {
    var el = document.getElementById('form-feedback');
    if (el) {
      el.textContent = '\u2705 Details sent! WhatsApp is opening. We will get back to you shortly.';
      el.style.color = '#4CAF50';
      el.style.display = 'block';
    }
    var btn = document.querySelector('.form-submit');
    if (btn) {
      btn.textContent = 'Details Sent \u2713';
      btn.style.background = '#2d6a2d';
      setTimeout(function () {
        btn.textContent = 'Hire Me / Send Details';
        btn.style.background = '';
      }, 5000);
    }
  }

  /* ── 8. Add Review Modal ─────────────────────────────────── */
  var openReviewBtn  = document.getElementById('openReviewModal');
  var reviewOverlay  = document.getElementById('reviewModalOverlay');
  var closeReviewBtn = document.getElementById('closeReviewModal');
  var reviewForm     = document.getElementById('review-form');

  function openReviewModal() {
    reviewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeReviewModal() {
    reviewOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openReviewBtn && reviewOverlay) {
    openReviewBtn.addEventListener('click', openReviewModal);

    closeReviewBtn.addEventListener('click', closeReviewModal);

    reviewOverlay.addEventListener('click', function (e) {
      if (e.target === reviewOverlay) closeReviewModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && reviewOverlay.classList.contains('open')) {
        closeReviewModal();
      }
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name     = document.getElementById('r-name').value.trim();
      var location = document.getElementById('r-location').value.trim();
      var rating   = document.getElementById('r-rating').value;
      var text     = document.getElementById('r-text').value.trim();

      if (!name || !location || !rating || !text) {
        showReviewFeedback('Please fill in all fields before submitting.', false);
        return;
      }

      var ratingNum = parseInt(rating, 10);
      var stars = '\u2605'.repeat(ratingNum) + '\u2606'.repeat(5 - ratingNum);

      var message =
        '\u2B50 *New Review \u2014 Gym Hustles*\n\n' +
        '\uD83D\uDC64 *Name:* ' + name + '\n' +
        '\uD83D\uDCCD *Location:* ' + location + '\n' +
        '\u2B50 *Rating:* ' + stars + '\n\n' +
        '\uD83D\uDCAC *Review:*\n' + text + '\n\n' +
        '\u2014 Sent via GymHustles.com';

      var encoded = encodeURIComponent(message);
      var url     = 'https://wa.me/919363508499?text=' + encoded;

      window.open(url, '_blank', 'noopener,noreferrer');

      showReviewFeedback('\u2705 Thanks! Your review is on its way via WhatsApp.', true);

      setTimeout(function () {
        reviewForm.reset();
        closeReviewModal();
        var el = document.getElementById('review-form-feedback');
        if (el) el.style.display = 'none';
      }, 2200);
    });
  }

  function showReviewFeedback(msg, success) {
    var el = document.getElementById('review-form-feedback');
    if (el) {
      el.textContent = msg;
      el.style.color = success ? '#4CAF50' : '#E01A2D';
      el.style.display = 'block';
      if (!success) {
        setTimeout(function () { el.style.display = 'none'; }, 4000);
      }
    } else {
      alert(msg);
    }
  }

});
