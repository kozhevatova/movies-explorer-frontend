import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMoviesClicked, setIsMoviesClicked] = useState(true);
  const [isSavedMoviesClicked, setIsSavedMoviesClicked] = useState(false);

  const handleMoviesClick = () => {
    setIsMoviesClicked(true);
    setIsSavedMoviesClicked(false);
  }

  const handleSavedMoviesClick = () => {
    setIsSavedMoviesClicked(true);
    setIsMoviesClicked(false);
  }

  return(
    <nav className="nav">
      <NavLink to="/movies" className={`nav__link ${ isMoviesClicked && 'nav__link_active'}`}
        onClick={handleMoviesClick}>Фильмы</NavLink>
      <NavLink to="/saved-movies" className={`nav__link ${ isSavedMoviesClicked && 'nav__link_active'}`}
        onClick={handleSavedMoviesClick}>Сохраненные фильмы</NavLink>
    </nav>
  );
};

export default Navigation;