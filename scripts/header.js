// header__down sticky
const header = document.querySelector(".header__down");

window.addEventListener("DOMContentLoaded", () => {
  if (scrollY > 38) {
    header.classList.add("header__down_sticky");
  }
});

window.addEventListener("scroll", () => {
  if (scrollY > 38) {
    header.classList.add("header__down_sticky");
  } else {
    header.classList.remove("header__down_sticky");
  }
});

// selected header__switch-nav-item
const items = document.querySelectorAll(".header__switch-nav-item");

document.addEventListener("DOMContentLoaded", () => {
  items.forEach((select) => {
    select.addEventListener("click", () => {
      items.forEach((item) =>
        item.classList.remove("header__switch-nav-item_active")
      );
      select.classList.add("header__switch-nav-item_active");

      if (select === items[0]) {
        document.querySelector(".header__links").style.display = "none";
        document.querySelector(".header__button ").style.display = "block";
      } else if (select === items[1]) {
        document.querySelector(".header__links").style.display = "flex";
        document.querySelector(".header__button").style.display = "none";
      }
    });
  });
});

// open menu
document.querySelector(".header__burger").addEventListener("click", () => {
  document
    .querySelector(".header__menu")
    .classList.toggle("header__menu_opened");
  document.body.classList.add("hidden");
});
// function close menu
function closeMenu(element) {
  element.addEventListener("click", () => {
    document
      .querySelector(".header__menu")
      .classList.remove("header__menu_opened");
    document.body.classList.remove("hidden");
  });
}

closeMenu(document.querySelector(".header__burger-close"));
