import '../pages/index.css'
import { Card } from "../components/Cards.js";
import { FormValidator, enableValidation} from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { data } from 'autoprefixer';
const profileButton = document.querySelector(".profile__info-button"); 
export const profileButtonClose = document.querySelector(".popup__close-button-edit"); 
const popupFormElement = document.querySelector(".popup__container"); 
const profileNameInput = document.querySelector(".popup__input_name_active"); 
const profileJobInput = document.querySelector(".popup__input_job_active"); 
const profileInfoName = document.querySelector(".profile__info-name"); 
const profileInfoJob = document.querySelector(".profile__info-job");
const cardsButtonAdd = document.querySelector('.profile__add-button'); 
const popupFormElementAdd = document.querySelector(".popup__container-add"); 
export const imgButtonClose = document.querySelector(".popup__close-button_image"); 
export const imgElement = document.querySelector(".popup__image"); 
export const popupCaption = document.querySelector(".popup__caption");
const profileFormValidator = new FormValidator(enableValidation, popupFormElement);
const addFormValidator =  new FormValidator(enableValidation, popupFormElementAdd);
const userData = new UserInfo(profileInfoName, profileInfoJob);
const imgPopup = new PopupWithImage('.popup_type_image')
const popupAdd = new PopupWithForm('.popup_type_add', addCard)
const popupEdit = new PopupWithForm('.popup_type_edit', saveDataFormEdit)
const popupConfirm = new PopupWithConfirm('.popup_type_confirm')

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '5a769756-07f6-441a-bbc2-3fc7a58dd4ed',
    'Content-Type': 'application/json',
  }
}

const api = new Api(config);
let cardList = {}
api.getInitialCards()
  .then(data => {
    console.log(data);
    cardList = new Section({
      items: data,
      renderer: (item) => {
        createCard(item); 
      }
    }, '.elements');
    cardList.renderItems();
  });

  let userId;

  api.UserInfo()
  .then(data => {
    profileInfoName.textContent = data.name
    profileInfoJob.textContent = data.about
    userId = data._id
})

function createCard(item) {  
  const card = new Card(item, "#element-teamplate", handleOpenCard, 
   (id) => { handleDeleteCard(item._id)}, 
   (item) => { handleLikeClick(item)}
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const handleLikeClick = (item) => {
  api.likeCardApi(item._id)
    .then((res) => { 
      let count = item._element.querySelector('.element__group-count')
      count.textContent = res.likes.length;
      item._element.querySelector('.element__group-like').classList.add('element__group-like_active')
      
  })
}


   function handleDeleteCard(id) {   
    popupConfirm.open();
    popupConfirm.deleteConfirm(   
      api.deleteCardApi(id)
        .then(id => {
        console.log('DELETE') 
        handleBasketClick();
    })
    );
    
  }

  function addCard(input) {
    api.addCardApi(input)
    .then(input => {
      createCard(input);
      popupAdd.close();
      
    }) 
  };

  function saveDataFormEdit(input) { 
    api.updateUserInfom(input)
     .then(input => {
       userData.setUserInfo(input.name, input.about);
       popupEdit.close();
     })
  };

profileButton.addEventListener("click", function(){
const user = userData.getUserInfo();
profileNameInput.value = user.name; 
profileJobInput.value = user.about; 
profileFormValidator.clearError();
popupEdit.open();
});   
  
cardsButtonAdd.addEventListener("click", function(){
  addFormValidator.clearError();
  popupAdd.open();
});


function handleOpenCard(name, link) {
  imgPopup.open(name, link);
};

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
imgPopup.setEventListeners();
popupConfirm.setEventListeners(); 

export {userId}