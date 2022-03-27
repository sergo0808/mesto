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

let popupElement = document.querySelector(".popup-edit");
let infoButton = document.querySelector(".profile__info-button");
let closeButton = document.querySelector(".popup__close-button-edit");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_name_active");
let jobInput = document.querySelector(".popup__input_job_active");
let infoName = document.querySelector(".profile__info-name");
let infoJob = document.querySelector(".profile__info-job");
let addButton = document.querySelector('.profile__add-button');
let closeButtonadd = document.querySelector(".close-button-add");
let popupElementadd = document.querySelector(".popup-add");
let formElementadd = document.querySelector(".popup__container-add");
let nameInputadd = document.querySelector(".popup__input_name_add");
let linkInputadd = document.querySelector(".popup__input_link_add");
let elementTeamplate = document.querySelector('#element-teamplate').content;
let container = document.querySelector('.elements');
let popupElementImg = document.querySelector('.popup-image');
let formElementImg = popupElementImg.querySelector('.popup__container_image');
let closeButtonImg = popupElementImg.querySelector(".popup__close-button_image");
let Img = popupElementImg.querySelector(".popup__image");
let popupCaption = popupElementImg.querySelector(".popup__caption");

initialCards.forEach(function (element) {
  let CardsElement = elementTeamplate.cloneNode(true);
  let CardText = CardsElement.querySelector('.element__group-text');
  CardText.textContent = element.name;
  let CardImg = CardsElement.querySelector('.element__mask-group');
  CardImg.src  = element.link;
  CardImg.addEventListener('click', function(){
    popupCaption.textContent = CardText.textContent;
    Img.src = CardImg.src;
    openPopupImg();
  });

  CardsElement.querySelector('.element__group-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group-like_active');    
});

CardsElement.querySelector('.element__group-basket').addEventListener('click', function (evt) {
  evt.target.parentNode.remove();        
});

  container.append(CardsElement);
});

/* Форма редактирования  -  новое место */

function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = infoName.textContent;
  jobInput.value = infoJob.textContent;
};

function closePopup() {
  popupElement.classList.remove("popup_opened");
};

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoJob.textContent = jobInput.value;
  closePopup();
};

/* Форма  -  новое место */

function openPopupadd() {
  popupElementadd.classList.add("popup_opened");
};

function closePopupadd() {
  popupElementadd.classList.remove("popup_opened");
  nameInputadd.value = '';
  linkInputadd.value = '';
};

function AddPlace(evt) {
  evt.preventDefault();
  let CardsElement = elementTeamplate.cloneNode(true);
  let CardImg = CardsElement.querySelector('.element__mask-group');
  let CardTitle = CardsElement.querySelector('.element__group-text');
   CardTitle.textContent = nameInputadd.value; 
   CardImg.src = linkInputadd.value;
   CardImg.addEventListener('click', function(){
    popupCaption.textContent = CardText.textContent;
    Img.src = CardImg.src;
    openPopupImg();
  });


  CardsElement.querySelector('.element__group-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group-like_active');      
});

CardsElement.querySelector('.element__group-basket').addEventListener('click', function (evt) {
  evt.target.parentNode.remove();         
});

container.prepend(CardsElement);
  closePopupadd();
};

/* Popup с изображение */
function openPopupImg() {
  popupElementImg.classList.add("popup_opened");
};

function closePopupImg() {
  popupElementImg.classList.remove("popup_opened");
};

/* Обработчики */
infoButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandlerEdit);
addButton.addEventListener("click", openPopupadd);
closeButtonadd.addEventListener("click", closePopupadd);
formElementadd.addEventListener("submit", AddPlace);
closeButtonImg.addEventListener("click", closePopupImg);




