const emailInput = 'emailInput';
const passwordInput = 'passwordInput';
const nameInput = 'nameInput';
const movieInput = 'movieInput';
const shortFilmCheckbox = 'shortFilmCheckbox';
const loginType = 'login';
const registerType = 'register';

const validationConfig = {
  inputSelector: '.auth__input',
  submitButtonSelector: '.auth__submit-btn',
  inactiveButtonClass: 'auth__submit-btn_disabled',
  inputErrorClass: 'auth__input_type_error',
  errorClass: 'auth__input-error_active',
  errorSelector: '.auth__input-error',
}

const validationConfigForProfile = {
  inputSelector: '.profile__input',
  submitButtonSelector: '.profile__button',
  inactiveButtonClass: 'profile__button_disabled',
  inputErrorClass: 'profile__input_type_error',
  errorClass: 'profile__input-error_active',
  errorSelector: '.profile__input-error',
}

const registerSuccessMessage = 'Вы успешно зарегистрированы!';
const failMessage = 'Произошла ошибка! Попробуйте ещё раз.';
const updateSuccessMessage = 'Данные успешно обновлены!';

export { emailInput, passwordInput, nameInput, movieInput, shortFilmCheckbox,
  validationConfig, validationConfigForProfile, loginType, registerType, 
registerSuccessMessage, failMessage, updateSuccessMessage};