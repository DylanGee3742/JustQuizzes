const express = require('express')
const router = express.Router()
const resultsDescription = require('../controllers/resultsDescriptionController')

router.get('/:slug/:result', resultsDescription)

module.exports = router