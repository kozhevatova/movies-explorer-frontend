import { NavLink } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ onLogoClick, greeting, isNameVisible, buttonText, handleSubmit,
   captionText, route, navLinkText }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  }
  
  return (
    <form className="auth" onSubmit={onSubmit}>
      <NavLink to="/" className="auth__logo" onClick={onLogoClick} />
      <h3 className="auth__greeting">{greeting}</h3>
      {isNameVisible && <input className="auth__input" placeholder="Имя"></input>}
      <input className="auth__input" placeholder="Email"></input>
      <input className="auth__input" placeholder="Пароль"></input>
      <button type="submit">{buttonText}</button>
      <p className="auth__caption">{captionText}
        <NavLink to={route} className="auth__link">{navLinkText}</NavLink>
      </p>
    </form>
  );
};

export default AuthForm;