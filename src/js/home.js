import { Header } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
import "../../env.js";

const movieTrendingEl = document.querySelector("#trending-movies");

const API_KEY = window.ENV.API_KEY;

Header();
Footer();
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((item) => {
      movieTrendingEl.innerHTML += `
      <a href="./src/pages/detail.html?id=${
        item.id
      }" class="movie-card rounded-2 text-center">
            <img
              src="https://image.tmdb.org/t/p/w200${item.poster_path}"
              alt="thumbnail"
            />
            <p class="title-movie multiline-ellipsis-2 mt-2">
              ${item?.title ?? "Chưa có tiêu đề"}
            </p>
          </a>`;
    });
  });
