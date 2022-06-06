class Card {
  constructor({name, link, owner, _id, likes}, cardSelector, handleOpenCard, handleDeleteCard, handleLikeClick){
    this._link = link;
    this._name = name;
    this._id = _id;
    this._owner = owner
    this._likes = likes
    this._cardSelector = cardSelector;
    this._handleOpenCard = handleOpenCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }
 
  _setEventListeners() {
    this._element.querySelector('.element__group-like').addEventListener('click', () => {this._handleLikeClick(this)});
    this._element.querySelector('.element__group-basket').addEventListener('click', () => {  this._handleDeleteCard(this._id)});
    this._element.querySelector('.element__mask-group').addEventListener('click', () => {this._handleOpenCard(this._name, this._link)});
  };
 
  handleBasketClick() {
    this._element.remove();  
    this._element = null;
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
    this._element.querySelector('.element__group-text').textContent = this._name;
    const cardImg = this._element.querySelector('.element__mask-group');
    cardImg.src = this._link;
    cardImg.id = this._id;
    
    cardImg.countSelector = this._countSelector
    cardImg.alt = this._name;
    cardImg.owner = this._owner;
    cardImg.likes = this._likes;
    cardImg.likes.forEach(like => {
      
      });
    
    if (cardImg.owner._id === 'a3c3f0e79fadb5ca5e905285') {
      this._element.querySelector('.element__group-basket').classList.add('element__group-basket_active')
    }
    this._setEventListeners();
    return this._element
  } 
};

export {Card};