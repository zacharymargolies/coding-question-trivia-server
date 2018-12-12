const router = require('express').Router()
const {Question, Topic, Answer} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// GET ALL ANSWERS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allAnswers = await Answer.findAll({})
    res.json(allAnswers)
  })
)

// GET RANDOM ANSWERS BY TOPIC
router.get(
  '/random/:topicId/:questionId',
  asyncHandler(async (req, res, next) => {
    // const {topicId, questionId} = req.params
    const {topicId} = req.params
    const randomAnswers = await Answer.findAll({
      where: {
        topicId
        // questionId: {[Op.ne]: questionId}
      },
      order: Sequelize.fn('RANDOM'),
      limit: 3
    })
    res.json(randomAnswers)
  })
)

module.exports = router
