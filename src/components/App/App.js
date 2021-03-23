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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { failMessage, registerSuccessMessage } from '../../utils/constants';

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
  const [currentUser, setCurrentUser] = useState({});
  const [isFound, setIsFound] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // получение всех фильмов с api beatfilms
  useEffect(() => {
    moviesApi.getBeatFilmMovies()
      .then((movies) => {
        setBeatfilmMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  // запись текущего юзера при логине
  useEffect(() => {
    console.log(isLoggedIn);
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      mainApi.getUserInfo(jwt)
        .then((res) => {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // проверка залогиген ли пользователь
  useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setCurrentUser({ email: res.email, name: res.name, _id: res._id });
              setIsLoggedIn(true);
              history.push('/movies');
            }
            else {
              setIsLoggedIn(false);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    }
    handleTokenCheck();
  }, [history]);

  // поиск фильма по ключевым словам и фильтр короткометражек
  const handleSearch = (query, isShortFilm) => {
    let result = [];
    if (beatfilmMovies.length === 0) {
      moviesApi.getBeatFilmMovies()
        .then((movies) => {
          setBeatfilmMovies(movies);
          result = searchMovies(movies, query, isShortFilm);
        })
        .catch((err) => console.log(err));
    } else {
      result = searchMovies(beatfilmMovies, query, isShortFilm);
    }
    if(result.length > 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
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
        setSavedMovies(savedMovies.filter((movie) => movie.id !== deletedMovie.id));
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
  const openInfoPopup = (message) => {
    setPopupMessage(message);
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

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data && data.token) {
          setCurrentUser({ email: data.email, name: data.name, _id: data._id })
          setIsLoggedIn(true);
          history.push('/movies');
        } else {
          setIsLoggedIn(false);
          history.push('/');
        }
      })
      .catch((err) => console.log(err.message));
  }

  const handleRegister = (email, password, name) => {
    auth.register(email, password, name)
      .then((res) => {
        console.log('res', res);
        if (res) {
          setIsRegisterFailed(false);
          openInfoPopup(registerSuccessMessage);
          handleLogin(email, password);
        } else {
          setIsRegisterFailed(true);
          openInfoPopup(failMessage);
        }
      })
      .catch((err) => {
        setIsRegisterFailed(true);
        openInfoPopup(failMessage);
        console.log(err.message);
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({})
    enterLanding();
    localStorage.removeItem('jwt');
    history.push('/');
  }

  const handleEditProfile = () => {
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header pathname={location.pathname} isLoggedIn={isLoggedIn} isOnLanding={isOnLanding} onLogoClick={handleLogoClick}
          onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
          handleOnMainClick={enterLanding} handleOnMoviesClick={leaveLanding} handleOnAccountClick={leaveLanding} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute exact path="/movies" component={Movies} isLoggedIn={isLoggedIn} movies={isShortFilm ? shortFilms : movies}
            handleSearchSubmit={handleSearch} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie} 
            isFound={isFound} />
          <ProtectedRoute exact path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} movies={savedMovies}
            handleSearchSubmit={handleSearch} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie} 
            isFound={isFound} />
          <ProtectedRoute exact path="/profile" component={Profile} isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleSubmit={handleEditProfile} />
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
        <InfoPopup closePopup={closeAllPopups} isOpen={isInfoPopupOpen} isFailed={isRegisterFailed} message={popupMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
