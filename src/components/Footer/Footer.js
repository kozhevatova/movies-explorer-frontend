import './Footer.css';

const Footer = () => {
  return(
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm</p>
        <div className="footer__info">
          <p className="footer__date">&copy; <span id="year">{new Date().getFullYear()}</span></p>
          <ul className="footer__links">
            <li className="footer__item">
              <a className="footer__link" href="https://praktikum.yandex.ru/" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com/kozhevatova" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://www.facebook.com/anna.kozhevatova/" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;