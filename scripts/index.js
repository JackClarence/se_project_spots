let initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
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
const editProfileForm = editProfileModal.querySelector(".modal__form");
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
  console.log(addCardCaptionInput.value);
  console.log(addCardLinkInput.value);
  const info = {};
  info.link = addCardLinkInput.value;
  info.name = addCardCaptionInput.value;
  cardsList.prepend(getCardElement(info));
  closeModal(newPostModal);
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach(function (item){
  console.log(item.name);
})