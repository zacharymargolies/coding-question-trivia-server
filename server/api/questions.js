const router = require('express').Router()
const {Question, Topic, Answer} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')

// GET ALL QUESTIONS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allQuestions = await Question.findAll({})
    res.json(allQuestions)
  })
)

// GET QUESTIONS BY TOPIC
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const topicId = req.params.topicId
    const questionsBytopic = await Question.findAll({
      where: {
        topicId
      },
      include: [
        {
          model: Answer
        }
        // {model: Topic}
        // {
        // all: true,
        // model: Answer,
        // where: {topicId},
        // separate: true
        // required: false
        // order: Sequelize.fn('RANDOM')
        // limit: 3
        // }
      ]
    })
    res.json(questionsBytopic)
  })
)

// GET QUESTIONS BY FACT ID
router.get(
  '/fact/:factId',
  asyncHandler(async (req, res, next) => {
    const questionsByFact = await Question.findAll({
      where: {
        factId: req.params.factId
      },
      include: [{model: Topic}]
    })
    res.json(questionsByFact)
  })
)

// GET QUESTIONS BY DIFFICULTY
router.get(
  '/difficulty/:difficultyLevel',
  asyncHandler(async (req, res, next) => {
    const questionsByDifficulty = await Question.findAll({
      where: {
        difficulty: req.params.difficultyLevel
      },
      include: [{model: Topic}]
    })
    res.json(questionsByDifficulty)
  })
)

// GET QUESTION BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const questionById = await Question.findById(id)
    res.json(questionById)
  })
)

module.exports = router
