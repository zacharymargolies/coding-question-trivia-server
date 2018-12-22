const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.1,
      max: 1.0
    },
    defaultValue: 0.3
  },
  type: {
    type: Sequelize.ENUM('Multiple Choice', 'True / False')
  }
})

module.exports = Question
