const router = require('express').Router()
const {Question, Topic, Answer} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')

// GET ALL ANSWERS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allAnswers = await Answer.findAll({})
    res.json(allAnswers)
  })
)

// GET RANDOM ANSWER
router.get(
  '/random',
  asyncHandler(async (req, res, next) => {
    const randomAnswer = await Answer.findAll({
      order: Sequelize.fn('RANDOM'),
      limit: 3
    })
    res.json(randomAnswer)
  })
)

module.exports = router
