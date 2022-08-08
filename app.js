require("dotenv").config();
require("./config");
const { loadFrontPage } = require("./public/src/front_page.js");
const express = require("express");
const app = express();
const router = require("./public/src/manage.js");
const axios = require("axios");
let defines = require("./data/defines.json");
let date = new Date();
let last_update = new Date(defines.last_update);

//Static Files
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/src', express.static(__dirname + 'public/src'))
app.use('/img', express.static(__dirname + 'public/img'))

//Set Views
app.set("views", "./views");
app.set("view engine", "pug");

app.all('/', async (req, res, next) => {
  if (
    date.getMonth() !== last_update.getMonth() ||
    date.getFullYear() !== last_update.getFullYear()
  ) {
    await axios.patch(`http://localhost:3000/manage/${process.env.MANTAINER_KEY}`)
  }
  next()
})

app.get("/", async (req, res) => {
  let dataFrontPage = await loadFrontPage(defines.rankings, defines.src_img);
  res.render("index", {
    dataFrontPage: dataFrontPage,
    tableATP: defines.rankings.tableATP,
    tableWTA: defines.rankings.tableWTA,
    tournaments: defines.tournaments
  });
})

app.set("port", 3000);

app.use("/manage", router);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});