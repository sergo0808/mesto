const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "5a769756-07f6-441a-bbc2-3fc7a58dd4ed",
    "Content-Type": "application/json",
  },
};

const profileButtonAvatar = document.querySelector(".profile__avatar-container");
const popupFormElement = document.querySelector(".popup__container");
const profileNameInput = document.querySelector(".popup__input_name_active");
const profileJobInput = document.querySelector(".popup__input_job_active");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoJob = document.querySelector(".profile__info-job");
const profileAvatar = document.querySelector(".profile__avatar");
const cardsButtonAdd = document.querySelector(".profile__add-button");
const popupFormElementAdd = document.querySelector(".popup__container-add");
const popupFormElementAvatar = document.querySelector(".popup__container-avatar");
const popupSubmitAdd = document.querySelector(".popup__submit-add");
const popupSubmitEdit = document.querySelector(".popup__submit-edit");
const popupSubmitAvatat = document.querySelector(".popup__submit-avatar");
const profileButton = document.querySelector(".profile__info-button");

export {
  enableValidation,
  config,
  profileButtonAvatar,
  popupFormElement,
  profileNameInput,
  profileJobInput,
  profileInfoName,
  profileInfoJob,
  profileAvatar,
  cardsButtonAdd,
  popupFormElementAdd,
  popupFormElementAvatar,
  popupSubmitAdd,
  popupSubmitEdit,
  popupSubmitAvatat,
  profileButton
};