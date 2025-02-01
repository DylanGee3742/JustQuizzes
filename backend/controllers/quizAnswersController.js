const getQuizAnswers = async (req, res, next) => {
    const client = req.client
    const id = req.params.id
    try {

        const answers = await client.query('SELECT * FROM answers WHERE question_id = $1', [id])

        res.status(200).json(answers.rows)

    } catch (e) {
        console.error('Failed to get quiz answers: ', e)
        res.status(500).send('Failed to get quiz answers: ', e)
    }
}

module.exports = getQuizAnswers