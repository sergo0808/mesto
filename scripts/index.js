import { initialCards, Card, enableValidation } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector(".popup_type_edit"); 
const profileButton = document.querySelector(".profile__info-button"); 
const profileButtonClose = document.querySelector(".popup__close-button-edit"); 
const popupFormElement = document.querySelector(".popup__container"); 
const profileNameInput = document.querySelector(".popup__input_name_active"); 
const profileJobInput = document.querySelector(".popup__input_job_active"); 
const profileInfoName = document.querySelector(".profile__info-name"); 
const profileInfoJob = document.querySelector(".profile__info-job");
const cardsButtonAdd = document.querySelector('.profile__add-button'); 
const cardsButtonClose = document.querySelector(".close-button-add"); 
const popupAdd = document.querySelector(".popup_type_add"); 
const popupFormElementAdd = popupAdd.querySelector(".popup__container-add"); 
const nameInputAdd = document.querySelector(".popup__input_name_add"); 
const linkInputAdd = document.querySelector(".popup__input_link_add");
const containerElement = document.querySelector('.elements'); 
const popupImg = document.querySelector('.popup_type_image'); 
const formElementImg = popupImg.querySelector('.popup__container_image'); 
const imgButtonClose = popupImg.querySelector(".popup__close-button_image"); 
const imgElement = popupImg.querySelector(".popup__image"); 
const popupCaption = popupImg.querySelector(".popup__caption");
const popups = Array.from(document.querySelectorAll('.popup'));
const profileFormValidator = new FormValidator(enableValidation, popupFormElement);
const addFormValidator =  new FormValidator(enableValidation, popupFormElementAdd);

function openPopup(popup) { 
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeOnEscape)
}; 

function closePopup(popup) { 
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeOnEscape);
}; 

function saveDataFormEdit(evt) { 
  evt.preventDefault(); 
  profileInfoName.textContent = profileNameInput .value; 
  profileInfoJob.textContent = profileJobInput.value;
  closePopup(popupEdit); 
};

initialCards.forEach(item => containerElement.append(createCard(item.name, item.link)));

function createCard(name, link, cardSelector){
  const card = new Card(name, link, '#element-teamplate')
  return card.generateCard();
}

const closeOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function renderCard (evt){
  evt.preventDefault();
  containerElement.prepend(createCard(nameInputAdd.value, linkInputAdd.value))
  nameInputAdd.value = "";
  linkInputAdd.value = "";
  closePopup(popupAdd);
};

profileButton.addEventListener("click", function(){
  profileNameInput.value = profileInfoName.textContent; 
  profileJobInput.value = profileInfoJob.textContent;
  profileFormValidator.clearError();
  openPopup(popupEdit);
}); 

profileButtonClose.addEventListener("click", function(){
  closePopup(popupEdit);
});

cardsButtonAdd.addEventListener("click", function(){
  addFormValidator.clearError();
  openPopup(popupAdd);
});

cardsButtonClose.addEventListener("click", function(){
  closePopup(popupAdd);
});

imgButtonClose.addEventListener("click", function(){
  closePopup(popupImg);
});

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

popupFormElement.addEventListener("submit", saveDataFormEdit); 
popupFormElementAdd.addEventListener("submit", renderCard)

export {openPopup, popupCaption, popupImg, imgElement}