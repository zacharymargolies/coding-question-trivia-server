// TODO: Require models here, define associations, export models
const Fact = require('./fact')
const Topic = require('./topic')
const Question = require('./question')
const Answer = require('./answer')
const User = require('./user')
const SRFact = require('./srfact')
const SRQuestion = require('./srquestion')

// Many facts belong to any Topic: Topic --> fact, fact, fact
Topic.hasMany(Fact)
Fact.belongsTo(Topic)

// A fact has many questions: Fact --> question, question, question
Fact.hasMany(Question)
Question.belongsTo(Fact)

// A topic has many question: Topic --> question, question, question
Topic.hasMany(Question)
Question.belongsTo(Topic)

// Topics may have sub-topics: Topic --> topic, topic, topic
Topic.hasMany(Topic)
Topic.belongsTo(Topic)

// Questions have one correct answer: Question --> correct answer, false answer, false answer
Question.belongsTo(Answer)
Answer.hasOne(Question)

// Answers have one topic: Answer --> Topic
Topic.hasMany(Answer)
Answer.belongsTo(Topic)

// Linking viewing preferences data to Facts
Fact.belongsToMany(User, {through: {model: SRFact}})
User.belongsToMany(Fact, {through: {model: SRFact}})

// Linking spaced repetition data to Questions
Question.belongsToMany(User, {through: {model: SRQuestion}})
User.belongsToMany(Question, {through: {model: SRQuestion}})

module.exports = {
  Fact,
  Topic,
  Question,
  Answer,
  User,
  SRFact,
  SRQuestion
}
