import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({ onLogoClick, onLogin }) => {
  return (
    <AuthForm
      onLogoClick={onLogoClick}
      greeting="Рады видеть!"
      isNameVisible={false}
      buttonText="Войти"
      handleSubmit={onLogin}
      captionText="Еще не зарегистированы? "
      route="/signup"
      navLinkText="Регистрация"
    />
  );
};

export default Login;