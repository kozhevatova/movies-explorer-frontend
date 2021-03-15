import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import './Main.css';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

const Main = () => {
  return (
    <main>
        <Promo />
        <NavTab />
        <AboutProject/>
        <Techs/>
        <AboutMe/>
    </main>
  );
};

export default Main;