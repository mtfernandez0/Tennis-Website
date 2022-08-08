const sportRadarUrl = (content, api_key) => 
`https://api.sportradar.com/tennis/trial/v3/en/${content}.json?api_key=${api_key}`;

module.exports = { sportRadarUrl };