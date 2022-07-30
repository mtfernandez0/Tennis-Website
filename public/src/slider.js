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

export function changePosition(change) {
  const sliders = [...document.querySelectorAll(".slider-body")];
  sliders[showingElement].classList.remove("slider-body-show");

  showingElement =
    change + showingElement < 0
      ? sliders.length - 1
      : (change + showingElement) % sliders.length;

  sliders[showingElement].classList.add("slider-body-show");
}

export function changeTable(table){
  if(showingTable != table){
    const titles = [...document.querySelectorAll(".titles")];
    const tables = [...document.querySelectorAll(".table-body")];
    console.log(titles)
    console.log(tables)
    titles[showingTable].classList.remove("table-title-show");
    tables[showingTable].classList.remove("table-body-show");

    showingTable = table;
    titles[showingTable].classList.add("table-title-show");
    tables[showingTable].classList.add("table-body-show");
  }
}