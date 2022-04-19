const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);   
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
      
  };
};

const showInputError = (formElement, inputElement, inputErrorClass,  errorClass, errorMessage) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
 
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass)
  errorElement.textContent = '';
  
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  };
};

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
  const buttonElement = formElement.querySelector(submitButtonSelector);

  setButtonState(inputList, buttonElement, inactiveButtonClass); 

  inputList.forEach(inputElement => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    setButtonState(inputList, buttonElement, inactiveButtonClass);   
  }); 
});
};

function enableValidation(el) {
  const forms = Array.from(document.querySelectorAll(el.formSelector));
  forms.forEach(formElement => setEventListeners(
    formElement,
    el.inputSelector,
    el.inputErrorClass,
    el.errorClass,
    el.submitButtonSelector,
    el.inactiveButtonClass
  ));
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
