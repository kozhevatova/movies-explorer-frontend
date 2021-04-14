import { shortMovieDuration } from "./constants";

const convertMinToHours = (min) => {
  return `${Math.floor(min/60)}ч${min % 60}м`
}

const checkMovieTitle = (movie, query) => {
  return movie.nameRU.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()) ||
    (movie.nameEN && movie.nameEN.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()));
}

const checkIfIsShort = (movie) => {
  return movie.duration <= shortMovieDuration;
}

const searchMovies = (movies,query) => {
  const queryArr = query.toLowerCase().trim().split(' ');
  const result = movies.filter((movie) => {
    for(let i = 0; i < queryArr.length; i++) {
      if(!checkMovieTitle(movie, queryArr[i])) {
        return false;
      } 
    }
    return true;
  });
  return result;
}


export { convertMinToHours, searchMovies, checkIfIsShort };