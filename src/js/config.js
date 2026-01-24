import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import "../../env.js";

const firebaseConfig = {
  apiKey: window.ENV.FIREBASE_KEY,
  authDomain: window.ENV.AUTH_DOMAIN,
  projectId: window.ENV.PROJECT_ID,
  storageBucket: window.ENV.STORAGE_BUCKET,
  messagingSenderId: window.ENV.MESS_SENT_ID,
  appId: window.ENV.APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
