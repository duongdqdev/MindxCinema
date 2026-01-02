import { Header } from "../layout/header/Header.js";

const formEl = document.querySelector("#login-form");
const btnLoginWithGG = document.querySelector("#login-with-google");
Header();
formEl.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const email = formEl.email.value;
    const pass = formEl.pwd.value;
    const validate = () => {
      if (email === "" || pass === "") {
        alert("Vui lòng nhập đủ thông tin!!!");
        return false;
      }
      return true;
    };

    if (validate()) {
      const login = await auth.signInWithEmailAndPassword(email, pass);
      alert("Chào mừng " + login.user.email);
    }
  } catch (err) {
    console.error("Error ==>", err);
  }
});

btnLoginWithGG.addEventListener("click", async () => {
  try {
    const result = await auth.signInWithPopup(provider);
    alert("Đăng nhập thành công: " + result.user.displayName);
  } catch (err) {
    console.log("Error ==>", err);
  }
});

// const formEl = document.getElementById("sign-in-with-gg");

// formEl.addEventListener("click", (e) => {
//   e.preventDefault();

//   (async () => {
//     try {
//       const result = await auth.signInWithPopup(provider);
//       const user = result.user;
//       console.log("Đăng nhập thành công:", user);
//       alert(`Xin chào ${user.displayName}`);
//     } catch (err) {
//       console.log("Error ==>", err);
//     }
//   })();
// });
