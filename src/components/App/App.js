import './App.css';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Menu from '../Menu/Menu';
import InfoPopup from '../InfoPopup/InfoPopup';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import { checkIfIsShort, searchMovies } from '../../utils/utils';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnLanding, setIsOnLanding] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shortFilms, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(false);

  // получение всех фильмов с api beatfilms
  useEffect(() => {
    moviesApi.getBeatFilmMovies()
      .then((movies) => {
        setBeatfilmMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  // поиск фильма по ключевым словам и фильтр короткометражек
  const handleSearch = (query, isShortFilm) => {
    const result = searchMovies(beatfilmMovies, query, isShortFilm);
    setMovies(result);
  }

  // обработчик переключения тумблера короткометражки
  const handleTumblerClick = (isChecked, movie) => {
    setIsShortFilm(isChecked);
    if (movies.length > 0) {
      const shortFilms = searchMovies(movies, movie, isChecked);
      setShortMovies(shortFilms);
    }
  }

  const saveMovie = (movie) => {
    mainApi.saveMovie(movie)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .then(() => {
        console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  const deleteMovie = (movieId) => {
    mainApi.deleteMovieFromSaved(movieId)
      .then((deletedMovie) => {
        setSavedMovies(savedMovies.filter((movie) => movie.id !== deleteMovie.id));
      })
      .then(() => {
        console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  const enterLanding = () => {
    setIsOnLanding(true);
  }

  const leaveLanding = () => {
    setIsOnLanding(false);
  }

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  // будет открываться при ошибках в работе api
  const openInfoPopup = () => {
    setIsInfoPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsMenuOpen(false);
    setIsInfoPopupOpen(false);
  }

  const handleLoginClick = () => {
    leaveLanding();
  };

  const handleRegisterClick = () => {
    leaveLanding();
  }

  const handleLogoClick = () => {
    enterLanding();
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push('/movies');
  }

  const handleRegister = () => {
    // статус регистрации будет получен от api
    setIsRegisterFailed(false);
    openInfoPopup();
    history.push('/signin');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    enterLanding();
    history.push('/');
  }

  const handleEditProfile = () => {

  }

  return (
    <div className="App">
      <Header pathname={location.pathname} isLoggedIn={isLoggedIn} isOnLanding={isOnLanding} onLogoClick={handleLogoClick}
        onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
        handleOnMainClick={enterLanding} handleOnMoviesClick={leaveLanding} handleOnAccountClick={leaveLanding} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies movies={isShortFilm ? shortFilms : movies} handleSearchSubmit={handleSearch} 
            handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie} />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies movies={savedMovies} handleSearchSubmit={handleSearch} 
            handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie}/>
        </Route>
        <Route exact path="/profile">
          <Profile userName="Анна" handleLogout={handleLogout} handleSubmit={handleEditProfile} />
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

      <Footer pathname={location.pathname} />

      <Menu handleMenuClose={closeAllPopups} isOpen={isMenuOpen} handleOnMainClick={enterLanding}
        handleOnMoviesClick={leaveLanding} handleOnAccountClick={leaveLanding} />
      <InfoPopup closePopup={closeAllPopups} isOpen={isInfoPopupOpen} isFailed={isRegisterFailed} />
    </div>
  );
}

export default App;
