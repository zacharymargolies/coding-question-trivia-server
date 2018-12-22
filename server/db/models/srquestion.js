const Sequelize = require('sequelize')
const db = require('../db')

const SRQuestion = db.define('SRQuestion', {
  daysBetweenReviews: {
    type: Sequelize.FLOAT,
    defaultValue: 1
  },
  dateLastReviewed: {
    type: Sequelize.DATE
  }
})

module.exports = SRQuestion
