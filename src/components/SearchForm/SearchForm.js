import { useState } from 'react';
import { movieInput, shortFilmCheckbox } from '../../utils/constants';
import './SearchForm.css';

const SearchForm = ({ handleSearchSubmit, handleTumblerClick }) => {
  const [movie, setMovie] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(movie, isChecked);
  }

  //запись в стейт текущие значения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case movieInput: setMovie(e.target.value);
        break;
      case shortFilmCheckbox: {
        setIsChecked(e.target.checked);
        handleTumblerClick(e.target.checked, movie);
        break;
      }
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__input" placeholder="Фильм" required value={movie}
          onChange={handleInputChange} name="movieInput"></input>
        <button type="submit" className="search__button">Поиск</button>
      </form>
      <label className="search__tumbler">
        <input type="checkbox" name="shortFilmCheckbox" className="search__checkbox"
          checked={isChecked} onChange={handleInputChange}></input>
        <span className="search__slider"></span>
        <span className="search__label-text">Короткометражки</span>
      </label>
    </div>

  );
};

export default SearchForm;