import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({ onRegister, isDisabled }) => {
  return(
    <section className="register">
      <AuthForm
      greeting="Добро пожаловать!"
      isNameVisible={true}
      buttonText="Зарегистрироваться"
      handleSubmit={onRegister}
      captionText="Уже зарегистрированы? "
      route="/signin"
      navLinkText="Войти"
      isDisabled={isDisabled}
    />
    </section>
    
  );
};

export default Register;