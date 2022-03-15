let popupElement = document.querySelector(".popup");
let infobutton = document.querySelector(".profile__info-button");
let closebutton = document.querySelector(".popup__close-button");

function openPopup() {
  popupElement.classList.add("popup_opened");
}

function closePopup() {
  popupElement.classList.remove("popup_opened");
}

infobutton.addEventListener("click", openPopup);
closebutton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__field-1");
let jobInput = document.querySelector(".popup__field-2");

nameInput.value = document.querySelector(".profile__info-name").textContent;
jobInput.value = document.querySelector(".profile__info-job").textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__info-name").textContent = nameInput.value;
  document.querySelector(".profile__info-job").textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
