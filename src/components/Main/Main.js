import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import { Route } from 'react-router-dom';
import './Main.css';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

const Main = () => {
  return (
    <>
        <Promo />
        <NavTab />
        <AboutProject/>
        <Techs/>
        <AboutMe/>
    </>
  );
};

export default Main;