import Popup from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonDelete = this._form.querySelector('.popup__submit-confirm');
  }
  open(){
    super.open();
  }

  close() {
    super.close();
  }
  delete(handleSubmit) {
    this._handleSubmit = handleSubmit;
    
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._buttonDelete.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }

}