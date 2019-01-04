const Sequelize = require('sequelize')
const db = require('../db')

const SRFact = db.define('SRFact', {
  discard: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = SRFact
