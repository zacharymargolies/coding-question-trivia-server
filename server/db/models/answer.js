const Sequelize = require('sequelize');
const db = require('../db');

const Answer = db.define('answer', {
  value: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('Multiple Choice', 'True / False')
  }
});

module.exports = Answer;
