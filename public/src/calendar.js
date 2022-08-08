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

function getInfo(arg, cb){
  var comps = new Map();
  for (let i = 0; i < arg.competitions.length; i++) {
    if (isValidCompetition(arg.competitions[i])){
      
      let level = arg.competitions[i].level;
      level =
      level === "grand_slam" ? "Grand Slam" : `ATP ${level.slice(4, 7)}`;
      
      comps.set(arg.competitions[i].parent_id, level);
    }
  }
  cb(comps)
}

async function getInfoCompetitions(arg){
  var result;
    getInfo(arg, (res) => {
      result = res
    })
    return result
}

module.exports = { getInfoCompetitions };
