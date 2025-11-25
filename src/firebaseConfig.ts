// src/firebaseConfig.ts

import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// 🔥 Savvy Dealer System — DEMO Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0KpMbEaAJfmrDUCeROXDp-K9sp6VZ-6E",
    authDomain: "savvy-ds-49b12.firebaseapp.com",
    projectId: "savvy-ds-49b12",
    storageBucket: "savvy-ds-49b12.firebasestorage.app",
    messagingSenderId: "1036747803556",
    appId: "1:1036747803556:web:9aa34c2fc0d6634c408f31",
    measurementId: "G-4G1957VNGL"
};

// Initialize Firebase (safe: prevents duplicate initialization)
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized (DEMO):", app.name);
} catch (error: any) {
    if (error.code === "app/duplicate-app") {
        console.warn("Firebase already initialized — using existing instance.");
        app = getApp();
    } else {
        console.error("Firebase initialization error:", error);
        throw error;
    }
}

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
