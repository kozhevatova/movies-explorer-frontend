import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  }
  return(
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={handleGoBack}>Назад</button>
    </section>
  );
}

export default NotFoundPage;