import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input, el) => {
      this._formValues[`text${el}`] = input.value;
    });
    return this._formValues;
  } 

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); 
    });

  }
}