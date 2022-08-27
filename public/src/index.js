'use strict'

window.addEventListener('load', function () {
  new Glider(document.querySelector('.tournament-list'), {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: '.dots-glider',
    arrows: {
      prev: '.tournament-arrow-left',
      next: '.tournament-arrow-right'
    }
  })
})

const arrowNext = document.querySelector('#arrow-right')
const arrowPrevious = document.querySelector('#arrow-left')
const arrowRank = document.querySelector('#arrow-rank')
const arrowTitle = document.querySelector('#arrow-title')

let showingElement = 0
let showingTable = 0

arrowNext.addEventListener('click', () => changePosition(1))
arrowPrevious.addEventListener('click', () => changePosition(-1))
arrowRank.addEventListener('click', () => changeArrowDirection(0))
arrowTitle.addEventListener('click', () => changeArrowDirection(1))

function changeArrowDirection(arg){
  const icon = [...document.querySelectorAll('.arrows-tables')][arg]
  icon.classList.toggle('fa-chevron-down')
  icon.classList.toggle('fa-chevron-up')
}

function changePosition (change) {
  const sliders = [...document.querySelectorAll('.slider-body')]
  sliders[showingElement].classList.remove('slider-body-show')

  showingElement =
    change + showingElement < 0
      ? sliders.length - 1
      : (change + showingElement) % sliders.length

  sliders[showingElement].classList.add('slider-body-show')
}