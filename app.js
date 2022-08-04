require("dotenv").config();
require("./config");
const { sportRadarUrl } = require("./config");
const {
  getInfoCompetitions,
  getInfoCompetitions2,
} = require("./public/src/calendar.js");
const { calcRecord, calcTitles } = require("./public/src/rankings");
const { loadFrontPage } = require("./public/src/front_page.js");
const express = require("express");
const app = express();
const path = require("path");
const jsonRankings = require("./public/ATP_WTA_Rankings.json");
const profExample = require("./profile.json");
const router = require("./public/src/manage.js");
var defines = require("./public/src/defines.js");
const { execSync } = require("child_process");
const fetch = require('node-fetch')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

function getInfoPlayer(competitor_id) {
  fetch(
    sportRadarUrl(
      `competitor/${competitor_id}/profile`,
      process.env.YOUR_API_KEY
    )
  )
    .then((res) => res.json())
    .then((json) => {
      return {
        name: json.competitor.name,
        points: json.competitor_rankings[0].points,
        pro_since: json.info.pro_year,
        height: json.info.height,
        match_record: calcRecord(json),
        titles: calcTitles(json),
      };
    })
    .catch((err) =>
      console.log("Error at feching, player_id:", competitor_id, err)
    );
}

function getRankings() {
  fetch(sportRadarUrl("rankings", process.env.YOUR_API_KEY))
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("Error at fetching", err));
}

function getAllCompetitions() {
  fetch(sportRadarUrl("competitions", process.env.YOUR_API_KEY))
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("Error at fetching competitions", err));
}

function getTournamentsInfo(arg) {
  const map = new Map();

  for (const [key, value] of arg) {
    fetch(sportRadarUrl(`competitions/${key}/info`, process.env.YOUR_API_KEY))
      .then((res) => res.json())
      .then((json) => {
        map.set(json.competition.name, value);
      })
      .catch((err) => console.log("Error at fetching competition info", err));
  }
  return map;
}

function mid() {
  console.log("MID")
}

app.get('/greet', (req, res) => {
  console.log("I'm in")
})

app.all('/', (req, res, next) => {
  fetch("http://localhost:3000/greet")
  next()
})


app.get("/", async (req, res) => {
  let date = new Date();
  if (
    date.getMonth() !== defines.last_update.getMonth() ||
    date.getFullYear() !== defines.last_update.getFullYear()
  ) {
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
    /*
    if (defines.last_update.getFullYear() !== date.getFullYear()) {
      tournaments = getTournamentsInfo(getAllCompetitions());
    }
    */
    defines.last_update = new Date();
  }

  //THIS WOULD NOT BE PART OF THE CODE ANYMORE
  //-------------------
  defines.dataFrontPage = loadFrontPage(jsonRankings);
  defines.tableATP = [];
  defines.tableWTA = [];
  for (let i = 0; i < 25; i++) {
    defines.tableATP.push({
      name: profExample.competitor.name,
      points: profExample.competitor_rankings[0].points,
      pro_since: profExample.info.pro_year,
      height: profExample.info.height,
      match_record: calcRecord(profExample),
      titles: calcTitles(profExample),
    });
  }
  defines.tournaments = getInfoCompetitions2(
    require("./public/All_Competitons.json")
  );
  //-------------------

  res.render("index", {
    dataFrontPage: defines.dataFrontPage,
    tableATP: defines.tableATP,
    tableWTA: defines.tableATP,
    tournaments: defines.tournaments.values(),
  });
});

app.use(express.static("public"));

app.set("port", 3000);

app.use("/manage", router);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
