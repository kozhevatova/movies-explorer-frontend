import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = ({ movies, handleSearchSubmit, handleTumblerClick, saveMovie, deleteMovie, isFound, isRequestDone }) => {
  return (
    <section className="saved-movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit} handleTumblerClick={handleTumblerClick} />
      <MoviesCardList movieList={movies} isOnSavedPage={true} saveMovie={saveMovie} deleteMovie={deleteMovie}
        isFound={isFound} isRequestDone={isRequestDone} />
    </section>
  );
};

export default SavedMovies;