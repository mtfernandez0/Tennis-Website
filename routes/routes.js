'use strict'

const { MANTAINER_KEY } = require('../config')
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
const { loadFrontPage } = require('../functions/functions')
const { orderByRank } = require('./filters.js')
const Joi = require('joi')
const express = require('express')
const axios = require('axios')
const router = express.Router()

router.use(express.json())

router.get('/rankings', async (req, res) => {
  var table = async () => {
    return orderByRank(req.query.sortAsc === 'true' ? 1 : -1, req.query.table)
  }

  const frontPage = await Tables.findOne()
  const src = await ImgUrls.findOne()
  const tournaments = await Tournaments.findOne()

  res.render('index', {
    dataFrontPage: await loadFrontPage(frontPage.tableATP, src.player),
    showTable: req.query.table,
    sortAsc: !(req.query.sortAsc === 'true'),
    table: await table(),
    tournaments: tournaments.tournament
  })
})

router.get('/', async (req, res, next) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  if (
    (await Tables.findOne()).updated &&
    (await Tournaments.findOne()).updated
  ) {
    const currentDate = new Date()
    const last_update = await Tables.findOne()

    if (last_update.last_update.getMonth() !== currentDate.getMonth()) {
      await Tables.updateOne({}, { updated: false })
      await Tournaments.updateOne({}, { updated: false })

      axios.patch(`${fullUrl}${MANTAINER_KEY}`)
    }
    next()
  } else {
    res.send('We are currently updating, this will take a few minutes...')
  }
})

router
  .route(`/${MANTAINER_KEY}`)
  .post(async (req, res) => {
    const schema = Joi.object({
      player_name: Joi.string().required(),
      imgUrl: Joi.string().required()
    })

    const validation = schema.validate(req.body)

    if (validation.error) {
      res.status(400).send(validation.error.details[0].message)
    } else {
      const src =
        (await ImgUrls.findOne()) === null
          ? new ImgUrls({ player: {} })
          : await ImgUrls.findOne()

      src.player.set(req.body.player_name, req.body.imgUrl)

      await src.save()

      res.end(`${req.body.player_name} was added successfully!`)
    }
  })
  .patch(async (req, res) => {
    console.time('PATCH')
    await getInfoPlayer(await getRankings())

    const currentDate = new Date()
    const last_update = await Tournaments.findOne()

    if (last_update.last_update.getFullYear() !== currentDate.getFullYear()) {
      const infoComp = await getInfoCompetitions(await getCompetitions())
      await getTournamentsInfo(infoComp)
    }
    console.timeEnd('PATCH')
    req.end('Database Updated!')
  })

module.exports = router
