'use strict'

const { Tables } = require('../models/table')
require('../database')

async function orderByRank(...args){
    const table = await Tables.findOne()
    if (args[1] === 'men') {
        return table.tableATP.sort((a, b) => {return args[0]*(a.rank - b.rank)})
    } else {
        return table.tableWTA.sort((a, b) => {return args[0]*(a.rank - b.rank)})
    }
}

module.exports = { orderByRank }