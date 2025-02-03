const questionAnswers = async (req, res, next) => {
    const client = req.client
    const id = req.id
    const title = req.title

    try {
        const query = `
        SELECT 
            q.id, 
            q.text AS question,
        json_agg(
            json_build_object(
                'label', a.text,
                'value', a.zodiac_signs
            )
        ) AS options
        FROM questions q
        JOIN answers a ON q.id = a.question_id
        WHERE q.quiz_id = $1
        GROUP BY q.id, q.text;`

        const response = await client.query(query, [id])

        res.status(200).json(response.rows)

    } catch (e) {
        console.log('Error getting questions & answers: ', e)
        res.status(500).send('Error getting questions & answers: ', e)
    }
}

module.exports = questionAnswers