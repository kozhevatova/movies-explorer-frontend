import { useState } from 'react';
import { convertMinToHours } from '../../utils/utils';
import { BASE_URL_MOVIE } from '../../utils/MoviesApi';
import './MoviesCard.css';

const MoviesCard = ({ movie, image, nameRU, duration, isOnSavedPage, saveMovie, deleteMovie}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSaveBtnClick = () => {
    setIsClicked(!isClicked);
    saveMovie(movie);
  }

  const handleDeleteBtnClick = () => {
    deleteMovie(movie._id);
  }

  const saveButtonClassName = (
    `movies-card__button movies-card__button_type_save ${isClicked && 'movies-card__button_type_clicked-save'}`
  );
  
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={BASE_URL_MOVIE + image} alt={nameRU} />
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