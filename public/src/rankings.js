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
  return competitions_won;
}

export function loadTableData(data, id) {
  const tableBody = document.getElementById(id);
  let dataHtml = ``;

  for (let i = 0; i < data.length; i++) {
    dataHtml += `<tr>
                <td>${i}</td>
                <td>${data[i].competitor.name}</td>
                <td>${data[i].competitor_rankings[0].points}</td>
                <td>${data[i].competitor.info.pro_year}</td>
                <td>${data[i].competitor.info.height}</td>
                <td>${calcRecord(data[i])}</td>
                <td>${calcTitles(data[i])}</td>
                </tr>`;
  }
  tableBody.innerHTML = dataHtml;
}
