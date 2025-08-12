import "./index.css";
import { enableValidation, settings, resetValidation, disableButton } from "../scripts/validation.js";
import initialCards from "../scripts/cards.js";
import api from "../utils/api.js";
import {setButtonText} from "../utils/helpers.js";

const editProfileBtn = document.querySelector(".profile__edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-button");
const newPostBtn = document.querySelector(".profile__plus");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector("#profile-description-input");
const profileNameElement= document.querySelector(".profile__name");
const profileDescriptionElement= document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile-form"];
const addCardFormElement = newPostModal.querySelector(".modal__form");
const addCardLinkInput = newPostModal.querySelector("#card-image-input");
const addCardCaptionInput = newPostModal.querySelector("#profile-caption-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const imageModalCloseBtn = imageModal.querySelector(".modal__close-button");
const cardSubmitBtn = document.querySelector(".modal__submit-button");
const modals = document.querySelectorAll(".modal");
const profileAvatar = document.querySelector(".profile__avatar");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarLinkInput = editAvatarModal.querySelector("#profile-avatar-input");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-button");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-button");
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteModalDeleteBtn = deleteModal.querySelector(".modal_delete-btn");
const deleteModalCancelBtn = deleteModal.querySelector(".modal_cancel-btn");
const deleteForm = deleteModal.querySelector(".modal__form");
let selectedCard;
let selectedCardId;

const newApi = new api({
  baseUrl: `https://around-api.en.tripleten-services.com/v1`,
  headers: {
    authorization: "0e767bbd-27a7-4fb4-a437-99304015b845",
    "Content-Type": "application/json"
  }
});

newApi.getInfo()
  .then(([cards, info])=>{
    cards.forEach( function (item) {
      const createdCard = getCardElement(item);
      cardsList.prepend(createdCard);
    });
    profileAvatar.src = info.avatar;
    //set textContent of both text el
    profileNameElement.textContent = info.name;
    profileDescriptionElement.textContent = info.about;
  })
  .catch(err =>{
    console.error(err);
  })

function getCardElement(data){
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  const cardHeartBtn = cardElement.querySelector(".card__heart-button");
  if(data.isLiked){
    cardHeartBtn.classList.add("card__heart-button_active");
  }

  cardHeartBtn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    const isLiked = cardHeartBtn.classList.contains("card__heart-button_active");
    handleHeartBtn(data._id, isLiked, cardHeartBtn);
  });
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    handleDeleteCard(cardElement, data._id);
  });
  cardImage.addEventListener("click", function(){
    modalCaption.textContent = cardTitle.textContent;
    modalImage.src = cardImage.src;
    modalImage.alt = cardImage.alt;
    openModal(imageModal);
  });
  return cardElement;
}

function clickClose(evt, modal){
  if (evt.target == modal){
    closeModal(modal);
  }
}

function escClose(evt, modal){
  if (evt.key === "Escape") {
      closeModal(modal);
  }
}

function handleClose(evt){
  const openedPopup = document.querySelector(".modal_is-opened");
  if(evt.key === "Escape" || (evt.type === "click" && evt.target === openedPopup)){
    closeModal(openedPopup);
  }
}

function openModal(modal){
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", handleClose);
  document.addEventListener("keydown", handleClose);
}

function closeModal(modal){
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", handleClose);
  document.removeEventListener("keydown", handleClose);
}

editProfileBtn.addEventListener("click", function (){
  profileNameInput.value=profileNameElement.textContent;
  profileDescriptionInput.value=profileDescriptionElement.textContent;
  resetValidation(editProfileForm, [profileNameInput, profileDescriptionInput], settings)
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function(){
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function (){
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function(){
  closeModal(newPostModal);
});

editAvatarBtn.addEventListener("click", function (){
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", function(){
  closeModal(editAvatarModal);
});

imageModalCloseBtn.addEventListener("click", function(){
  closeModal(imageModal);
});

deleteModalCloseBtn.addEventListener("click", function(){
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", function(){
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  newApi.editUserInfo({name: profileNameInput.value, about: profileDescriptionInput.value})
    .then((data)=> {
      profileNameElement.textContent= data.name;
      profileDescriptionElement.textContent= data.about;
      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(()=>{
      setButtonText(submitBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  newApi.addNewCard({name: addCardCaptionInput.value, link: addCardLinkInput.value})
    .then((data) =>{
      cardsList.prepend(getCardElement(data));
      evt.target.reset();
      disableButton(submitBtn, settings);
      closeModal(newPostModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(()=>{
      setButtonText(submitBtn, false);
    });
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  newApi.changeAvatar({avatar: editAvatarLinkInput.value})
    .then((data)=>{
      profileAvatar.src = data.avatar;
      evt.target.reset();
      disableButton(editAvatarSubmitBtn, settings);
      closeModal(editAvatarModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(()=>{
      setButtonText(submitBtn, false);
    });
}

function handleDeleteCard(cardElement, cardId){
  openModal(deleteModal);
  selectedCard = cardElement;
  selectedCardId = cardId;
}

function handleDeleteSubmit(evt){
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting");
  newApi.deleteCard(selectedCardId)
    .then(()=>{
      closeModal(deleteModal);
      selectedCard.remove();
    })
    .catch(err=>{
      console.error(err);
    })
    .finally(()=>{
      setButtonText(submitBtn, false, "Delete", "Deleting");
    })
}

function handleHeartBtn(cardId, isLiked, cardHeartBtn){
  newApi.toggleLike(cardId, isLiked)
    .then(()=>{
      cardHeartBtn.classList.toggle("card__heart-button_active");
    })
    .catch(err=>{
      console.error(err)
    })
}

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(settings);

addCardFormElement.addEventListener('submit', handleAddCardSubmit);