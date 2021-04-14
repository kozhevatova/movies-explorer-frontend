import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';
// import { v4 as uuidv4 } from 'uuid';
import './MoviesCardList.css';

const MoviesCardList = ({ movieList, isOnSavedPage, saveMovie, deleteMovie, isFound, isRequestDone,
  amountToRender, isLoading }) => {

  const moviesCardlistClassName = (
    `movies-cardlist 
    ${!isRequestDone && 'movies-cardlist_hidden'}`
  );

  return <>
    {isLoading && <Preloader />}
    <ul className={moviesCardlistClassName}>
      {/* {isLoading && <Preloader />} */}
      {
        isFound ? movieList.slice(0, amountToRender).map((movie) => {
          return <MoviesCard key={movie.nameRU} movie={movie} image={movie.image}
            nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
            saveMovie={saveMovie} deleteMovie={deleteMovie} />
        }) : <li className="movies-cardlist__not-found-text">Ничего не найдено</li>
      }
    </ul>
  </>

}

export default MoviesCardList;