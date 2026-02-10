import { initializeApp, getApps, getApp } from "firebase/app";
import firebaseCompat from "firebase/compat/app";
import { Platform } from "react-native";
import { getAuth } from "firebase/auth";
import { initializeFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0a9CZyAWuLWVRd8GRiHY9UKsTmqdXHV8",
  authDomain: "telanganayathri-fc185.firebaseapp.com",
  projectId: "telanganayathri-fc185",
  storageBucket: "telanganayathri-fc185.firebasestorage.app",
  messagingSenderId: "33965579848",
  appId: "1:33965579848:web:a9b6643ed150f9f5f0027d",
  measurementId: "G-SCQXZFT1WG"
};

// Initialize Firebase once for native + web.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Ensure compat default app exists for web reCAPTCHA helper.
if (Platform.OS === "web" && !firebaseCompat.apps.length) {
  firebaseCompat.initializeApp(firebaseConfig);
}

// Auth for Expo Go (no react-native persistence import).
const auth = getAuth(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: Platform.OS !== "web",
});
const rtdb = getDatabase(app);

const checkFirebaseConnection = async () => {
  try {
    const pingRef = doc(db, "app_meta", "ping");
    await getDoc(pingRef);
    return { ok: true, message: "Firestore reachable" };
  } catch (error: any) {
    const code = error?.code || "unknown";
    const detail = error?.message || "";
    console.warn("[Firebase] Firestore check error", { code, detail, error });
    if (code === "permission-denied" || code === "not-found") {
      return { ok: true, message: `Firestore reachable (${code})` };
    }
    if (code === "invalid-argument") {
      return {
        ok: false,
        message: `Firestore error: invalid-argument ${detail}`.trim(),
      };
    }
    return { ok: false, message: `Firestore error: ${code} ${detail}`.trim() };
  }
};

export { app, auth, db, rtdb, firebaseConfig, checkFirebaseConnection };