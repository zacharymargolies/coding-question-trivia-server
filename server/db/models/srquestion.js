const Sequelize = require('sequelize')
const db = require('../db')

const SRQuestion = db.define('SRQuestion', {
  difficulty: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.1,
      max: 1.0
    }
  },
  daysBetweenReviews: {
    type: Sequelize.FLOAT,
    defaultValue: 1
  },
  dateLastReviewed: {
    type: Sequelize.DATE
  }
})

SRQuestion.prototype.updateSRD = function(performanceRating) {
  const correct = performanceRating >= 0.6
  let percentOverdue
  if (this.dateLastReviewed === null) {
    this.dateLastReviewed = Date.now()
  }
  // RESTRICT NUMBERS TO BOUNDS OF [0,1]
  function clamp(num) {
    return Math.max(0, Math.min(num, 1))
  }

  // PERCENT OVERDUE
  if (correct) {
    percentOverdue = Math.min(
      2,
      (Date.now() - this.dateLastReviewed) / 86400000 / this.daysBetweenReviews
    )
  } else {
    percentOverdue = 1
  }

  // DIFFICULTY
  const unClampedDifficulty =
    this.difficulty + percentOverdue * (1 / 17) * (8 - 9 * performanceRating)
  this.difficulty = clamp(unClampedDifficulty)
  this.difficultyWeight = 3 - 1.7 * this.difficulty

  // DAYS BETWEEN REVIEWS
  if (correct) {
    this.daysBetweenReviews =
      this.daysBetweenReviews *
      (1 + (this.difficultyWeight - 1 * percentOverdue))
  } else {
    this.daysBetweenReviews =
      this.daysBetweenReviews * (1 / Math.pow(this.difficultyWeight, 2))
  }

  // SET DATE LAST REVIEWED
  this.dateLastReviewed = Date.now()

  this.update({
    daysBetweenReviews: this.daysBetweenReviews,
    dateLastReviewed: this.dateLastReviewed,
    difficulty: this.difficulty
  })
}

module.exports = SRQuestion
