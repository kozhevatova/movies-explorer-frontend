import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({ onLogin }) => {
  return (
    <section className="login">
      <AuthForm
        greeting="Рады видеть!"
        isNameVisible={false}
        buttonText="Войти"
        handleSubmit={onLogin}
        captionText="Еще не зарегистированы? "
        route="/signup"
        navLinkText="Регистрация"
      />
    </section>
  );
};

export default Login;