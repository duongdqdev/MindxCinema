import { Header, user } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
Header();
Footer();
console.log(user);

document.getElementById("welcome").innerHTML =
  `Xin chào, ${user?.email ?? "Khách"}`;
