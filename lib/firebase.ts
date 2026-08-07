import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Flag connection database Firebase (Dinonaktifkan / Diputuskan atas permintaan)
const IS_FIREBASE_CONNECTED = false;

const app = IS_FIREBASE_CONNECTED && !getApps().length ? initializeApp(firebaseConfig) : (getApps().length ? getApp() : null);
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : (null as any);
export const auth = app ? getAuth(app) : (null as any);

// Helper to check if Firebase is configured & connected
export const isFirebaseConfigured = () => {
  if (!IS_FIREBASE_CONNECTED) return false;
  return Boolean(firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey);
};

// Test connection on boot
export async function testFirebaseConnection() {
  if (!isFirebaseConfigured() || !db) {
    console.log('Sambungan database Firebase Firestore diputuskan.');
    return false;
  }
  try {
    await getDocFromServer(doc(db, 'settings', 'main_settings'));
    console.log('Firebase Firestore connected successfully.');
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn('Firebase Firestore connection check:', msg);
    return false;
  }
}

