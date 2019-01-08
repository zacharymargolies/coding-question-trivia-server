const router = require('express').Router()
const {Question, Topic, Answer, User, SRQuestion} = require('../db/models')
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

// GET /api/topics/1 --> eager load questions+answers & answers
/*
{
  id: 1,
  name: 'sequelize',
  questions: [{
    id: 1,
    text: 'sdkjfhdkjfh',
    answer: {
      id: 1,
      text: 'sdkjfhkjdshf'
    }
  }],
  answers: [{
    id: 1,
    ...
  }]
}
*/

// GET /api/questions?topicId=1

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
        },
        {model: Topic}
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
      include: [{model: Answer}, {model: Topic}]
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

// GET ALL QUIZZABLE QUESTIONS
router.get(
  '/user/:userId',
  asyncHandler(async (req, res, next) => {
    const {userId} = req.params
    const user = await User.findById(userId)
    const quizzableItems = await user.getQuestions({
      through: {
        where: {
          quizzable: true
        }
      },
      include: [{model: Answer}, {model: Topic}]
    })
    res.json(quizzableItems)
  })
)

// GET QUESTIONS BY USER BY DIFFICULTY
router.get(
  '/user/:userId/difficulty/:difficulty',
  asyncHandler(async (req, res, next) => {
    const {userId, difficulty} = req.params
    const user = await User.findById(userId)
    const questionsByDifficulty = await user.getQuestions({
      where: {difficulty},
      through: {
        where: {
          quizzable: true
        }
      },
      include: [{model: Answer}, {model: Topic}]
    })

    res.json(questionsByDifficulty)
  })
)

// GET QUESTIONS BY USER BY TOPIC
router.get(
  '/user/:userId/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const {userId, topicId} = req.params
    const user = await User.findById(userId)
    const questionsByTopic = await user.getQuestions({
      where: {topicId},
      through: {
        where: {
          quizzable: true
        }
      },
      include: [{model: Answer}, {model: Topic}]
    })

    res.json(questionsByTopic)
  })
)

// GET QUESTIONS BY TIMELINE
router.get(
  '/user/:userId/timeline/:quantity',
  asyncHandler(async (req, res, next) => {
    const {userId, quantity} = req.params
    const user = await User.findById(userId)
    const questionsByTimeline = await user.getQuestions({
      through: {
        order: [['daysBetweenReviews', 'desc']],
        where: {
          quizzable: true
        }
      },
      limit: quantity
      // include: [{model: Answer}, {model: Topic}]
    })
    res.json(questionsByTimeline)
  })
)

// UPDATE QUIZZABLE VALUE IN SRQUESTION TABLE
router.put(
  '/user/:userId/quizzable/:questionId/:quizzable',
  asyncHandler(async (req, res, next) => {
    const {userId, questionId, quizzable} = req.params
    const question = await SRQuestion.findOne({where: {userId, questionId}})
    await question.update({quizzable})
    res.json(question)
  })
)

// UPDATE SPACE REPETITION DATA
router.put(
  '/user/:userId/update/:questionId',
  asyncHandler(async (req, res, next) => {
    const {userId, questionId} = req.params
    const {performanceRating} = req.body
    const SRQuestionById = await SRQuestion.findOne({
      where: {userId, questionId}
    })
    await SRQuestionById.updateSRD(performanceRating)
    res.send(SRQuestionById)
  })
)

module.exports = router
