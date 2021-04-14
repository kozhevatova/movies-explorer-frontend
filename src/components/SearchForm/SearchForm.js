import { useState } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import './SearchForm.css';

const SearchForm = ({ handleSearchSubmit, handleTumblerClick, isDisabled }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSearchSubmit(values.movie, isChecked); 
    }
  }

  //запись в стейт текущие значения инпутов при вводе
  const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        handleTumblerClick(e.target.checked, values.movie);
  }
  
  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input className={`search__input ${errors && errors["movie"] && 'search__input_type_error'}`} 
        placeholder="Фильм" required onChange={handleChange} name="movie" type="text" disabled={isDisabled}></input>
        <span className="search__input-error">
          {errors && errors["movie"] && errors["movie"]}
        </span>
        <button type="submit" className="search__button" disabled={!isValid}>Поиск</button>
      </form>
      <label className="search__tumbler">
        <input type="checkbox" name="shortFilmCheckbox" className="search__checkbox"
          checked={isChecked} onChange={handleCheckboxChange} disabled={isDisabled}></input>
        <span className="search__slider"></span>
        <span className="search__label-text">Короткометражки</span>
      </label>
    </div>

  );
};

export default SearchForm;