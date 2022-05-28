class Card {
  constructor({name, link}, cardSelector, handleOpenCard){
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleOpenCard = handleOpenCard;
  }
 
  _setEventListeners() {
    this._element.querySelector('.element__group-like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__group-basket').addEventListener('click', () => {
      this._handleBasketClick();
    });
    this._element.querySelector('.element__mask-group').addEventListener('click', () => {
      this._handleOpenCard(this._name, this._link);
    });
  };
  
  _handleBasketClick() {
    this._element.remove();  
    this.element = null;
  };

  _handleLikeClick() {
    this._element.querySelector('.element__group-like').classList.toggle('element__group-like_active')
  }; 

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.element__mask-group');
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._element.querySelector('.element__group-text').textContent = this._name;
    this._setEventListeners();
    return this._element

  } 
};

export {Card};