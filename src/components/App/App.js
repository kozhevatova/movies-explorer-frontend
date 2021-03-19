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
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Menu from '../Menu/Menu';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnLanding, setIsOnLanding] = useState(false);
  const [isHeaderAndFooterVisible, setIsHeaderAndFooterVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsOnLanding(false);
    setIsHeaderAndFooterVisible(false);
  };

  const handleRegisterClick = () => {
    setIsOnLanding(false);
    setIsHeaderAndFooterVisible(false);
  }

  const handleLogoClick = () => {
    setIsOnLanding(true);
    setIsHeaderAndFooterVisible(true);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsHeaderAndFooterVisible(true);
    history.push('/movies');
  }

  const handleRegister = () => {
    setIsHeaderAndFooterVisible(false);
    history.push('/signin');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOnLanding(true);
    setIsHeaderAndFooterVisible(true);
    history.push('/');
  }

  const handleEditProfile = () => {

  }

  const handleOnMainClick = () => {
    setIsOnLanding(true);
  }

  const handleOnMoviesClick = () => {
    setIsOnLanding(false);
  }

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div className="App">
      {isHeaderAndFooterVisible && <Header isLoggedIn={isLoggedIn} isOnLanding={isOnLanding} onLogoClick={handleLogoClick}
        onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
        handleOnMainClick={handleOnMainClick} handleOnMoviesClick={handleOnMoviesClick} />}

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
          <Profile userName="Имя пользователя" handleLogout={handleLogout} handleSubmit={handleEditProfile} />
        </Route>
        <Route exact path="/signin">
          <Login onLogoClick={handleLogoClick} onLogin={handleLogin} />
        </Route>
        <Route exact path="/signup">
          <Register onLogoClick={handleLogoClick} onRegister={handleRegister} />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {isHeaderAndFooterVisible && <Footer />}
      <Menu handleMenuClose={closeMenu} isOpen={isMenuOpen} handleOnMainClick={handleOnMainClick} 
        handleOnMoviesClick={handleOnMoviesClick}/>
    </div>
  );
}

export default App;
