import './AboutProject.css';
import Info from '../Info/Info';

const AboutProject = () => {
  return (
    <Info title="О проекте" linkId="about-project" type="project">
      <ul className="project-info">
        <li className="project-info__item project-info__item_phase">
          <p className="project-info__text project-info__text_type_title">Дипломный проект включал 5 этапов</p>
        </li>
        <li className="project-info__item project-info__item_phase-descr">
          <p className="project-info__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project-info__item project-info__item_timing">
          <p className="project-info__text project-info__text_type_title">На выполнение диплома ушло 5 недель</p>
        </li>
        <li className="project-info__item project-info__item_timing-descr">
          <p className="project-info__text">У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project-info__scale">
        <div className="project-info__period">
          <p className="project-info__text">1 неделя</p>
        </div>
        <p className="project-info__text project-info__text_type_back">Back-end</p>
        <div className="project-info__period">
          <p className="project-info__text">4 недели</p>
        </div>
        <p className="project-info__text project-info__text_type_front">Front-end</p>
      </div>
    </Info>
  );
};

export default AboutProject;