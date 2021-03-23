import MoviesCard from "../MoviesCard/MoviesCard";
import { v4 as uuidv4 } from 'uuid';
import './MoviesCardList.css';
import { useEffect, useState } from "react";

const MoviesCardList = ({ movieList, isOnSavedPage, saveMovie, deleteMovie, isFound, isRequestDone }) => {
  const moviesCardlistClassName = (
    `movies-cardlist 
    ${!isRequestDone && !isOnSavedPage && 'movies-cardlist_hidden'}`
  );

  return <ul className={moviesCardlistClassName}>
    {
      isFound ? movieList.map((movie) => {
        return <MoviesCard key={uuidv4()} movie={movie} image={movie.image}
          nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
          saveMovie={saveMovie} deleteMovie={deleteMovie} />
      }) : <li className="movies-cardlist__not-found-text">Ничего не найдено</li>
    }
  </ul>
}

export default MoviesCardList;