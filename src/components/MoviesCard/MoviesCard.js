import { useState } from 'react';
import { convertMinToHours } from '../../utils/utils';
import './MoviesCard.css';

const MoviesCard = ({ image, nameRU, duration, isOnSavedPage }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSaveBtnClick = () => {
    setIsClicked(!isClicked);
  }

  const saveButtonClassName = (
    `movies-card__button movies-card__button_type_save ${isClicked && 'movies-card__button_type_clicked-save'}`
  );

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={image} alt={nameRU} />
      <p className="movies-card__title">{nameRU}</p>
      {
        isOnSavedPage ? 
          <button type="button" className="movies-card__button movies-card__button_type_delete"></button> :
          <button type="button" className={saveButtonClassName} onClick={handleSaveBtnClick}></button>
      }
      <p className="movies-card__duration">{convertMinToHours(duration)}</p>
    </li>
  );
};

export default MoviesCard;