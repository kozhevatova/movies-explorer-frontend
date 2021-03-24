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
import { searchMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { failMessage, movieSearchFailedMessage, registerSuccessMessage, updateSuccessMessage } from '../../utils/constants';

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
  const [isRequestDone, setIsRequestDone] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      Promise.all([
        mainApi.getMovies(jwt),
        mainApi.getUserInfo(jwt)
      ]).then((values) => {
        const [savedMovies, userInfo] = values;
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);
        setCurrentUser(userInfo);
        if (localStorage.getItem('beatFilmMovies')) {
          setBeatfilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
        }
        console.log('init', savedMovies)
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

  const updateMovies = (movies) => {
    const moviesWithSavedOnes = movies.map((movie) => {
      const savedItem = savedMovies.find((m) => m.movieId === movie.id);
      if (savedItem) {
        return savedItem;
      } else {
        return movie;
      }
    });
    localStorage.setItem('movies', JSON.stringify(moviesWithSavedOnes));
    setMovies(JSON.parse(localStorage.getItem('movies')));
  };

  // поиск фильма по ключевым словам и фильтр короткометражек
  const searchPromise = (query, isShortFilm) => {

    return new Promise((resolve, reject) => {
      if (beatfilmMovies.length === 0) {
        moviesApi.getBeatFilmMovies()
          .then((movies) => {
            localStorage.setItem('beatFilmMovies', JSON.stringify(movies));
            setBeatfilmMovies(movies);
            resolve(searchMovies(movies, query, isShortFilm));
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } else {
        resolve(searchMovies(beatfilmMovies, query, isShortFilm));
      }
    });
  }

  const searchInSavedPromise = (query, isShortFilm) => {
    return new Promise((resolve, reject) => {
      if(savedMovies) {
        resolve(searchMovies(savedMovies, query, isShortFilm))
      } else {
        reject(movieSearchFailedMessage);
      }
    });
  }

  // обработка поискового запроса
  const handleSearch = (query, isShortFilm) => {
    searchPromise(query, isShortFilm)
      .then((res) => {
        if (res && res.length > 0) {
          setIsFound(true);
          localStorage.setItem('movies', JSON.stringify(res));
          updateMovies(JSON.parse(localStorage.getItem('movies')));
        } else {
          setIsFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestDone(true);
      });
  }

  const handleSearchInSaved = (query, isShortFilm) => {
    searchInSavedPromise(query, isShortFilm)
      .then((res) => {
        console.log(res);
        if (res && res.length > 0) {
          setIsFound(true);
          setSavedMovies(res);
        } else {
          setIsFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestDone(true);
      })
  }

  // обработчик переключения тумблера короткометражки
  const handleTumblerClick = (isChecked, movie) => {
    setIsShortFilm(isChecked);
    if (movies.length > 0) {
      const shortFilms = searchMovies(movies, movie, isChecked);
      setShortMovies(shortFilms);
    }
  }

  // сохранение фильма в личном кабинете
  const saveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);
    if (!isSaved) {
      mainApi.saveMovie(jwt, movie)
        .then((movie) => {
          setMovies(movies.map((m) => m.id === movie.movieId ? movie : m));
          const newSavedMovies = [movie, ...localSavedMovies];
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          setSavedMovies(newSavedMovies);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log('saved', savedMovies.length)
        });
    }
  }

  // // удаление фильма из сохраненных
  const deleteMovie = (movieId, movie) => {
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    console.log(movie);
    mainApi.deleteMovieFromSaved(jwt, movieId)
      .then((deletedMovie) => {
        const newMovies = localSavedMovies.filter((movie) => movie._id !== deletedMovie._id);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        setSavedMovies(newMovies);
        setMovies(movies.map((movie) => movie._id === movieId ? beatfilmMovies.find((m) => m.id === movie.movieId) : movie));
      })
      .then(() => {
        console.log(movies);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('after delete', savedMovies.length);
      });
  }

  // сброс фильмов после поиска и отображение всех сохраненных фильмов
  const handleOnSavedMoviesClick = () => {
    const localSavedMovies = localStorage.getItem('savedMovies');
    if(localSavedMovies) {
      setIsFound(true);
      setSavedMovies(JSON.parse(localSavedMovies));
    }
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

  // попап при ошибках в работе api
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

  // авторизация
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

  // регистрация
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

  // выход из аккаунта
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({})
    enterLanding();
    localStorage.removeItem('jwt');
    history.push('/');
  }

  // обработчик обновления данных пользователя
  const handleEditProfile = (email, name) => {
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUserInfo(jwt, email, name)
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          openInfoPopup(updateSuccessMessage);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header pathname={location.pathname} isLoggedIn={isLoggedIn} isOnLanding={isOnLanding} onLogoClick={handleLogoClick}
          onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
          handleOnSavedMoviesClick={handleOnSavedMoviesClick}/>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute exact path="/movies" component={Movies} isLoggedIn={isLoggedIn} movies={isShortFilm ? shortFilms : movies}
            handleSearchSubmit={handleSearch} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie}
            isFound={isFound} isRequestDone={isRequestDone} />
          <ProtectedRoute exact path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} movies={savedMovies}
            handleSearchSubmit={handleSearchInSaved} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie} deleteMovie={deleteMovie}
            isFound={isFound} isRequestDone={isRequestDone} />
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

        <Menu handleMenuClose={closeAllPopups} isOpen={isMenuOpen} handleOnSavedMoviesClick={handleOnSavedMoviesClick} />
        <InfoPopup closePopup={closeAllPopups} isOpen={isInfoPopupOpen} isFailed={isRegisterFailed} message={popupMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
