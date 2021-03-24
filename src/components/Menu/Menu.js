import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({ handleMenuClose, isOpen, handleOnSavedMoviesClick}) => {
  return (
    <section className={`menu ${isOpen && 'menu_opened'}`}>
      <div className="menu__area">
        <button className="menu__close-btn" onClick={handleMenuClose}></button>
        <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick} />
      </div>
    </section>
  );
};

export default Menu;