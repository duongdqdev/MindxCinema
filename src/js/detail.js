import { Header } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
import "../../env.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const API_KEY = window.ENV.API_KEY;
const titleEl = document.querySelector("#title");
const backdrop = document.querySelector("#backdrop");

Header();
Footer();
fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    titleEl.innerText = data.title;
    backdrop.src = "https://image.tmdb.org/t/p/w200" + data.backdrop_path;
  });
