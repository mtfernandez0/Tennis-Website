const srcPlayers = [
  "https://www.nittoatpfinals.com/-/media/alias/player-gladiator/MM58",
  "https://cdn.central.rookieme.com/wp-content/uploads/sites/5/1998/08/Alexander-Zverev.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/07/nadal-full-2022-may.png",
  "https://cdn.central.rookieme.com/wp-content/uploads/sites/5/1998/08/Stefanos-Tsitsipas.png",
  "https://www.barcelonaopenbancsabadell.com/wp-content/uploads/2021/03/ruud_full_ao20.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/16/alcaraz-full-2022-may.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2019/02/25/18/13/djokovic_full_ao19.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/27/05/08/rublev-full-2022-june-final.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/13/auger-aliassime-full-2022-may.png",
  "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/16/23/46/sinner-full-2022-june-1.png",
  "unknown_player.png",
];

function loadFrontPage(arg) {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let infoBase = arg.rankings[0].competitor_rankings[i];

    let dataObj = {
      rank: infoBase.rank,
      fullname: infoBase.competitor.name,
      src: srcPlayers[i],
      points: infoBase.points,
    };
    data.push(dataObj);
  }
  return data;
}

module.exports = { loadFrontPage };