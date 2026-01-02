const firebaseConfig = {
  apiKey: "AIzaSyCY8x85EKZwsnBBdxL7DHGSK_8ofzIlQ6Y",
  authDomain: "coffe-managerment-6a7f1.firebaseapp.com",
  projectId: "coffe-managerment-6a7f1",
  storageBucket: "coffe-managerment-6a7f1.firebasestorage.app",
  messagingSenderId: "745816815770",
  appId: "1:745816815770:web:53731e71434332409b8723",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
