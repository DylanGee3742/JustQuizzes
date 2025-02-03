const express = require('express')
const router = express.Router()
const questionAnswers = require('../controllers/QuestionAnswersController.js')
const getQuizId = require('../middleware/getQuizId.js')

router.get('/:slug', getQuizId, questionAnswers)

module.exports = router