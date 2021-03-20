import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// import accountImg from '../../images/accountIcon.svg';

const Header = ({ isLoggedIn, isOnLanding, onLogoClick, onLoginClick, onRegisterClick,
  handleMenuOpen,handleOnMainClick, handleOnMoviesClick, handleOnAccountClick }) => {
  return (

    <header className={`header ${isLoggedIn && !isOnLanding && 'header_logged-in'}`}>
      <div className="header__container">
        <NavLink to="/" className="header__logo" onClick={onLogoClick} />
        {
          isLoggedIn ?
            <div className="header__nav">
              <Navigation handleOnMainClick={handleOnMainClick} handleOnMoviesClick={handleOnMoviesClick} 
                handleOnAccountClick={handleOnAccountClick}/>
            </div> :
            <nav className="header__options">
              <NavLink to="/signup" className="header__option header__option_to-register"
                onClick={onRegisterClick}>Регистрация</NavLink>
              <NavLink to="/signin" className="header__option header__option_to-login"
                onClick={onLoginClick}>Войти</NavLink>
            </nav>
        }
        {isLoggedIn && <button className="header__menu-btn" type="button" onClick={handleMenuOpen}></button>}
      </div>
    </header>
  );
}

export default Header;