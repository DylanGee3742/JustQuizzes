const express = require('express')
const router = express.Router()
const getQuizAnswers = require('../controllers/quizAnswersController')

router.get('/:id', getQuizAnswers)

module.exports = router