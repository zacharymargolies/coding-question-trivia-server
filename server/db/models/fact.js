const Sequelize = require('sequelize')
const db = require('../db')

const Fact = db.define('fact', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s3.eu-west-2.amazonaws.com/fifteen-uploads/uploads/2016/10/DeveloperChallenges.jpg'
  },
  docsLink: {
    type: Sequelize.STRING
  },
  difficulty: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 1.0
    },
    defaultValue: 0.3
  }
})

module.exports = Fact
