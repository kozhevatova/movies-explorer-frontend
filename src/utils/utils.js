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

export { validateAuthForm, validateProfileForm, convertMinToHours };