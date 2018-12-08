const router = require('express').Router();
const { Fact, Topic } = require('../db/models');
const asyncHandler = require('express-async-handler');

// GET ALL FACTS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allFacts = await Fact.findAll({});
    res.json(allFacts);
  })
);

// GET FACTS BY TOPIC
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        topicId: req.params.topicId
      },
      include: [{ model: Topic }]
    });
    res.json(facts);
  })
);

// GET FACTS BY DIFFICULTY
router.get(
  '/difficulty/:difficultyLevel',
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        difficulty: req.params.difficultyLevel
      },
      include: [{ model: Topic }]
    });
    res.json(facts);
  })
);

// GET FACT BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const fact = await Fact.findById(id);
    res.json(fact);
  })
);

// UPDATE QUIZZABLE VALUE
router.put(
  '/quizzable/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const fact = await Fact.findById(id);
    await fact.update({ quizzable: true });
    res.json(fact);
  })
);

// UPDATE DISCARD VALUE
router.put(
  '/discard/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const fact = await Fact.findById(id);
    await fact.update({ discard: true });
    res.json(fact);
  })
);

// UPDATE SPACE REPETITION DATA
router.put(
  '/update/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { correct, performanceRating } = req.body;
    const fact = await Fact.findById(id);
    await fact.updateSRD(performanceRating);
    res.send(fact);
  })
);

module.exports = router;
