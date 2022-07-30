require("dotenv").config();
const express = require("express");
const app = express();

// const base_Api = "https://api.sportradar.us/tennis/trial/v3/en/";
// fetch(`${base_Api}competitions.json?api_key=${process.env.YOUR_API_KEY}`)
// .then(res => res.json())
// .then(json => {

// })
// .catch(err => console.log('Fetch Error', err))

//SETTINGS
app.set("AppName", "Testing");
app.set("port", 3000);
app.use(express.json());

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log(app.get("AppName"));
  console.log("Server on port", app.get("port"));
});