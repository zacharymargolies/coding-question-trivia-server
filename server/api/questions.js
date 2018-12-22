const router = require('express').Router()
const {Question, Topic, Answer, User, SRQuestion} = require('../db/models')
const asyncHandler = require('express-async-handler')

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

// GET QUESTION BY USER BY DIFFICULTY
router.get(
  '/user/:userId/difficulty/:difficulty',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.userId
    const difficulty = req.params.difficulty

    const user = await User.findById(userId)
    const questionsByDifficulty = await user.getQuestions({
      where: {difficulty}
    })

    res.json(questionsByDifficulty)
  })
)

// GET QUESTION BY USER BY TOPIC
router.get(
  '/user/:userId/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.userId
    const topicId = req.params.topicId

    const user = await User.findById(userId)
    const questionsByTopic = await user.getQuestions({
      where: {topicId}
    })

    res.json(questionsByTopic)
  })
)

// UPDATE SPACE REPETITION DATA
router.put(
  '/user/:userId/update/:id',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.userId
    const questionId = req.params.id
    const {performanceRating} = req.body
    const SRQuestionById = await SRQuestion.findOne({
      where: {userId, questionId}
    })
    await SRQuestionById.updateSRD(performanceRating)
    res.send(SRQuestionById)
  })
)
module.exports = router
