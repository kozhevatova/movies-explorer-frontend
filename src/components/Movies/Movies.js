import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ movies, handleSearchSubmit, handleTumblerClick, saveMovie, deleteMovie, isFound,
  isRequestDone, amountToRender, handleMoreBtnClick, isMoreBtnVisible, isLoading, isDisabled }) => {

  const onMoreBtnClick = () => {
    handleMoreBtnClick(amountToRender);
  }

  return (
    <section className="movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit} handleTumblerClick={handleTumblerClick} isDisabled={isDisabled} />
      <MoviesCardList movieList={movies} isOnSavedPage={false} saveMovie={saveMovie} deleteMovie={deleteMovie}
        isFound={isFound} isRequestDone={isRequestDone} amountToRender={amountToRender} isLoading={isLoading} />
      {isMoreBtnVisible && <button className="movies__more-btn" type="button" onClick={onMoreBtnClick}>Ещё</button>}
    </section>
  );
};

export default Movies;