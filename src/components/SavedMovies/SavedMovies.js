import { initialSavedCards } from '../../utils/initialCards';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => {
  return(
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cardList={initialSavedCards} isOnSavedPage={true} />
    </section>
  );
};

export default SavedMovies;