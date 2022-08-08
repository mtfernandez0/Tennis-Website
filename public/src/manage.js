require("dotenv").config();
const { sportRadarUrl } = require("../../config");
const axios = require("axios");
const fs = require("fs");
const express = require("express");
var { getInfoCompetitions } = require("./calendar.js");
const { calcRecord, calcTitles } = require("./rankings.js");
var defines = require("../../data/defines.json");
let router = express.Router();

const getRankings = () => {
  return new Promise((resolve, reject) => {
    axios.get(sportRadarUrl("rankings", process.env.YOUR_API_KEY))
      .then((res) => res.data)
      .then((json) => {
        console.log("Rankings Fetched!");
        resolve(json);
      })
      .catch((err) => console.log(err));
  });
};

const getInfoPlayer = async (...args) => {
  let res = {
    tableATP: new Array(args[1]),
    tableWTA: new Array(args[1]),
  };
    for (let j = 0; j < 2; j++) {
      
      for (let i = 0; i < args[1]; i++) {
        let base = args[0].rankings[j].competitor_rankings[i];
        let obj = {
          name: base.competitor.name,
          value: {
            competitor_id: base.competitor.id,
            rank: base.rank,
            points: base.points,
            pro_since: 0,
            height: 0,
            record: "",
            titles: 0,
          }
        };
        await axios
        .get(sportRadarUrl(`competitors/${base.competitor.id}/profile`, process.env.YOUR_API_KEY))
          .then(res => res.data)
          .then((json) => {
            obj.value.pro_since = json.info.pro_year;
            obj.value.height = json.info.height;
            obj.value.record = calcRecord(json);
            obj.value.titles = calcTitles(json);

            if (j === 0) {
            res.tableATP[i] = obj;
            } else {
            res.tableWTA[i] = obj;
            }
            console.log("Competitor info Fetched!");
          })
          .catch((err) => console.log(err));
      }
    }
    return res;
};

const getCompetitions = () => {
  return new Promise((resolve, reject) => {
    axios.get(sportRadarUrl("competitions", process.env.YOUR_API_KEY))
      .then(res => res.data)
      .then((json) => {
        console.log("Competitions Fetched!");
        resolve(json);
      })
      .catch((err) => console.log(err));
  });
};

function delay(){
  return new Promise((resolve, reject) => {
  	setTimeout(() => {
    resolve()
    }, 1500)
  })
}

const getTournamentsInfo = async (arg) => {
  let data = [];
    for (const [key, value] of arg) {
    await axios
    .get(sportRadarUrl(`competitions/${key}/info`, process.env.YOUR_API_KEY))
      .then((res) => res.data)
      .then((json) => {
        let obj = {
          competition_name: json.competition.name,
          competition_level: value
        };
        data.push(obj);
      })
      .catch((err) => console.log(err));
      //1 call per second to the api
      await delay()
    }
    console.log("Competitions info Fetched")
    return data;
};

router.use(express.json());

router
  .route(`/${process.env.MANTAINER_KEY}`)
  .post(async (req, res) => {
    defines.src_img.push(req.body);

    await fs.promises.writeFile(
      "data/defines.json",
      JSON.stringify(defines, null, 4),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
    res.end("New member added!");
  })
  .patch(async (req, res) => {
    console.time("patch");
    let data = await fs.promises.readFile("/home/mati/Desktop/Tennis/mtfernandez0.github.io/data/defines.json", "utf8")
          .then(res => {return JSON.parse(res)})
          .catch(err => console.log(err))

    let rankings = await getRankings()
    data.rankings = await getInfoPlayer(rankings, 25);
    let date = new Date();
    let last_update = new Date(data.last_update);

    if (date.getFullYear() !== last_update.getFullYear()) {
      let competitions = await getCompetitions()
      let infoComp = await getInfoCompetitions(competitions)
      data.tournaments = await getTournamentsInfo(infoComp);
    }
    data.last_update = date

    await fs.promises
      .writeFile(
        "/home/mati/Desktop/Tennis/mtfernandez0.github.io/data/defines.json",
        JSON.stringify(data, null, 4)
      )
      .then(() => {
        console.timeEnd("patch");
        res.end();
      })
      .catch((err) =>
        console.log("Error when trying to write the file defines.json", err)
      );
  });

module.exports = router;
