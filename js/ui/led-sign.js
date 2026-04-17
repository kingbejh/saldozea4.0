// js/ui/led-sign.js
// LED Moving Sign Editor - Blackhole Edition

import database, { listenToPath } from '../services/firebase.js';

const LED_PATH = 'ledSign';

let currentLedData = {
    text: "ZEA PROPERTY X DNHPROPERTY",
    color: "#00f7ff",
    speed: "normal",
    isPlaying: true
};

export function initLedSign() {
    console.log('%c🪧 LED Moving Sign Blackhole Module initialized', 'color:#00f7ff; font-weight:bold');

    // Load dari Firebase
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
        <div class="max-w-2xl mx-auto pt-4">
            <div class="card p-6">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <span class="text-4xl">🪧</span> 
                    EVENT HORIZON LED SIGN
                </h2>

                <!-- Preview -->
                <div class="mb-8">
                    <p class="text-xs uppercase tracking-[3px] text-cyan-400 mb-3">LIVE TRANSMISSION</p>
                    <div id="led-preview" class="led-preview text-3xl font-mono min-h-[90px] flex items-center justify-center overflow-hidden">
                        <div id="led-text">ZEA PROPERTY X DNHPROPERTY</div>
                    </div>
                </div>

                <div class="space-y-6 text-white">
                    <div>
                        <p class="text-sm mb-3">WARP COLOR</p>
                        <div class="flex gap-4 flex-wrap" id="color-picker"></div>
                    </div>

                    <div>
                        <p class="text-sm mb-3">WARP SPEED</p>
                        <div class="flex gap-3" id="speed-controls">
                            <button data-speed="lambat" class="btn-neon flex-1 py-3">🐢 LAMBAT</button>
                            <button data-speed="normal" class="btn-neon flex-1 py-3">▶ NORMAL</button>
                            <button data-speed="cepat" class="btn-neon flex-1 py-3">⚡ CEPAT</button>
                        </div>
                    </div>

                    <div>
                        <p class="text-sm mb-2">TRANSMISSION TEXT</p>
                        <textarea id="led-text-input" class="w-full bg-black/50 border border-cyan-400/30 rounded-2xl p-5 text-lg focus:border-cyan-400 min-h-[110px]"></textarea>
                    </div>

                    <div class="flex gap-4 pt-6">
                        <button onclick="publishLedSign()" class="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 py-5 rounded-3xl font-bold text-lg">📡 PUBLISH TO ALL SECTORS</button>
                        <button onclick="togglePlayPause()" id="play-pause-btn" class="px-10 bg-emerald-500 hover:bg-emerald-600 rounded-3xl font-bold">⏸ PAUSE</button>
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
    textarea.value = currentLedData.text;
    textarea.addEventListener('input', (e) => {
        currentLedData.text = e.target.value || "ZEA PROPERTY X DNHPROPERTY";
        renderLedPreview();
    });

    document.querySelectorAll('#speed-controls button').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLedData.speed = btn.dataset.speed;
            updateActiveSpeed();
            renderLedPreview();
        });
    });
}

function renderColorPicker() {
    const colors = ["#00f7ff", "#c724ff", "#ff00aa", "#00ffcc", "#ffaa00"];
    const container = document.getElementById('color-picker');
    container.innerHTML = colors.map(c => `
        <div onclick="selectLedColor('${c}')" class="w-12 h-12 rounded-2xl cursor-pointer border-2 border-white/30 hover:scale-110 transition" style="background: ${c}"></div>
    `).join('');
}

window.selectLedColor = (color) => {
    currentLedData.color = color;
    renderLedPreview();
};

function updateActiveSpeed() {
    document.querySelectorAll('#speed-controls button').forEach(b => {
        b.style.opacity = b.dataset.speed === currentLedData.speed ? '1' : '0.4';
    });
}

function renderLedPreview() {
    const el = document.getElementById('led-text');
    if (!el) return;
    el.textContent = currentLedData.text;
    el.style.color = currentLedData.color;
}

window.publishLedSign = () => {
    database.set(database.ref(database.db, LED_PATH), currentLedData)
        .then(() => alert('✅ Signal berhasil dikirim ke seluruh galaksi!'))
        .catch(() => alert('❌ Gagal mengirim signal'));
};

window.togglePlayPause = () => {
    currentLedData.isPlaying = !currentLedData.isPlaying;
    const btn = document.getElementById('play-pause-btn');
    btn.textContent = currentLedData.isPlaying ? '⏸ PAUSE' : '▶ PLAY';
};

window.renderLedPreview = renderLedPreview; // safety

// Auto init
initLedSign();
