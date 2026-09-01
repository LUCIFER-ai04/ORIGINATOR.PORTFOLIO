// Recipe Details Logic v2 — with Favourites + Recently Viewed tracking

let currentRecipe = null;
let servings = 2;
let synth = window.speechSynthesis;
let utterance = null;

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// -------------------------------------------------------
function loadRecipe() {
  const db = window.RECIPES_DB || [];
  currentRecipe = db.find(r => r.id === recipeId);

  if (!currentRecipe) {
    document.body.innerHTML = '<div style="padding:4rem;text-align:center;font-size:1.5rem;">🍽️ Recipe Not Found</div>';
    return;
  }

  // Track recently viewed
  trackRecentView(recipeId);

  const lang = localStorage.getItem('tw_lang') || 'en';
  const title = lang === 'ta' && currentRecipe.name_ta ? currentRecipe.name_ta : currentRecipe.name;

  // Header
  document.getElementById('r-header').style.backgroundImage = `url('${currentRecipe.image}')`;
  document.title = `TasteWorld – ${currentRecipe.name}`;
  document.getElementById('r-title').textContent = title;

  document.getElementById('r-meta').innerHTML = `
    <span>${currentRecipe.flag} ${currentRecipe.cuisine}</span>
    <span>⏱️ ${currentRecipe.prepTime}</span>
    <span>🔥 ${currentRecipe.difficulty}</span>
    <span>${currentRecipe.diet === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}</span>
    <span>⭐ ${currentRecipe.rating}</span>
  `;

  // Fav button state
  updateFavBtn();

  // Video
  renderVideo();

  // Steps
  const stepsList = document.getElementById('r-steps');
  stepsList.innerHTML = '';
  currentRecipe.steps.forEach((step, i) => {
    const li = document.createElement('li');
    const stepText = typeof step === 'object' ? step.instruction : step;
    const stepTitle = typeof step === 'object' ? `Step ${i+1}: ${step.title}` : `Step ${i+1}:`;
    li.innerHTML = `<span style="color:var(--primary-500);font-weight:700;">${stepTitle}</span> ${stepText}`;
    li.style.marginBottom = '0.85rem';
    li.style.lineHeight = '1.75';
    stepsList.appendChild(li);
  });

  renderIngredients();
  renderNutrition();
  renderBudget();
}

// -------------------------------------------------------
// Favourite heart button
// -------------------------------------------------------
function updateFavBtn() {
  const btn = document.getElementById('fav-btn');
  if (!btn) return;
  const isFav = typeof isFavourite === 'function' && isFavourite(recipeId);
  btn.textContent = isFav ? '❤️' : '🤍';
  btn.title = isFav ? 'Remove from favourites' : 'Add to favourites';
}

function handleFavToggle() {
  if (typeof toggleFavourite !== 'function') return;
  const added = toggleFavourite(recipeId);
  updateFavBtn();
  const msg = added ? '❤️ Added to favourites!' : '💔 Removed from favourites';
  if (typeof showToast === 'function') showToast(msg);
}
window.handleFavToggle = handleFavToggle;

// -------------------------------------------------------
// Recently Viewed tracker
// -------------------------------------------------------
function trackRecentView(id) {
  try {
    let list = JSON.parse(localStorage.getItem('tw_recents') || '[]');
    list = [id, ...list.filter(x => x !== id)].slice(0, 8);
    localStorage.setItem('tw_recents', JSON.stringify(list));
  } catch {}
}

// -------------------------------------------------------
// Video — thumbnail click-to-embed (works from file://)
// -------------------------------------------------------
function renderVideo() {
  const ytContainer = document.getElementById('video-container');
  const vid = currentRecipe.youtubeId;

  if (!vid) {
    ytContainer.innerHTML = `
      <div style="background:var(--input-bg);border-radius:0.85rem;padding:2.5rem;text-align:center;color:var(--text-gray);">
        <div style="font-size:2.5rem;">🎬</div>
        <p style="margin-top:0.5rem;">No video available for this recipe.</p>
      </div>`;
    return;
  }

  const thumbUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
  const ytUrl    = `https://www.youtube.com/watch?v=${vid}`;

  ytContainer.innerHTML = `
    <a href="${ytUrl}" target="_blank" rel="noopener" style="display:block;text-decoration:none;">
      <div id="yt-thumb" style="position:relative;border-radius:0.85rem;overflow:hidden;cursor:pointer;background:#000;aspect-ratio:16/9;box-shadow:var(--shadow-md);transition:transform 0.2s ease;">
        <img src="${thumbUrl}" alt="Video thumbnail"
          style="width:100%;height:100%;object-fit:cover;opacity:0.85;display:block;"
          onerror="this.style.display='none'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;">
          <div style="width:68px;height:68px;background:rgba(239,68,68,0.95);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,0.4);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <span style="color:white;font-weight:600;font-size:0.85rem;background:rgba(0,0,0,0.55);padding:0.3rem 0.85rem;border-radius:999px;">▶ Watch Setup on YouTube</span>
        </div>
      </div>
    </a>
  `;
}


// -------------------------------------------------------
// Ingredients (auto-scaled)
// -------------------------------------------------------
function renderIngredients() {
  const list = document.getElementById('r-ingredients');
  document.getElementById('r-servings').textContent = servings;
  list.innerHTML = '';
  currentRecipe.ingredients.forEach(item => {
    const li = document.createElement('li');
    const q  = (item.qty * servings).toFixed(item.qty % 1 !== 0 ? 1 : 0);
    li.innerHTML = `<span>${item.item}</span><strong>${q} ${item.unit}</strong>`;
    list.appendChild(li);
  });
}

function updateServings(change) {
  if (servings + change > 0 && servings + change <= 50) {
    servings += change;
    renderIngredients();
    renderNutrition();
    renderBudget();
  }
}

// -------------------------------------------------------
// Budget Idea - Cost Breakdown
// -------------------------------------------------------
function renderBudget() {
  const container = document.getElementById('r-budget-breakdown');
  const totalEl   = document.getElementById('r-total-price');
  if (!container || !totalEl) return;

  container.innerHTML = '';
  let total = 0;

  currentRecipe.ingredients.forEach(item => {
    const unitPrice = (window.INGREDIENT_PRICES && window.INGREDIENT_PRICES[item.item]) || 0.1;
    const itemCost = (unitPrice * item.qty * servings);
    total += itemCost;

    const div = document.createElement('div');
    div.style = "display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-gray);";
    div.innerHTML = `<span>${item.item}</span> <span>₹${itemCost.toFixed(2)}</span>`;
    container.appendChild(div);
  });

  totalEl.textContent = `₹${total.toFixed(2)}`;
}

// -------------------------------------------------------
// Nutrition Bars
// -------------------------------------------------------
function renderNutrition() {
  const container = document.getElementById('r-nutrition');
  container.innerHTML = '';
  const n = currentRecipe.nutrition;
  const stats = [
    { label: 'Calories',    val: n.calories, max: 1000, color: 'nut-calories' },
    { label: 'Protein (g)', val: n.protein,  max: 100,  color: 'nut-protein'  },
    { label: 'Iron (mg)',   val: n.iron,     max: 20,   color: 'nut-iron'     },
    { label: 'Calcium (mg)',val: n.calcium,  max: 1000, color: 'nut-calcium'  }
  ];
  stats.forEach(s => {
    const scaled = (s.val * servings).toFixed(0);
    const pct = Math.min((scaled / s.max) * 100, 100);
    container.innerHTML += `
      <div style="margin-bottom:0.75rem;font-size:0.9rem;">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.3rem;">
          <span>${s.label}</span><strong>${scaled}</strong>
        </div>
        <div class="nutrition-bar">
          <div class="nutrition-bar-inner ${s.color}" style="width:${pct}%"></div>
        </div>
      </div>`;
  });
}

// -------------------------------------------------------
// Speech Synthesis & Abhi Step-by-Step Cooking logic
// -------------------------------------------------------
let currentStepIndex = -1;
let cookingCheckinTimer = null;

function stopNarration()  { window.globalVoice?.synth?.cancel(); }
function pauseNarration() { stopNarration(); }
function playNarration()  { window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'start' } })); }

function resetCheckinTimer() {
  clearTimeout(cookingCheckinTimer);
  cookingCheckinTimer = setTimeout(() => {
    if (window.globalVoice) {
      window.globalVoice.speak(
        window.globalVoice.lang === 'ta-IN' 
        ? "எப்படி போகிறது? அடுத்த படிக்கு செல்லலாமா?" 
        : "How's it going? Need more time or should we move to the next step?"
      );
      window.globalVoice.wakeUp(); // wake mic up to listen for answer
    }
  }, 120000); // 2 minutes proactive check
}

window.addEventListener('abhi-cmd', (e) => {
  const detail = e.detail;
  const action = detail.action;
  
  if (!currentRecipe || !currentRecipe.steps) return;
  const maxStep = currentRecipe.steps.length - 1;

  switch (action) {
    case 'start':
      if (!lcmActive) startLiveCooking();
      currentStepIndex = 0;
      const startStep = currentRecipe.steps[0];
      const startNarration = typeof startStep === 'object' ? startStep.voice : startStep;
      window.globalVoice?.speak((window.globalVoice?.lang === 'ta-IN' ? "முதல் படி. " : "Let's begin. ") + startNarration, resetCheckinTimer);
      highlightStep(0);
      if (lcmActive) renderLiveStep(0);
      break;

    case 'next':
      if (currentStepIndex < maxStep) {
        currentStepIndex++;
        const nextStep = currentRecipe.steps[currentStepIndex];
        const nextNarration = typeof nextStep === 'object' ? nextStep.voice : nextStep;
        window.globalVoice?.speak((window.globalVoice?.lang === 'ta-IN' ? `படி ${currentStepIndex + 1}. ` : `Step ${currentStepIndex + 1}. `) + nextNarration, resetCheckinTimer);
        highlightStep(currentStepIndex);
        if (lcmActive) renderLiveStep(currentStepIndex);
      } else {
        window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? "சமையல் முடிந்தது! வாழ்த்துக்கள்!" : "That was the last step. Enjoy your meal!");
        clearTimeout(cookingCheckinTimer);
        if (lcmActive) showLcmComplete();
      }
      break;

    case 'prev':
      if (currentStepIndex > 0) {
        currentStepIndex--;
        window.globalVoice?.speak((window.globalVoice?.lang === 'ta-IN' ? `படி ${currentStepIndex + 1}. ` : `Going back to step ${currentStepIndex + 1}. `) + currentRecipe.steps[currentStepIndex], resetCheckinTimer);
        highlightStep(currentStepIndex);
        if (lcmActive) renderLiveStep(currentStepIndex);
      } else {
         window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? "நீங்கள் முதல் படியில் உள்ளீர்கள்." : "You are already at the first step.");
      }
      break;

    case 'goto':
      if (detail.step >= 0 && detail.step <= maxStep) {
        currentStepIndex = detail.step;
        window.globalVoice?.speak(`Step ${currentStepIndex + 1}. ` + currentRecipe.steps[currentStepIndex], resetCheckinTimer);
        highlightStep(currentStepIndex);
        if (lcmActive) renderLiveStep(currentStepIndex);
      } else {
         window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? "அந்த படி இல்லை." : "That step doesn't exist.");
      }
      break;

    case 'repeat':
      if (currentStepIndex >= 0 && currentStepIndex <= maxStep) {
        window.globalVoice?.speak("Repeating: " + currentRecipe.steps[currentStepIndex], resetCheckinTimer);
      } else {
        window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? "எந்த படியும் இல்லை" : "We haven't started cooking yet.");
      }
      break;

    case 'pause':
      clearTimeout(cookingCheckinTimer);
      window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? "நிறுத்தி வைத்துள்ளேன்" : "Cooking paused.");
      break;

    case 'exit':
      if (lcmActive) exitLiveCooking();
      window.globalVoice?.speak("Exiting cooking mode.");
      break;

    case 'timer-start':
      if (!lcmActive) {
         window.globalVoice?.speak(`I can only show the timer in Live Cooking Mode. Say 'Start Cooking Mode' first.`);
         return;
      }
      lcmTotalTime = detail.mins * 60;
      lcmTimeRemaining = lcmTotalTime;
      document.getElementById('lcm-timer-container').classList.remove('hidden');
      updateTimerUI();
      startLcmTimer();
      window.globalVoice?.speak(window.globalVoice?.lang === 'ta-IN' ? `${detail.mins} நிமிடம் நேரம் அமைக்கப்பட்டது.` : `Timer started for ${detail.mins} minutes.`);
      break;

    case 'timer-stop':
      stopLcmTimer();
      window.globalVoice?.speak("Timer stopped.");
      break;

    case 'timer-add':
      if (lcmTimerInterval || lcmTimeRemaining > 0) {
         lcmTimeRemaining += detail.mins * 60;
         lcmTotalTime += detail.mins * 60;
         updateTimerUI();
         window.globalVoice?.speak(`Added ${detail.mins} minutes to the timer.`);
      } else {
         window.globalVoice?.speak("There is no active timer to add time to.");
      }
      break;

    case 'explain':
      window.globalVoice?.speak("This means you should follow the instructions carefully to prepare the ingredients as stated before moving to the heat.");
      break;
    
    case 'ingredient':
      window.globalVoice?.speak("That ingredient is essential for the flavor profile. Make sure it's fresh for the best results.");
      break;

    case 'tips':
      window.globalVoice?.speak("Chef's tip: Always keep your heat moderate unless the recipe specifically asks for high heat to avoid burning.");
      break;

    case 'mistake':
      window.globalVoice?.speak("Don't panic! If it's too salty, add a splash of water or a squeeze of lemon. If it's burnt, transfer the unburnt part to a new pan immediately.");
      break;
  }
});

function highlightStep(idx) {
  const listItems = document.querySelectorAll('#r-steps li');
  listItems.forEach((li, i) => {
    li.style.background = i === idx ? 'var(--input-bg)' : 'transparent';
    li.style.borderRadius = '0.5rem';
    li.style.padding = i === idx ? '0.5rem' : '0';
  });
}

// =======================================================
// Live Cooking Mode (ULTRA PRO UI)
// =======================================================
let lcmActive = false;
let lcmTimerInterval = null;
let lcmTimeRemaining = 0;
let lcmTotalTime = 0;

const playBeep = (freq = 440, duration = 100, type = 'sine') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration / 1000);
    osc.stop(ctx.currentTime + duration / 1000);
  } catch(e){}
};

function playTimerEndSound() {
  playBeep(880, 200, 'sine');
  setTimeout(() => playBeep(880, 400, 'sine'), 300);
  setTimeout(() => playBeep(1046.50, 600, 'sine'), 800); // TADA!
}

function startLiveCooking() {
  lcmActive = true;
  document.getElementById('live-cooking-mode').classList.remove('hidden');
  document.getElementById('lcm-title').textContent = document.getElementById('r-title').textContent;
  
  // Initialize AR Engine
  if (window.AREngine) {
    window.AREngine.init();
    window.AREngine.simulateProactiveDetection((msg) => {
       if (window.globalVoice) window.globalVoice.speak(msg);
    });
  }

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(e => console.log(e));
  }
  
  if (currentStepIndex === -1) {
    playNarration(); // Starts step 0 and triggers abhi-cmd -> renderLiveStep
  } else {
    renderLiveStep(currentStepIndex);
  }
}

function exitLiveCooking() {
  lcmActive = false;
  document.getElementById('live-cooking-mode').classList.add('hidden');
  document.getElementById('lcm-complete-screen').classList.add('hidden');
  if (window.AREngine) window.AREngine.stop();
  stopLcmTimer();
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(e => console.log(e));
  }
}

function lcmNext() {
  window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'next' } }));
}

function lcmPrev() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    highlightStep(currentStepIndex);
    renderLiveStep(currentStepIndex);
  }
}

function renderLiveStep(idx) {
  const steps = currentRecipe.steps;
  if (idx < 0 || idx >= steps.length) return;
  
  // Update progress
  document.getElementById('lcm-progress-text').textContent = `Step ${idx + 1} / ${steps.length}`;
  const pct = ((idx + 1) / steps.length) * 100;
  document.getElementById('lcm-progress-fill').style.width = `${pct}%`;
  
  // Update content
  const step = steps[idx];
  const stepText = typeof step === 'object' ? step.instruction : step;
  const stepTitle = typeof step === 'object' ? step.title : `Cooking Step ${idx + 1}`;
  
  document.getElementById('lcm-step-text').textContent = stepText;
  
  // Set image (use main image for now, ideally step-specific images)
  document.getElementById('lcm-image').src = currentRecipe.image;
  
  // Timer detection
  detectAndShowTimer(step);
  
  // Sound effect for step transition
  playBeep(600, 100, 'triangle');

  // AR Trigger based on step content
  if (window.AREngine) {
    if (typeof step === 'object' && step.ar_overlay) {
      window.AREngine.trigger(step.ar_overlay.type, step.ar_overlay.target, step.ar_overlay.instruction);
    } else {
      const text = stepText.toLowerCase();
      if (text.includes('pour') || text.includes('add') || text.includes('put') || text.includes('mix')) {
        window.AREngine.trigger('arrow', 'Pan', 'Add ingredients');
      } else if (text.includes('heat') || text.includes('stove') || text.includes('flame') || text.includes('on')) {
        window.AREngine.trigger('highlight', 'Stove', 'Turn on');
      } else if (text.includes('stir') || text.includes('mix') || text.includes('sauté') || text.includes('fry')) {
        window.AREngine.trigger('animation', 'Pan', 'Stirring...');
      } else if (text.includes('marinate')) {
        window.AREngine.trigger('animation', 'Bowl', 'Marinating...');
      } else if (text.includes('layering') || text.includes('dum')) {
        window.AREngine.trigger('highlight', 'Pot', 'Sealing for Dum');
      } else {
        window.AREngine.trigger('text', 'Kitchen', 'Ready to cook');
      }
    }
  }
}

function detectAndShowTimer(step) {
  stopLcmTimer();
  const timerContainer = document.getElementById('lcm-timer-container');
  
  let mins = 0;
  if (typeof step === 'object' && step.timer) {
    mins = step.timer / 60;
  } else {
    const text = typeof step === 'object' ? step.instruction : step;
    const timerMatch = text.match(/(\d+)\s*(min|minute|minutes|mins)\b/i);
    if (timerMatch) mins = parseInt(timerMatch[1]);
  }
  
  if (mins > 0) {
    timerContainer.classList.remove('hidden');
    lcmTotalTime = mins * 60;
    lcmTimeRemaining = lcmTotalTime;
    updateTimerUI();
    document.getElementById('lcm-timer-btn').textContent = "Start Timer";
    document.getElementById('lcm-timer-btn').onclick = startLcmTimer;
  } else {
    timerContainer.classList.add('hidden');
  }
}

function updateTimerUI() {
  const m = Math.floor(lcmTimeRemaining / 60).toString().padStart(2, '0');
  const s = (lcmTimeRemaining % 60).toString().padStart(2, '0');
  document.getElementById('lcm-timer-text').textContent = `${m}:${s}`;
  
  const ring = document.getElementById('lcm-timer-ring');
  const dashoffset = 339.292 - (339.292 * (lcmTimeRemaining / lcmTotalTime));
  ring.style.strokeDashoffset = dashoffset;
}

function startLcmTimer() {
  if (lcmTimerInterval) return;
  document.getElementById('lcm-timer-btn').textContent = "Pause Timer";
  document.getElementById('lcm-timer-btn').onclick = pauseLcmTimer;
  
  lcmTimerInterval = setInterval(() => {
    lcmTimeRemaining--;
    updateTimerUI();
    
    if (lcmTimeRemaining <= 0) {
      stopLcmTimer();
      document.getElementById('lcm-timer-text').textContent = "00:00";
      playTimerEndSound();
      if (window.globalVoice) {
         window.globalVoice.speak(
           window.globalVoice.lang === 'ta-IN' ? "நேரம் முடிந்தது!" : "Time is up! Ready for the next step?"
         );
      }
    }
  }, 1000);
}

function pauseLcmTimer() {
  clearInterval(lcmTimerInterval);
  lcmTimerInterval = null;
  document.getElementById('lcm-timer-btn').textContent = "Resume Timer";
  document.getElementById('lcm-timer-btn').onclick = startLcmTimer;
}

function stopLcmTimer() {
  clearInterval(lcmTimerInterval);
  lcmTimerInterval = null;
}

function showLcmComplete() {
  document.getElementById('lcm-complete-screen').classList.remove('hidden');
  playTimerEndSound(); // Celebration sound
}

// -------------------------------------------------------
// Boot
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadRecipe();
});
