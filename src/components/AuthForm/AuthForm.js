import { NavLink } from 'react-router-dom';
import './AuthForm.css';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const AuthForm = ({ greeting, isNameVisible, buttonText, handleSubmit,
  captionText, route, navLinkText, isDisabled }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSubmit(values);
    }
  }

  return (
    <form className="auth" method="POST" onSubmit={onSubmit} noValidate>
      <NavLink to="/" className="auth__logo" />
      <h3 className="auth__greeting">{greeting}</h3>

      <div className="auth__inputs">
        {isNameVisible &&
          <div className="auth__name-area">
            <label className="auth__label">Имя</label>
            <input className={`auth__input ${errors && errors["name"] && 'auth__input_type_error'}`} 
            placeholder="Имя" name="name" required id="name-input" minLength="2" maxLength="30"  
            onChange={handleChange} disabled={isDisabled} />
            <span className="auth__input-error" id="name-input-error">
            {errors && errors["name"] && errors["name"]}
            </span>
          </div>
        }

        <label className="auth__label">Email</label>
        <input className={`auth__input ${errors && errors["email"] && 'auth__input_type_error'}`}
         placeholder="Email" type="email" name="email" required id="email-input" onChange={handleChange} disabled={isDisabled} 
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
        <span className="auth__input-error" id="email-input-error">
          {errors && errors["email"] && errors["email"]}
        </span>

        <label className="auth__label">Пароль</label>
        <input className={`auth__input ${errors && errors["password"] && 'auth__input_type_error'}`} placeholder="Пароль" type="password" minLength="8"
          required name="password" id="password-input" onChange={handleChange} disabled={isDisabled}  />
        <span className="auth__input-error" id="password-input-error">
        {errors && errors["password"] && errors["password"]}
        </span>
      </div>

      <button className="auth__submit-btn" type="submit" disabled={!isValid}>{buttonText}</button>
      <p className="auth__caption">{captionText}
        <NavLink to={route} className="auth__link">{navLinkText}</NavLink>
      </p>
    </form>
  );
};

export default AuthForm;