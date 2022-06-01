class Card {
  constructor({name, link, owner, _id}, cardSelector, handleOpenCard, handleDeleteCard){
    this._link = link;
    this._name = name;
    this._id = _id;
    this._owner = owner 
    this._cardSelector = cardSelector;
    this._handleOpenCard = handleOpenCard;
    this._handleDeleteCard = handleDeleteCard;
  }
 
  _setEventListeners() {
    this._element.querySelector('.element__group-like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__group-basket').addEventListener('click', () => { 
      this._handleDeleteCard(this._id);
    });
    
    this._element.querySelector('.element__mask-group').addEventListener('click', () => {
      this._handleOpenCard(this._name, this._link);
    });
  };
  
  _handleBasketClick() {
    this._element.remove();  
    this.element = null;
  };

  _handleDeleteCard(){
    console.log(this._id)
  }

  _handleLikeClick() {
    this._element.querySelector('.element__group-like').classList.toggle('element__group-like_active')
  };
  hiddenBasket() {
    this._element.querySelector('.element__group-basket').classList.add('element__group-basket_active');
  } 

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
    cardImg.id = this._id;
    cardImg.alt = this._name;
    cardImg.owner = this._owner;
    this._element.querySelector('.element__group-text').textContent = this._name;
    this._setEventListeners();
    if (cardImg.owner._id === 'a3c3f0e79fadb5ca5e905285') {
      this._element.querySelector('.element__group-basket').classList.add('element__group-basket_active')
    }
    return this._element
  } 
};

export {Card};