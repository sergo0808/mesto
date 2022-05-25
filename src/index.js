
import './pages/index.css'
import { initialCards, Card, enableValidation } from "../scripts/cards.js";
import { FormValidator } from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/section.js";
import { UserInfo } from "../scripts/UserInfo.js";
const profileButton = document.querySelector(".profile__info-button"); 
export const profileButtonClose = document.querySelector(".popup__close-button-edit"); 
const popupFormElement = document.querySelector(".popup__container"); 
const profileNameInput = document.querySelector(".popup__input_name_active"); 
const profileJobInput = document.querySelector(".popup__input_job_active"); 
const profileInfoName = document.querySelector(".profile__info-name"); 
const profileInfoJob = document.querySelector(".profile__info-job");
const cardsButtonAdd = document.querySelector('.profile__add-button'); 
const cardsButtonClose = document.querySelector(".close-button-add"); 
const popupFormElementAdd = document.querySelector(".popup__container-add"); 
const nameInputAdd = document.querySelector(".popup__input_name_add"); 
const linkInputAdd = document.querySelector(".popup__input_link_add");
const containerElement = document.querySelector('.elements'); 
const popupImg = document.querySelector('.popup_type_image'); 
const formElementImg = popupImg.querySelector('.popup__container_image'); 
export const imgButtonClose = popupImg.querySelector(".popup__close-button_image"); 
export const imgElement = popupImg.querySelector(".popup__image"); 
export const popupCaption = popupImg.querySelector(".popup__caption");
const popups = Array.from(document.querySelectorAll('.popup'));
const profileFormValidator = new FormValidator(enableValidation, popupFormElement);
const addFormValidator =  new FormValidator(enableValidation, popupFormElementAdd);

console.log('Hello, World!') 

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item); 
  }
}, containerElement);
cardList.renderItems();

const popupEdit = new PopupWithForm('.popup_type_edit', saveDataFormEdit)

function saveDataFormEdit(evt) { 
  UserData.setUserInfo(profileNameInput, profileJobInput);
  popupEdit.close(); 
};

const UserData = new UserInfo({
  name: profileInfoName,
  job: profileInfoJob
});


const popupAdd = new PopupWithForm('.popup_type_add', addCard)

function createCard(item){
  const card = new Card(item,'#element-teamplate', {
    handleOpenCard: () => {
      const imgPopup = new PopupWithImage(item, '.popup_type_image')
      imgPopup.open();
      imgPopup.setEventListeners();   
    }        
  })
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);  
}

function addCard(item) {
  createCard(item);
  popupAdd.close();
  
}

profileButton.addEventListener("click", function(){
  const data = UserData.getUserInfo();
  profileNameInput.value = data.name; 
  profileJobInput.value = data.job; 
  profileFormValidator.clearError();
  popupEdit.open();
}); 

cardsButtonAdd.addEventListener("click", function(){
  addFormValidator.clearError();
  popupAdd.open();
});

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
