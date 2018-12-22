const router = require('express').Router()
const {Fact, Topic, SRFact, User} = require('../db/models')
const asyncHandler = require('express-async-handler')
const Sequelize = require('sequelize')

// GET ALL FACTS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allFacts = await Fact.findAll({})
    res.json(allFacts)
  })
)

// GET RANDOM FACTS
router.get(
  '/random/:quantity',
  asyncHandler(async (req, res, next) => {
    const randomFacts = await Fact.findAll({
      order: Sequelize.fn('RANDOM'),
      limit: req.params.quantity,
      include: [{model: Topic}]
    })
    res.json(randomFacts)
  })
)

// GET FACTS BY TOPIC
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        topicId: req.params.topicId
      },
      include: [{model: Topic}]
    })
    res.json(facts)
  })
)

// GET FACTS BY DIFFICULTY
router.get(
  '/difficulty/:difficultyLevel',
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        difficulty: req.params.difficultyLevel
      },
      include: [{model: Topic}]
    })
    res.json(facts)
  })
)

// GET FACT BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const fact = await Fact.findById(id)
    res.json(fact)
  })
)

// GET ALL FACTS BY USER, NOT DISCARDED
router.get(
  '/user/:id',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    const factsByUser = await user.getFacts({
      through: {where: {discard: false}}
    })
    res.send(factsByUser)
  })
)

// GET RANDOM FACTS BY USER, NOT DISCARDED
router.get(
  '/user/:id/random/:quantity',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    const randomFactsByUser = await user.getFacts({
      through: {where: {discard: false}},
      order: Sequelize.fn('RANDOM'),
      limit: req.params.quantity,
      include: [{model: Topic}]
    })
    res.json(randomFactsByUser)
  })
)

// GET FACTS BY USER BY DIFFICULTY, NOT DISCARDED
router.get(
  '/user/:id/difficulty/:difficulty',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const difficulty = req.params.difficulty
    const user = await User.findById(userId)
    const randomFactsByUser = await user.getFacts({
      where: {difficulty},
      through: {
        where: {
          discard: false
        }
      },
      include: [{model: Topic}]
    })
    res.json(randomFactsByUser)
  })
)

// GET FACTS BY USER BY TOPIC, NOT DISCARDED
router.get(
  '/user/:id/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const topicId = req.params.topicId
    const user = await User.findById(userId)
    const randomFactsByUser = await user.getFacts({
      where: {topicId},
      through: {
        where: {
          discard: false
        }
      },
      include: [{model: Topic}]
    })
    res.json(randomFactsByUser)
  })
)

// UPDATE QUIZZABLE VALUE
router.put(
  '/quizzable/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const fact = await Fact.findById(id)
    await fact.update({quizzable: true})
    res.json(fact)
  })
)

// UPDATE DISCARD VALUE
router.put(
  '/discard/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const fact = await Fact.findById(id)
    await fact.update({discard: true})
    res.json(fact)
  })
)

module.exports = router
