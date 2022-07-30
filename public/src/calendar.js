const competitions = [];

function levelCheck(arg) {
  return (
    arg === "atp_250" ||
    arg === "atp_500" ||
    arg === "atp_1000" ||
    arg === "wta_250" ||
    arg === "wta_500" ||
    arg === "wta_1000" ||
    arg === "grand_slam"
  );
}

function categoryCheck(arg) {
  return arg === "WTA" || arg === "ATP";
}

export function getInfoCompetitions(data) {
  const list = document.getElementById('tournament-elements');
  let dataHTML = ``;

  for (let i = 0; i < data.competitions.length; i++) {
    if (
      typeof data.competitions[i].level !== "undefined" &&
      data.competitions[i].type === "singles" &&
      categoryCheck(data.competitions[i].category.name) &&
      levelCheck(data.competitions[i].level)
    ) {
        dataHTML += `<div class="tournament-list-element">
                    <h2>${data.competitions[i].name}</h2>
                    <p><strong>From 29-08-2022 <br>to 11-09-2022</br></strong></p></div>`;
    }
  }
  list.innerHTML = dataHTML;

  new Glider(document.querySelector(".tournament-list"), {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: '.dots-glider',
    arrows: {
      prev: '.tournament-arrow-left',
      next: '.tournament-arrow-right'
    }
  });
}
