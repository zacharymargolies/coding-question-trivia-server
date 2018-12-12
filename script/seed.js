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
  },
  {
    main: 'Data Structures',
    image:
      'https://jupitervidya.com/wp-content/uploads/2014/02/data-structures-training-bangalore-jupiter-vidya-430x270.jpg',
    topicId: null
  }
]

const newQuestions = [
  {
    topicId: 3,
    content:
      'What is the type of `NaN`? How can you reliably test is a value is equal to `NaN`?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 22
  },
  {
    topicId: 3,
    content: 'What is the difference between currying and partial application?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 21
  },
  {
    topicId: 3,
    content: 'What is "callback hell" and how can it be avoided?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 20
  },
  {
    topicId: 3,
    content: 'What is blocking code?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 19
  },
  {
    topicId: 3,
    content: 'What are the six JS primitives?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 18
  },
  {
    topicId: 3,
    content: 'What are the six falsey values in JS?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 17
  },
  {
    topicId: 3,
    content: 'Describe pass-by-reference vs. pass-by-value?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 16
  },
  {
    topicId: 3,
    content: 'What is a getter?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 15
  },
  {
    topicId: 3,
    content: 'What are higher-order functions?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 14
  },
  {
    topicId: 3,
    content: 'How do JS arrays differ from "real" arrays?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 13
  },
  {
    topicId: 3,
    content: 'Name prominent array prototype methods.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 12
  },
  {
    topicId: 3,
    content: 'What is an IIFE?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 11
  },
  {
    topicId: 3,
    content: 'What is a promise?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 10
  },
  {
    topicId: 3,
    content: 'What are the advantages of promises?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 9
  },
  {
    topicId: 3,
    content: 'What are alternatives to promises?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 8
  },

  {
    topicId: 3,
    content:
      'What is the difference between classical and prototypal inheritance?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 7
  },
  {
    topicId: 3,
    content: 'What is functional programming?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 6
  },
  {
    topicId: 3,
    content:
      'What is the significance of, and reason for, wrapping the entire contents of a JS file in a function block?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 5
  },
  {
    topicId: 3,
    content:
      'What is the difference between JS "expressions" and JS "statements"?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 4
  },
  {
    topicId: 3,
    content: `What is 'this?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 3
  },
  {
    topicId: 3,
    content: 'What is scope?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 2
  },
  {
    topicId: 3,
    content: 'What is closure?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    quizzable: false,
    discard: false,
    docsLink: null,
    answerId: 1
  },
  {
    factId: 1,
    topicId: 1,
    content: 'What does HTML stand for?',
    difficulty: 0.3,
    type: null,
    answerId: 23
  },
  {
    factId: 2,
    topicId: 1,
    content: 'What does <a></a> represent?',
    difficulty: 0.3,
    type: null,
    answerId: 24
  },
  {
    factId: 7,
    topicId: 2,
    content: 'What does CSS stand for?',
    difficulty: 0.3,
    type: null,
    answerId: 25
  }
  // {
  //   factId: 8,
  //   topicId: 2,
  //   content: 'What <p></p> represent?',
  //   difficulty: 0.3,
  //   type: null,
  //   answerId: 26
  // }
]

const newAnswers = [
  {
    value:
      'A function and its lexical environment, meaning that it has access to the variables in its enclosing scope chain even when the function is executed outside of its lexical environment.',
    type: 'Multiple Choice',
    topicId: 1
  },
  {
    value: 'The visibility of variables and functions.',
    type: 'Multiple Choice',
    topicId: 1
  },
  {
    value: `A function's invocation context.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Expressions evaluate to values, which can be returned or stored in variables.

    Statements perform some action.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `It creates a closure around the contents of the file, which creates a private namespace and helps avoid potential name clashes.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Based off Lambda calculus, favors simple, pure (no side-effects, input => output), composable functions. Data is immutable.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Classical: Instances inherit from classes (like a blueprint), and are often instantiated with the 'new' or 'class' keywords.

    Prototypal: A prototype for an object is simply an existing object. Any instance will have some implicit reference to the properties on its prototype. In JS, this implicit reference is via __proto__. Instances are typically instantiated via factory function or 'Object.create()'.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `-Makes debugging easier: stricter parsing and error handling helps prevent silent/non-descriptive errors.
    -Prevents accidental globals.
    -Eliminates 'this' coercion: without strict mode, if 'this' results in undefined or null, it will automatically be coerced to the global 'this'.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `-Number
    -Use 'Number.isNan()'`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `-Currying: Configuring a function to accept less than its desired number of parameters (usually one at a time).

    -Partial application: The process of applying a function to some of its parameters.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Callback hell refers to deeply nested callback functions that become unwieldy or unreadable.

    This can be avoided by modularizing functions (taking a functional approach) or using promises.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Number, string, boolean, null, undefined, symbol`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `0, false, "", undefined, null, NaN`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Objects get passed by reference, primitives get passed by value. Pass-by-value means that there is a copy of the entity; pass-by-reference means that there is no copy of the entity itself, only a copy of a reference (in memory) to it.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `A function bound to an object property that runs whenever the property is accessed.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Functions that operate on other functions, either by taking them as arguments, or by returning them.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `forEach, map, reduce, filter, sort, slice, splice`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `Immediately invoked function expression: A function that is invoked immediately after it is created.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `The eventual result of an asynchronous operation. They are object, with default value of undefined and default status of pending.`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: `-Avoids callback hell by creating a linear execution flow.

    -There is a standard "contract", in which the callback is executed only once and is guaranteed to resolve or reject with a value.

    -Promises are objects that can be passed around (e.g. exported and imported between files).`,
    type: `Multiple Choice`,
    topicId: 1
  },
  {
    value: 'Hypertext Markup Language',
    type: 'Multiple Choice',
    topicId: 1
  },
  {
    value: 'Callback functions',
    type: 'Multiple Choice',
    topicId: 1
  },
  {
    value: 'Cascading Stylesheets',
    type: 'Multiple Choice',
    topicId: 1
  },
  {
    value: 'Anchor tag',
    type: 'Multiple Choice',
    topicId: 2
  },
  {
    value: 'Paragraph tag',
    type: 'Multiple Choice',
    topicId: 4
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
    newAnswers.map(answer => Answer.create(answer)),
    newQuestions.map(question => Question.create(question))
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
