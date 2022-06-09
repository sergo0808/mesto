import "../pages/index.css";
import { Card } from "../components/Cards.js";
import {
  FormValidator,
  enableValidation,
} from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";
import { PopupWithConfirm } from "../components/PopupWithConfirm";
import { data } from "autoprefixer";
const profileButton = document.querySelector(".profile__info-button");
export const profileButtonClose = document.querySelector(".popup__close-button-edit");
const profileButtonAvatar = document.querySelector(".profile__avatar-container");
const popupFormElement = document.querySelector(".popup__container");
const profileNameInput = document.querySelector(".popup__input_name_active");
const profileJobInput = document.querySelector(".popup__input_job_active");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoJob = document.querySelector(".profile__info-job");
const profileAvatar = document.querySelector(".profile__avatar")
const cardsButtonAdd = document.querySelector(".profile__add-button");
const popupFormElementAdd = document.querySelector(".popup__container-add");
const popupFormElementAvatar = document.querySelector(".popup__container-avatar");
const popupSubmitAdd = document.querySelector(".popup__submit-add");
const popupSubmitEdit = document.querySelector(".popup__submit-edit");
const popupSubmitAvatat = document.querySelector(".popup__submit-avatar");
export const imgButtonClose = document.querySelector(".popup__close-button_image");
export const imgElement = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
const profileFormValidator = new FormValidator(
  enableValidation,
  popupFormElement
);
const addFormValidator = new FormValidator(
  enableValidation,
  popupFormElementAdd
);

const avatarFormValidator = new FormValidator(
  enableValidation,
  popupFormElementAvatar
);
const userData = new UserInfo(profileInfoName, profileInfoJob);
const userAvatar = new UserInfo (profileAvatar);
const imgPopup = new PopupWithImage(".popup_type_image");
const popupAdd = new PopupWithForm(".popup_type_add", addCard);
const popupEdit = new PopupWithForm(".popup_type_edit", saveDataFormEdit);
const popupAvatar = new PopupWithForm(".popup_type_avatar", saveDataFormAvatar);
const popupConfirm = new PopupWithConfirm(".popup_type_confirm");
const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "5a769756-07f6-441a-bbc2-3fc7a58dd4ed",
    "Content-Type": "application/json",
  },
};
const api = new Api(config);
let cardList = {};
api.getInitialCards()
.then((data) => {
  console.log(data);
  cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        createCard(item);
      },
    },
    ".elements"
  );
  cardList.renderItems();
})
.catch((res) => {console.log(res)});
let userId;

api.UserInfo()
.then((data) => {
  userId = data._id;
  profileInfoName.textContent = data.name;
  profileInfoJob.textContent = data.about;
  profileAvatar.src = data.avatar;
})
.catch((res) => {console.log(res)})


function createCard(item) {
  const card = new Card(
    item,
    "#element-teamplate",
    handleOpenCard,
    handleDeleteCard,
    handleLikeClick,
    handleLikeClickDrop
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const handleLikeClick = (item) => {
  api.likeCardApi(item._id)
  .then((res) => {
    let count = item._element.querySelector(".element__group-count");
    count.textContent = res.likes.length
    item._element.querySelector(".element__group-like").classList.add("element__group-like_active")})
  .catch((res) => {console.log(res)})
};

const handleLikeClickDrop = (item) => {
  api.likeCardApiDrop(item._id).then((res) => {
    let count = item._element.querySelector(".element__group-count");
    count.textContent = res.likes.length
    item._element.querySelector(".element__group-like").classList.remove("element__group-like_active")})
  .catch((res) => {console.log(res)})
};

function handleDeleteCard(id) {
  popupConfirm.open();
  popupConfirm.deleteConfirm(
    api.deleteCardApi(id)
    .then((id) => {
      console.log("DELETE");
      handleBasketClick()})
      .catch((res) => {console.log(res)})) 
}

function renderLoading(isLoading, savebutton, popup) {
  if(isLoading) {
    savebutton.textContent  = 'Сохранение...'
  } else {
    savebutton.textContent  = 'Сохранить'
    popup.close(); 
  }
}

function addCard(input) {
  renderLoading(true, popupSubmitAdd, popupAdd);
  api.addCardApi(input)
    .then((input) => {createCard(input)})
    .catch((res) => {console.log(res)})
    .finally(() => {renderLoading(false, popupSubmitAdd, popupAdd)})
}


function saveDataFormAvatar(avatar) {
  renderLoading(true, popupSubmitAvatat, popupAvatar);
  api.updateAvatarApi(avatar)
  .then((avatar) => {
    console.log(avatar)
    profileAvatar.src = avatar.avatar;
    userAvatar.setUserAvatar(avatar)})
  .catch((res) => {console.log(res)})
  .finally(() => {renderLoading(false, popupSubmitAvatat, popupAvatar)})
}

function saveDataFormEdit(input) {
  renderLoading(true, popupSubmitEdit, popupEdit);
  api.updateUserInfom(input)
  .then((input) => {
    userData.setUserInfo(input.name, input.about)})
    .catch((res) => {console.log(res)})
    .finally(() => {renderLoading(false, popupSubmitEdit, popupEdit)})
  
}

profileButtonAvatar.addEventListener("click", function () {
  avatarFormValidator.clearError();
  popupAvatar.open();
});

profileButton.addEventListener("click", function () {
  const user = userData.getUserInfo();
  profileNameInput.value = user.name;
  profileJobInput.value = user.about;
  profileFormValidator.clearError();
  popupEdit.open();
});

cardsButtonAdd.addEventListener("click", function () {
  addFormValidator.clearError();
  popupAdd.open();
});

function handleOpenCard(name, link) {
  imgPopup.open(name, link);
}

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
popupAdd.setEventListeners();
imgPopup.setEventListeners();
popupConfirm.setEventListeners();
export { userId };