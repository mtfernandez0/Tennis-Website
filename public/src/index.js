window.addEventListener('load', function(){
  new Glider(document.querySelector(".tournament-list"), {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: '.dots-glider',
    arrows: {
      prev: '.tournament-arrow-left',
      next: '.tournament-arrow-right'
    }
  });
});

const arrowNext = document.querySelector("#arrow-right");
const arrowPrevious = document.querySelector("#arrow-left");
const menTable = document.querySelector("#men-table");
const womenTable = document.querySelector("#women-table");
let showingElement = 0;
let showingTable = 0;

menTable.addEventListener("click", () => changeTable(0));
womenTable.addEventListener("click", () => changeTable(1));
arrowNext.addEventListener("click", () => changePosition(1));
arrowPrevious.addEventListener("click", () => changePosition(-1));

function changePosition(change) {
  const sliders = [...document.querySelectorAll(".slider-body")];
  sliders[showingElement].classList.remove("slider-body-show");

  showingElement =
    change + showingElement < 0
      ? sliders.length - 1
      : (change + showingElement) % sliders.length;

  sliders[showingElement].classList.add("slider-body-show");
}

function changeTable(table){
  if(showingTable != table){
    const titles = [...document.querySelectorAll(".titles")];
    const tables = [...document.querySelectorAll(".table-body")];
    titles[showingTable].classList.remove("table-title-show");
    tables[showingTable].classList.remove("table-body-show");

    showingTable = table;
    titles[showingTable].classList.add("table-title-show");
    tables[showingTable].classList.add("table-body-show");
  }
}