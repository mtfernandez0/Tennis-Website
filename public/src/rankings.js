function calcRecord(data){
  let length = (data.periods).length;
  let matches_won = 0;
  let matches_played = 0;

  for (let i = 0; i < length; i++) {
    matches_played += data.periods[i].statistics.matches_played;
    matches_won += data.periods[i].statistics.matches_won;
  }
  return `${matches_won}-${matches_played-matches_won}`;
}

function calcTitles(data){
  let length = (data.periods).length;
  let titles = 0;

  for (let i = 0; i < length; i++) {
    titles += data.periods[i].statistics.competitions_won;
  }
  return titles;
}

function load_wta_id_players(data){
  let wta_players = []
  for (let i = 0; i < 25; i++) {
    wta_players.push(data.rankings[1].competitor_rankings[i].competitor.id)
  }
  return wta_players;
}

function load_atp_id_players(data){
  let atp_players = []
  for (let i = 0; i < 25; i++) {
    atp_players.push(data.rankings[0].competitor_rankings[i].competitor.id)
  }
  return atp_players;
};

module.exports = { load_atp_id_players, load_wta_id_players, calcRecord, calcTitles };