import './AboutProject.css';
import Info from '../Info/Info';

const AboutProject = () => {
  return (
    <Info title="О проекте" linkId="about-project" type="project">
      <ul className="project-info">
        <li className="project-info__item">
          <p className="project-info__item-title">Дипломный проект включал 5 этапов</p>
        </li>
        <li className="project-info__item">
          <p className="project-info__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project-info__item">
          <p className="project-info__item-title">На выполнение диплома ушло 5 недель</p>
        </li>
        <li className="project-info__item">
          <p className="project-info__item-text">У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
    </Info>
  );
};

export default AboutProject;