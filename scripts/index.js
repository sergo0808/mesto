const popupEdit = document.querySelector(".popup_type_edit"); 
const profileButton = document.querySelector(".profile__info-button"); 
const profileButtonClose = document.querySelector(".popup__close-button-edit"); 
const formElement = document.querySelector(".popup__container"); 
const profileNameInput = document.querySelector(".popup__input_name_active"); 
const profileJobInput = document.querySelector(".popup__input_job_active"); 
const profileInfoName = document.querySelector(".profile__info-name"); 
const profileInfoJob = document.querySelector(".profile__info-job"); 
const cardsButtonAdd = document.querySelector('.profile__add-button'); 
const cardsButtonClose = document.querySelector(".close-button-add"); 
const popupAdd = document.querySelector(".popup_type_add"); 
const formElementAdd = document.querySelector(".popup__container-add"); 
const nameInputAdd = document.querySelector(".popup__input_name_add"); 
const linkInputAdd = document.querySelector(".popup__input_link_add");
const elementTeamplate = document.querySelector('#element-teamplate').content; 
const containerElement = document.querySelector('.elements'); 
const popupImg = document.querySelector('.popup_type_image'); 
const formElementImg = popupImg.querySelector('.popup__container_image'); 
const imgButtonClose = popupImg.querySelector(".popup__close-button_image"); 
const imgElement = popupImg.querySelector(".popup__image"); 
const popupCaption = popupImg.querySelector(".popup__caption"); 

function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
}; 

function openPopup(popup) { 
  popup.classList.add("popup_opened"); 
}; 

function saveDataFormEdit(evt) { 
  evt.preventDefault(); 
  profileInfoName.textContent = profileNameInput .value; 
  profileInfoJob.textContent = profileJobInput.value; 
  closePopup(popupEdit); 
};

function creatCard(name, link) { 
  const cardsElement = elementTeamplate.cloneNode(true); 
  const cardImg = cardsElement.querySelector('.element__mask-group'); 
  const cardTitle = cardsElement.querySelector('.element__group-text'); 
   cardTitle.textContent = name;  
   cardImg.src = link; 
   cardImg.alt = name;
   cardImg.addEventListener('click', function(){ 
    popupCaption.textContent = cardTitle.textContent; 
    imgElement.src = cardImg.src; 
    imgElement.alt = cardImg.alt;
    openPopup(popupImg);
  }); 
  cardsElement.querySelector('.element__group-like').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('element__group-like_active');       
}); 
cardsElement.querySelector('.element__group-basket').addEventListener('click', function (evt) { 
  evt.target.parentNode.remove();          
});
 return cardsElement
};

function renderCard (evt){
  evt.preventDefault();
  containerElement.prepend(creatCard(nameInputAdd.value, linkInputAdd.value))
  closePopup(popupAdd);
}

initialCards.forEach(function (element) { 
  containerElement.append(creatCard(element.name, element.link))
}); 

profileButton.addEventListener("click", function(){
  openPopup(popupEdit);
  profileNameInput.value = profileInfoName.textContent; 
  profileJobInput.value = profileInfoJob.textContent;
}); 

profileButtonClose.addEventListener("click", function(){
  closePopup(popupEdit);
});

cardsButtonAdd.addEventListener("click", function(){
  openPopup(popupAdd);
  nameInputAdd.value = '';
  linkInputAdd.value = '';
});

cardsButtonClose.addEventListener("click", function(){
  closePopup(popupAdd);
});

imgButtonClose.addEventListener("click", function(){
  closePopup(popupImg);
});

formElementAdd.addEventListener("submit", renderCard);
formElement.addEventListener("submit", saveDataFormEdit); 