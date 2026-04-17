// js/services/firebase.js
// =============================================
// Firebase Service - SaldoZea v4.0
// Clean, modular, dan realtime

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js";
import { getDatabase, ref, onValue, set, update, push, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2lSXx1OJYMIm3YdVMX1h0fSp6EfNIH_s",
  authDomain: "saldozeav2.firebaseapp.com",
  databaseURL: "https://saldozeav2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "saldozeav2",
  storageBucket: "saldozeav2.firebasestorage.app",
  messagingSenderId: "340325272493",
  appId: "1:340325272493:web:21f6d7485ff94f3f88ef24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log('%c🔥 Firebase v4.0 connected successfully', 'color:#a855f7; font-weight:bold');

// Export database references & helper functions
export const database = {
  db,
  ref,
  onValue,
  set,
  update,
  push,
  remove,

  // Helper untuk path umum
  path: {
    transactions: 'transactions',
    units: 'units',
    settings: 'settings',
    ledSign: 'ledSign',
    saldo: 'saldo'
  }
};

// Realtime listener helper (akan dipakai di banyak modul)
export function listenToPath(path, callback) {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot) => {
    callback(snapshot.val());
  });
}

export default database;
