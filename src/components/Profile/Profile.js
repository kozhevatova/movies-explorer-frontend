import { NavLink } from 'react-router-dom';
import './Profile.css';

const Profile = ({ name, handleLogout }) => {
  return(
    <section className="profile">
      <h3>Привет, {name} !</h3>
      <input placeholder="Имя"></input>
      <input placeholder="Почта"></input>
      <button>Редактировать</button>
      <NavLink to="/" onClick={handleLogout}>Выйти из аккаунта</NavLink>
    </section>
  );
};

export default Profile;