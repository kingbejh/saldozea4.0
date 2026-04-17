// js/ui/led-sign.js - BLACKHOLE EDITION

import database, { listenToPath } from '../services/firebase.js';

const LED_PATH = 'ledSign';

let currentLedData = {
    text: "ZEA PROPERTY X DNHPROPERTY • GROK BLACKHOLE",
    color: "#00f7ff",
    speed: "normal",
    isPlaying: true
};

export function initLedSign() {
    console.log('%c🪐 LED Moving Sign BLACKHOLE Edition loaded', 'color:#00f7ff; font-weight:bold');

    listenToPath(LED_PATH, (data) => {
        if (data) {
            currentLedData = { ...currentLedData, ...data };
            renderLedPreview();
        }
    });

    renderLedEditor();
}

function renderLedEditor() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto pt-6">
            <div class="card p-8">
                <div class="flex items-center gap-4 mb-8">
                    <div class="text-5xl">⚫</div>
                    <div>
                        <h2 class="text-3xl font-bold tracking-widest text-white">LED MOVING SIGN</h2>
                        <p class="text-cyan-400 text-sm">EVENT HORIZON BROADCAST SYSTEM</p>
                    </div>
                </div>

                <!-- Cosmic Preview -->
                <div class="mb-10">
                    <p class="text-xs uppercase tracking-[3px] text-purple-400 mb-3">LIVE TRANSMISSION</p>
                    <div id="led-preview" class="led-preview text-2xl font-mono min-h-[100px] flex items-center justify-center overflow-hidden border-2 border-cyan-400">
                        <div id="led-text" class="scroll-text">ZEA PROPERTY X DNHPROPERTY • GROK BLACKHOLE</div>
                    </div>
                </div>

                <div class="space-y-8">
                    <!-- Warna Nebula -->
                    <div>
                        <p class="text-sm mb-3 text-cyan-300">NEBULA COLOR</p>
                        <div class="flex gap-4 flex-wrap" id="color-picker"></div>
                    </div>

                    <!-- Speed -->
                    <div>
                        <p class="text-sm mb-3 text-cyan-300">WARP SPEED</p>
                        <div class="flex gap-3" id="speed-controls">
                            <button data-speed="lambat" class="btn-neon px-6 py-3 text-sm">SLOW ORBIT</button>
                            <button data-speed="normal" class="btn-neon px-6 py-3 text-sm">NORMAL WARP</button>
                            <button data-speed="cepat" class="btn-neon px-6 py-3 text-sm">HYPERDRIVE</button>
                        </div>
                    </div>

                    <!-- Text Input -->
                    <div>
                        <p class="text-sm mb-3 text-cyan-300">BROADCAST MESSAGE</p>
                        <textarea id="led-text-input" class="w-full bg-black/60 border border-purple-500/40 rounded-2xl p-5 text-lg font-mono resize-y min-h-[110px] focus:border-cyan-400 focus:outline-none"></textarea>
                    </div>

                    <!-- Controls -->
                    <div class="flex gap-4 pt-6">
                        <button onclick="publishLedSign()" 
                                class="flex-1 py-5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl font-bold text-lg shadow-lg shadow-purple-500/50">
                            📡 TRANSMIT TO ALL SECTORS
                        </button>
                        <button onclick="togglePlayPause()" id="play-pause-btn"
                                class="px-10 py-5 bg-emerald-500/80 hover:bg-emerald-600 rounded-3xl font-bold">
                            ⏸️ PAUSE
                        </button>
                        <button onclick="resetLedDefault()" 
                                class="px-10 py-5 bg-gray-700 hover:bg-gray-600 rounded-3xl font-bold">
                            RESET TO DEFAULT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupEventListeners();
    renderColorPicker();
    renderLedPreview();
}

function setupEventListeners() {
    const textarea = document.getElementById('led-text-input');
    if (textarea) {
        textarea.value = currentLedData.text;
        textarea.addEventListener('input', (e) => {
            currentLedData.text = e.target.value || "ZEA PROPERTY X DNHPROPERTY • GROK BLACKHOLE";
            renderLedPreview();
        });
    }

    document.querySelectorAll('#speed-controls button').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLedData.speed = btn.dataset.speed;
            updateActiveSpeed();
            renderLedPreview();
        });
    });
}

function renderColorPicker() {
    const colors = ["#00f7ff", "#c724ff", "#ff00aa", "#39ff14", "#ffd700"];
    const container = document.getElementById('color-picker');
    container.innerHTML = colors.map(color => `
        <div onclick="selectLedColor('${color}')" 
             class="w-12 h-12 rounded-2xl cursor-pointer border-2 border-white/30 shadow-xl transition-all hover:scale-110"
             style="background-color: ${color}"></div>
    `).join('');
}

window.selectLedColor = function(color) {
    currentLedData.color = color;
    renderLedPreview();
};

function updateActiveSpeed() {
    document.querySelectorAll('#speed-controls button').forEach(btn => {
        btn.classList.toggle('!bg-white', btn.dataset.speed === currentLedData.speed);
        btn.classList.toggle('!text-black', btn.dataset.speed === currentLedData.speed);
    });
}

function renderLedPreview() {
    const preview = document.getElementById('led-text');
    if (!preview) return;

    preview.textContent = currentLedData.text;
    preview.style.color = currentLedData.color;
}

window.publishLedSign = function() {
    database.set(database.ref(database.db, LED_PATH), currentLedData)
        .then(() => alert('📡 TRANSMISSION SENT TO ALL SECTORS'))
        .catch(err => console.error(err));
};

window.togglePlayPause = function() {
    currentLedData.isPlaying = !currentLedData.isPlaying;
    const btn = document.getElementById('play-pause-btn');
    btn.textContent = currentLedData.isPlaying ? '⏸️ PAUSE' : '▶️ RESUME';
};

window.resetLedDefault = function() {
    currentLedData = {
        text: "ZEA PROPERTY X DNHPROPERTY • GROK BLACKHOLE",
        color: "#00f7ff",
        speed: "normal",
        isPlaying: true
    };
    renderLedPreview();
};

// Cosmic scroll animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes cosmicScroll {
    from { transform: translateX(120%); }
    to   { transform: translateX(-120%); }
  }
  .scroll-text {
    animation: cosmicScroll 12s linear infinite;
    white-space: nowrap;
  }
`;
document.head.appendChild(style);
