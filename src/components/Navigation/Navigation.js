import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import accountImg from '../../images/accountIcon.svg';


const Navigation = ({handleOnMainClick, handleOnMoviesClick, handleOnAccountClick }) => {
  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isSavedMoviesClicked, setIsSavedMoviesClicked] = useState(false);
  const [isMainClicked, setIsMainClicked] = useState(false);

  const handleMoviesClick = () => {
    handleOnMoviesClick();
    setIsMoviesClicked(true);
    setIsSavedMoviesClicked(false);
    setIsMainClicked(false);
  }

  const handleSavedMoviesClick = () => {
    handleOnMoviesClick();
    setIsSavedMoviesClicked(true);
    setIsMoviesClicked(false);
    setIsMainClicked(false);
  }

  const handleMainClicked = () => {
    handleOnMainClick();
    setIsMainClicked(true);
    setIsSavedMoviesClicked(false);
    setIsMoviesClicked(false);
  }

  return (
    <nav className="nav">
      <div className="nav__options">
        <NavLink to="/" className={`nav__link nav__link_type_main ${isMainClicked && 'nav__link_active'}`}
          onClick={handleMainClicked}>Главная</NavLink>
        <div className="nav__movies">
          <NavLink to="/movies" className={`nav__link ${isMoviesClicked && 'nav__link_active'}`}
            onClick={handleMoviesClick}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={`nav__link ${isSavedMoviesClicked && 'nav__link_active'}`}
            onClick={handleSavedMoviesClick}>Сохраненные фильмы</NavLink>
        </div>
        <NavLink to="/profile" className="nav__account">
          <img className="nav__account-img" src={accountImg} alt="Аккаунт" onClick={handleOnAccountClick} />
          Аккаунт
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;