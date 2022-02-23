//Change Mode in Header
document.querySelector('.header__mode').addEventListener("click", e =>
    e.currentTarget.querySelector('img').src.includes('/dark-mode.svg')
        ? e.currentTarget.querySelector('img').src = 'img/assets/svg/light-mode.svg'
        : e.currentTarget.querySelector('img').src = 'img/assets/svg/dark-mode.svg'
);

//Header Menu Adaptive
let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function () {
        iconMenu.classList.toggle("active");
        body.classList.toggle("lock");
        menuBody.classList.toggle("active");
    });
}
