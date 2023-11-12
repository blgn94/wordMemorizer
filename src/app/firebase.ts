import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://wordmemorizer-ca304-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export { app, database, auth }