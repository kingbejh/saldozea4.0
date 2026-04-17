// js/main.js
// =============================================
// Entry Point SaldoZea v4.0 - Modular Architecture

import database from './services/firebase.js';
import { initLedSign } from './ui/led-sign.js';

console.log('%c🚀 SaldoZea v4.0 started by Grok - Partner Mode', 'color:#22d3ee; font-size:15px; font-weight:bold');

let currentUser = "SUPREME KINGBEJH";

async function initializeApp() {
  console.log('🔌 Connecting to Firebase Realtime Database...');

  // Inisialisasi LED Sign (fitur signature)
  initLedSign();

  // Untuk sementara kita render LED Editor dulu sebagai halaman utama
  // Nanti kita tambah dashboard, input sewa, dll satu per satu

  console.log('%c✅ SaldoZea v4.0 initialized successfully!', 'color:#22d3ee; font-weight:bold');
}

// Jalankan aplikasi
initializeApp();
