import { useContext } from 'react';
import { convertMinToHours } from '../../utils/utils';
import { BASE_URL_MOVIE } from '../../utils/MoviesApi';
import './MoviesCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({ movie, image, nameRU, duration, isOnSavedPage, saveMovie, deleteMovie }) => {
  const currentUser = useContext(CurrentUserContext);
  const isSaved = movie.owner && movie.owner === currentUser._id;

  const handleSaveBtnClick = () => {
    if (isSaved) {
      deleteMovie(movie._id, movie);
    } else {
      saveMovie(movie);
    }
  }

  const handleDeleteBtnClick = () => {
    deleteMovie(movie._id, movie);
  }

  const saveButtonClassName = (
    `movies-card__button movies-card__button_type_save ${isSaved && 'movies-card__button_type_clicked-save'}`
  );

  return (
    <li className="movies-card">
      <a className="movies-card__image-link" href={movie.trailer} target="_blank" rel="noreferrer">
          <div className="movies-card__image" style={{ background: `center/cover url(${(isSaved && image) ? image : BASE_URL_MOVIE + image.url}) no-repeat` }}></div>
        </a>
      <p className="movies-card__title">{nameRU}</p>
      {
        isOnSavedPage ?
          <button type="button" className="movies-card__button movies-card__button_type_delete"
            aria-label="Удалить фильм." onClick={handleDeleteBtnClick}></button> :
          <button type="button" className={saveButtonClassName} onClick={handleSaveBtnClick} aria-label="Сохранить фильм."></button>
      }
      <p className="movies-card__duration">{convertMinToHours(duration)}</p>
    </li>
  );
};

export default MoviesCard;