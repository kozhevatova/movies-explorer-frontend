import './App.css';
import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Switch, useHistory } from 'react-router';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnLanding, setIsOnLanding] = useState(false);

  const handleLoginClick = () => {
    setIsOnLanding(false);
    localStorage.setItem('isHeaderAndFooterVisible', false);
  };

  const handleRegisterClick = () => {
    setIsOnLanding(false);
    localStorage.setItem('isHeaderAndFooterVisible', false);
  }

  const handleLogoClick = () => {
    setIsOnLanding(true);
    localStorage.setItem('isHeaderAndFooterVisible', true);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isHeaderAndFooterVisible', true);
    history.push('/movies');
  }

  const handleRegister = () => {
    localStorage.setItem('isHeaderAndFooterVisible', false);
    history.push('/signin');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOnLanding(true);
  }

  return (
    <div className="App">
      {JSON.parse(localStorage.getItem('isHeaderAndFooterVisible')) && <Header isLoggedIn={isLoggedIn} isOnLanding={isOnLanding} onLogoClick={handleLogoClick}
        onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile name="Имя пользователя" handleLogout={handleLogout}/>
        </Route>
        <Route exact path="/signin">
          <Login onLogoClick={handleLogoClick} onLogin={handleLogin}/>
        </Route>
        <Route exact path="/signup">
          <Register onLogoClick={handleLogoClick} onRegister={handleRegister}/>
        </Route>
      </Switch>

      {JSON.parse(localStorage.getItem('isHeaderAndFooterVisible')) && <Footer />}
    </div>
  );
}

export default App;
