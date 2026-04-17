// js/ui/led-sign.js
// =============================================
// LED Moving Sign Editor - Signature Feature SaldoZea v4.0
// Modular + Firebase Realtime

import database, { listenToPath } from '../services/firebase.js';

const LED_PATH = 'ledSign';

let currentLedData = {
  text: "ZEA PROPERTY X DNHPROPERTY",
  color: "#a855f7",
  speed: "normal", // lambat, normal, cepat
  isPlaying: true
};

export function initLedSign() {
  console.log('%c🪧 LED Moving Sign Module initialized', 'color:#a855f7; font-weight:bold');

  // Load data awal dari Firebase
  listenToPath(LED_PATH, (data) => {
    if (data) {
      currentLedData = { ...currentLedData, ...data };
      renderLedPreview();
      updateFormControls();
    }
  });

  // Render LED Editor ke DOM (akan dipanggil dari main.js nanti)
  renderLedEditor();
}

function renderLedEditor() {
  const container = document.getElementById('main-content');
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="card p-6">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span class="text-3xl">🪧</span> Edit LED Moving Sign
        </h2>

        <!-- Preview Live -->
        <div class="mb-8">
          <p class="text-xs uppercase tracking-widest text-purple-400 mb-2">PREVIEW LIVE</p>
          <div id="led-preview" class="led-preview text-2xl font-mono min-h-[80px] flex items-center justify-center overflow-hidden border-4 border-black">
            <div id="led-text" class="scroll-text">ZEA PROPERTY X DNHPROPERTY</div>
          </div>
        </div>

        <!-- Controls -->
        <div class="space-y-6">
          <!-- Warna LED -->
          <div>
            <p class="text-sm mb-3">WARNA LED</p>
            <div class="flex gap-3 flex-wrap" id="color-picker"></div>
          </div>

          <!-- Kecepatan -->
          <div>
            <p class="text-sm mb-3">KECEPATAN SCROLL</p>
            <div class="flex gap-2" id="speed-controls">
              <button data-speed="lambat" class="btn-neon px-5 py-2 text-sm">🐢 Lambat</button>
              <button data-speed="normal" class="btn-neon px-5 py-2 text-sm">▶️ Normal</button>
              <button data-speed="cepat" class="btn-neon px-5 py-
