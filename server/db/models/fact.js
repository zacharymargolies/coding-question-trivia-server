const Sequelize = require('sequelize');
const db = require('../db');

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
  },
  daysBetweenReviews: {
    type: Sequelize.FLOAT,
    defaultValue: 1
  },
  dateLastReviewed: {
    type: Sequelize.DATE
  },
  quizzable: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  discard: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Fact.prototype.updateSRD = function(performanceRating) {
  const correct = performanceRating >= 0.6;
  let percentOverdue;
  if (this.dateLastReviewed === null) {
    this.dateLastReviewed = Date.now();
  }
  // RESTRICT NUMBERS TO BOUNDS OF [0,1]
  function clamp(num) {
    return Math.max(0, Math.min(num, 1));
  }

  // PERCENT OVERDUE
  if (correct) {
    percentOverdue = Math.min(
      2,
      (Date.now() - this.dateLastReviewed) / 86400000 / this.daysBetweenReviews
    );
  } else {
    percentOverdue = 1;
  }

  // DIFFICULTY
  const unClampedDifficulty =
    this.difficulty + percentOverdue * (1 / 17) * (8 - 9 * performanceRating);
  this.difficulty = clamp(unClampedDifficulty);
  this.difficultyWeight = 3 - 1.7 * this.difficulty;

  // DAYS BETWEEN REVIEWS
  if (correct) {
    this.daysBetweenReviews =
      this.daysBetweenReviews *
      (1 + (this.difficultyWeight - 1 * percentOverdue));
  } else {
    this.daysBetweenReviews =
      this.daysBetweenReviews * (1 / Math.pow(this.difficultyWeight, 2));
  }

  // SET DATE LAST REVIEWED
  this.dateLastReviewed = Date.now();

  this.update({
    daysBetweenReviews: this.daysBetweenReviews,
    dateLastReviewed: this.dateLastReviewed,
    difficulty: this.difficulty
  });
};

module.exports = Fact;
