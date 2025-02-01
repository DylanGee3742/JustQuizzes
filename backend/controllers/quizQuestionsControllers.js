
const getQuizQuestions = async (req, res, next) => {
    const client = req.client
    const id = req.params.id
    try {

        const response = await client.query('SELECT * FROM questions WHERE id = $1', [id])

        res.status(200).json(response.rows)

    } catch (e) {
        console.error('Failed to get quiz questions: ', e)
        res.status(500).send('Failed to get quiz questions: ', e)
    }
}

module.exports = getQuizQuestions