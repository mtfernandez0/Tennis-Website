const sportRadarUrl = (content, api_key) => 
`https://api.sportradar.us/tennis/trial/v3/en/${content}.json?api_key=${api_key}`;

module.exports = { sportRadarUrl };