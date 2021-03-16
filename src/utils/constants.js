const emailInput = 'emailInput';
const passwordInput = 'passwordInput';
const nameInput = 'nameInput';

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

export { emailInput, passwordInput, nameInput, validationConfig, validationConfigForProfile };