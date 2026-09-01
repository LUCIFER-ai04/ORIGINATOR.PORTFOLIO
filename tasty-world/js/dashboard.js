// ============================================================
// TasteWorld — Shared Helpers (runs on ALL pages safely)
// ============================================================

// ---- FAVOURITES (shared globally) ----
function getFavourites() {
  try { return JSON.parse(localStorage.getItem('tw_favourites') || '[]'); } catch { return []; }
}
function isFavourite(id) { return getFavourites().includes(id); }
function toggleFavourite(id) {
  let favs = getFavourites();
  if (favs.includes(id)) favs = favs.filter(f => f !== id);
  else favs.push(id);
  localStorage.setItem('tw_favourites', JSON.stringify(favs));
  localStorage.setItem('tw_stat_saved', favs.length);
  return favs.includes(id);
}
window.getFavourites = getFavourites;
window.isFavourite = isFavourite;
window.toggleFavourite = toggleFavourite;

// ---- RECENTLY VIEWED (shared globally) ----
function getRecentlyViewed() {
  try { return JSON.parse(localStorage.getItem('tw_recents') || '[]'); } catch { return []; }
}
function addRecentlyViewed(id) {
  let list = getRecentlyViewed();
  list = [id, ...list.filter(x => x !== id)].slice(0, 8);
  localStorage.setItem('tw_recents', JSON.stringify(list));
}
window.addRecentlyViewed = addRecentlyViewed;

// ---- THEME (applies to every page) ----
function applyTheme() {
  const saved = localStorage.getItem('tw_theme');
  const prefer = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefer)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
applyTheme(); // run immediately before DOMContentLoaded to prevent flash

// ---- TOAST (shared globally) ----
function showToast(msg) {
  const ex = document.querySelector('.toast');
  if (ex) ex.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
window.showToast = showToast;

// ============================================================
// DASHBOARD-SPECIFIC — only runs when on dashboard.html
// ============================================================

const AVATAR_PRESETS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Ramu',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Bailey',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
];

let selectedAvatarUrl = '';
let currentStarRating = 0;

function initDashboard() {
  // GUARD: Only run when profile-avatar element exists (dashboard page)
  if (!document.getElementById('profile-avatar')) return;

  // Avatar
  const savedAvatar = localStorage.getItem('tw_avatar');
  const avatarEl = document.getElementById('profile-avatar');
  if (avatarEl) {
    avatarEl.src = savedAvatar || AVATAR_PRESETS[0];
    avatarEl.onerror = () => { avatarEl.src = AVATAR_PRESETS[0]; };
  }

  // Theme toggle
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    darkToggle.checked = localStorage.getItem('tw_theme') === 'dark';
  }

  // Name
  const name = localStorage.getItem('tw_name') || 'Guest Chef';
  setEl('profile-name', name);
  setEl('setting-name', name);

  // Bio
  const bio = localStorage.getItem('tw_bio') || '🌍 Exploring world cuisines';
  setEl('profile-sub', bio);
  setEl('setting-bio', bio);

  // Age
  setEl('setting-age', localStorage.getItem('tw_age') || '—');

  // Language
  const langSel = document.getElementById('dash-lang');
  if (langSel) langSel.value = localStorage.getItem('tw_lang') || 'en';

  // Toggles
  const notifT = document.getElementById('notif-toggle');
  const suggestT = document.getElementById('suggest-toggle');
  if (notifT) notifT.checked = localStorage.getItem('tw_notif') === 'true';
  if (suggestT) suggestT.checked = localStorage.getItem('tw_suggest') !== 'false';

  // Climate Mode Init
  const climMode = localStorage.getItem('tw_climate_mode') !== 'false';
  const climToggle = document.getElementById('climate-toggle');
  if (climToggle) {
    climToggle.checked = climMode;
    toggleClimateMode(climMode, false);
  }

  // Medicinal Mode Init
  const medMode = localStorage.getItem('tw_medicinal_mode') === 'true';
  const medToggle = document.getElementById('medicinal-toggle');
  if (medToggle) {
    medToggle.checked = medMode;
    toggleMedicinalMode(medMode, false);
  }

  const medCond = localStorage.getItem('tw_medicinal_condition') || 'fever';
  document.querySelectorAll('#medicinal-chips .diet-chip').forEach(chip => {
    if (chip.dataset.condition === medCond) chip.classList.add('active');
    else chip.classList.remove('active');
  });

  // Budget Init
  const savedBudget = localStorage.getItem('tw_budget') || 'all';
  const budChip = document.querySelector(`#budget-chips .diet-chip[data-budget="${savedBudget}"]`);
  if (budChip) {
    document.querySelectorAll('#budget-chips .diet-chip').forEach(c => c.classList.remove('active'));
    budChip.classList.add('active');
  }

  // Stats
  const saved = getFavourites().length;
  const cooked = parseInt(localStorage.getItem('tw_stat_cooked') || '0');
  const streak = computeStreak();
  const shared = parseInt(localStorage.getItem('tw_stat_shared') || '0');
  setEl('stat-saved', saved);
  setEl('stat-cooked', cooked);
  setEl('stat-streak', streak);
  setEl('stat-shared', shared);

  const favLabel = document.getElementById('fav-count-label');
  if (favLabel) favLabel.textContent = saved > 0 ? `${saved} saved` : '';

  // Diet chips
  const pref = localStorage.getItem('tw_diet') || 'all';
  document.querySelectorAll('#diet-chips .diet-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.diet === pref);
  });

  // Climate chips
  const climPref = localStorage.getItem('tw_climate') || 'summer';
  document.querySelectorAll('#climate-chips .diet-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.climate === climPref);
  });

  // Recently viewed
  renderRecentlyViewed();
}

// Safe element text setter
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ---- Recently Viewed (dashboard rendering) ----
function renderRecentlyViewed() {
  const container = document.getElementById('recent-recipes');
  if (!container) return;
  const recents = getRecentlyViewed();
  const db = window.RECIPES_DB || [];

  if (recents.length === 0) {
    container.innerHTML = '<div class="recent-empty">No recipes viewed yet. <a href="gallery.html" style="color:var(--primary-500);">Explore now →</a></div>';
    return;
  }
  container.innerHTML = '';
  recents.forEach(id => {
    const recipe = db.find(r => r.id === id);
    if (!recipe) return;
    const card = document.createElement('div');
    card.className = 'recent-card';
    card.onclick = () => { window.location.href = `recipe.html?id=${id}`; };
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" onerror="this.style.display='none'">
      <div class="recent-card-title">${recipe.name}</div>
    `;
    container.appendChild(card);
  });
}

// ---- Streak ----
function computeStreak() {
  const days = JSON.parse(localStorage.getItem('tw_cook_days') || '[]');
  if (!days.length) return 0;
  let streak = 0, cur = new Date();
  while (days.includes(cur.toDateString())) {
    streak++;
    cur.setDate(cur.getDate() - 1);
  }
  return streak;
}

function markCookedToday() {
  const today = new Date().toDateString();
  let days = JSON.parse(localStorage.getItem('tw_cook_days') || '[]');
  if (days.includes(today)) { showToast('✅ Already marked cooked today!'); return; }
  days.push(today);
  localStorage.setItem('tw_cook_days', JSON.stringify(days));
  const cooked = parseInt(localStorage.getItem('tw_stat_cooked') || '0') + 1;
  localStorage.setItem('tw_stat_cooked', cooked);
  setEl('stat-cooked', cooked);
  setEl('stat-streak', computeStreak());
  showToast('🍳 Great! Cooking streak updated! 🔥');
}

// ---- Diet / Climate ----
function selectDiet(el) {
  document.querySelectorAll('#diet-chips .diet-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  localStorage.setItem('tw_diet', el.dataset.diet);
  showToast(`Diet preference: ${el.textContent.trim()}`);
}

function selectClimateDash(el) {
  document.querySelectorAll('#climate-chips .diet-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  localStorage.setItem('tw_climate', el.dataset.climate);
  showToast(`Suggeting for: ${el.textContent.trim()}`);
}

function toggleClimateMode(active, showToastMsg = true) {
  localStorage.setItem('tw_climate_mode', active);
  const options = document.getElementById('climate-options');
  if (options) {
    options.style.opacity = active ? '1' : '0.5';
    options.style.pointerEvents = active ? 'auto' : 'none';
  }
  if (showToastMsg) {
    showToast(active ? 'Climate Suggestion Active ⛅' : 'Climate Suggestion Disabled');
  }
}

function toggleMedicinalMode(active, showToastMsg = true) {
  localStorage.setItem('tw_medicinal_mode', active);
  const options = document.getElementById('medicinal-options');
  if (options) {
    options.style.opacity = active ? '1' : '0.5';
    options.style.pointerEvents = active ? 'auto' : 'none';
  }
  if (showToastMsg) {
    showToast(active ? 'Medicinal Mode Active 🏥' : 'Medicinal Mode Disabled');
  }
}

function selectBudgetDash(el) {
  document.querySelectorAll('#budget-chips .diet-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  localStorage.setItem('tw_budget', el.dataset.budget);
  showToast(`Budget set to: ${el.textContent.trim()}`);
}

function selectCondition(el) {
  document.querySelectorAll('#medicinal-chips .diet-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  localStorage.setItem('tw_medicinal_condition', el.dataset.condition);
  showToast(`Condition: ${el.textContent.trim()}`);
}

function shareApp() {
  const shareData = {
    title: 'TasteWorld Recipes',
    text: 'Check out these 50+ delicious international recipes! 🌍🍱',
    url: window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/index.html')
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => showToast('Thanks for sharing! ❤️'))
      .catch((err) => console.log('Error sharing:', err));
  } else {
    // Fallback: Copy to clipboard
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = shareData.url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    showToast('Link copied to clipboard! 📋');
  }
}

// ---- Avatar Modal ----
function openAvatarModal() {
  const container = document.getElementById('avatar-options');
  if (!container) return;
  container.innerHTML = '';
  const savedAvatar = localStorage.getItem('tw_avatar');
  AVATAR_PRESETS.forEach(url => {
    const img = document.createElement('img');
    img.src = url; img.className = 'avatar-option'; img.alt = 'Avatar';
    if (url === savedAvatar) img.classList.add('selected');
    img.onclick = () => {
      document.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      selectedAvatarUrl = url;
    };
    container.appendChild(img);
  });
  openModal('avatar-modal');
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    selectedAvatarUrl = e.target.result;
    document.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
    showToast('📷 Photo loaded — press Save to confirm.');
  };
  reader.readAsDataURL(file);
}

function saveAvatar() {
  if (selectedAvatarUrl) {
    localStorage.setItem('tw_avatar', selectedAvatarUrl);
    const el = document.getElementById('profile-avatar');
    if (el) el.src = selectedAvatarUrl;
    showToast('✅ Profile photo updated!');
  }
  closeModal('avatar-modal');
}

// ---- Name ----
function openEditNameModal() {
  const inp = document.getElementById('edit-name-input');
  if (inp) inp.value = localStorage.getItem('tw_name') || '';
  openModal('name-modal');
}
function saveName() {
  const v = (document.getElementById('edit-name-input')?.value || '').trim();
  if (v) {
    localStorage.setItem('tw_name', v);
    setEl('profile-name', v); setEl('setting-name', v);
    showToast('✅ Name updated!');
  }
  closeModal('name-modal');
}

// ---- Bio ----
function openBioModal() {
  const inp = document.getElementById('edit-bio-input');
  if (inp) inp.value = localStorage.getItem('tw_bio') || '';
  openModal('bio-modal');
}
function saveBio() {
  const v = (document.getElementById('edit-bio-input')?.value || '').trim();
  const bio = v || '🌍 Exploring world cuisines';
  localStorage.setItem('tw_bio', bio);
  setEl('profile-sub', bio); setEl('setting-bio', bio);
  showToast('✅ Bio updated!');
  closeModal('bio-modal');
}

// ---- Theme toggle ----
function toggleThemeDash() {
  const isDark = document.getElementById('dark-toggle')?.checked;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('tw_theme', isDark ? 'dark' : 'light');
}

// ---- Language ----
function changeDashLang(val) {
  localStorage.setItem('tw_lang', val);
  showToast('🌐 Language saved!');
}

// ---- Notifications / Suggestions ----
function saveNotifPref() {
  const on = document.getElementById('notif-toggle')?.checked;
  localStorage.setItem('tw_notif', on);
  showToast(on ? '🔔 Notifications enabled' : '🔕 Notifications disabled');
}
function saveSuggestPref() {
  const on = document.getElementById('suggest-toggle')?.checked;
  localStorage.setItem('tw_suggest', on);
  showToast(on ? '🤖 Smart suggestions ON' : '🤖 Smart suggestions OFF');
}

// ---- Share ----
function shareApp() {
  const text = '🌍 Check out TasteWorld — recipes from around the world! 🍛🍕🍜';
  if (navigator.share) {
    navigator.share({ title: 'TasteWorld', text }).then(() => {
      const s = parseInt(localStorage.getItem('tw_stat_shared') || '0') + 1;
      localStorage.setItem('tw_stat_shared', s);
      setEl('stat-shared', s);
      showToast('Thanks for sharing! 🎉');
    }).catch(() => { });
  } else {
    navigator.clipboard?.writeText(text)
      .then(() => showToast('📋 Copied to clipboard!'))
      .catch(() => showToast('🔗 ' + window.location.href));
  }
}

// ---- Feedback ----
function showFeedbackModal() {
  currentStarRating = parseInt(localStorage.getItem('tw_rating') || '0');
  updateStars(currentStarRating);
  openModal('feedback-modal');
}
function rateStar(val) { currentStarRating = val; updateStars(val); }
function updateStars(val) {
  document.querySelectorAll('.star').forEach((s, i) => {
    s.textContent = i < val ? '★' : '☆';
    s.style.color = i < val ? '#f59e0b' : 'var(--text-gray)';
  });
}
function submitFeedback() {
  if (!currentStarRating) { showToast('Please tap a star first!'); return; }
  localStorage.setItem('tw_rating', currentStarRating);
  showToast(`⭐ Thanks for ${currentStarRating} star${currentStarRating > 1 ? 's' : ''}!`);
  closeModal('feedback-modal');
}

// ---- About ----
function showAbout() { openModal('about-modal'); }

// ---- Logout ----
function resetOnboarding() {
  if (!confirm('Reset all data and return to onboarding?')) return;
  ['tw_onboarded', 'tw_age', 'tw_name', 'tw_bio', 'tw_avatar', 'tw_lang', 'tw_theme',
    'tw_stat_saved', 'tw_stat_cooked', 'tw_stat_shared', 'tw_cook_days',
    'tw_favourites', 'tw_recents', 'tw_diet', 'tw_notif', 'tw_suggest', 'tw_rating']
    .forEach(k => localStorage.removeItem(k));
  window.location.href = 'index.html';
}

// ---- Modal helpers ----
function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }
function closeOnOverlay(e, id) { if (e.target === document.getElementById(id)) closeModal(id); }

// ---- BOOT: only initDashboard on the profile page ----
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('profile-avatar')) initDashboard();
});
