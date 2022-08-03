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

//THIS WOULD NOT BE PART OF THE CODE ANYMORE
//-------------------
function getInfoCompetitions2(arg) {
  const competitions = new Map();

  for (let i = 0; i < arg.competitions.length; i++) {
    if (
      typeof arg.competitions[i].level !== "undefined" &&
      arg.competitions[i].type === "singles" &&
      categoryCheck(arg.competitions[i].category.name) &&
      levelCheck(arg.competitions[i].level)
    ) {
      let level = arg.competitions[i].level;
      level =
        level === "grand_slam"
          ? "Grand Slam"
          : `ATP ${level.slice(4, 7)}`;
          
      competitions.set(arg.competitions[i].parent_id, {
        competition_name: arg.competitions[i].name,
        competition_level: level,
      });
    }
  }
  return competitions;
}
//-------------------


function getInfoCompetitions(arg) {
  const competitions = new Map();

  for (let i = 0; i < arg.competitions.length; i++) {
    if (
      typeof arg.competitions[i].level !== "undefined" &&
      arg.competitions[i].type === "singles" &&
      categoryCheck(arg.competitions[i].category.name) &&
      levelCheck(arg.competitions[i].level)
    ) {
      let level = arg.competitions[i].level;
      level =
        level === "grand_slam"
          ? "Grand Slam"
          : `ATP ${level.slice(4, 7)}`;
          
      competitions.set(arg.competitions[i].parent_id, level);
    }
  }
  return competitions;
}

module.exports = { getInfoCompetitions, getInfoCompetitions2 };









