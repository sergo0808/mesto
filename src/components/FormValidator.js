export class FormValidator {
  constructor(params, popupFormElement){
    this._formElement = popupFormElement;
    this._inputList = Array.from(popupFormElement.querySelectorAll(params.inputSelector));
    this._submitButton = popupFormElement.querySelector(params.submitButtonSelector);
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');  
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    };
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement  = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement  = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _setEventListeners() {
    this._setButtonState(); 
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setButtonState();        
      })
    }); 
  };

  enableValidation() {
    this._setEventListeners();
  }

  clearError() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._setButtonState();
  }
};

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

export {enableValidation};