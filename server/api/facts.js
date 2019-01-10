const router = require('express').Router()
const {Fact, Topic, SRFact, User, Question} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')

// GET ALL FACTS
// router.get(
//   '/',
//   asyncHandler(async (req, res, next) => {
//     const allFacts = await Fact.findAll({})
//     res.json(allFacts)
//   })
// )

// GET ALL FACTS BY USER, NOT DISCARDED
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const user = await User.findById(id)
    const factsByUser = await user.getFacts({
      through: {where: {discard: false}}
    })
    res.send(factsByUser)
  })
)

// GET DISCARDED FACTS BY USER
router.get(
  '/discarded',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const user = await User.findById(id)
    const allDiscardedFacts = await user.getFacts({
      through: {
        where: {
          discard: true
        }
      }
    })
    res.json(allDiscardedFacts)
  })
)

// GET QUIZZABLE FACTS BY USER
router.get(
  '/quizzable',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const allQuizzableFacts = await SRFact.findAll({
      where: {
        quizzable: true,
        userId: id
      }
    })
    res.json(allQuizzableFacts)
  })
)

// GET RANDOM FACTS
router.get(
  '/random/:quantity',
  asyncHandler(async (req, res, next) => {
    const randomFacts = await Fact.findAll({
      order: Sequelize.fn('RANDOM'),
      limit: req.params.quantity,
      include: [{model: Topic}, {model: Question}]
    })
    res.json(randomFacts)
  })
)

// GET FACTS BY TOPIC
// router.get(
//   '/topic/:topicId',
//   asyncHandler(async (req, res, next) => {
//     const facts = await Fact.findAll({
//       where: {
//         topicId: req.params.topicId
//       },
//       include: [{model: Topic}]
//     })
//     res.json(facts)
//   })
// )

// GET FACTS BY DIFFICULTY
// router.get(
//   '/difficulty/:difficultyLevel',
//   asyncHandler(async (req, res, next) => {
//     const facts = await Fact.findAll({
//       where: {
//         difficulty: req.params.difficultyLevel
//       },
//       include: [{model: Topic}]
//     })
//     res.json(facts)
//   })
// )

// GET FACT BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const fact = await Fact.findById(id)
    res.json(fact)
  })
)

// GET RANDOM FACTS BY USER, NOT DISCARDED
// router.get(
//   '/random/:quantity',
//   asyncHandler(async (req, res, next) => {
//     const {id} = req.user
//     const user = await User.findById(id)
//     const randomFactsByUser = await user.getFacts({
//       through: {where: {discard: false}},
//       order: Sequelize.fn('RANDOM'),
//       limit: req.params.quantity,
//       include: [{model: Topic}, {model: Question}]
//     })
//     res.json(randomFactsByUser)
//   })
// )

// GET FACTS BY USER BY DIFFICULTY, NOT DISCARDED
router.get(
  '/difficulty/:difficulty',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {difficulty} = req.params
    const user = await User.findById(id)
    const factsByUserByDifficulty = await user.getFacts({
      where: {difficulty},
      through: {
        where: {
          discard: false
        }
      },
      include: [{model: Topic}, {model: Question}]
    })
    res.json(factsByUserByDifficulty)
  })
)

// GET FACTS BY USER BY TOPIC, NOT DISCARDED
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {topicId} = req.params
    const user = await User.findById(id)
    const factsByUserByTopic = await user.getFacts({
      where: {topicId},
      through: {
        where: {
          discard: false
        }
      },
      include: [{model: Topic}, {model: Question}]
    })
    res.json(factsByUserByTopic)
  })
)
// UPDATE DISCARD VALUE IN SRFACT TABLE
router.put(
  '/discarded/:factId/:discard',
  asyncHandler(async (req, res, next) => {
    const {id} = req.user
    const {factId, discard} = req.params
    const fact = await SRFact.findOne({
      where: {
        userId: id,
        factId
      }
    })
    await fact.update({discard})
    res.json(fact)
  })
)

module.exports = router
