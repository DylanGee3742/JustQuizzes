const express = require('express')
const app = express()
const cors = require('cors')
const getConnection = require('./middleware/connect_db')
const quizQuestionRoutes = require('./routes/quizQuestionsRoute')
const PORT = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(getConnection)

app.use('/quiz-questions', quizQuestionRoutes)

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
