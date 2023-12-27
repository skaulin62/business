const items = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider__slides");

const prevBtn = document.querySelector(".slider__btn-previous");
const nextBtn = document.querySelector(".slider__btn-next");

const sliderIndicator = document.querySelector(".slider__list-indicators");

let step = 0;
let offset = 0;
let slides = items;
let width = 620;
let isEnabled = true;
let isEnabled2 = true;
items.forEach((item) => item.remove());
console.log(slides);

if (slides.length === 1) {
  let slide = slides[0];

  slide.style.left = "0px";
  slider.appendChild(slide.cloneNode(true));
  prevBtn.disabled = true;
  nextBtn.disabled = true;
} else {
  primaryRender();
  renderSwitchesSlidePoint();
}

function renderSwitchesSlidePoint() {
  sliderIndicator.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
    sliderIndicator.insertAdjacentHTML(
      "beforeend",
      `
        <li data-num="${i}"
        class="slider__item-indicator ${
          step === i ? "slider__item-indicator_current" : ""
        }">
        </li>
        `
    );
  }
  const itemsIndicator = document.querySelectorAll(".slider__item-indicator");
  itemsIndicator.forEach((indicator) => {
    indicator.addEventListener("click", handleIndicator);

    function handleIndicator() {
      if (!isEnabled2) return;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      isEnabled2 = false;

      const indicatorStep = indicator.getAttribute("data-num");

      if (indicatorStep > step) {
        if (
          indicatorStep == slides.length - 1 &&
          step === 0 &&
          slides.length > 2
        ) {
          prev();
          isEnabled2 = true;
          prevBtn.disabled = false;
          nextBtn.disabled = false;
          return;
        }
        const switchInterval = setInterval(() => {
          if (indicatorStep == step) {
            isEnabled2 = true;
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            clearInterval(switchInterval);
          } else {
            next();
          }
        }, 300);
      } else if (indicatorStep < step) {
        if (
          indicatorStep == 0 &&
          step === slides.length - 1 &&
          slides.length > 2
        ) {
          next();
          isEnabled2 = true;
          prevBtn.disabled = false;
          nextBtn.disabled = false;
          return;
        }
        const switchInterval = setInterval(() => {
          if (indicatorStep == step) {
            isEnabled2 = true;
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            clearInterval(switchInterval);
          } else {
            prev();
          }
        }, 300);
      } else {
        isEnabled2 = true;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
      }
    }
  });
}

function primaryRender() {
  //left slide
  let slide = slides[slides.length - 1];
  console.log(slide);
  slide.style.left = -width + "px";

  slider.appendChild(slide.cloneNode(true));
  //middle slide
  slide = slides[step];
  console.log(slide);
  slide.style.left = width * offset + "px";
  slider.appendChild(slide.cloneNode(true));
  //right slide

  slide = slides[step + 1];
  console.log(slide);
  slide.style.left = -width * offset + width + "px";
  slider.appendChild(slide.cloneNode(true));
  offset = 1;
}

function moveIndicator() {
  const sliderIndicators = document.querySelectorAll(".slider__item-indicator");
  sliderIndicators.forEach((indicator) => {
    indicator.classList.remove("slider__item-indicator_current");
  });
  sliderIndicators[step].classList.add("slider__item-indicator_current");
}

function renderSlideLeft() {
  console.log("prev slide: ", step);
  if (step === 0) {
    step = slides.length - 2;
  } else if (step === 1) {
    step = slides.length - 1;
  } else {
    step -= 2;
  }
  console.log("next slide: ", step);

  let slide = slides[step];
  slide.style.left = -width * offset + "px";
  slider.insertBefore(slide.cloneNode(true), slider.firstElementChild);

  if (step === slides.length - 1) {
    step = 0;
  } else {
    step++;
  }

  moveIndicator();

  console.log("current slide: ", step);
}

function renderSlideRight() {
  console.log("prev slide: ", step);
  if (step === slides.length - 1) {
    step = 1;
  } else if (step === slides.length - 2) {
    step = 0;
  } else {
    step = step + 2;
  }
  console.log("next slide: ", step);
  let slide = slides[step];
  slide.style.left = width * offset + "px";
  slider.appendChild(slide.cloneNode(true));
  if (step === 0) {
    step = slides.length - 1;
  } else {
    step = step - 1;
  }

  moveIndicator();
  offset = 1;

  console.log("current slide: ", step);
}
//animation
function prev() {
  if (!isEnabled) return;
  isEnabled = false;
  let contextSlides = document.querySelectorAll(".slide");
  let contextOffset = 1;
  for (let i = 0; i < contextSlides.length; i++) {
    let currentLeft = contextSlides[i].offsetLeft;
    const nextRight = contextOffset * width - width;
    const interval = setInterval(() => {
      if (currentLeft !== nextRight) {
        currentLeft += width / 20;
        contextSlides[i].style.left = currentLeft + "px";
      } else {
        clearInterval(interval);
        isEnabled = true;
      }
    }, 30);
    contextOffset++;
  }
  setTimeout(() => {
    contextSlides[contextSlides.length - 1].remove();
    renderSlideLeft();
  }, 300);
}
function next() {
  if (!isEnabled) return;
  isEnabled = false;
  let contextSlides = document.querySelectorAll(".slide");
  console.log(contextSlides);
  let contextOffset = -1;
  for (let i = 0; i < contextSlides.length; i++) {
    let currentLeft = contextSlides[i].offsetLeft;
    const nextLeft = contextOffset * width - width;
    const interval = setInterval(() => {
      if (currentLeft !== nextLeft) {
        currentLeft -= width / 20;
        contextSlides[i].style.left = currentLeft + "px";
      } else {
        clearInterval(interval);
        isEnabled = true;
      }
    }, 30);
    contextOffset++;
  }
  setTimeout(() => {
    contextSlides[0].remove();
    renderSlideRight();
  }, 300);
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
