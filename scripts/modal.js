// ========handler contact form

// values form for validate
const nameVal = document.querySelector('#contact-name input[name="name"]');
const emailVal = document.querySelector('#contact-email input[name="email"]');
const phoneVal = document.querySelector('#contact-phone input[name="phone"]');
// input block
const nameBlock = document.querySelector("#contact-name");
const emailBlock = document.querySelector("#contact-email");
const phoneBlock = document.querySelector("#contact-phone");

// error blocks for each values
const nameErr = document.querySelector(
  "#contact-name .full-block-input__error"
);
const emailErr = document.querySelector(
  "#contact-email .full-block-input__error"
);
const phoneErr = document.querySelector(
  "#contact-phone .full-block-input__error"
);
// at least 1 error block
const formError = document.querySelector(".contact__error");
// btn send form
const sendFormBtn = document.querySelector("#form-send");

//remove reload page for form
const contactForm = document.querySelector(".contact__form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
// validation fun
function isValidName(name) {
  if (name !== undefined && name.length < 1) {
    return "This field is required.";
  }
  if (!/^[A-Z][a-z]{1,}$/.test(name)) {
    return "Name field is invalid.";
  }
  return "";
}
function isValidEmail(email) {
  if (email !== undefined && email.length < 1) {
    return "This field is required.";
  }
  // /^([A-Za-z0-9_-.])+@([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Email field is invalid.";
  }

  return "";
}
function isValidPhone(phone, code = "7", length) {
  const regex = new RegExp(`^[+]${code}\\s\\d{3}\\s\\d{3}\\s\\d{2}\\s\\d{2}?$`);
  if (phone !== undefined && phone.length < 1) {
    return "This field is required.";
  }
  if (!regex.test(phone) || phone.length - 5 !== length) {
    return "Phone field is invalid.";
  }

  return "";
}

// handler on each input

nameVal.addEventListener("input", (e) =>
  handlerInputs(e.target.value, emailVal.value, phoneVal.value)
);
emailVal.addEventListener("input", (e) =>
  handlerInputs(nameVal.value, e.target.value, phoneVal.value)
);
phoneVal.setAttribute("maxLength", `${11 + 5}`);
phoneVal.addEventListener("input", (e) => {
  //mask

  e.target.value = e.target.value
    .replace(/\D/g, "")
    .replace(/^\d/, "+7 ")
    .replace(/([+7])\s(\d{3})/, "$1 $2")
    .replace(/(\d{3})(\d{1,3})/, "$1 $2")
    .replace(/(\d{3})\s(\d{3})(\d{2})/, "$1 $2 $3")
    .replace(/(\d{3})\s(\d{3})\s(\d{2})(\d{2})\d+?$/, "$1 $2 $3 $4");
  handlerInputs(nameVal.value, emailVal.value, e.target.value);
});
//handlers inputs fun

function handlerInputs(name, email, phone) {
  const errors = {};
  if (!nameBlock.classList.contains("full-block-input_disabled")) {
    errors.name = isValidName(name);
    displayErrors(errors.name, errors, nameErr, nameVal);
  }
  if (!emailBlock.classList.contains("full-block-input_disabled")) {
    errors.email = isValidEmail(email);
    displayErrors(errors.email, errors, emailErr, emailVal);
  }
  if (!phoneBlock.classList.contains("full-block-input_disabled")) {
    errors.phone = isValidPhone(phone, "7", 11);
    displayErrors(errors.phone, errors, phoneErr, phoneVal);
  }
  displayError(errors);
}
// renders errors funs
function displayErrors(error, errors, dispErr, inputError) {
  if (error) {
    dispErr.style.display = "block";
    dispErr.textContent = error;
    inputError.classList.add("full-block-input__input_error");
  } else {
    dispErr.style.display = "none";
    inputError.classList.remove("full-block-input__input_error");
  }
}
function displayError(errors) {
  for (const key in errors) {
    if (errors[key]) {
      formError.style.display = "block";
      sendFormBtn.setAttribute("disabled", "");
      return;
    }
  }
  sendFormBtn.removeAttribute("disabled");
  formError.style.display = "none";
}

//close
const contact = document.querySelector(".contact");
const contactOpenButtons = document.querySelectorAll(".contact-open");
const openFromMenu = document.querySelector(".header__menu .contact-open");
document.querySelector("#contact-close").addEventListener("click", () => {
  contact.style.display = "none";
});
contact.addEventListener("click", (e) => {
  if (e.target === contact) {
    contact.style.display = "none";
  }
});

// open
contactOpenButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".contact").style.display = "flex";
  });
});
openFromMenu.addEventListener("click", () => {
  document
    .querySelector(".header__menu")
    .classList.remove("header__menu_opened");
  document.body.classList.remove("hidden");
});

// ======== contact-success
const contactSuccess = document.querySelector(".contact-success");
const contactSuccessButtons = document.querySelectorAll(
  ".contact-success__modal button"
);
//open
const sendBtn = document.querySelector("#form-send");
const contactFormInputs = document.querySelectorAll(".contact__form input");
sendBtn.addEventListener("click", () => {
  contact.style.display = "none";
  contactSuccess.style.display = "flex";
  contactFormInputs.forEach((elem) => (elem.value = ""));
  sendFormBtn.setAttribute("disabled", "");
});

//close
contactSuccessButtons.forEach(
  (btn) =>
    (btn.onclick = () => {
      contactSuccess.style.display = "none";
    })
);

contactSuccess.addEventListener("click", (e) => {
  if (e.target === contactSuccess) {
    contactSuccess.style.display = "none";
  }
});

// ======== cookie
const cookie = document.querySelector(".cookie");
const cookieButtons = document.querySelectorAll(".cookie button");
cookieButtons.forEach(
  (btn) => (btn.onclick = () => (cookie.style.display = "none"))
);
