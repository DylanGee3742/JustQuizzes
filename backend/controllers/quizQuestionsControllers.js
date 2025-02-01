
const getQuizQuestions = async (req, res, next) => {
    const client = req.client
    try {

        const response = await client.query('SELECT * FROM questions')

        res.status(200).json(response.rows)

    } catch (e) {
        console.error('Failed to get quiz questions: ', e)
        res.status(500).send('Failed to get quiz questions: ', e)
    }
}

module.exports = getQuizQuestions