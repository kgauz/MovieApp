import Movie from "./movie.js";

await Movie.create({
  movieID: "tt1375666",
  title: "Inception",
  poster_url: "/xyz.jpg",
  searchText: "inception",
});