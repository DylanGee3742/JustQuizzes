const express = require('express')
const router = express.Router()
const getQuizQuestions = require('../controllers/quizQuestionsControllers')

router.get('/', getQuizQuestions)

module.exports = router