import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({movies, handleSearchSubmit, handleTumblerClick, saveMovie, deleteMovie}) => {
  return(
    <section className="movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit} handleTumblerClick={handleTumblerClick}/>
      <MoviesCardList movieList={movies} isOnSavedPage={false} saveMovie={saveMovie} deleteMovie={deleteMovie}/>
      <button className="movies__more-btn" type="button">Ещё</button>
    </section>
  );
};

export default Movies;