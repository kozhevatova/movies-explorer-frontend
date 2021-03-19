import SearchForm from '../SearchForm/SearchForm';
import { initialCards } from '../../utils/initialCards';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return(
    <section className="movies">
      <SearchForm />
      <MoviesCardList cardList={initialCards} isOnSavedPage={false} />
      <button className="movies__more-btn" type="button">Ещё</button>
    </section>
  );
};

export default Movies;