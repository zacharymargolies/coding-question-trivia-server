'use strict'

const db = require('../server/db')
const {
  Fact,
  Topic,
  Question,
  Answer,
  SRFact,
  SRQuestion,
  User
} = require('../server/db/models')
const Sequelize = require('sequelize')

const newUsers = [
  {
    id: 1,
    email: 'zm@email.com'
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
  },
  {
    main: 'Testing',
    image:
      'https://camo.githubusercontent.com/7fbd61a113b7f10ed1709e74f3715a2a60ba5177/687474703a2f2f61706974657374696e672e626967737469636b6361727065742e636f6d2f6173736574732f696d672f6d6f6368612d636861692f6c6f676f2e706e67',
    topicId: null
  },
  {
    main: 'Development Tools',
    image:
      'https://previews.123rf.com/images/djvstock/djvstock1609/djvstock160900168/62105361-laptop-gear-tools-developer-web-responsive-development-website-programming-icon-set-colorful-design-.jpg',
    topicId: null
  }
]

const newFacts = [
  {
    id: 1,
    topicId: 1,
    content: 'HTML is short for Hypertext Markup Language.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null
  },
  {
    id: 2,
    topicId: 1,
    content: 'HTML can be considered the content of our website.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 3,
    topicId: 1,
    content: 'HTML elements are the building blocks of HTML pages.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 4,
    topicId: 1,
    content: 'HTML elements are represented by tags.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 5,
    topicId: 1,
    content:
      'HTML tags label pieces of content such as "heading", "paragraph", "table", and so on.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 6,
    topicId: 1,
    content:
      'Browsers do not display HTML tags, but use them to render the content of the page.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 7,
    topicId: 1,
    content: 'HTML can be considered the content of our website.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 8,
    topicId: 2,
    content: 'CSS stands for Cascading Style Sheets.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 9,
    topicId: 2,
    content:
      'CSS provides the styling for our websites. It describes how the HTML elements in our websites should be displayed.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  },
  {
    id: 10,
    topicId: 2,
    content:
      'CSS is a declarative language. This means that CSS explicitly describes its desired results. This means the language provides what is done, rather than how to do it.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null
  }
]

const newAnswers = [
  // {
  //   value:
  //     'Code that requires an application to wait for some I/O operation before continuing to execute.',
  //   type: 'Multiple Choice',
  //   topicId: 3
  // },
  {
    value:
      'A function and its lexical environment, meaning that it has access to the variables in its enclosing scope chain even when the function is executed outside of its lexical environment.',
    type: 'Multiple Choice',
    topicId: 3
  },
  {
    value: 'The visibility of variables and functions.',
    type: 'Multiple Choice',
    topicId: 3
  },
  {
    value: `A function's invocation context.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Expressions evaluate to values, which can be returned or stored in variables.

    Statements perform some action.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `It creates a closure around the contents of the file, which creates a private namespace and helps avoid potential name clashes.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Based off Lambda calculus, favors simple, pure (no side-effects, input => output), composable functions. Data is immutable.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Classical: Instances inherit from classes (like a blueprint), and are often instantiated with the 'new' or 'class' keywords.

    Prototypal: A prototype for an object is simply an existing object. Any instance will have some implicit reference to the properties on its prototype. In JS, this implicit reference is via __proto__. Instances are typically instantiated via factory function or 'Object.create()'.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `-Makes debugging easier: stricter parsing and error handling helps prevent silent/non-descriptive errors.
    -Prevents accidental globals.
    -Eliminates 'this' coercion: without strict mode, if 'this' results in undefined or null, it will automatically be coerced to the global 'this'.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `-Avoids callback hell by creating a linear execution flow.

    -There is a standard "contract", in which the callback is executed only once and is guaranteed to resolve or reject with a value.

    -Promises are objects that can be passed around (e.g. exported and imported between files).`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `-Number
    -Use 'Number.isNan()'`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Callback hell refers to deeply nested callback functions that become unwieldy or unreadable.

    This can be avoided by modularizing functions (taking a functional approach) or using promises.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Number, string, boolean, null, undefined, symbol`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `0, false, "", undefined, null, NaN`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Objects get passed by reference, primitives get passed by value. Pass-by-value means that there is a copy of the entity; pass-by-reference means that there is no copy of the entity itself, only a copy of a reference (in memory) to it.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `A function bound to an object property that runs whenever the property is accessed.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  // {
  //   value: `Functions that operate on other functions, either by taking them as arguments, or by returning them.`,
  //   type: `Multiple Choice`,
  //   topicId: 3
  // },
  {
    value: `forEach, map, reduce, filter, sort, slice, splice`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Immediately invoked function expression: A function that is invoked immediately after it is created.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `The eventual result of an asynchronous operation. They are object, with default value of undefined and default status of pending.`,
    type: `Multiple Choice`,
    topicId: 3
  },
  {
    value: `Code that requires an application to wait for some I/O operation before continuing to execute.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `A copy of a function that records metadata (if a function is called, how many times it's called, it's arguments, etc.)`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `A dummy function (like a spy) that is called instead of the function it represents, with pre-programmed behavior. Remember to remove the stub when you're done.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `-Control a method's behavior from a test to force the code down a specific path.

  -To prevent a specific method from being called directly.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `A fake method (like a spy) with pre-programmed behavior (like a stub) as well as pre-programmed expectations. A mock enforces implementation details. Remember to remove the mock when you're done.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `-Mocks should only be used for the method under test.

  -If you want to control how your unit is being used and like stating expectations upfront (as opposed to asserting after the fact), use a mock.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `Mocks come with built-in expectations that may fail your test. Thus they enforce implementation details. Rule of thumb: if you wouldn't add an assertion for some specific call, don't mock it; use a stub instead.`,
    type: `Multiple Choice`,
    topicId: 9
  },
  {
    value: `A module bundler for Javascript. Webpack recursively builds every module in your application.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `Webpack is a module bundler, Gulp and Grunt are task runners. Webpack offers more flexibility and advanced functionality for front-end modules, with a functional core that can be extended using loaders and plugins.

  Gulp and Grunt look into a defined path for files that match your configuration, while Webpack analyzes the entire project.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `The bundle is the output file from the Webpack build process. It contains all of the modules used in the application.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `It's where Webpack looks to begin building the bundle.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {value: `Node.js`, type: `Multiple Choice`, topicId: 10},
  {
    value: `Any time one file depends on another, Webpack treats that as a dependency. Starting from the entry point(s), Webpack recursively builds a dependency graph that includes every module your application needs (using 'import and 'require).`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `Loaders are transformations that are applied to the source code of a module. Loaders tell Webpack how to process non-JS modules.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `Plugins are used to customize Webpack's build process. A Webpack plugin is a JS object that has an apply property, which is called by the Webpack compiler, giving access to the entire compilation lifecycle.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `Loaders work at the individual file level before or during the bundle generation process.

  Plugins are more powerful and complex, because they can modify how bundles are created. Plugins register hooks within Webpack's build process and access/modify the compiler.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `'webpack-dev-server' simplifies the development process with integrated in-memory access (fast) to Webpack assets and hot-modules-replacement feature.`,
    type: `Multiple Choice`,
    topicId: 10
  },
  {
    value: `A Webpack feature which allows you to update modules in the application without a page reload. HMR can be used as an advanced replacement for live-reload.`,
    type: `Multiple Choice`,
    topicId: 10
  }
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {value: ``, type: `Multiple Choice`, topicId: null},
  // {
  //   value: 'Hypertext Markup Language',
  //   type: 'Multiple Choice',
  //   topicId: 1
  // },
  // {
  //   value: 'Callback functions',
  //   type: 'Multiple Choice',
  //   topicId: 1
  // },
  // {
  //   value: 'Cascading Stylesheets',
  //   type: 'Multiple Choice',
  //   topicId: 1
  // },
  // {
  //   value: 'Anchor tag',
  //   type: 'Multiple Choice',
  //   topicId: 2
  // },
  // {
  //   value: 'Paragraph tag',
  //   type: 'Multiple Choice',
  //   topicId: 4
  // }
  // {
  //   value: 'True',
  //   type: 'True / False',
  //   questionId: 5
  // }
]

const newQuestions = [
  {
    topicId: 3,
    content: 'What is blocking code?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 19
  },
  {
    topicId: 3,
    content: 'What is a promise?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 18
  },
  {
    topicId: 3,
    content: 'What is an IIFE?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 17
  },
  {
    topicId: 3,
    content: 'Name prominent array prototype methods.',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 16
  },
  {
    topicId: 3,
    content: 'What is a getter?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 15
  },
  {
    topicId: 3,
    content: 'Describe pass-by-reference vs. pass-by-value?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 14
  },
  {
    topicId: 3,
    content: 'What are the six falsey values in JS?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 13
  },
  {
    topicId: 3,
    content: 'What are the six JS primitives?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 12
  },
  {
    topicId: 3,
    content: 'What is "callback hell" and how can it be avoided?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 11
  },
  {
    topicId: 3,
    content:
      'What is the type of `NaN`? How can you reliably test is a value is equal to `NaN`?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 10
  },
  {
    topicId: 3,
    content: 'What are the advantages of promises?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 9
  },
  {
    topicId: 3,
    content: 'Why use `use strict` in a JS file?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
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
    docsLink: null,
    answerId: 7
  },
  {
    topicId: 3,
    content: 'What is functional programming?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
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
    docsLink: null,
    answerId: 4
  },
  {
    topicId: 3,
    content: `What is 'this?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 3
  },
  {
    topicId: 3,
    content: 'What is scope?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 2
  },
  {
    topicId: 3,
    content: 'What is closure?',
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 1
  },
  {
    topicId: 9,
    content: `What is a spy?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 20
  },
  {
    topicId: 9,
    content: `What is a stub?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 21
  },
  {
    topicId: 9,
    content: `When to use a stub?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 22
  },
  {
    topicId: 9,
    content: `What is a mock?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 23
  },
  {
    topicId: 9,
    content: `When to use a mock?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 24
  },
  {
    topicId: 9,
    content: `When NOT to use a mock?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 25
  },
  {
    topicId: 10,
    content: `What is Webpack?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 26
  },
  {
    topicId: 10,
    content: `What is the difference between Webpack and other build tools like Gulp or Grunt?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 27
  },
  {
    topicId: 10,
    content: `What is a Webpack bundle?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 28
  },
  {
    topicId: 10,
    content: `What is a Webpack entry point?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 29
  },
  {
    topicId: 10,
    content: `In which environment does Webpack run?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 30
  },
  {
    topicId: 10,
    content: `What is a dependency graph and how does Webpack build it?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 31
  },
  {
    topicId: 10,
    content: `What is a loader in Webpack?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 32
  },
  {
    topicId: 10,
    content: `What is a plugin in Webpack?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 33
  },
  {
    topicId: 10,
    content: `What is the difference between Webpack loaders and plugins?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 34
  },
  {
    topicId: 10,
    content: `What are some advantages of using 'webpack-dev-server over a simple 'http' server or 'nginx?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 35
  },
  {
    topicId: 10,
    content: `What is hot-modules-replacement?`,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewd: null,
    docsLink: null,
    answerId: 36
  }
  // {
  //   topicId: NULL,
  //   content: ``,
  //   difficulty: 0.3,
  //   daysBetweenReveiws: 1,
  //   dateLastReviewd: null,
  //   discard: false,
  //   docsLink: null,
  //   answerId: NULL
  // },
  // {
  //   factId: 1,
  //   topicId: 1,
  //   content: 'What does HTML stand for?',
  //   difficulty: 0.3,
  //   type: null,
  //   answerId: 23
  // },
  // {
  //   factId: 2,
  //   topicId: 1,
  //   content: 'What does <a></a> represent?',
  //   difficulty: 0.3,
  //   type: null,
  //   answerId: 24
  // },
  // {
  //   factId: 7,
  //   topicId: 2,
  //   content: 'What does CSS stand for?',
  //   difficulty: 0.3,
  //   type: null,
  //   answerId: 25
  // }
  // {
  //   factId: 8,
  //   topicId: 2,
  //   content: 'What <p></p> represent?',
  //   difficulty: 0.3,
  //   type: null,
  //   answerId: 26
  // }
]

const newSRFacts = [
  {
    userId: 1,
    quizzable: false,
    discard: false,
    factId: 1
  }
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 2,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 3,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 4,
  //   userId: 1
  // }
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 5,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 6,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 7,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 8,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 9,
  //   userId: 1
  // },
  // {
  //   quizzable: false,
  //   discard: false,
  //   factId: 10,
  //   userId: 1
  // }
]

const newSRQuestions = [
  {
    userId: 1,
    difficulty: 0.3,
    daysBetweenReveiws: 1,
    dateLastReviewed: Sequelize.fn('NOW'),
    questionId: 1
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    newUsers.map(user => User.create(user)),
    newTopics.map(topic => Topic.create(topic)),
    newFacts.map(fact => Fact.create(fact)),
    newAnswers.map(answer => Answer.create(answer)),
    newQuestions.map(question => Question.create(question)),
    newSRFacts.map(srfact => SRFact.create(srfact)),
    newSRQuestions.map(srquestion => SRQuestion.create(srquestion))
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
