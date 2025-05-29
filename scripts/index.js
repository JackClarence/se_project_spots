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


editProfileBtn.addEventListener("click", function (){
  editProfileModal.classList.add("modal__is-opened");
  profileNameInput.value=profileNameElement.textContent;
  profileDescriptionInput.value=profileDescriptionElement.textContent;
});

editProfileCloseBtn.addEventListener("click", function(){
  editProfileModal.classList.remove("modal__is-opened");
});

newPostBtn.addEventListener("click", function (){
  newPostModal.classList.add("modal__is-opened");
});

newPostCloseBtn.addEventListener("click", function(){
  newPostModal.classList.remove("modal__is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent=profileNameInput.value;
  profileDescriptionElement.textContent=profileDescriptionInput.value;
  editProfileModal.classList.remove("modal__is-opened");
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(addCardCaptionInput.value);
  console.log(addCardLinkInput.value);
  newPostModal.classList.remove("modal__is-opened");
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);