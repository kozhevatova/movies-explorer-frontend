import './AboutMe.css';
import Info from '../Info/Info';
import myPhoto from '../../images/myPhoto.jpg';

const AboutMe = () => {
  return (
    <Info title="Студент" linkId="about-student" type="student" content="Информация о студенте.">
      <div className="student-info">
        <h2 className="student-info__title">Анна</h2>
        <p className="student-info__subtitle">Фронтенд-разработчик, 29 лет</p>
        <p className="student-info__text">Я родилась и живу в Москве, закончила факультет товароведения 
        в РЭУ им. Плеханова. У меня есть муж и двое сыновей. В свободное время люблю заниматься йогой и 
        читать детективы. Несколько лет работала в сфере маркетинга. Но тут в моей жизни появилось программирование. 
        До сих пор удивляюсь, как можно было раньше заниматься чем-то другим. </p>
        <ul className="student-info__links">
          <li>
            <a className="student-info__link" href="https://www.facebook.com/anna.kozhevatova/"
              target="_blank" rel="noreferrer">Facebook</a>
          </li>
          <li>
            <a className="student-info__link" href="https://github.com/kozhevatova"
              target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
        <img className="student-info__photo" src={myPhoto} alt="Фото студента." />
      </div>
    </Info>
  );
};

export default AboutMe;