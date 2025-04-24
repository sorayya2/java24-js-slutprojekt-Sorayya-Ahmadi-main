export function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>Release: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        movieList.appendChild(movieElement);
    });
}

export function displayPersons(persons) {
    personList.innerHTML = '';
    persons.forEach(person => {
        const personElement = document.createElement("div");
        personElement.classList.add("person");
        personElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${person.profile_path}" alt="${person.name}">
            <h2>${person.name}</h2>
            <p>Popularity: ${person.popularity}</p>
            <p>Known for: ${person.known_for_department}</p>
            <div>
                <h3>Movies:</h3>
                <ul>
                    ${person.known_for.filter(item => item.media_type === "movie").map(item => `<li>Movie: ${item.title}</li>`).join('')}
                </ul>
                <h3>TV Shows:</h3>
                <ul>
                    ${person.known_for.filter(item => item.media_type === "tv").map(item => `<li>TV: ${item.name}</li>`).join('')}
                </ul>
            </div>
        `;
        personList.appendChild(personElement);
    });
}