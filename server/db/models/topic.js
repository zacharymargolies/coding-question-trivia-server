const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topics', {
  main: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://deal5star.com/wp-content/uploads/2018/07/Practical-Front-end-Web-Development-Learn-With-Projects.jpg'
  }
});

module.exports = Topic;
