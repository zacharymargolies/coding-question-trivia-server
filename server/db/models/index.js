// TODO: Require models here, define associations, export models
const Fact = require('./fact');
const Topic = require('./topic');
const Question = require('./question');
const Answer = require('./answer.js');

// Many facts belong to any Topic: Topic --> fact, fact, fact
Topic.hasMany(Fact);
Fact.belongsTo(Topic);

// A fact has many questions: Fact --> question, question, question
Fact.hasMany(Question);
Question.belongsTo(Fact);

// A topic has many question: Topic --> question, question, question
Topic.hasMany(Question);
Question.belongsTo(Topic);

// Topics may have sub-topics: Topic --> topic, topic, topic
Topic.hasMany(Topic);
Topic.belongsTo(Topic);

// Questions have one correct answer: Question --> correct answer, false answer, false answer
Question.hasOne(Answer);
Answer.belongsTo(Question);

module.exports = {
  Fact,
  Topic,
  Question
};
