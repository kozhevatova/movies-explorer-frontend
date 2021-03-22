import { NavLink } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return(
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <NavLink to="/" className="not-found__link">Назад</NavLink>
    </section>
  );
}

export default NotFoundPage;