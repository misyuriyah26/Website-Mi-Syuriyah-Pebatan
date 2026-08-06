import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Helper to check if Firebase is configured properly
export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey);
};

// Test connection on boot
export async function testFirebaseConnection() {
  if (!isFirebaseConfigured()) return false;
  try {
    await getDocFromServer(doc(db, 'settings', 'main_settings'));
    console.log('Firebase Firestore connected successfully.');
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.toLowerCase().includes('offline') || msg.toLowerCase().includes("didn't respond") || msg.toLowerCase().includes('could not reach')) {
      console.warn('Firebase Firestore client is offline or not reachable.');
    } else {
      console.warn('Firebase Firestore connection check:', msg);
    }
    return false;
  }
}
