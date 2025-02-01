const getQuizQuestions = async (req, res, next) => {
    const client = req.client
    const id = req.params.id
    try {

        const questions = await client.query('SELECT * FROM questions WHERE quiz_id = $1', [id])
        console.log(questions.rows)

        res.status(200).json(questions.rows)

    } catch (e) {
        console.error('Failed to get quiz questions: ', e)
        res.status(500).send('Failed to get quiz questions: ', e)
    }
}

module.exports = getQuizQuestions