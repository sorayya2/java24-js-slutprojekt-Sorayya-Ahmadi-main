import { fetchMovies, searchMoviesOrPersons } from "./api.js";
import { displayMovies, displayPersons } from "./render.js";
import { handleSort } from "./sort.js";

const topRatedBtn = document.getElementById("topRatedBtn");
const popularBtn = document.getElementById("popularBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieList = document.getElementById("movieList");
const personList = document.getElementById("personList");
const movieHeading = document.getElementById("movieHeading");
const personHeading = document.getElementById("personHeading");
const sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", () => 
    handleSort(sortSelect, currentMovies, currentPersons, displayMovies, displayPersons, movieList, personList)
);

  let currentMovies = [];
  let currentPersons = [];

topRatedBtn?.addEventListener("click", () => {
    fetchMovies("top_rated").then(data => {
            currentMovies = data.results.slice(0, 10);
            displayMovies(currentMovies, movieList);
            personHeading.innerHTML= '';
            movieHeading.style.display = "block";
            personHeading.style.display = "none";
    });
});

popularBtn?.addEventListener("click", () => {
    fetchMovies("popular").then(data => {
        currentMovies = data.results.slice(0, 10);
        displayMovies(currentMovies, movieList);
        personList.innerHTML ='';
        movieHeading.style.display = "block";
        personHeading.style.display = "none";
    });
});


searchBtn?.addEventListener("click", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
  
    try {
      const data = await searchMoviesOrPersons(query);
  
      const movies = data.results.filter(item => item.media_type === "movie");
      const persons = data.results.filter(item => item.media_type === "person");
  
      currentMovies = movies;
      currentPersons = persons;
  
      movieList.innerHTML = '';
      personList.innerHTML = '';
  
      if (movies.length > 0) {
        displayMovies(movies, movieList);
        movieHeading.style.display = "block";
      } else {
        movieHeading.style.display = "none";
        alert("Inga filmer hittades.");
      }

  
      if (persons.length > 0) {
        displayPersons(persons, personList);
        personHeading.style.display = "block";
      } else {
        personHeading.style.display = "none";
        alert("Inga personer hittades.");
      }
    } catch (err) {
      console.error("Fel vid sökning:", err);
      alert("loding");
    }
  });
  
