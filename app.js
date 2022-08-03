require("dotenv").config();
require("./config")
const express = require("express");
const app = express();
const path = require("path");
const jsonRankings = require("./public/ATP_WTA_Rankings.json");
const { loadFrontPage } = require("./public/src/front_page.js");
const { calcRecord, calcTitles } = require("./public/src/rankings");
const profExample = require("./profile.json");
const { getInfoCompetitions, getInfoCompetitions2 } = require("./public/src/calendar.js");
const { wasAMonth } = require("./public/src/scheduler.js");
const { sportRadarUrl } = require("./config");

var last_date = new Date();
var rankings = "";
var dataFrontPage = "";
var tableATP = [];
var tableWTA = [];
var tournaments = new Map();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

function getInfoPlayer(competitor_id){
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

function getRankings(){
  fetch(sportRadarUrl("rankings", process.env.YOUR_API_KEY))
  .then(res => res.json())
  .then(json => {
    return json;
  })
  .catch(err => console.log('Error at fetching', err))
}

function getAllCompetitions(){
  fetch(sportRadarUrl("competitions", process.env.YOUR_API_KEY))
  .then(res => res.json())
  .then(json => {
    return json;
  })
  .catch(err => console.log('Error at fetching competitions', err))
}

function getTournamentsInfo(arg){
  const map = new Map();

  for(const [key, value] of arg){
    fetch(sportRadarUrl(`competitions/${key}/info`, process.env.YOUR_API_KEY))
    .then(res => res.json())
    .then(json => {
      map.set(json.competition.name, value);
    })
    .catch(err => console.log('Error at fetching competition info', err))
  }
  return map;
}

app.get("/", async (req, res) => {
  if (wasAMonth(last_date)){
    last_date = new Date();
    
    //FRONT PAGE
    /*
    rankings = await getRankings();
    dataFrontPage = loadFrontPage(rankings);
    */

   //TABLE RANKINGS
    /*
    tableATP = [];
    TABLEwta = [];
    for (let i = 0; i < 25; i++) {
      tableATP.push(getInfoPlayer(rankings[0].competitor_rankings[i].competitor.id));
      tableWTA.push(getInfoPlayer(rankings[1].competitor_rankings[i].competitor.id));
    }
    */
    //TOURNAMENTS
    // tournaments = getTournamentsInfo(getAllCompetitions());
  }

  //THIS WOULD NOT BE PART OF THE CODE ANYMORE
  //-------------------
  dataFrontPage = loadFrontPage(jsonRankings);
  tableATP = [];
  tableWTA = [];
  for (let i = 0; i < 25; i++){
    tableATP.push({
      name: profExample.competitor.name,
      points: profExample.competitor_rankings[0].points,
      pro_since: profExample.info.pro_year,
      height: profExample.info.height,
      match_record: calcRecord(profExample),
      titles: calcTitles(profExample)
    });
  }
  tournaments = getInfoCompetitions2(require("./public/All_Competitons.json"));
  //-------------------

  res.render("index", {
    dataFrontPage: dataFrontPage,
    tableATP: tableATP,
    tableWTA: tableATP,
    tournaments: tournaments.values()
  });
});

app.use(express.static("public"));

app.set("port", 3000);
app.use(express.json());

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
