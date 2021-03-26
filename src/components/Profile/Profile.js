import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const Profile = ({ handleLogout, handleSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSubmit(values);
    }
  }
  return (
    <section className="profile">
      <form className="profile__form" method="POST" onSubmit={onSubmit} noValidate>
        <h3 className="profile__greeting">Привет, {currentUser.name} !</h3>
        <div className="profile__inputs">
          <p className="profile__text profile__text_type_name">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__input profile__input_type_name" placeholder="Имя" id="name-input"
              name="name" onChange={handleChange} value={values.name} minLength="2" maxLength="30" required></input>
            <span className="profile__input-error" id="name-input-error">
              {errors && errors["name"] !== "" && errors["name"]}
            </span>
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__input profile__input_type_email" type="email" placeholder="Почта"
              id="email-input" name="email" onChange={handleChange} value={values.email} required
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"></input>
            <span className="profile__input-error" id="email-input-error">
              {errors && errors["email"] !== "" && errors["email"]}
            </span>
          </div>
          <p className="profile__text profile__text_type_email">Почта</p>
        </div>
        <button type="submit" className="profile__button" disabled={!isValid}>Редактировать</button>
        <NavLink to="/" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</NavLink>
      </form>
    </section>
  );
};

export default Profile;