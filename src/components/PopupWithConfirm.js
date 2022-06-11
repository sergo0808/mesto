import Popup from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonDelete = this._form.querySelector('.popup__submit-confirm');
  }

  close(){
    super.close();
    this._form.reset();

  }

  setSubmitHanlder(callback) {
    this._handleSubmit = callback;
    
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      this._handleSubmit();

    });
  }
}