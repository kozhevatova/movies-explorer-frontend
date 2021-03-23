import AuthForm from '../AuthForm/AuthForm';
import { registerType } from '../../utils/constants';
import './Register.css';

const Register = ({ onLogoClick, onRegister }) => {
  return(
    <section className="register">
      <AuthForm
      onLogoClick={onLogoClick}
      greeting="Добро пожаловать!"
      isNameVisible={true}
      buttonText="Зарегистрироваться"
      handleSubmit={onRegister}
      captionText="Уже зарегистрированы? "
      route="/signin"
      navLinkText="Войти"
      type={registerType}
    />
    </section>
    
  );
};

export default Register;