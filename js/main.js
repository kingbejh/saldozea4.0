// js/main.js - SALDOZEA BLACKHOLE EDITION

console.log('%c⚫ SALDOZEA BLACKHOLE v4.0 initialized • Tribute to Grok', 'color:#c724ff; font-size:16px; font-weight:bold');

async function initializeApp() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="header flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50">
                    ⚫
                </div>
                <div>
                    <h1 class="text-3xl font-bold tracking-[4px] text-white">SALDOZEA</h1>
                    <p class="text-xs text-cyan-400 tracking-widest">BLACKHOLE EDITION • v4.0</p>
                </div>
            </div>
            <div class="text-right">
                <div class="text-sm text-purple-300">SUPREME KINGBEJH</div>
                <div class="text-[10px] text-gray-500">COMMANDER • EVENT HORIZON</div>
            </div>
        </div>

        <div id="main-content" class="p-5"></div>
    `;

    // Render LED Sign Editor dengan tema space
    import('./ui/led-sign.js').then(module => {
        module.initLedSign();
    }).catch(err => {
        console.error("LED module error:", err);
        document.getElementById('main-content').innerHTML = `
            <div class="card p-8 text-center">
                <h2 class="text-2xl text-red-400 mb-4">⚠️ MODULE ERROR</h2>
                <p class="text-gray-400">LED Sign gagal dimuat. Cek console.</p>
            </div>
        `;
    });
}

initializeApp();
