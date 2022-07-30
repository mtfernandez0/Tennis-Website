import {loadFrontPage} from "./front_page.js"
import {changePosition, changeTable} from "./slider.js"
import {getInfoCompetitions} from "./calendar.js"
// import {loadTableData} from "./rankings.js"


const atp_id_players = []
const wta_id_players = []

// const base_Api = "api.sportradar.com/tennis/trial/v3/en/";

// const options = {
//   method: 'GET',
//   headers: new Headers({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//   }),
// };

// const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;

// fetch(corsAnywhere + `${base_Api}competitions.json?api_key=${api_Key}`)
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((err) => console.log(err))

fetch("./ATP_WTA_Rankings.json")
.then(res => res.json())
.then(data => {
        loadFrontPage(data);
        //loadTableData(load_atp_id_players(data), "table-body-men");
        //loadTableData(load_wta_id_players(data), "table-body-women");
    }
)
.catch(error => console.log(error))

fetch("./All_Competitons.json")
.then(res => res.json())
.then(json => {
    getInfoCompetitions(json);
})
.catch(err => console.log(err))

function load_atp_id_players(data){
    for (let i = 0; i < 25; i++) {
        atp_id_players.push(data.rankings[0].competitor_rankings[i].competitor.id)
    }
}

function load_wta_id_players(data){
    for (let i = 0; i < 25; i++) {
        wta_id_players.push(data.rankings[1].competitor_rankings[i].competitor.id)
    }
}