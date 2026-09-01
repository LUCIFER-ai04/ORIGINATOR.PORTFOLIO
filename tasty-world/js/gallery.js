// ============================================================
// TasteWorld — Gallery v3 (full card click, all bugs fixed)
// ============================================================

const gridContainer = document.getElementById('recipe-grid');
const searchInput   = document.getElementById('search-input');
let currentFilter   = { type: 'cuisine', value: 'all' };

// ============================================================
// RENDER GALLERY
// ============================================================
function renderGallery(filterParam, searchQuery) {
  filterParam  = filterParam  || currentFilter;
  searchQuery  = searchQuery  || '';
  gridContainer.innerHTML = '';

  let list = (window.RECIPES_DB || []).slice(); // copy

  // Cuisine / diet / meal filter
  if (filterParam.value !== 'all') {
    list = list.filter(r => {
      if (filterParam.type === 'cuisine') return r.cuisine.toLowerCase().includes(filterParam.value.toLowerCase());
      if (filterParam.type === 'diet')    return r.diet === filterParam.value;
      if (filterParam.type === 'meal')    return r.mealType === filterParam.value;
      return true;
    });
  }

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.name_ta && r.name_ta.includes(q)) ||
      r.cuisine.toLowerCase().includes(q)
    );
  }

  // Profile  // Diet filter (including medicinal mode)
  const dietPref = localStorage.getItem('tw_diet') || 'all';
  const medMode = localStorage.getItem('tw_medicinal_mode') === 'true';
  const medCond = localStorage.getItem('tw_medicinal_condition') || 'fever';

  if (medMode) {
    list = list.filter(r => r.suitableFor && r.suitableFor.includes(medCond));
  } else if (dietPref !== 'all') {
    list = list.filter(r => {
      if (dietPref === 'veg')        return r.diet === 'veg' || r.isVegan === true;
      if (dietPref === 'non-veg')    return r.diet === 'non-veg';
      if (dietPref === 'vegan')      return r.isVegan === true;
      if (dietPref === 'gluten-free') return r.isGlutenFree === true;
      if (dietPref === 'high-protein') return (r.nutrition && r.nutrition.protein > 20) || r.diet === 'high-protein';
      if (dietPref === 'high-calorie') return (r.nutrition && r.nutrition.calories > 400) || r.diet === 'high-calorie';
      if (dietPref === 'weight-loss')  return r.isWeightLoss === true || (r.nutrition && r.nutrition.calories < 300);
      return true;
    });
  }

  // Sort by climate match if not in medicinal mode AND climate mode is ON
  const climMode = localStorage.getItem('tw_climate_mode') !== 'false';
  if (!medMode && climMode) {
    const climatePref = localStorage.getItem('tw_climate') || '';
    list.sort((a, b) => {
      const matchA = a.climate === climatePref ? 0 : 1;
      const matchB = b.climate === climatePref ? 0 : 1;
      return matchA - matchB;
    });
    updateClimateBanner(climatePref);
  } else {
    const banner = document.getElementById('climate-banner');
    if (banner) banner.classList.add('hidden');
  }

  updateHealingBanner(medMode, medCond);

  // Budget Filter
  const budgetPref = localStorage.getItem('tw_budget') || 'all';
  if (budgetPref !== 'all') {
    list = list.filter(r => {
      const cost = parseFloat(window.getRecipeCost(r));
      if (budgetPref === 'low')    return cost < 200;
      if (budgetPref === 'medium') return cost >= 200 && cost < 600;
      if (budgetPref === 'high')   return cost >= 600;
      return true;
    });
  }

  // Empty state
  if (list.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results fade-in">
        <div style="font-size:3rem;margin-bottom:0.75rem;">🔍</div>
        <h3>No recipes found</h3>
        <p style="margin-top:0.4rem;font-size:0.875rem;color:var(--text-gray);">Try a different filter or search term.</p>
      </div>`;
    return;
  }

  const lang = localStorage.getItem('tw_lang') || 'en';
  const favs = getFavs();

  list.forEach((recipe, index) => {
    const title        = (lang === 'ta' && recipe.name_ta) ? recipe.name_ta : recipe.name;
    const isFav        = favs.includes(recipe.id);
    const isVeg        = recipe.diet === 'veg';
    const badgeClass   = isVeg ? 'badge-veg' : 'badge-nonveg';
    const dietLabel    = isVeg ? '● Veg' : '● Non-Veg';

    const card = document.createElement('div');
    card.className = 'recipe-card fade-in';
    card.style.animationDelay = `${Math.min(index * 0.04, 0.5)}s`;

    // ── ENTIRE card is the click target ──────────────────────
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `recipe.html?id=${recipe.id}`;
    });

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
          class="card-img"
          loading="lazy"
          onerror="this.onerror=null;this.style.display='none';this.insertAdjacentHTML('afterend','<div class=\\'img-fallback\\'>🍽️</div>')"
        >
        <div class="card-badge">⭐ ${recipe.rating}</div>
        <div class="card-diet-badge ${badgeClass}">${dietLabel}</div>
        <button
          class="card-fav-btn${isFav ? ' is-fav' : ''}"
          data-id="${recipe.id}"
          title="${isFav ? 'Remove from favourites' : 'Save to favourites'}"
          aria-label="Favourite"
        >${isFav ? '❤️' : '🤍'}</button>
      </div>
      <div class="card-content">
        <h3 class="card-title">${title}</h3>
        <div class="card-meta">
          <span>${recipe.flag} ${recipe.cuisine}</span>
          <span>⏱ ${recipe.prepTime}</span>
          <span style="color:var(--primary-500);font-weight:600;">💰 ₹${window.getRecipeCost(recipe)}</span>
        </div>
      </div>
    `;

    // Fav button — stop the card click from firing
    const favBtn = card.querySelector('.card-fav-btn');
    favBtn.addEventListener('click', e => {
      e.stopPropagation();          // prevent card navigation
      toggleCardFav(recipe.id, favBtn);
    });

    gridContainer.appendChild(card);
  });
}

// ============================================================
// FAVOURITES (local helper, uses shared getFavourites if exists)
// ============================================================
function getFavs() {
  try { return JSON.parse(localStorage.getItem('tw_favourites') || '[]'); } catch { return []; }
}

function toggleCardFav(id, btn) {
  let favs = getFavs();
  const adding = !favs.includes(id);
  if (adding) favs.push(id); else favs = favs.filter(f => f !== id);
  localStorage.setItem('tw_favourites', JSON.stringify(favs));
  localStorage.setItem('tw_stat_saved', favs.length);

  btn.textContent = adding ? '❤️' : '🤍';
  btn.classList.toggle('is-fav', adding);
  btn.title = adding ? 'Remove from favourites' : 'Save to favourites';

  showGalleryToast(adding ? '❤️ Saved to favourites!' : '💔 Removed from favourites');
}

function showGalleryToast(msg) {
  const ex = document.querySelector('.toast');
  if (ex) ex.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { if (t.parentNode) t.remove(); }, 2500);
}

// ============================================================
// FILTER CHIPS
// ============================================================
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentFilter = { type: chip.dataset.type, value: chip.dataset.filter };
    renderGallery();
  });
});

// Search
if (searchInput) {
  searchInput.addEventListener('input', () => renderGallery(null, searchInput.value));
}

// Profile avatar in header
function loadHeaderAvatar() {
  const saved = localStorage.getItem('tw_avatar');
  const el    = document.getElementById('header-avatar');
  if (!el) return;
  if (saved) {
    el.innerHTML = `<img src="${saved}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
  }
}

function updateClimateBanner(climate) {
  const banner = document.getElementById('climate-banner');
  const icon   = document.getElementById('climate-icon');
  const title  = document.getElementById('climate-title');
  const desc   = document.getElementById('climate-desc');
  if (!banner) return;

  banner.classList.remove('hidden');

  if (climate === 'summer') {
    icon.textContent = '☀️';
    title.textContent = 'Refreshing for Summer';
    desc.textContent = 'Cool down with light meals and hydrating drinks';
    banner.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(254,215,170,0.15))';
  } else if (climate === 'winter') {
    icon.textContent = '❄️';
    title.textContent = 'Warming for Winter';
    desc.textContent = 'Hearty meals and hot beverages to keep you cozy';
    banner.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(191,219,254,0.15))';
  } else if (climate === 'monsoon') {
    icon.textContent = '🌧️';
    title.textContent = 'Cozy for Monsoon';
    desc.textContent = 'Perfect spicy snacks and hot tea for the rain';
    banner.style.background = 'linear-gradient(135deg, rgba(13,148,136,0.15), rgba(153,246,228,0.15))';
  }
}

function updateHealingBanner(active, condition) {
  const banner = document.getElementById('health-banner');
  const icon   = document.getElementById('health-icon');
  const title  = document.getElementById('health-title');
  const desc   = document.getElementById('health-desc');
  if (!banner) return;

  if (!active) {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');
  
  if (condition === 'fever') {
    icon.textContent = '🌡️';
    title.textContent = 'Fever Mode Active';
    desc.textContent = 'Suggesting easy-to-digest, hydrating dishes for your recovery.';
  } else if (condition === 'cold') {
    icon.textContent = '🤧';
    title.textContent = 'Relief for Cold';
    desc.textContent = 'Warming spices and ginger-infused recipes to clear your mind.';
  } else if (condition === 'low-blood') {
    icon.textContent = '🩸';
    title.textContent = 'Anemia / Iron Boost';
    desc.textContent = 'Iron-rich greens and protein focused meals for vitality.';
  } else if (condition === 'bp') {
    icon.textContent = '💓';
    title.textContent = 'Blood Pressure Management';
    desc.textContent = 'Heart-healthy, low-sodium options for a balanced day.';
  }
}

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  loadHeaderAvatar();
});

// ============================================================
// AI SCANNER LOGIC
// ============================================================
function openAIScanner() {
  const modal = document.getElementById('ai-scanner-modal');
  if(!modal) return;
  modal.classList.remove('hidden');
  document.getElementById('scanner-img').classList.add('hidden');
  document.getElementById('scanner-img').src = '';
  document.getElementById('scanner-placeholder').classList.remove('hidden');
  document.getElementById('scanner-box').classList.remove('scanning');
  document.getElementById('ai-status').textContent = '';
  document.getElementById('ai-file-input').value = '';
}

function handleAIScan(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgEl = document.getElementById('scanner-img');
    const placeholder = document.getElementById('scanner-placeholder');
    const box = document.getElementById('scanner-box');
    const status = document.getElementById('ai-status');

    imgEl.src = e.target.result;
    imgEl.classList.remove('hidden');
    placeholder.classList.add('hidden');
    
    // Start scanning animation
    box.classList.add('scanning');
    status.textContent = 'Analyzing image...';

    // Simulate AI delay
    setTimeout(() => {
      status.textContent = 'Identifying ingredients...';
      setTimeout(() => {
        status.textContent = 'Matching recipes...';
        setTimeout(() => {
          // Finish scanning
          box.classList.remove('scanning');
          
          // Randomly pick an ingredient to simulate AI detection (guaranteeing a match)
          const sampleIngredients = ['Rice', 'Chicken', 'Tomatoes', 'Onions', 'Eggs', 'Potatoes'];
          const detected = sampleIngredients[Math.floor(Math.random() * sampleIngredients.length)];
          
          status.textContent = `Found: ${detected}!`;
          
          setTimeout(() => {
            closeModal('ai-scanner-modal');
            showGalleryToast(`✨ AI matched recipes for: ${detected}`);
            
            // Filter gallery by detected ingredients
            const gridContainer = document.getElementById('recipe-grid');
            gridContainer.innerHTML = '';
            
            const db = window.RECIPES_DB || [];
            const results = db.filter(r => {
              return r.ingredients.some(ing => ing.item.toLowerCase().includes(detected.toLowerCase()));
            });
            
            if (results.length > 0) {
              results.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card fade-in';
                const favs = getFavs();
                const isFav = favs.includes(recipe.id);
                card.innerHTML = `
                  <div class="card-img-wrapper">
                    <img src="${recipe.image}" alt="${recipe.name}" class="card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div class="img-fallback hidden">🍲</div>
                    <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-id="${recipe.id}" title="${isFav ? 'Remove' : 'Save'}">${isFav ? '❤️' : '🤍'}</button>
                  </div>
                  <div class="card-content">
                    <div class="card-title">${recipe.name}</div>
                    <div class="card-meta">
                      <span>${recipe.prepTime}</span>
                      <span>✨ AI Match</span>
                    </div>
                  </div>
                `;
                card.addEventListener('click', () => { window.location.href = 'recipe.html?id=' + recipe.id; });
                const favBtn = card.querySelector('.card-fav-btn');
                favBtn.addEventListener('click', (ev) => {
                  ev.stopPropagation();
                  toggleCardFav(recipe.id, favBtn);
                });
                gridContainer.appendChild(card);
              });
            } else {
              gridContainer.innerHTML = `<div class="no-results"><h3>No exact matches found</h3><p>Try capturing another ingredient!</p></div>`;
            }
            
            // Reset chip active states
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          }, 1500);

        }, 1200);
      }, 1200);
    }, 1000);
  };
  reader.readAsDataURL(file);
}
