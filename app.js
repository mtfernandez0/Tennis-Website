require("dotenv").config();
require("./config")
const express = require("express");
const app = express();
const path = require("path");
const jsonRankings = require("./public/ATP_WTA_Rankings.json");
const { loadFrontPage } = require("./public/src/front_page.js");
const {
  load_atp_id_players,
  load_wta_id_players,
  calcRecord, 
  calcTitles
} = require("./public/src/rankings");
const profExample = require("./profile.json");
const { getCompetitions } = require("./public/src/calendar.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

function obtainInfoPlayer(competitor_id){
  fetch(sportRadarUrl(`competitor/${competitor_id}/profile`, process.env.YOUR_API_KEY))
  .then(res => res.json())
  .then(json => {
    return {
      name: json.competitor.name,
      points: json.competitor_rankings[0].points,
      pro_since: json.info.pro_year,
      height: json.info.height,
      match_record: calcRecord(json),
      titles: calcTitles(json)
    };
  })
  .catch(err => console.log('Error at feching, player_id:', competitor_id, err))
}

function obtainRankings(){
  fetch(sportRadarUrl("rankings", process.env.YOUR_API_KEY))
  .then(res => res.json())
  .then(json => {
    return json;
  })
  .catch(err => console.log('Error at fetching', err))
}

app.get("/", (req, res) => {
  //MAKE REQUEST ACORDING TO THE DATE(1 REQUEST PER 2 WEEKS, YET TO SEE)
  /*
  const rankings = obtainRankings();
  const dataFrontPage = loadFrontPage(rankings);
  */

  const dataFrontPage = loadFrontPage(jsonRankings);

  const tableInfo = []

  for (let i = 0; i < 25; i++) {
    tableInfo.push({
      name: profExample.competitor.name,
      points: profExample.competitor_rankings[0].points,
      pro_since: profExample.info.pro_year,
      height: profExample.info.height,
      match_record: calcRecord(profExample),
      titles: calcTitles(profExample)
    });
  }
  // const atp_ranking_data = load_atp_id_players(jsonRankings);
  // const wta_ranking_data = load_wta_id_players(jsonRankings);

  const tournaments = getCompetitions(require("./public/All_Competitons.json"));

  res.render("index", {
    dataFrontPage: dataFrontPage,
    tableInfo: tableInfo,
    tournaments: tournaments
  });
});

app.set("port", 3000);
app.use(express.json());

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
