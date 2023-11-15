import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export { app, database, auth }