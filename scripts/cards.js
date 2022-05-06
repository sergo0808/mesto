import {openPopup, popupCaption, popupImg, imgElement} from './index.js'

const initialCards = [
  {
    name: 'Чикаго',
    link: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1544&q=80'
  },
  {
    name: 'Нью Йорк',
    link: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1570521462033-3015e76e7432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

class Card {
  constructor(name, link, cardSelector){
    this._name = name;
    this._link = link;
  }
  _setEventListeners() {
    this._element.querySelector('.element__group-like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__group-basket').addEventListener('click', () => {
      this._handleBasketClick();
    });

    this._element.querySelector('.element__mask-group').addEventListener('click', () => {
      this._handleOpenCard();
    });
  };

  _handleBasketClick() {
    this._element.remove();  
  };

  _handleLikeClick() {
    this._element.querySelector('.element__group-like').classList.toggle('element__group-like_active')
  }; 

  _handleOpenCard() {
    const cardImg = this._element.querySelector('.element__mask-group');
    imgElement.src = cardImg.src;
    imgElement.alt = cardImg.alt;
    popupCaption.textContent = imgElement.alt ;
    openPopup(popupImg);
  };

  _getTemplate(){
    const cardElement = document
    .querySelector('#element-teamplate')
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImg = this._element.querySelector('.element__mask-group');
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._element.querySelector('.element__group-text').textContent = this._name;
    return this._element

  } 
};

export {initialCards, enableValidation, Card};