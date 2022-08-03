const srcPlayers = new Map([
  [
    "Medvedev, Daniil",
    "https://www.nittoatpfinals.com/-/media/alias/player-gladiator/MM58",
  ],
  [
    "Zverev, Alexander",
    "https://cdn.central.rookieme.com/wp-content/uploads/sites/5/1998/08/Alexander-Zverev.png",
  ],
  [
    "Nadal, Rafael",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/07/nadal-full-2022-may.png",
  ],
  [
    "Tsitsipas, Stefanos",
    "https://cdn.central.rookieme.com/wp-content/uploads/sites/5/1998/08/Stefanos-Tsitsipas.png",
  ],
  [
    "Ruud, Casper",
    "https://www.barcelonaopenbancsabadell.com/wp-content/uploads/2021/03/ruud_full_ao20.png",
  ],
  [
    "Alcaraz, Carlos",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/16/alcaraz-full-2022-may.png",
  ],
  [
    "Djokovic, Novak",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2019/02/25/18/13/djokovic_full_ao19.png",
  ],
  [
    "Rublev, Andrey",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/27/05/08/rublev-full-2022-june-final.png",
  ],
  [
    "Auger-Aliassime, Felix",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/13/auger-aliassime-full-2022-may.png",
  ],
  [
    "Sinner, Jannik",
    "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/16/23/46/sinner-full-2022-june-1.png",
  ],
  ["unknown", "unknown_player.png"],
]);

function loadFrontPage(arg) {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let infoBase = arg.rankings[0].competitor_rankings[i];

    let dataObj = {
      rank: infoBase.rank,
      fullname: infoBase.competitor.name,
      src: srcPlayers.has(infoBase.competitor.name)
        ? srcPlayers.get(infoBase.competitor.name)
        : srcPlayers.has("unknown"),
      points: infoBase.points,
    };
    data.push(dataObj);
  }
  return data;
}

module.exports = { loadFrontPage };
