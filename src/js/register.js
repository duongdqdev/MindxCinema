import { Header } from "../layout/header/Header.js";
const formEl = document.querySelector("#register-form");

Header();
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const username = formEl.username.value;
    const email = formEl.email.value;
    const pass = formEl.pwd.value;
    const cfm_pwd = formEl.confirm_pwd.value;

    const validate = () => {
      if (username === "" || email === "" || pass === "") {
        alert("Vui lòng nhập đủ thông tin");
        return false;
      }
      if (pass !== cfm_pwd) {
        alert("Mật khẩu không khớp!!!");
        return false;
      }
      return true;
    };

    if (validate()) {
      await auth.createUserWithEmailAndPassword(email, pass);
      alert("Đăng ký thành công!!!");
      window.location.href = "../pages/login.html";
    }
  } catch (error) {
    console.error("Error ==>", error);
  }
});
