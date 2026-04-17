// js/main.js
// Entry Point SaldoZea v4.0

import { initLedSign } from './ui/led-sign.js';

console.log('%c🚀 SaldoZea v4.0 started by Grok', 'color:#22d3ee; font-size:15px; font-weight:bold');

async function initializeApp() {
    const app = document.getElementById('app');
    
    // Buat struktur dasar
    app.innerHTML = `
        <div class="header flex items-center justify-between px-4 py-5 text-white">
            <div class="flex items-center gap-3">
                <span class="text-3xl">🪧</span>
                <div>
                    <h1 class="text-2xl font-bold tracking-widest">SALDOZEA</h1>
                    <p class="text-xs opacity-75">v4.0 • LED Moving Sign Editor</p>
                </div>
            </div>
            <div class="text-sm bg-white/10 px-4 py-1 rounded-3xl">SUPREME KINGBEJH</div>
        </div>
        
        <div id="main-content" class="p-4"></div>
    `;

    // Jalankan LED Sign Editor
    initLedSign();

    console.log('%c✅ SaldoZea v4.0 LED Module Ready!', 'color:#22d3ee; font-weight:bold');
}

initializeApp();
