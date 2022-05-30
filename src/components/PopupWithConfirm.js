import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleCardDelete){
    super(popupSelector);
    this._handleCardDelete = handleCardDelete.bind(this);
    this._form = this._popup.querySelector('.popup__form');
  }
  
  open(){
    super.open();
  }


  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      this._handleBasketClick()(this._handleBasketClick()()); 
    });


  }
}