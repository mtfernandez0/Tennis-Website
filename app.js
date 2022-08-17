const { PORT, MANTAINER_KEY } = require("./config")
const ImgUrls = require('./models/src_img')
const { Tables } = require('./models/table')
const { Tournaments } = require('./models/tournaments')
const path = require('path')
const { loadFrontPage }= require('./functions/functions')
const express = require("express");
const router = require("./routes/routes");

//Inits
require('./database')
const app = express();

//Setting views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(`/${MANTAINER_KEY}`, router);

//Static Files
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/src', express.static(__dirname + 'public/src'))
app.use('/img', express.static(__dirname + 'public/img'))


app.get("/", async (req, res) => {

  let src = await ImgUrls.findOne()
  let tables = await Tables.findOne()
  let tournaments = await Tournaments.findOne()

  res.render("index", {
    dataFrontPage: await loadFrontPage(tables.tableATP, src.player),
    tableATP: tables.tableATP,
    tableWTA: tables.tableWTA,
    tournaments: tournaments.tournament
  })
})

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});