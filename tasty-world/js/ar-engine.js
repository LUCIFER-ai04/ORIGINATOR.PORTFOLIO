/**
 * AR Engine - Handles camera feed and visual guidance overlays
 */
const AREngine = {
  stream: null,
  videoEl: null,
  overlayEl: null,

  init: async function(videoContainerId) {
    this.videoEl = document.getElementById('ar-video');
    this.overlayEl = document.getElementById('ar-overlays');
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (this.videoEl) {
        this.videoEl.srcObject = this.stream;
        this.videoEl.play();
      }
      this.showDetectionAnimation();
    } catch (err) {
      console.warn("Camera access denied or not available:", err);
      // Fallback: Show a placeholder AR-like background
      if (this.videoEl) this.videoEl.style.background = "linear-gradient(45deg, #121212, #1e293b)";
    }
  },

  stop: function() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  },

  showDetectionAnimation: function() {
    // Simulate "scanning" the environment
    const scanner = document.createElement('div');
    scanner.className = 'ar-scanner-line';
    this.overlayEl.appendChild(scanner);
    setTimeout(() => scanner.remove(), 3000);
  },

  /**
   * Triggers a visual AR overlay
   * @param {string} type - arrow, highlight, animation, text
   * @param {string} target - object name (pan, stove, onion, etc.)
   * @param {string} instruction - text to show
   */
  trigger: function(type, target, instruction) {
    if (!this.overlayEl) return;
    
    // Clear previous specific overlays
    const existing = this.overlayEl.querySelectorAll('.ar-active-overlay');
    existing.forEach(el => el.remove());

    const el = document.createElement('div');
    el.className = `ar-active-overlay ar-${type}`;
    
    switch(type) {
      case 'highlight':
        el.innerHTML = `<div class="ar-rect"></div><div class="ar-label">${target}</div>`;
        break;
      case 'arrow':
        el.innerHTML = `<div class="ar-arrow">↓</div><div class="ar-label">${instruction}</div>`;
        break;
      case 'animation':
        el.innerHTML = `<div class="ar-pulse"></div><div class="ar-label">${instruction}</div>`;
        break;
      default:
        el.innerHTML = `<div class="ar-text">${instruction}</div>`;
    }

    this.overlayEl.appendChild(el);
  },

  simulateProactiveDetection: function(callback) {
    // Randomly "detect" things to make the AI feel alive
    const events = [
      { type: 'highlight', target: 'Pan', msg: 'Pan detected. Heating up...' },
      { type: 'text', target: 'Environment', msg: 'Light levels optimal for cooking.' },
      { type: 'animation', target: 'Stove', msg: 'Flame detected: Medium heat.' }
    ];
    
    setInterval(() => {
      if (Math.random() > 0.8) {
        const ev = events[Math.floor(Math.random() * events.length)];
        this.trigger(ev.type, ev.target, ev.msg);
        if (callback) callback(ev.msg);
      }
    }, 15000);
  }
};

window.AREngine = AREngine;
