// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn2oYfGBKtIGVqZYW0JnvhGK9T99wM6uo",
  authDomain: "wordmemorizer-5bbc2.firebaseapp.com",
  projectId: "wordmemorizer-5bbc2",
  storageBucket: "wordmemorizer-5bbc2.appspot.com",
  messagingSenderId: "425923280427",
  appId: "1:425923280427:web:c6f9cae2c0d157808db46e",
  measurementId: "G-N38SV9MHRG"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export { app, database, auth }