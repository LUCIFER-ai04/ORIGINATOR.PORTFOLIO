// ============================================================
// HEY ABHI - ADVANCED AI VOICE ASSISTANT
// ============================================================

window.globalVoice = {
  recognition: null,
  synth: window.speechSynthesis,
  isListening: false,
  isAwake: false,
  awakeTimeout: null,
  lang: 'en-US',
  uiOverlay: null,
  uiTranscript: null,
  uiOrb: null,
  manualStop: true, // Default to stopped until toggled or loaded from storage
  pendingAction: null, // For confirmation logic
  
  // AI Intent Mapping
  INTENTS: {
    START_COOKING: {
      keywords: ['start', 'cooking', 'cook', 'begin', 'open live', 'podu', 'சமைக்க', 'தொடங்கு'],
      score: 0
    },
    NEXT_STEP: {
      keywords: ['next', 'forward', 'aduthu', 'அடுத்து', 'அடுத்தது'],
      score: 0
    },
    PREV_STEP: {
      keywords: ['previous', 'back', 'go back', 'munthaiya', 'முந்தைய'],
      score: 0
    },
    NAV_HOME: {
      keywords: ['home', 'gallery', 'main', 'mukappu', 'முகப்பு', 'கேலரி'],
      score: 0
    },
    NAV_PROFILE: {
      keywords: ['profile', 'dashboard', 'settings', 'account', 'suya vivaram', 'சுயவிவரம்'],
      score: 0
    },
    NAV_SAVED: {
      keywords: ['saved', 'favourites', 'favorites', 'liked', 'bookmarks', 'pidithavaai', 'பிடித்தவை'],
      score: 0
    },
    SEARCH: {
      keywords: ['search', 'find', 'show', 'thedu', 'தேடு', 'காட்டு', 'venum'],
      score: 0
    },
    EXIT: {
      keywords: ['exit', 'stop', 'quit', 'close', 'niru thavaai', 'நிறுத்து', 'வெளியேறு'],
      score: 0
    },
    REPEAT: {
      keywords: ['repeat', 'again', 'meendum', 'மீண்டும்', 'திரும்ப'],
      score: 0
    },
    TIPS: {
      keywords: ['tips', 'advice', 'help', 'yosanaai', 'யோசனை'],
      score: 0
    },
    EXPLAIN: {
      keywords: ['explain', 'detail', 'vilakkam', 'விளக்கம்'],
      score: 0
    },
    INGREDIENTS: {
      keywords: ['ingredients', 'what do i need', 'thevaiyanavai', 'தேவையானவை'],
      score: 0
    },
    OPEN_RECIPE: {
      keywords: ['open', 'show recipe', 'recipe', 'thira', 'திற'],
      score: 0
    }
  },

  KNOWLEDGE_BASE: {
    SALT: {
      keys: ['salty', 'too much salt', 'salt fix', 'uppu', 'உப்பு'],
      ans: {
        en: "To fix too much salt, you can add a peeled potato, more water, or a squeeze of lemon juice. Adding a bit of cream or yogurt also helps balance the flavor.",
        ta: "உப்பு அதிகமாக இருந்தால், ஒரு உருளைக்கிழங்கை உரித்து அதில் சேர்க்கவும் அல்லது சிறிது எலுமிச்சை சாறு அல்லது தயிர் சேர்க்கவும்."
      }
    },
    SPICE: {
      keys: ['spicy', 'too much chilli', 'hot fix', 'karam', 'காரம்'],
      ans: {
        en: "If it's too spicy, add dairy like yogurt, cream, or milk. Nut pastes like cashew paste or even a pinch of sugar can also neutralize the heat.",
        ta: "காரம் அதிகமாக இருந்தால், தயிர், பால் அல்லது சிறிது சர்க்கரை சேர்க்கவும்."
      }
    },
    EGG_SUB: {
      keys: ['instead of egg', 'egg substitute', 'no egg', 'முட்டைக்கு பதில்'],
      ans: {
        en: "For baking, you can use mashed bananas, applesauce, or a mixture of flaxseed and water. For savory dishes, yogurt or silken tofu works well.",
        ta: "முட்டைக்கு பதிலாக மசித்த வாழைப்பழம், ஆப்பிள் சாஸ் அல்லது தயிர் பயன்படுத்தலாம்."
      }
    },
    HEALTH: {
      keys: ['turmeric', 'ginger', 'garlic', 'health', 'benefits', 'நன்மைகள்'],
      ans: {
        en: "Ingredients like turmeric and ginger have anti-inflammatory properties. Garlic is great for heart health and the immune system.",
        ta: "மஞ்சள் மற்றும் இஞ்சி நோய் எதிர்ப்பு சக்தியை அதிகரிக்கும். பூண்டு இதய ஆரோக்கியத்திற்கு நல்லது."
      }
    },
    APP_INFO: {
      keys: ['who are you', 'what is this', 'how to use', 'save recipe', 'நீ யார்'],
      ans: {
        en: "I am Abhi, your AI cooking assistant. You can search for recipes, get step-by-step cooking help, set timers, and even use our AI scanner to identify ingredients!",
        ta: "நான் அபி, உங்கள் AI சமையல் உதவியாளர். நான் உங்களுக்கு சமைக்க உதவுவேன்."
      }
    }
  },


  init: function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }
    
    this.lang = localStorage.getItem('tw_lang') === 'ta' ? 'ta-IN' : 'en-US';
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false; 
    this.recognition.lang = this.lang;
    
    this.createUI();

    this.recognition.onstart = () => {
      this.isListening = true;
      const navBtn = document.getElementById('nav-voice-btn');
      if(navBtn) navBtn.classList.add('voice-active');
      this.updateUIStatus('listening');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      const navBtn = document.getElementById('nav-voice-btn');
      if(navBtn) navBtn.classList.remove('voice-active');
      
      // Auto-restart to keep wake word active, unless user purposely paused
      if (!this.manualStop) {
        setTimeout(() => {
          try { this.recognition.start(); } catch(e){}
        }, 300);
      } else {
        this.updateUIStatus('idle');
      }
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (interimTranscript) {
         if (this.isAwake) {
           this.uiTranscript.innerHTML = `You: ${interimTranscript}...`;
         }
      }

      if (finalTranscript) {
        // Filter out low-confidence noise (Sensitivity fix)
        const result = event.results[event.results.length - 1][0];
        const t = finalTranscript.toLowerCase().trim();
        
        // Noise filter: ignore very short nonsensical sounds or low confidence
        if (result.confidence < 0.5 || (t.length < 3 && !['hi', 'அபி'].includes(t))) {
          console.log("Abhi filtered noise:", t, "(confidence:", result.confidence, ")");
          return;
        }

        console.log("Mic heard: ", t, "(confidence:", result.confidence, ")");
        this.processSpeech(t);
      }
    };

    this.manualStop = localStorage.getItem('tw_voice_enabled') !== 'true';

    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
      if (event.error === 'not-allowed') {
        this.manualStop = true;
        localStorage.setItem('tw_voice_enabled', 'false');
        this.updateUIStatus('idle');
      }
    };

    // Auto-start if it was enabled on the previous page
    if (!this.manualStop) {
      setTimeout(() => {
        try { this.recognition.start(); } catch(e) {}
      }, 500);
      
      // Also attempt to start on first click if auto-start was blocked
      const resumeOnInteraction = () => {
        if (!this.manualStop && !this.isListening) {
          try { this.recognition.start(); } catch(e) {}
        }
        document.removeEventListener('click', resumeOnInteraction);
      };
      document.addEventListener('click', resumeOnInteraction);
    }
  },

  createUI: function() {
    if (document.getElementById('abhi-ui')) return;
    this.uiOverlay = document.createElement('div');
    this.uiOverlay.id = 'abhi-ui';
    this.uiOverlay.className = 'abhi-overlay';
    
    this.uiTranscript = document.createElement('div');
    this.uiTranscript.className = 'abhi-transcript';
    this.uiTranscript.innerHTML = 'Hello! I am <strong>Abhi</strong>.';
    
    this.uiOrb = document.createElement('button');
    this.uiOrb.className = 'abhi-orb';
    this.uiOrb.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>';
    this.uiOrb.onclick = () => this.toggle();

    this.uiOverlay.appendChild(this.uiTranscript);
    this.uiOverlay.appendChild(this.uiOrb);
    document.body.appendChild(this.uiOverlay);
  },

  updateUIStatus: function(status) {
    if (!this.uiOverlay) return;
    
    if(status === 'listening') {
      this.uiOverlay.classList.add('listening');
      this.uiOverlay.classList.add('active');
      this.uiOverlay.classList.remove('speaking', 'thinking');
      this.uiOrb.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
    } else if(status === 'speaking') {
      this.uiOverlay.classList.add('speaking');
      this.uiOverlay.classList.add('active');
      this.uiOverlay.classList.remove('listening', 'thinking');
      this.uiOrb.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
    } else if(status === 'thinking') {
      this.uiOverlay.classList.add('thinking');
      this.uiOverlay.classList.add('active');
      this.uiOverlay.classList.remove('listening', 'speaking');
      this.uiOrb.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.5)';
    } else {
      this.uiOverlay.classList.remove('listening', 'speaking', 'thinking');
      setTimeout(() => { if (!this.isAwake) this.uiOverlay.classList.remove('active'); }, 2000);
    }
  },

  toggle: function() {
    if (!this.recognition) return;
    if (this.isListening) {
      this.manualStop = true;
      localStorage.setItem('tw_voice_enabled', 'false');
      this.recognition.stop();
      this.isAwake = false;
      this.showToast('🎙️ Abhi stopped');
    } else {
      this.manualStop = false;
      localStorage.setItem('tw_voice_enabled', 'true');
      try { this.recognition.start(); } catch(e){}
      this.showToast('🎙️ Abhi active - Say "Hey Abhi"');
    }
  },

  wakeUp: function() {
    this.isAwake = true;
    this.updateUIStatus('listening');
    clearTimeout(this.awakeTimeout);
    this.awakeTimeout = setTimeout(() => {
      this.isAwake = false;
      this.updateUIStatus('idle');
    }, 15000); // Stays awake for 15s waiting for command
  },

  speak: function(text, onEndCallback) {
    if (!this.synth) return;
    this.synth.cancel(); 
    this.uiTranscript.innerHTML = `Abhi: <strong>${text}</strong>`;
    this.updateUIStatus('speaking');
    
    const isTamilText = /[\u0B80-\u0BFF]/.test(text); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isTamilText ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;
    
    utterance.onend = () => {
      this.updateUIStatus('listening');
      if (onEndCallback) onEndCallback();
    };
    this.synth.speak(utterance);
  },

  processSpeech: function(transcript) {
    // 1. Wake word detection
    const wakeMatch = transcript.match(/(hey|hi|hello)?\s*(abhi|abi)/i) || transcript.match(/ஹே\s*அபி/i) || transcript.match(/அபி/i);
    
    if (wakeMatch) {
      this.wakeUp();
      const commandIdx = wakeMatch.index + wakeMatch[0].length;
      let command = transcript.substring(commandIdx).trim();
      
      if (!command) {
         this.speak(this.lang === 'ta-IN' ? "ஆம், நான் கேட்கிறேன். உங்களுக்கு என்ன வேண்டும்?" : "Yes, I’m listening. What would you like to do?", null);
         return;
      }
      this.uiTranscript.innerHTML = `You: ${command}`;
      this.executeCommand(command);
      return;
    }

    // 2. Active listening logic
    if (this.isAwake) {
      if (this.ignoreListening && !transcript.toLowerCase().includes('resume listening')) return;
      
      // Confirmation Handling
      if (this.pendingAction) {
        const t = transcript.toLowerCase();
        if (t.includes('yes') || t.includes('confirm') || t.includes('சரி') || t.includes('ஆமாம்')) {
          const action = this.pendingAction;
          this.pendingAction = null;
          action();
        } else if (t.includes('no') || t.includes('cancel') || t.includes('வேண்டாம்') || t.includes('இல்லை')) {
          this.pendingAction = null;
          this.speak(this.lang === 'ta-IN' ? "சரி, ரத்து செய்யப்பட்டது." : "Okay, cancelled.");
        } else {
          this.speak(this.lang === 'ta-IN' ? "தயவுசெய்து ஆம் அல்லது இல்லை என்று சொல்லுங்கள்." : "Please say yes or no to confirm.");
        }
        return;
      }

      this.uiTranscript.innerHTML = `You: ${transcript}`;
      this.wakeUp(); // Reset timer
      this.executeCommand(transcript);
    }
  },

  handleAIQuery: function(query) {
      this.updateUIStatus('thinking');
      this.uiTranscript.innerHTML = `Abhi: <em>Thinking...</em>`;
      
      let bestResponse = null;
      let maxMatch = 0;
      
      for (const [id, data] of Object.entries(this.KNOWLEDGE_BASE)) {
        data.keys.forEach(key => {
          if (query.includes(key)) {
             bestResponse = this.lang === 'ta-IN' ? data.ans.ta : data.ans.en;
             maxMatch = 5;
          }
        });
      }

      setTimeout(() => {
        if (bestResponse) {
          this.speak(bestResponse);
        } else {
          // If no specific tip, try to see if it's a generic question about a recipe
          const recipes = window.RECIPES_DB || [];
          const matchedRecipe = recipes.find(r => query.includes(r.name.toLowerCase()));
          if (matchedRecipe) {
            this.speak(this.lang === 'ta-IN' ? 
              `${matchedRecipe.name_ta} என்பது ${matchedRecipe.cuisine} சமையல். இது செய்ய ${matchedRecipe.prepTime} ஆகும்.` : 
              `${matchedRecipe.name} is a ${matchedRecipe.cuisine} dish. It takes ${matchedRecipe.prepTime} to prepare and is rated ${matchedRecipe.rating} stars.`);
          } else {
            this.speak(this.lang === 'ta-IN' ? 
              "மன்னிக்கவும், அதைப் பற்றி எனக்குத் தெரியவில்லை. நான் இன்னும் கற்றுக் கொண்டிருக்கிறேன்!" : 
              "I'm not sure about that specific topic yet, but I'm learning more about cooking every day! Try asking about salty food, spice fixes, or healthy ingredients.");
          }
        }
      }, 1000);
  },

  executeCommand: function(t) {
    const getIntent = (text) => {
      let bestIntent = null;
      let maxScore = 0;
      const tokens = text.toLowerCase().split(/\s+/);
      
      for (const [intent, data] of Object.entries(this.INTENTS)) {
        let score = 0;
        data.keywords.forEach(kw => {
          // Weighted score: full phrase matches better than single word
          if (text.includes(kw)) score += kw.split(' ').length * 2;
          // Token matches
          tokens.forEach(token => {
            if (kw === token) score += 1;
          });
        });
        
        if (score > maxScore) {
          maxScore = score;
          bestIntent = intent;
        }
      }
      return maxScore > 1 ? bestIntent : null;
    };

    t = t.toLowerCase().trim()
         .replace(/rise/g, 'rice')
         .replace(/biriyani/g, 'biryani')
         .replace(/pondal/g, 'pongal')
         .replace(/parotha/g, 'paratha')
         .replace(/manchrian/g, 'manchurian')
         .replace(/panner/g, 'paneer')
         .replace(/kaatu/g, 'show')
         .replace(/kaatunga/g, 'show')
         .replace(/venum/g, 'want')
         .replace(/podu/g, 'start')
         .replace(/yes/g, 'yes')
         .replace(/no/g, 'no')
         .replace(/aamam/g, 'yes')
         .replace(/illai/g, 'no');

    const intentName = getIntent(t);
    const path = window.location.pathname;
    let confidence = "high"; // Default for keyword/regex match
    let handled = false;

    // Helper: Build structured response
    const buildResponse = (intent, response, arType, arTarget, arInstruction) => {
      return {
        intent: intent,
        confidence: confidence,
        response: response,
        ar_overlay: {
          type: arType || "text",
          target: arTarget || "Environment",
          instruction: arInstruction || response
        },
        step_status: "in_progress"
      };
    };

    // --- 1. Special Handling: Timers ---
    const timerMatch = t.match(/timer for (\d+) minute/) || t.match(/(\d+) நிமிடம் நேரம்/);
    if (timerMatch) {
      const mins = parseInt(timerMatch[1]);
      if (path.includes('recipe.html')) {
        window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'timer-start', mins } }));
      } else {
        this.speak(this.lang === 'ta-IN' ? `${mins} நிமிடம் நேரம் அமைக்கப்பட்டது.` : `Setting a timer for ${mins} minutes.`);
        setTimeout(() => this.speak(this.lang === 'ta-IN' ? `உங்கள் ${mins} நிமிடம் நேரம் முடிந்தது!` : `Your ${mins} minute timer is up!`), mins * 60000);
      }
      return;
    }

    // ============================================================
    // --- 0. HIGH PRIORITY: RECIPE NAVIGATION (fuzzy search) ---
    // ============================================================
    const openMatch = t.match(/open (.+)/) || t.match(/(.+) திற/);
    const searchTarget = openMatch ? openMatch[1].replace('recipe', '').trim() : t;
    
    // Keywords that are definitely NOT recipe names
    const nonRecipeKeywords = ['timer', 'minute', 'start', 'next', 'repeat', 'pause', 'stop', 'search', 'find', 'show'];
    const isLikelyCommand = nonRecipeKeywords.some(kw => t.includes(kw));

    if (openMatch || (!isLikelyCommand && searchTarget.length > 3)) {
      const db = window.RECIPES_DB || (typeof recipes !== 'undefined' ? recipes : []);
      const lev = (a, b) => {
        if(!a.length) return b.length; if(!b.length) return a.length;
        const matrix = [];
        for(let i=0; i<=b.length; i++) matrix[i] = [i];
        for(let j=0; j<=a.length; j++) matrix[0][j] = j;
        for(let i=1; i<=b.length; i++){
          for(let j=1; j<=a.length; j++){
            if(b.charAt(i-1) === a.charAt(j-1)) matrix[i][j] = matrix[i-1][j-1];
            else matrix[i][j] = Math.min(matrix[i-1][j-1]+1, Math.min(matrix[i][j-1]+1, matrix[i-1][j]+1));
          }
        }
        return matrix[b.length][a.length];
      };

      let bestMatch = null;
      let lowestDist = 999;
      const target = searchTarget.toLowerCase();

      db.forEach(r => {
        const enName = r.name.toLowerCase();
        const taName = r.name_ta ? r.name_ta.toLowerCase() : "";
        if (enName === target || taName === target) {
           lowestDist = 0; bestMatch = r;
        } else if (enName.includes(target) || taName.includes(target)) {
           let dist = Math.min(enName.length - target.length, taName.length - target.length);
           if (dist < lowestDist) { lowestDist = dist; bestMatch = r; }
        } else {
           let dist = Math.min(lev(target, enName), lev(target, taName));
           if (dist < lowestDist) { lowestDist = dist; bestMatch = r; }
        }
      });
      
      if (bestMatch && lowestDist < 5) { // Tightened distance for accuracy
        this.speak(this.lang === 'ta-IN' ? `${bestMatch.name_ta} திறக்கிறேன்.` : `Opening ${bestMatch.name}.`);
        setTimeout(() => window.location.href = `recipe.html?id=${bestMatch.id}`, 800);
        return;
      }
    }

    // --- 2. Intent-based Dispatcher ---
    let finalRes = null;

    switch (intentName) {
      case 'START_COOKING':
        if (path.includes('recipe.html')) {
          finalRes = buildResponse("START_COOKING", "Starting cooking mode. Let's begin!", "highlight", "Stove", "Turn on the stove");
          this.speak(finalRes.response, () => {
            window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'start' } }));
          });
        }
        return;

      case 'NEXT_STEP':
        if (path.includes('recipe.html')) {
          finalRes = buildResponse("NEXT_STEP", "Moving to next step.", "animation", "Pan", "Proceeding");
          window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'next' } }));
        }
        return;

      case 'PREV_STEP':
        if (path.includes('recipe.html')) {
          finalRes = buildResponse("PREV_STEP", "Going back.", "text", "System", "Previous Step");
          window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'prev' } }));
        }
        return;

      case 'EXIT':
        if (path.includes('recipe.html')) {
          this.speak(this.lang === 'ta-IN' ? "சமையல் பயன்முறையிலிருந்து வெளியேற வேண்டுமா? ஆம் அல்லது இல்லை என்று சொல்லுங்கள்." : "Do you want to exit cooking mode? Say yes to confirm.");
          this.pendingAction = () => {
             const exitRes = buildResponse("STOP", "Exiting cooking mode.", "text", "System", "Exiting");
             this.speak(exitRes.response, () => {
               window.dispatchEvent(new CustomEvent('abhi-cmd', { detail: { action: 'exit' } }));
             });
          };
        }
        return;
        
      case 'SEARCH':
        const term = t.replace(/search for|find|show me|recipes|சமையல்|தேடு|காட்டு|venum/gi, '').trim();
        if (term && (path.includes('gallery.html') || path === '/' || path.includes('index.html'))) {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.value = term;
            if (typeof renderGallery === 'function') {
              renderGallery(null, term);
              this.speak(this.lang === 'ta-IN' ? `தேடல் முடிவுகள்: ${term}` : `Showing results for ${term}`);
            }
          }
        }
        return;

      case 'OPEN_RECIPE':
        this.speak(this.lang === 'ta-IN' ? "சரியான செய்முறை கிடைக்கவில்லை." : "I couldn't find a recipe matching that name.");
        return;
    }

    // --- 3. Quantity Query (New for AR) ---
    if (t.includes('how much') || t.includes('quantity') || t.includes('எவ்வளவு')) {
       if (path.includes('recipe.html') && typeof currentRecipe !== 'undefined') {
          const stepIdx = typeof currentStepIndex !== 'undefined' ? currentStepIndex : 0;
          const stepText = currentRecipe.steps[stepIdx];
          const qtyRes = buildResponse("QUANTITY_QUERY", `In this step, you need: ${stepText.match(/\d+[^ ]*/)}`, "highlight", "Ingredients", "Check quantities");
          this.speak(qtyRes.response);
          return;
       }
    }

    // --- 3. Manual checks for very specific things (Search, Themes) ---
    // (Existing specific logic like dark mode can stay or be integrated)
    if (t.includes('dark mode')) {
      localStorage.setItem('tw_theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      this.speak('Dark mode activated.');
      return;
    }
    if (t.includes('light mode')) {
      localStorage.setItem('tw_theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      this.speak('Light mode activated.');
      return;
    }

    // --- Dark / Light Mode ---
    if (has('dark mode', 'dark theme', 'night mode', 'இருண்ட பயன்முறை')) {
      localStorage.setItem('tw_theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      this.speak('Dark mode activated.');
      if (typeof toggleThemeDash === 'function') { document.getElementById('dark-toggle').checked = true; }
      return;
    }
    if (has('light mode', 'light theme', 'day mode', 'வெளிர் பயன்முறை')) {
      localStorage.setItem('tw_theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      this.speak('Light mode activated.');
      if (typeof toggleThemeDash === 'function') { document.getElementById('dark-toggle').checked = false; }
      return;
    }

    // ============================================================
    // --- SEARCH on gallery page ---
    // ============================================================
    const searchMatch = t.match(/search for (.+)/) || t.match(/find (.+)/) || t.match(/show me (.+)/) || t.match(/(.+) தேடு/);
    if (searchMatch && (path.includes('gallery.html') || path === '/' || path.includes('index.html'))) {
      const term = searchMatch[1].replace('recipes', '').replace('சமையல்', '').trim();
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = term;
        if (typeof renderGallery === 'function') {
          renderGallery(null, term);
          this.speak(this.lang === 'ta-IN' ? `தேடல் முடிவுகள்: ${term}` : `Showing results for ${term}`);
        }
      }
      return;
    }

    // If unhandled and awake, fallback to AI Knowledge Base
    if (!handled && this.isAwake) {
       this.handleAIQuery(t);
    }
  },

  showToast: function(msg) {
    let ex = document.querySelector('.toast');
    if (ex) ex.remove();
    let t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.remove(); }, 2500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.globalVoice.init();
});
