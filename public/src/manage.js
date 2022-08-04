require('dotenv').config();
const express = require("express");
let router = express.Router();
var { loadSrcPlayer } = require("./front_page.js")

router.use(express.json());

router
.route(`/${process.env.MANTAINER_KEY}`)
.post((req, res) => {
    console.log("Adding new member...")
    loadSrcPlayer(req.body)
    console.log("New member added!")
    res.end()
});

module.exports = router;