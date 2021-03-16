import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import accountImg from '../../images/accountIcon.svg';

const Header = ({ isLoggedIn, isOnLanding, onLogoClick, onLoginClick, onRegisterClick }) => {
  return (

    <header className={`header ${isLoggedIn && !isOnLanding && 'header_logged-in'}`}>
      <div className="header__container">
        <NavLink to="/" className="header__logo" onClick={onLogoClick} />
        {isLoggedIn && <Navigation />}
        <nav className="header__account">
          {isLoggedIn &&
            <NavLink to="/profile" className="header__link header__link_to-profile">
              <img className="header__account-img" src={accountImg} alt="Аккаунт" />
            Аккаунт
          </NavLink>}
          {!isLoggedIn && <NavLink to="/signup" className="header__link header__link_to-register"
            onClick={onRegisterClick}>Регистрация</NavLink>}
          {!isLoggedIn && <NavLink to="/signin" className="header__link header__link_to-login"
            onClick={onLoginClick}>Войти</NavLink>}
        </nav>
      </div>
    </header>
  );
}

export default Header;