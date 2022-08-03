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

module.exports = { calcRecord, calcTitles };