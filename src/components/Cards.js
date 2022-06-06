class Card {
  constructor({name, link, owner, _id, likes}, cardSelector,  countSelector, handleOpenCard, handleDeleteCard, handleLikeClick, likeClick){
    this._link = link;
    this._name = name;
    this._id = _id;
    this._owner = owner
    this._likes = likes
    this._cardSelector = cardSelector;
    this._countSelector = countSelector;
    this._handleOpenCard = handleOpenCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._likeClick = likeClick;
  }
 
  _setEventListeners() {
    this._element.querySelector('.element__group-like').addEventListener('click', () => {this._handleLikeClick(this)});
    this._element.querySelector('.element__group-basket').addEventListener('click', () => {this._handleDeleteCard(this._id)});
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
    const cardImg = this._element.querySelector('.element__mask-group');
    cardImg.src = this._link;
    cardImg.id = this._id;
    cardImg.alt = this._name;
    cardImg.owner = this._owner;
    cardImg.likes = this._likes;
    cardImg.likes.forEach(like => {
        if (like._id = 'a3c3f0e79fadb5ca5e905285') {
          this._element.querySelector('.element__group-like').classList.add('element__group-like_active')
  }
      });
    this._element.querySelector('.element__group-text').textContent = this._name;
    if (cardImg.owner._id === 'a3c3f0e79fadb5ca5e905285') {
      this._element.querySelector('.element__group-basket').classList.add('element__group-basket_active')
    }
    this._setEventListeners();
    return this._element
  } 
};

export {Card};