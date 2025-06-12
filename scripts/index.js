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

function getCardElement(data){
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  const cardHeartBtn = cardElement.querySelector(".card__heart-button");
  cardHeartBtn.addEventListener("click", function(){
    cardHeartBtn.classList.toggle("card__heart-button_active");
  });
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function(){
    cardElement.remove();
  });
  cardImage.addEventListener("click", function(){
    modalCaption.textContent = cardTitle.textContent;
    modalImage.src = cardImage.src;
    modalImage.alt = cardImage.alt;
    openModal(imageModal);
  });
  return cardElement;
}

initialCards.forEach( function (item) {
  const createdCard = getCardElement(item);
  cardsList.prepend(createdCard);
});

function openModal(modal){
  modal.classList.add("modal__is-opened");
}

function closeModal(modal){
  modal.classList.remove("modal__is-opened");
}

editProfileBtn.addEventListener("click", function (){
  openModal(editProfileModal);
  profileNameInput.value=profileNameElement.textContent;
  profileDescriptionInput.value=profileDescriptionElement.textContent;
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

imageModalCloseBtn.addEventListener("click", function(){
  closeModal(imageModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent=profileNameInput.value;
  profileDescriptionElement.textContent=profileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const info = {};
  info.link = addCardLinkInput.value;
  info.name = addCardCaptionInput.value;
  cardsList.prepend(getCardElement(info));
  closeModal(newPostModal);
  addCardCaptionInput.value = null;
  addCardLinkInput.value = null;
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);