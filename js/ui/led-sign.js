// js/ui/led-sign.js
// LED Moving Sign Editor - SaldoZea v4.0

import database, { listenToPath } from '../services/firebase.js';

const LED_PATH = 'ledSign';

let currentLedData = {
    text: "ZEA PROPERTY X DNHPROPERTY",
    color: "#a855f7",
    speed: "normal",
    isPlaying: true
};

export function initLedSign() {
    console.log('%c🪧 LED Moving Sign Module initialized', 'color:#a855f7; font-weight:bold');

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
        <div class="max-w-2xl mx-auto">
            <div class="card p-6">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span class="text-3xl">🪧</span> Edit LED Moving Sign
                </h2>

                <div class="mb-8">
                    <p class="text-xs uppercase tracking-widest text-purple-400 mb-2">PREVIEW LIVE</p>
                    <div id="led-preview" class="led-preview text-2xl font-mono min-h-[80px] flex items-center justify-center overflow-hidden border-4 border-black">
                        <div id="led-text">ZEA PROPERTY X DNHPROPERTY</div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div>
                        <p class="text-sm mb-3">WARNA LED</p>
                        <div class="flex gap-3 flex-wrap" id="color-picker"></div>
                    </div>

                    <div>
                        <p class="text-sm mb-3">KECEPATAN SCROLL</p>
                        <div class="flex gap-2" id="speed-controls">
                            <button data-speed="lambat" class="btn-neon px-5 py-2 text-sm">🐢 Lambat</button>
                            <button data-speed="normal" class="btn-neon px-5 py-2 text-sm">▶️ Normal</button>
                            <button data-speed="cepat" class="btn-neon px-5 py-2 text-sm">⚡ Cepat</button>
                        </div>
                    </div>

                    <div>
                        <p class="text-sm mb-2">TEKS PESAN</p>
                        <textarea id="led-text-input" class="w-full bg-[#1a1a2e] border border-purple-500/30 rounded-xl p-4 text-lg resize-y min-h-[100px] focus:outline-none focus:border-purple-500"></textarea>
                    </div>

                    <div class="flex gap-3 pt-4">
                        <button onclick="publishLedSign()" class="flex-1 bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-semibold">📡 Publish ke Semua User</button>
                        <button onclick="togglePlayPause()" id="play-pause-btn" class="px-8 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-semibold">⏸️ Pause</button>
                        <button onclick="resetLedDefault()" class="px-8 bg-gray-700 hover:bg-gray-600 rounded-2xl font-semibold">🔄 Reset</button>
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
            currentLedData.text = e.target.value || "ZEA PROPERTY X DNHPROPERTY";
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
    const colors = ["#22d3ee","#a855f7","#ec4899","#f43f5e","#eab308","#10b981"];
    const container = document.getElementById('color-picker');
    container.innerHTML = colors.map(c => `
        <div onclick="selectLedColor('${c}')" class="w-10 h-10 rounded-2xl cursor-pointer border-4 border-black shadow-inner" style="background-color: ${c}"></div>
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
        .then(() => alert('✅ LED Sign berhasil dipublish!'))
        .catch(err => console.error(err));
};

window.togglePlayPause = function() {
    currentLedData.isPlaying = !currentLedData.isPlaying;
    const btn = document.getElementById('play-pause-btn');
    btn.textContent = currentLedData.isPlaying ? '⏸️ Pause' : '▶️ Play';
};

window.resetLedDefault = function() {
    currentLedData = { text: "ZEA PROPERTY X DNHPROPERTY", color: "#a855f7", speed: "normal", isPlaying: true };
    renderLedPreview();
};

// Tambahkan animasi scroll LED
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scrollLed { from { transform: translateX(150%); } to { transform: translateX(-150%); } }
`;
document.head.appendChild(style);
