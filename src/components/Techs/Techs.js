import './Techs.css';
import Info from '../Info/Info';

const Techs = () => {
  return (
    <Info title="Технологии" linkId="techs" type="techs" content="Информация о технологиях.">
      <div className="techs">
        <h2 className="techs__title">Технологии</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили
        в дипломном проекте.</p>
        <ul className="techs__list">
          <p className="techs__item">HTML</p>
          <p className="techs__item">CSS</p>
          <p className="techs__item">JS</p>
          <p className="techs__item">React</p>
          <p className="techs__item">Git</p>
          <p className="techs__item">Express.js</p>
          <p className="techs__item">MongoDB</p>
        </ul>
      </div>
    </Info>
  );
};

export default Techs;