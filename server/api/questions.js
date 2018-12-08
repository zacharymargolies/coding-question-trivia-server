const router = require('express').Router();
const { Question, Topic } = require('../db/models');
const asyncHandler = require('express-async-handler');

// GET ALL QUESTIONS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allQuestions = await Question.findAll({});
    res.json(allQuestions);
  })
);

// GET QUESTIONS BY TOPIC
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const questionsBytopic = await Question.findAll({
      where: {
        topicId: req.params.topicId
      },
      include: [{ model: Topic }]
    });
    res.json(questionsBytopic);
  })
);

// GET QUESTIONS BY FACT ID
router.get(
  '/fact/:factId',
  asyncHandler(async (req, res, next) => {
    const questionsByFact = await Question.findAll({
      where: {
        factId: req.params.factId
      },
      include: [{ model: Topic }]
    });
    res.json(questionsByFact);
  })
);

// GET QUESTIONS BY DIFFICULTY
router.get(
  '/difficulty/:difficultyLevel',
  asyncHandler(async (req, res, next) => {
    const questionsByDifficulty = await Question.findAll({
      where: {
        difficulty: req.params.difficultyLevel
      },
      include: [{ model: Topic }]
    });
    res.json(questionsByDifficulty);
  })
);

// GET QUESTION BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const questionById = await Question.findById(id);
    res.json(questionById);
  })
);

module.exports = router;
