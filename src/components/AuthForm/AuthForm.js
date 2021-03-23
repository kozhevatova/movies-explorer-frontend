import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './AuthForm.css';
import { emailInput, passwordInput, nameInput, loginType, registerType } from '../../utils/constants';
import { validateAuthForm } from '../../utils/utils';

const AuthForm = ({ onLogoClick, greeting, isNameVisible, buttonText, handleSubmit,
  captionText, route, navLinkText, type }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef();

  useEffect(() => {
    validateAuthForm(formRef.current).enableValidation();
  }, []);

  //запись в стейт текущие значения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case nameInput: setName(e.target.value);
        break;
      case emailInput: setEmail(e.target.value);
        break;
      case passwordInput: setPassword(e.target.value);
        break;
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    switch (type) {
      case loginType: handleSubmit(email, password);
        break;
      case registerType: handleSubmit(email, password, name);
        break;
      default:
        console.log(`Нет такой формы ${type}`);
        break;
    }
  }

  return (
    <form className="auth" method="POST" onSubmit={onSubmit} ref={formRef}>
      <NavLink to="/" className="auth__logo" onClick={onLogoClick} />
      <h3 className="auth__greeting">{greeting}</h3>

      <div className="auth__inputs">
        {isNameVisible &&
          <div className="auth__name-area">
            <label className="auth__label">Имя</label>
            <input className="auth__input" placeholder="Имя" name="nameInput" required id="name-input"
              minLength="2" maxLength="30" value={name} onChange={handleInputChange} />
            <span className="auth__input-error" id="name-input-error"></span>
          </div>
        }

        <label className="auth__label">Email</label>
        <input className="auth__input" placeholder="Email" type="email" name="emailInput" required
          id="email-input" value={email} onChange={handleInputChange}
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
        <span className="auth__input-error" id="email-input-error"></span>

        <label className="auth__label">Пароль</label>
        <input className="auth__input" placeholder="Пароль" type="password" minLength="8"
          required name="passwordInput" id="password-input" value={password} onChange={handleInputChange} />
        <span className="auth__input-error" id="password-input-error"></span>
      </div>

      <button className="auth__submit-btn" type="submit">{buttonText}</button>
      <p className="auth__caption">{captionText}
        <NavLink to={route} className="auth__link">{navLinkText}</NavLink>
      </p>
    </form>
  );
};

export default AuthForm;