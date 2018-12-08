const router = require("express").Router();
const { Topic } = require("../db/models");
const asyncHandler = require("express-async-handler");

// GET ALL FACTS
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const allTopics = await Topic.findAll({});
    res.json(allTopics);
  })
);

module.exports = router;
