import FormValidator from '../components/FormValidator/FormValidator';
import { validationConfig, validationConfigForProfile } from './constants';

// включить валидацию формы
const validateForm = (form, config) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
  return formValidator;
};

const validateAuthForm = (form) => {
  return validateForm(form, validationConfig);
}

const validateProfileForm = (form) => {
  return validateForm(form, validationConfigForProfile);
}

const convertMinToHours = (min) => {
  return `${Math.floor(min/60)}ч${min % 60}м`
}

const checkMovieTitle = (movie, query) => {
  return movie.nameRU.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()) ||
    (movie.nameEN && movie.nameEN.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()));
}

const checkIfIsShort = (movie) => {
  return movie.duration <= 40;
}

const searchMovies = (movies,query, isShortFilm) => {
  const queryArr = query.toLowerCase().trim().split(' ');
  const result = movies.filter((movie) => {
    for(let i = 0; i < queryArr.length; i++) {
      if(!checkMovieTitle(movie, queryArr[i])) {
        return false;
      } 
    }
    if(isShortFilm) {
      return checkIfIsShort(movie);
    }
    return true;
  });
  return result;
}


export { validateAuthForm, validateProfileForm, convertMinToHours, searchMovies, checkIfIsShort };