import "../pages/index.css";
import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { ProfileInfo } from "../components/ProfileInfo.js";
import { Api } from "../components/Api";
import { PopupWithConfirm } from "../components/PopupWithConfirm";
import {
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
  profileButton,
} from "../utils/constants";

import { data } from "autoprefixer";

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

const userData = new ProfileInfo(
  profileInfoName,
  profileInfoJob,
  profileAvatar
);

const imgPopup = new PopupWithImage(".popup_type_image");
const popupAdd = new PopupWithForm(".popup_type_add", addCard);
const popupEdit = new PopupWithForm(".popup_type_edit", saveDataFormEdit);
const popupAvatar = new PopupWithForm(".popup_type_avatar", saveDataFormAvatar);
const popupConfirm = new PopupWithConfirm(".popup_type_confirm");
const api = new Api(config);
let cardList = {};
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, data]) => {
    userId = userData._id;
    profileInfoName.textContent = userData.name;
    profileInfoJob.textContent = userData.about;
    profileAvatar.src = userData.avatar;
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
  .catch((res) => {
    console.log(res);
  });

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
  item.likes.forEach((likes) => {
    if (likes._id === userId) {
      cardElement
        .querySelector(".element__group-like")
        .classList.add("element__group-like_active");
    }
  });

  if (item.owner._id === userId) {
    cardElement
      .querySelector(".element__group-basket")
      .classList.add("element__group-basket_active");
  }
  cardList.addItem(cardElement);
}

const handleLikeClick = (item) => {
  api
    .likeCardApi(item._id)
    .then((res) => {
      const count = item._element.querySelector(".element__group-count");
      count.textContent = res.likes.length;
      item._element
        .querySelector(".element__group-like")
        .classList.add("element__group-like_active");
    })
    .catch((res) => {
      console.log(res);
    });
};

const handleLikeClickDrop = (item) => {
  api
    .likeCardApiDrop(item._id)
    .then((res) => {
      const count = item._element.querySelector(".element__group-count");
      count.textContent = res.likes.length;
      item._element
        .querySelector(".element__group-like")
        .classList.remove("element__group-like_active");
    })
    .catch((res) => {
      console.log(res);
    });
};

const handleDeleteCard = (item) => {
  popupConfirm.open();
  popupConfirm.setSubmitHanlder(() => {
    api
      .deleteCardApi(item._id)
      .then((res) => {
        popupConfirm.close();
        item.handleBasketClick();
      })
      .catch((res) => {
        console.log(res);
      });
  });
};

function renderLoading(isLoading, savebutton) {
  if (isLoading) {
    savebutton.textContent = "Сохранение...";
  } else {
    savebutton.textContent = "Сохранить";
  }
}

function addCard(input) {
  renderLoading(true, popupSubmitAdd);
  api
    .addCardApi(input)
    .then((input) => {
      createCard(input);
      popupAdd.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAdd);
    });
}

function saveDataFormAvatar(avatar) {
  renderLoading(true, popupSubmitAvatat);
  api
    .updateAvatarApi(avatar)
    .then((avatar) => {
      userData.setProfileAvatar(avatar);
      popupAvatar.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAvatat);
    });
}

function saveDataFormEdit(input) {
  renderLoading(true, popupSubmitEdit);
  api
    .updateUserInfom(input)
    .then((input) => {
      userData.setProfileInfo(input.name, input.about);
      popupEdit.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      renderLoading(false, popupSubmitEdit);
    });
}

profileButtonAvatar.addEventListener("click", function () {
  avatarFormValidator.clearError();
  popupAvatar.open();
});

profileButton.addEventListener("click", function () {
  const user = userData.getProfileInfo();
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