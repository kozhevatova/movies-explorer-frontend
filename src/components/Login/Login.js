import AuthForm from '../AuthForm/AuthForm';
import { loginType } from '../../utils/constants';
import './Login.css';

const Login = ({ onLogoClick, onLogin }) => {
  return (
    <section className="login">
      <AuthForm
        onLogoClick={onLogoClick}
        greeting="Рады видеть!"
        isNameVisible={false}
        buttonText="Войти"
        handleSubmit={onLogin}
        captionText="Еще не зарегистированы? "
        route="/signup"
        navLinkText="Регистрация"
        type={loginType}
      />
    </section>
  );
};

export default Login;