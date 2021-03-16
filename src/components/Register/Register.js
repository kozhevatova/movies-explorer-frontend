import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({ onLogoClick, onRegister }) => {
  return(
    <AuthForm
      onLogoClick={onLogoClick}
      greeting="Добро пожаловать!"
      isNameVisible={true}
      buttonText="Зарегистрироваться"
      handleSubmit={onRegister}
      captionText="Уже зарегистрированы? "
      route="/signin"
      navLinkText="Войти"
    />
  );
};

export default Register;