import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(cardElement, popupSelector){
    super(popupSelector)
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open(){
    super.open();
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._captionElement.textContent = this._name;   
  }
  
}