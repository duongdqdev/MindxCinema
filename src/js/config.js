import "../../env.js";

const firebaseConfig = {
  apiKey: window.ENV.FIREBASE_KEY,
  authDomain: window.ENV.AUTH_DOMAIN,
  projectId: window.ENV.PROJECT_ID,
  storageBucket: window.ENV.STORAGE_BUCKET,
  messagingSenderId: window.ENV.MESS_SENT_ID,
  appId: window.ENV.APP_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
