const router = require('express').Router()
const User = require('../db/models/user')
const Fact = require('../db/models/fact')
const Question = require('../db/models/question')
const SRFacts = require('../db/models/srfact')
const SRQuestions = require('../db/models/srquestion')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const allFacts = await Fact.findAll()
    const allQuestions = await Question.findAll()
    await SRFacts.bulkCreate(
      allFacts.map(fact => {
        return {userId: user.id, factId: fact.id}
      })
    )
    await SRQuestions.bulkCreate(
      allQuestions.map(question => {
        return {userId: user.id, questionId: question.id}
      })
    )
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/success', (req, res, next) => {
  // res.send(req.user)
  res.cookie(req.cookies)
  res.redirect('exp://172.16.23.28:19000')
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
