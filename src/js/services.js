import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { auth } from "./config.js";

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

export { Login, Register, LoginWithGoogle, SignOut, AuthStateChanged };
