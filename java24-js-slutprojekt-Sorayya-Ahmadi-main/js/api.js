const API_KEY = "03dfc4d5b6137c8bf396b4f19f3cb80e";
const BASE_URL = "https://api.themoviedb.org/3";


export async function fetchMovies(category) {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=sv-SE&page=1`);
    
    if (!response.ok) {
        throw new Error("Något gick fel!");
    }
    
    const data = await response.json();
    return data;  
}


export function searchMoviesOrPersons(query) {
    if (!query.trim()) {
      return Promise.resolve({ results: [] });
    }
  
    return fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(query)}&page=1`)
      .then(res => {
        if (!res.ok) throw new Error("Något gick fel vid sökningen!");
        return res.json();
      });
  }




















