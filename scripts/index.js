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
const popupFormElementAdd = document.querySelector(".popup__container-add"); 
const nameInputAdd = document.querySelector(".popup__input_name_add"); 
const linkInputAdd = document.querySelector(".popup__input_link_add");

const elementTeamplate = document.querySelector('#element-teamplate').content; 
const containerElement = document.querySelector('.elements'); 
const popupImg = document.querySelector('.popup_type_image'); 

const formElementImg = popupImg.querySelector('.popup__container_image'); 
const imgButtonClose = popupImg.querySelector(".popup__close-button_image"); 
const imgElement = popupImg.querySelector(".popup__image"); 
const popupCaption = popupImg.querySelector(".popup__caption");

const popups = Array.from(document.querySelectorAll('.popup'));

const clearError = (formElement) => {
  const inputList = Array.from(popupEdit.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, 'popup__input_type_error', 'popup__error_visible');
  });
  setButtonState(inputList, buttonElement, 'popup__submit_inactive'); 
};

function doSomething(popup) {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup(popup);
    };
    });
};


function closePopup(popup) { 
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', doSomething); 
}; 

function openPopup(popup) { 
  popup.classList.add("popup_opened");
  doSomething(popup);
}; 

function saveDataFormEdit(evt) { 
  evt.preventDefault(); 
  profileInfoName.textContent = profileNameInput .value; 
  profileInfoJob.textContent = profileJobInput.value; 
  closePopup(popupEdit); 
};

function creatCard(name, link) { 
  const cardElement = elementTeamplate.cloneNode(true); 
  const cardImg = cardElement.querySelector('.element__mask-group'); 
  const cardTitle = cardElement.querySelector('.element__group-text'); 
   cardTitle.textContent = name;  
   cardImg.src = link; 
   cardImg.alt = name;
   cardImg.addEventListener('click', function(){ 
    popupCaption.textContent = name; 
    imgElement.src = cardImg.src; 
    imgElement.alt = cardImg.alt;
    openPopup(popupImg);
  }); 
  cardElement.querySelector('.element__group-like').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('element__group-like_active');       
}); 
cardElement.querySelector('.element__group-basket').addEventListener('click', function (evt) { 
  evt.target.closest('.element').remove();          
});
 return cardElement
};

function renderCard (evt){
  evt.preventDefault();
  containerElement.prepend(creatCard(nameInputAdd.value, linkInputAdd.value))
  closePopup(popupAdd);
};

initialCards.forEach(function (element) { 
  containerElement.append(creatCard(element.name, element.link))
}); 

profileButton.addEventListener("click", function(){
  profileNameInput.value = profileInfoName.textContent; 
  profileJobInput.value = profileInfoJob.textContent;
  clearError(popupEdit);
  openPopup(popupEdit);
}); 

profileButtonClose.addEventListener("click", function(){
  closePopup(popupEdit);
});

cardsButtonAdd.addEventListener("click", function(){
  nameInputAdd.value = '';
  linkInputAdd.value = '';
  const buttonElement = popupAdd.querySelector('.popup__submit');
  buttonElement.classList.add('popup__submit_inactive');
  buttonElement.setAttribute('disabled', true);

  openPopup(popupAdd);
  
});

cardsButtonClose.addEventListener("click", function(){
  closePopup(popupAdd);
});

imgButtonClose.addEventListener("click", function(){
  closePopup(popupImg);
});

popupFormElementAdd.addEventListener("submit", renderCard);
popupFormElement.addEventListener("submit", saveDataFormEdit); 