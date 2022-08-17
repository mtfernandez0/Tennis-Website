const { MANTAINER_KEY } = require("../config")
const ImgUrls = require('../models/src_img')
const { Tables } = require('../models/table')
const { Tournaments } = require('../models/tournaments')
const { 
  getRankings,
  getInfoPlayer,
  getInfoCompetitions, 
  getCompetitions,
  getTournamentsInfo 
} = require('../functions/functions')
const express = require("express");
const axios = require("axios");
let router = express.Router();

router.use(express.json());

router.get('/', async (req, res, next) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  if((await Tables.findOne()).updated && (await Tournaments.findOne()).updated){

    let currentDate = new Date()
    let last_update = await Tables.findOne()
    
    if(last_update.last_update.getMonth() !== currentDate.getMonth()){
      await Tables.updateOne({}, { updated: false })
      await Tournaments.updateOne({}, { updated: false })

          axios.patch(`${fullUrl}${MANTAINER_KEY}`)
      }
    next()
  } else {
    res.send("We are currently updating, this will take a few minutes...")
  }
})

router
  .route(`/${MANTAINER_KEY}`)
  .post(async (req, res) => {

    let src;
    if(await ImgUrls.findOne() === null){
      src = new ImgUrls({ player: {} })
    } else {
      src = await ImgUrls.findOne()
    }

    src.player.set(req.body.player_name, req.body.imgUrl)

    console.log(src)
    await src.save()

    res.end("New member added!");
  })
  .patch(async (req, res) => {
    console.time("PATCH")
    await getInfoPlayer(await getRankings());

    let currentDate = new Date();
    let last_update = await Tournaments.findOne()

    if (last_update.last_update.getFullYear() !== currentDate.getFullYear()) {
      
      let infoComp = await getInfoCompetitions(await getCompetitions())
      await getTournamentsInfo(infoComp)
    }
    console.timeEnd("PATCH")
    req.end("Database Updated!")
  });

module.exports = router;
