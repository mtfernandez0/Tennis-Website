const sliders = [...document.querySelectorAll(".slider-body")];
const arrowNext = document.querySelector("#arrow-right");
const arrowPrevious = document.querySelector("#arrow-left");
const flagsTop = [
  "https://imgs.search.brave.com/XEQWZ6Q427uTYHrAQeKcVY1-QZg4ZEHsi0L69A7eiso/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDMwMjM2/MTUuanBn",
  "https://media.istockphoto.com/photos/german-flag-waving-symbol-of-germany-picture-id962789576?k=20&m=962789576&s=612x612&w=0&h=z8-1XCRXcx0vJrffqztKdr1VaPXxWEtCbRPl_rFaDTk=",
  "https://wallpaperaccess.com/full/1458449.jpg",
];
let showingElement = 0;

document.getElementById(
  "home"
).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${flagsTop[showingElement]})`;

arrowNext.addEventListener("click", () => changePosition(1));
arrowPrevious.addEventListener("click", () => changePosition(-1));

function changePosition(change) {
    sliders[showingElement].classList.remove("slider-body-show");
    showingElement =
    change + showingElement < 0
      ? sliders.length - 1
      : (change + showingElement) % sliders.length;
      document.getElementById(
          "home"
          ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${flagsTop[showingElement]})`;
    sliders[showingElement].classList.add("slider-body-show");
}
