'use strict'

const db = require('../server/db')
const {Fact, Topic, Question, Answer} = require('../server/db/models')

const newFacts = [
  {
    topicId: 1,
    content: 'HTML is short for Hypertext Markup Language.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 1,
    content: 'HTML can be considered the content of our website.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 1,
    content: 'HTML elements are the building blocks of HTML pages.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 1,
    content: 'HTML elements are represented by tags.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 1,
    content:
      'HTML tags label pieces of content such as "heading", "paragraph", "table", and so on.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 1,
    content:
      'Browsers do not display HTML tags, but use them to render the content of the page.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 2,
    content: 'HTML can be considered the content of our website.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 3,
    content: 'CSS stands for Cascading Style Sheets.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 3,
    content:
      'CSS provides the styling for our websites. It describes how the HTML elements in our websites should be displayed.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  },
  {
    topicId: 3,
    content:
      'CSS is a declarative language. This means that CSS explicitly describes its desired results. This means the language provides what is done, rather than how to do it.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null
  }
]

const newTopics = [
  {
    main: 'HTML',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
    topicId: null
  },
  {
    main: 'CSS',
    image: 'http://www.growingwiththeweb.com/images/general/css3.png',
    topicId: null
  },
  {
    main: 'Javascript',
    image: 'https://c1.staticflickr.com/4/3701/19224697601_6b600f21eb.jpg',
    topicId: null
  },
  {
    main: 'NodeJS',
    image:
      'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png',
    topicId: null
  },
  {
    main: 'ExpressJS',
    image: 'http://nashvillesoftwareschool.com/images/technologies/express.png',
    topicId: null
  },
  {
    main: 'ReactJS',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
    topicId: null
  },
  {
    main: 'ReduxJS',
    image: 'https://avatars0.githubusercontent.com/u/13142323?s=400&v=4',
    topicId: null
  }
]

const newQuestions = [
  {
    factId: 1,
    topicId: 1,
    content: 'What does HTML stand for?',
    correctAnswer: 'Hypertext Markup Language',
    difficulty: 0.3,
    type: null
  },
  {
    factId: 2,
    topicId: 1,
    content: 'What creates the structure for the content of our website?',
    correctAnswer: 'HTML',
    difficulty: 0.3,
    type: null
  },
  {
    factId: 7,
    topicId: 2,
    content: 'What does CSS stand for?',
    correctAnswer: 'Cascading Style Sheets',
    difficulty: 0.3,
    type: null
  },
  {
    factId: 8,
    topicId: 2,
    content: 'What provides the styling for a website?',
    correctAnswer: 'CSS',
    difficulty: 0.3,
    type: null
  }
]

const newAnswers = [
  {
    value: 'Hypertext Markup Language',
    type: 'Multiple Choice',
    questionId: 1
  },
  {
    value: 'Cascading Stylesheets',
    type: 'Multiple Choice',
    questionId: 2
  },
  {
    value: 'Anchor tag',
    type: 'Multiple Choice',
    questionId: 3
  },
  {
    value: 'Paragraph tag',
    type: 'Multiple Choice',
    questionId: 4
  }
  // {
  //   value: 'True',
  //   type: 'True / False',
  //   questionId: 5
  // }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    newTopics.map(topic => Topic.create(topic)),
    newFacts.map(fact => Fact.create(fact)),
    newQuestions.map(question => Question.create(question)),
    newAnswers.map(answer => Answer.create(answer))
  )

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
