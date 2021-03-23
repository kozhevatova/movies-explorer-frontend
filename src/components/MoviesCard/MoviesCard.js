import { useContext, useState } from 'react';
import { convertMinToHours } from '../../utils/utils';
import { BASE_URL_MOVIE } from '../../utils/MoviesApi';
import './MoviesCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({ movie, image, nameRU, duration, isOnSavedPage, saveMovie, deleteMovie }) => {
  const currentUser = useContext(CurrentUserContext);
  const isSaved  = movie.owner && movie.owner === currentUser._id;
  console.log(movie.nameRU,isSaved)
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
      <img className="movies-card__image" src={(isSaved && image) ? image : BASE_URL_MOVIE + image.url} alt={nameRU} />
      <p className="movies-card__title">{nameRU}</p>
      {
        isOnSavedPage ?
          <button type="button" className="movies-card__button movies-card__button_type_delete" onClick={handleDeleteBtnClick}></button> :
          <button type="button" className={saveButtonClassName} onClick={handleSaveBtnClick}></button>
      }
      <p className="movies-card__duration">{convertMinToHours(duration)}</p>
    </li>
  );
};

export default MoviesCard;