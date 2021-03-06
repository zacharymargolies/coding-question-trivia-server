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

// GET QUESTIONS BY TOPIC
// router.get(
//   '/topic/:topicId',
//   asyncHandler(async (req, res, next) => {
//     const topicId = req.params.topicId
//     const questionsBytopic = await Question.findAll({
//       where: {
//         topicId
//       },
//       include: [
//         {
//           model: Answer
//         },
//         {model: Topic}
//       ]
//     })
//     res.json(questionsBytopic)
//   })
// )

// GET QUESTIONS BY FACT ID
// router.get(
//   '/fact/:factId',
//   asyncHandler(async (req, res, next) => {
//     const questionsByFact = await Question.findAll({
//       where: {
//         factId: req.params.factId
//       },
//       include: [{model: Topic}]
//     })
//     res.json(questionsByFact)
//   })
// )

// GET QUESTIONS BY DIFFICULTY
// router.get(
//   '/difficulty/:difficultyLevel',
//   asyncHandler(async (req, res, next) => {
//     const questionsByDifficulty = await Question.findAll({
//       where: {
//         difficulty: req.params.difficultyLevel
//       },
//       include: [{model: Answer}, {model: Topic}]
//     })
//     res.json(questionsByDifficulty)
//   })
// )

// GET ALL QUIZZABLE QUESTIONS BY USER
router.get(
  '/quizzable',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const user = await User.findById(id)
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

// GET QUESTION BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const questionById = await Question.findById(id)
    res.json(questionById)
  })
)

// GET QUESTIONS BY USER BY DIFFICULTY
router.get(
  '/difficulty/:difficulty',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {difficulty} = req.params
    const user = await User.findById(id)
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
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const {topicId} = req.params
    const {id} = req.user
    const user = await User.findById(id)
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

// GET QUESTIONS BY USER BY TIMELINE
router.get(
  '/timeline/:quantity',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {quantity} = req.params
    const SRQuestions = await SRQuestion.findAll({
      where: {
        userId: id,
        quizzable: true
      },
      order: [['daysBetweenReviews']],
      limit: quantity
    })

    const questionsByTimelinePromise = SRQuestions.map(async question => {
      return Question.findOne({
        where: {
          id: question.questionId
        },
        include: [{model: Answer}, {model: Topic}]
      })
    })
    const questionsByTimeline = await Promise.all(questionsByTimelinePromise)
    res.json(questionsByTimeline)
  })
)

// GET RANDOM QUESTIONS BY USER
router.get(
  '/random/:quantity',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {quantity} = req.params
    const user = await User.findById(id)
    const questionsByTimeline = await user.getQuestions({
      through: {
        where: {
          quizzable: true
        }
      },
      limit: quantity,
      include: [{model: Answer}, {model: Topic}]
    })
    res.json(questionsByTimeline)
  })
)

// UPDATE QUIZZABLE VALUE IN SRQUESTION TABLE
router.put(
  '/quizzable/:questionId/:quizzable',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {questionId, quizzable} = req.params
    const question = await SRQuestion.findOne({where: {userId: id, questionId}})
    await question.update({quizzable})
    res.json(question)
  })
)

// UPDATE SPACE REPETITION DATA
router.put(
  '/update/:questionId',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {questionId} = req.params
    const {performanceRating} = req.body
    console.log('performanceRating :', performanceRating)
    const SRQuestionById = await SRQuestion.findOne({
      where: {userId: id, questionId}
    })
    await SRQuestionById.updateSRD(performanceRating)
    console.log('SRQuestionById :', SRQuestionById)
    res.send(SRQuestionById)
  })
)

module.exports = router
