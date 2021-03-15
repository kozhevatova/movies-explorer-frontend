import './Portfolio.css';

const Portfolio = () => {
  return(
    <section className="portfolio">
      <div className="portfolio__container">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__links">
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://kozhevatova.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
              Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://annakin.students.nomoreparties.space" target="_blank" rel="noreferrer">
              Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://freespeech2025.com" target="_blank" rel="noreferrer">
              Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;