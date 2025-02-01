const express = require('express')
const router = express.Router()
const getQuizQuestions = require('../controllers/quizQuestionsControllers')

router.get('/:id', getQuizQuestions)

module.exports = router