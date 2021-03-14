import { NavLink } from 'react-router-dom';
import './NavTab.css';

const NavTab = () => {
  return (
    <div className="navtab">
      <nav className="navtab__container">
        <ul className="navtab__list">
          <li className="navtab__item">
            <a href="#about-project" className="navtab__link">О проекте</a>
          </li>
          <li className="navtab__item">
            <a href="#techs" className="navtab__link">Технологии</a>
          </li>
          <li className="navtab__item">
            <a href="#about-student" className="navtab__link">Студент</a>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default NavTab;