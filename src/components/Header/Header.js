import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// import accountImg from '../../images/accountIcon.svg';

const Header = ({ pathname, isLoggedIn, handleMenuOpen, handleOnSavedMoviesClick, handleOnMoviesClick }) => {
  const headerClassName = (
    `header 
      ${(pathname === '/movies' || pathname === '/saved-movies' || pathname==='/profile') && 'header_logged-in'}
      ${(pathname === '/signin' || pathname === '/signup') && 'header_invisible'}
      `
  )
  return (
    <header className={headerClassName}>
      <div className="header__container">
        <NavLink to="/" className="header__logo"/>
        {
          !isLoggedIn && pathname === '/' ?
            <nav className="header__options">
              <NavLink to="/signup" className="header__option header__option_to-register">Регистрация</NavLink>
              <NavLink to="/signin" className="header__option header__option_to-login">Войти</NavLink>
            </nav> :
            <div className="header__nav">
              <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick} handleOnMoviesClick={handleOnMoviesClick} />
            </div>
        }
        {isLoggedIn && <button className="header__menu-btn" type="button" onClick={handleMenuOpen}></button>}
      </div>
    </header>
  );
}

export default Header;