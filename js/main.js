// js/main.js
// =============================================
// Entry Point SaldoZea v4.0
// Modular Architecture by Grok

import database from './services/firebase.js';

// Import semua modul UI (akan kita tambah satu per satu)
import { renderDashboard } from './ui/dashboard.js';
import { initLedSign } from './ui/led-sign.js';
// import { initInputSewa } from './ui/input-sewa.js';
// import { initUnitManagement } from './ui/unit.js';
// dst...

console.log('%c🚀 SaldoZea v4.0 started by Grok - Partner Mode', 'color:#22d3ee; font-size:15px; font-weight:bold');

let currentUser = "SUPREME KINGBEJH"; // nanti bisa diubah jadi multi-user

async function initializeApp() {
  const appContainer = document.getElementById('app');
  
  // Render skeleton dasar
  appContainer.innerHTML = `
    <div class="min-h-screen bg-[#0f0f17] text-white">
      <!-- Header & Navbar akan dirender oleh modul -->
      <div id="header"></div>
      <div id="main-content" class="p-4"></div>
    </div>
  `;

  // Inisialisasi Firebase listeners utama
  console.log('🔌 Connecting to Realtime Database...');

  // Contoh: listen LED Sign (fitur ikonik)
  import('./ui/led-sign.js').then(module => {
    module.initLedSign(currentUser);
  });

  // Dashboard pertama kali
  renderDashboard();

  console.log('%c✅ SaldoZea v4.0 fully initialized!', 'color:#22d3ee; font-weight:bold');
}

// Jalankan aplikasi
initializeApp();
