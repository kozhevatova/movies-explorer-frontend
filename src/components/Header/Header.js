import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// import accountImg from '../../images/accountIcon.svg';

const Header = ({ pathname, isLoggedIn, onLogoClick, onLoginClick, onRegisterClick,
  handleMenuOpen, handleOnSavedMoviesClick }) => {
  const headerClassName = (
    `header 
      ${(pathname === '/movies' || pathname === '/saved-movies' || pathname==='/profile') && 'header_logged-in'}
      ${(pathname === '/signin' || pathname === '/signup') && 'header_invisible'}
      `
  )
  return (
    <header className={headerClassName}>
      <div className="header__container">
        <NavLink to="/" className="header__logo" onClick={onLogoClick} />
        {
          !isLoggedIn && pathname === '/' ?
            <nav className="header__options">
              <NavLink to="/signup" className="header__option header__option_to-register"
                onClick={onRegisterClick}>Регистрация</NavLink>
              <NavLink to="/signin" className="header__option header__option_to-login"
                onClick={onLoginClick}>Войти</NavLink>
            </nav> :
            <div className="header__nav">
              <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick} />
            </div>
        }
        {isLoggedIn && <button className="header__menu-btn" type="button" onClick={handleMenuOpen}></button>}
      </div>
    </header>
  );
}

export default Header;