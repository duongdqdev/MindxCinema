import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { auth, db } from "./config.js";

const provider = new GoogleAuthProvider();

const Login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.error("Lỗi trong quá trình đăng nhập:", err);
  }
};

const LoginWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;
    const user = response.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        email,
        role: "user",
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );

    window.location.href = "/";
    return {
      data: { token, user },
    };
  } catch (err) {
    console.error("Lỗi trong quá trình đăng nhập:", err);
  }
};

const Register = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const uid = response.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      role: "user",
      createdAt: serverTimestamp(),
    });
    return response;
  } catch (err) {
    console.error("Lỗi trong quá trình đăng ký:", err);
  }
};

const SignOut = async () => {
  try {
    await signOut(auth);
    window.location.href = "/";
  } catch (err) {
    console.error("Lỗi trong quá trình đăng xuất: ", err);
  }
};

const AuthStateChanged = (callback) => {
  const path = window.location.pathname;

  return onAuthStateChanged(auth, (user) => {
    if (user && path.includes("login.html")) {
      window.location.replace("/");
      return;
    }

    callback(user);
  });
};

const getMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "mymovie"));
    const movies = querySnapshot.docs.map((x) => {
      return { id: x.id, ...x.data() };
    });
    return movies;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu phim:", err);
  }
};

export {
  Login,
  Register,
  LoginWithGoogle,
  SignOut,
  AuthStateChanged,
  getMovies,
};
