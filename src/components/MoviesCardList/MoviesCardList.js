import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({ movieList, isOnSavedPage, saveMovie, deleteMovie }) => {
  return (<ul className="movies-cardlist">
    {
      movieList.map((movie) => {
        return <MoviesCard key={movie.id} movie={movie} image={movie.image && movie.image.url}
          nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
          saveMovie={saveMovie} deleteMovie={deleteMovie} />
      })
    }
  </ul>
  );
}

export default MoviesCardList;