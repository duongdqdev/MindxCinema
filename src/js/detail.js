import { Header } from "../layout/header/Header.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const API_KEY = "94474c46fb0cb686198fedea860dbfe1";
const titleEl = document.querySelector("#title");
const backdrop = document.querySelector("#backdrop");

Header();

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    titleEl.innerText = data.title;
    backdrop.src = "https://image.tmdb.org/t/p/w200" + data.backdrop_path;
  });
