import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({ handleMenuClose, isOpen, handleOnSavedMoviesClick, handleOnMoviesClick, onClick }) => {
  return (
    <section className={`menu ${isOpen && 'menu_opened'}`} onClick={onClick}>
      <div className="menu__area">
        <button className="menu__close-btn" onClick={handleMenuClose}></button>
        <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick} handleOnMoviesClick={handleOnMoviesClick} />
      </div>
    </section>
  );
};

export default Menu;