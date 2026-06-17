// ============================================================
// TasteWorld — app.js — Onboarding & Theme (index.html only)
// ============================================================

// Theme toggle (called by the button on index.html)
function toggleTheme() {
  const now = document.documentElement.getAttribute('data-theme');
  const next = now === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tw_theme', next);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// ---- Onboarding step logic ----
function advanceToStep(step) {
  const s1 = document.getElementById('step-1');
  const s2 = document.getElementById('step-2');
  const s3 = document.getElementById('step-3');
  if (s1) s1.classList.add('hidden');
  if (s2) s2.classList.add('hidden');
  if (s3) s3.classList.add('hidden');

  if (step === 1) s1.classList.remove('hidden');
  if (step === 2) s2.classList.remove('hidden');
  if (step === 3) s3.classList.remove('hidden');
}

function selectClimate(climate, el) {
  document.querySelectorAll('.climate-opt').forEach(opt => opt.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('selected-climate').value = climate;
  document.getElementById('finish-btn').disabled = false;
  localStorage.setItem('tw_climate', climate);
}

function validateStep1() {
  const email = document.getElementById('login-email').value;
  const phone = document.getElementById('login-phone').value;
  const dob   = document.getElementById('login-dob').value;
  const btn   = document.getElementById('step1-next-btn');

  const isValid = email.includes('@') && phone.length >= 8 && dob !== '';
  btn.disabled = !isValid;

  if (isValid) {
    localStorage.setItem('tw_user_email', email);
    localStorage.setItem('tw_user_phone', document.getElementById('login-country').value + ' ' + phone);
    localStorage.setItem('tw_user_dob', dob);
  }
}

function toggleContinueBtn() {
  const age = document.getElementById('age-select');
  const diet = document.getElementById('diet-select');
  const btn = document.getElementById('continue-btn');
  if (btn) {
    btn.disabled = !(age && age.value && diet && diet.value);
  }
}

function finishOnboarding() {
  const ageEl = document.getElementById('age-select');
  const climate = localStorage.getItem('tw_climate');
  if (!ageEl || !ageEl.value || !climate) return;
  
  localStorage.setItem('tw_age', ageEl.value);
  localStorage.setItem('tw_onboarded', 'true');
  window.location.href = 'gallery.html';
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  // Sync theme button icon
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';

  // Skip onboarding if already done
  const isIndex = window.location.pathname.replace(/\\/g, '/').split('/').pop() === 'index.html'
               || window.location.pathname.endsWith('/');
  if (isIndex && localStorage.getItem('tw_onboarded') === 'true') {
    window.location.href = 'gallery.html';
    return;
  }

  // Set language dropdown
  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.value = localStorage.getItem('tw_lang') || 'en';

  // Geolocation (non-critical)
  if (navigator.geolocation && document.getElementById('map-container')) {
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  }
});
