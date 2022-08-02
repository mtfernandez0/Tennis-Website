function levelCheck(arg) {
  return (
    arg === "atp_250" ||
    arg === "atp_500" ||
    arg === "atp_1000" ||
    arg === "wta_250" ||
    arg === "wta_500" ||
    arg === "wta_1000" ||
    arg === "grand_slam"
  );
}

function categoryCheck(arg) {
  return arg === "WTA" || arg === "ATP";
}

function getCompetitions(arg){
  const competitions = []

  for (let i = 0; i < arg.competitions.length; i++) {
    if (
      typeof arg.competitions[i].level !== "undefined" &&
      arg.competitions[i].type === "singles" &&
      categoryCheck(arg.competitions[i].category.name) &&
      levelCheck(arg.competitions[i].level)
    ) {
      competitions.push(arg.competitions[i].name);
    }
  }
  return competitions;
}

module.exports = { getCompetitions };