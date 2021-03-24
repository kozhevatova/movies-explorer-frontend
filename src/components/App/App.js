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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);

  // для фильмов
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isFoundInMovies, setIsFoundInMovies] = useState(false);
  const [isFoundInSavedMovies, setIsFoundInSavedMovies] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [isRequestInSavedDone, setIsRequestInSavedDone] = useState(false);
  const [amountToRender, setAmountToRender] = useState(0);
  // const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const [isOnSavedPage, setIsOnSavedPage] = useState(false);

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
    // очистка фильмов последнего поиска в хранилище
    localStorage.removeItem('movies');
  }, [history]);

  // useEffect(() => {
  //   const localMovies = JSON.parse(localStorage.getItem('movies'));
  //   const moviesToRender = movies.slice(0,amountToRender);
  //   console.log(moviesToRender);
  //   // console.log(movies);
  // }, [movies,amountToRender])

  // обновление найденных фильмов с учетом сохраненных
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
    setMovies(moviesWithSavedOnes);
    setAmountToRender(4);
  };

  // поиск фильма среди всех по ключевым словам и фильтр короткометражек
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
  // поиск фильма среди сохраненных по ключевым словам и фильтр короткометражек
  const searchInSavedPromise = (query, isShortFilm) => {
    return new Promise((resolve, reject) => {
      if (savedMovies) {
        resolve(searchMovies(savedMovies, query, isShortFilm))
      } else {
        reject(movieSearchFailedMessage);
      }
    });
  }

  // обработчик поиска по всем фильмам
  const handleSearchInMovies = (query, isShortFilm) => {
    searchPromise(query, isShortFilm)
      .then((res) => {
        if (res && res.length > 0) {
          setIsFoundInMovies(true);
          localStorage.setItem('movies', JSON.stringify(res));
          updateMovies(res);
          setIsMoreBtnVisible(res.length > amountToRender);
        } else {
          setIsFoundInMovies(false);
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

  // обработчик поиска по сохраненным фильмам
  const handleSearchInSaved = (query, isShortFilm) => {
    searchInSavedPromise(query, isShortFilm)
      .then((res) => {
        if (res && res.length > 0) {
          setIsFoundInSavedMovies(true);
          setSavedMovies(res);
        } else {
          setIsFoundInSavedMovies(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestInSavedDone(true);
      })
  }

  const handleSearch = (query, isShortFilm) => {
    isOnSavedPage ? handleSearchInSaved(query, isShortFilm) : handleSearchInMovies(query, isShortFilm);
  }

  // фильтр короткометражек в фильмах
  const filterShortFilms = (isChecked) => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      if (isChecked) {
        const shortFilms = movies.filter((m) => m.duration <= 40);
        setMovies(shortFilms);
      } else {
        setMovies(localMovies);
      }
    }
    setIsRequestDone(true);
  }

  // фильтр короткометражек в сохраненных фильмах
  const filterShortFilmsInSaved = (isChecked) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (localSavedMovies && localSavedMovies.length > 0) {
      setIsFoundInSavedMovies(true);
      if (isChecked) {
        const shortFilms = savedMovies.filter((m) => m.duration <= 40);
        setSavedMovies(shortFilms);
      } else {
        setSavedMovies(localSavedMovies);
      }
    }
    setIsRequestInSavedDone(true);
  }

  // обработчик переключения тумблера короткометражки
  const handleTumblerClick = (isChecked, movie) => {
    if (isOnSavedPage) {
      localStorage.setItem('isTumblerInSavedOn', isChecked);
      filterShortFilmsInSaved(isChecked);
    }
    else {
      localStorage.setItem('isTumblerInMoviesOn', isChecked);
      filterShortFilms(isChecked, movie);
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
    mainApi.deleteMovieFromSaved(jwt, movieId)
      .then((deletedMovie) => {
        const newMovies = localSavedMovies.filter((movie) => movie._id !== deletedMovie._id);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        setSavedMovies(newMovies);
        setMovies(movies.map((movie) => movie._id === movieId ? beatfilmMovies.find((m) => m.id === movie.movieId) : movie));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('after delete', savedMovies.length);
      });
  }

  // сброс фильмов после поиска и отображение всех сохраненных фильмов
  const handleOnSavedMoviesClick = () => {
    setIsOnSavedPage(true);
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (localSavedMovies && localSavedMovies.length > 0) {
      setIsFoundInSavedMovies(true);
      setIsRequestInSavedDone(true);
      setSavedMovies(localSavedMovies);
    }
  }

  const handleOnMoviesClick = () => {
    setIsOnSavedPage(false);
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      setIsRequestDone(true);
      setMovies(localMovies);
    }
  }

  useEffect(()=> {
    console.log('amount', amountToRender);
  }, [amountToRender])

  const handleMoreBtnClick = () => {
    const newAmount = amountToRender + Math.min((movies.length - amountToRender), 4);
    setAmountToRender(newAmount);
    if(movies.length - newAmount === 0) {
      setIsMoreBtnVisible(false);
    }
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
    setCurrentUser({});
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
        <Header pathname={location.pathname} isLoggedIn={isLoggedIn} handleMenuOpen={openMenu}
          handleOnSavedMoviesClick={handleOnSavedMoviesClick} handleOnMoviesClick={handleOnMoviesClick} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute exact path="/movies" component={Movies} isLoggedIn={isLoggedIn} movies={movies}
            handleSearchSubmit={handleSearch} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie}
            deleteMovie={deleteMovie} isFound={isFoundInMovies} isRequestDone={isRequestDone} amountToRender={amountToRender}
            handleMoreBtnClick={handleMoreBtnClick} isMoreBtnVisible={isMoreBtnVisible}/>
          <ProtectedRoute exact path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} movies={savedMovies}
            handleSearchSubmit={handleSearchInSaved} handleTumblerClick={handleTumblerClick} saveMovie={saveMovie}
            deleteMovie={deleteMovie} isFound={isFoundInSavedMovies} isRequestDone={isRequestInSavedDone} />
          <ProtectedRoute exact path="/profile" component={Profile} isLoggedIn={isLoggedIn} handleLogout={handleLogout}
            handleSubmit={handleEditProfile} />
          <Route exact path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>

        <Footer pathname={location.pathname} />

        <Menu handleMenuClose={closeAllPopups} isOpen={isMenuOpen} handleOnSavedMoviesClick={handleOnSavedMoviesClick}
          handleOnMoviesClick={handleOnMoviesClick} />
        <InfoPopup closePopup={closeAllPopups} isOpen={isInfoPopupOpen} isFailed={isRegisterFailed} message={popupMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
