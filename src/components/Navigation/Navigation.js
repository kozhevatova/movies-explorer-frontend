import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return(
    <nav className="nav">
      <NavLink to="/movies" className="nav__link nav__link_active">Фильмы</NavLink>
      <NavLink to="/saved-movies" className="nav__link">Сохраненные фильмы</NavLink>
    </nav>
  );
};

export default Navigation;