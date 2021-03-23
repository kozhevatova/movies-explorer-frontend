import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { emailInput, nameInput } from '../../utils/constants';
import { validateProfileForm } from '../../utils/utils';
import './Profile.css';

const Profile = ({ handleLogout, handleSubmit }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const formRef = useRef();

  useEffect(() => {
    validateProfileForm(formRef.current).enableValidation();
  }, []);

  //запись в стейт текущие значения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case nameInput: setName(e.target.value);
        break;
      case emailInput: setEmail(e.target.value);
        break;
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      return;
    }
    handleSubmit();
  }
  return (
    <section className="profile">
      <form className="profile__form" method="POST" onSubmit={onSubmit} ref={formRef}>
        <h3 className="profile__greeting">Привет, {currentUser.name} !</h3>
        <div className="profile__inputs">
          <p className="profile__text profile__text_type_name">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__input profile__input_type_name" placeholder="Имя" id="name-input"
              name="nameInput" value={name} onChange={handleInputChange} minLength="2" maxLength="30" required></input>
            <span className="profile__input-error" id="name-input-error"></span>
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__input profile__input_type_email" type="email" placeholder="Почта"
              id="email-input" value={email} name="emailInput" onChange={handleInputChange} required
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"></input>
            <span className="profile__input-error" id="email-input-error"></span>
          </div>
          <p className="profile__text profile__text_type_email">Почта</p>
        </div>
        <button type="submit" className="profile__button">Редактировать</button>
        <NavLink to="/" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</NavLink>
      </form>
    </section>
  );
};

export default Profile;