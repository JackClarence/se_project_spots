const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_state_error",
  errorClass: "modal__error"
}

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageEl = formEl.querySelector("#" + errorMessageID);
  errorMessageEl.textContent = errorMessage;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageEl = formEl.querySelector("#" + errorMessageID);
  errorMessageEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
}

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  })
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config)
  })
}

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((element) => {
    return !element.validity.valid;
  });
};

enableValidation(settings);