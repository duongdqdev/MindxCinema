import { Header } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
import "../../env.js";
import { getMovies } from "./services.js";

const movieTrendingEl = document.querySelector("#trending-movies");
const myMovieEl = document.querySelector("#my-movies");
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

const generateMyMovie = async () => {
  try {
    const res = await getMovies();
    console.log(res);

    let html = `<div class="container py-5">
        <h1>My movies</h1>
        <div class="d-flex gap-2 flex-wrap m-auto">`;
    res.forEach((item) => {
      html += `<a href="#" class="movie-card rounded-2 text-center">
            <img
              src="${item.thumbnail ?? "https://image.tmdb.org/t/p/w200/e0RU6KpdnrqFxDKlI3NOqN8nHL6.jpg"}"
              alt="thumbnail"
            />
            <p class="title-movie multiline-ellipsis-2 mt-2">
              ${item.title}
            </p>
          </a>`;
    });
    html += `</div>
      </div>`;

    myMovieEl.innerHTML = html;
  } catch (err) {
    console.error("Error:", err);
  }
};
generateMyMovie();
// // create
// db.collection("mymovie")
//   .doc()
//   .set({
//     title: "Los Angeles",
//     description: "CA",
//     director: "USA",
//     rating: 5.0,
//     thumbnail: "https://example.com/losangeles.jpg",
//     type: ["action", "drama"],
//     actor: ["Actor A", "Actor B"],
//   })
//   .then(() => {
//     console.log("Document successfully written!");
//   })
//   .catch((error) => {
//     console.error("Error writing document: ", error);
//   });
// // read
// db.collection("mymovie")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch((error) => {
//     console.log("Error getting documents: ", error);
//   });
