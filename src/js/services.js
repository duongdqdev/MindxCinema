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
  getDocs,
  getDoc,
  setDoc,
  addDoc,
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
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
    }

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

    if (!user && path.includes("post.html")) {
      window.location.replace("/login.html");
      return;
    }

    if (callback) callback(user);
  });
};

const getCurrentUser = async () => {
  return new Promise((resolve) => {
    const unsubscribe = AuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
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

const SearchMovies = async (text) => {
  try {
    const querySnapshot = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${text}&language=vi-VN&page=1&include_adult=false&api_key=${window.ENV.API_KEY}`,
    );

    return querySnapshot.json();
  } catch (err) {
    console.error("Lỗi khi tìm kiếm phim:", err);
  }
};

const postMovie = async (movieData) => {
  try {
    await addDoc(collection(db, "mymovie"), movieData);
  } catch (err) {
    console.error("Lỗi khi thêm phim:", err);
  }
};

export {
  Login,
  Register,
  LoginWithGoogle,
  SignOut,
  getCurrentUser,
  getMovies,
  SearchMovies,
  postMovie,
};
