const { url } = require("../config");
const axios = require("axios");
const { Tables } = require("../models/table");
const { Tournaments } = require("../models/tournaments");

//-----FRONT PAGE-----//
const loadFrontPage = async (...args) => {
  const data = new Array(10);
  for (let i = 0; i < 10; i++) {
    let info = args[0][i];
    let dataObj = {
      rank: info.value.rank,
      name: info.name,
      src: args[1].has(info.name)
        ? args[1].get(info.name)
        : args[1].get("unknown"),
      points: info.value.points,
    };
    data[i] = dataObj;
  }
  return data;
};
//--------------------//

//-----RANKINGS-----//
const getRankings = () => {
  console.log("First");
  return new Promise((resolve, reject) => {
    axios
      .get(url("rankings", process.env.YOUR_API_KEY))
      .then((res) => res.data)
      .then((json) => {
        console.log("Rankings Fetched!");
        resolve(json);
      })
      .catch((err) => console.log(err));
  });
};

const getInfoPlayer = async (arg) => {
  var tableATP = new Array(25)
  var tableWTA = new Array(25)
  var count = 1

  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 25; i++) {
      let base = arg.rankings[j].competitor_rankings[i];
      let obj = {
        name: base.competitor.name,
        value: {
          competitor_id: base.competitor.id,
          rank: base.rank,
          points: base.points,
          record: "",
          titles: 0,
        },
      };

      await axios
        .get(url(`competitors/${base.competitor.id}/profile`, process.env.YOUR_API_KEY))
        .then((res) => res.data)
        .then((json) => {
          obj.value.pro_since = json.info.pro_year;
          obj.value.height = json.info.height;
          obj.value.record = calcRecord(json);
          obj.value.titles = calcTitles(json);

          j === 0 ? (tableATP[i] = obj) : (tableWTA[i] = obj);

          console.log(`Competitor information fetched ${count}/50`);
          count++
        })
        .catch((err) => console.log(err));
      //1 call per second to the api
      await delay();
    }
  }
  await Tables.findOneAndUpdate({}, {
    tableATP: tableATP,
    tableWTA: tableWTA,
    last_update: new Date(),
    updated: true
  })
};

function calcRecord(data) {
  let length = data.periods.length;
  let matches_won = 0;
  let matches_played = 0;

  for (let i = 0; i < length; i++) {
    matches_played += data.periods[i].statistics.matches_played;
    matches_won += data.periods[i].statistics.matches_won;
  }
  return `${matches_won}-${matches_played - matches_won}`;
}

function calcTitles(data) {
  let length = data.periods.length;
  let titles = 0;

  for (let i = 0; i < length; i++) {
    titles += data.periods[i].statistics.competitions_won;
  }
  return titles;
}
//--------------------//

//-----TOURANEMTS-----//
const getCompetitions = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url("competitions", process.env.YOUR_API_KEY))
      .then((res) => res.data)
      .then((json) => {
        console.log("Competitions Fetched!");
        resolve(json);
      })
      .catch((err) => console.log(err));
  });
};

const getTournamentsInfo = async (arg) => {
  var tournaments = []
  var count = 1
  for (const [key, value] of arg) {
    await axios
      .get(url(`competitions/${key}/info`, process.env.YOUR_API_KEY))
      .then((res) => res.data)
      .then((json) => {
        let obj = {
          competition_name: json.competition.name,
          competition_level: value,
        };
        tournaments.push(obj);
        console.log(`Competition information fetched ${count}/${arg.size}`);
        count++
      })
      .catch((err) => console.log(err));
    //1 call per second to the api
    await delay();
  }
  console.log("Competitions information fetched!");
  await Tournaments.findOneAndUpdate({}, {
    tournaments: tournaments,
    last_update: new Date(), 
    updated: true
  })
};

function isValidLevel(arg) {
  return (
    typeof arg !== "undefined" &&
    (arg === "atp_250" ||
      arg === "atp_500" ||
      arg === "atp_1000" ||
      arg === "wta_250" ||
      arg === "wta_500" ||
      arg === "wta_1000" ||
      arg === "grand_slam")
  );
}

function isValidCategory(arg) {
  return arg === "WTA" || arg === "ATP";
}

const isValidCompetition = (arg) => {
  return (
    isValidLevel(arg.level) &&
    arg.type === "singles" &&
    isValidCategory(arg.category.name)
  );
};

function getInfo(arg, cb) {
  var comps = new Map();
  for (let i = 0; i < arg.competitions.length; i++) {
    if (isValidCompetition(arg.competitions[i])) {
      let level = arg.competitions[i].level;
      level =
        level === "grand_slam"
          ? "Grand Slam"
          : `ATP ${level.slice(4, level.length)}`;

      comps.set(arg.competitions[i].parent_id, level);
    }
  }
  cb(comps);
}

async function getInfoCompetitions(arg) {
  var result;
  getInfo(arg, (res) => {
    result = res;
  });
  return result;
}
//--------------------//

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

module.exports = {
  getRankings,
  getInfoPlayer,
  loadFrontPage,
  getInfoCompetitions,
  getCompetitions,
  getTournamentsInfo,
};
