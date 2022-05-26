import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open(name, link){
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;   
  }
  
}