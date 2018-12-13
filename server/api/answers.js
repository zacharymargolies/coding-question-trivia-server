const router = require('express').Router()
const {Question, Topic, Answer} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// GET ALL ANSWERS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allAnswers = await Answer.findAll({
      // include: [{model: Question}]
    })
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
      // include: [{model: Question}]
    })
    res.json(randomAnswers)
  })
)

// GET ANSWER BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const answerById = await Answer.findOne({
      where: {id},
      include: [{model: Question}]
    })
    res.json(answerById)
  })
)

module.exports = router
