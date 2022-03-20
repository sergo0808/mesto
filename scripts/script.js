let popupElement = document.querySelector(".popup");
let infoButton = document.querySelector(".profile__info-button");
let closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_name_active");
let jobInput = document.querySelector(".popup__input_job_active");
let infoName = document.querySelector(".profile__info-name");
let infoJob = document.querySelector(".profile__info-job");

function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = infoName.textContent;
  jobInput.value = infoJob.textContent;
}

function closePopup() {
  popupElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoJob.textContent = jobInput.value;
  closePopup();
}

infoButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
