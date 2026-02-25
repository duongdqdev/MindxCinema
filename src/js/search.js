import { SearchMovies } from "./services.js";
import { Header } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
Header();
Footer();

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const resultsContainer = document.querySelector("#search-results");

const displayResults = (movies) => {
  resultsContainer.innerHTML = "";
  if (movies.length === 0) {
    resultsContainer.innerHTML = "<p>Không tìm thấy kết quả nào.</p>";
    return;
  }
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-item");
    movieEl.innerHTML = `
        <a href="./detail.html?id=${movie.id}" class="movie-card rounded-2 text-center">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} poster" />
        </a>
    `;
    resultsContainer.appendChild(movieEl);
  });
};

const performSearch = async () => {
  if (!query) {
    resultsContainer.innerHTML = "<p>Vui lòng nhập từ khóa tìm kiếm.</p>";
    return;
  }
  try {
    const movies = await SearchMovies(query);
    displayResults(movies.results);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm phim:", error);
    resultsContainer.innerHTML =
      "<p>Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.</p>";
  }
};

performSearch();
