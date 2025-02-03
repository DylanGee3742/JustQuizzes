const getQuizId = async (req, res, next) => {
    const client = req.client
    const slug = req.params.slug
    try {
        const response = await client.query('SELECT title, id from quizzes WHERE slug = $1', [slug])
        req.title = response.rows[0].title
        req.id =  response.rows[0].id
        next()

    } catch (e) {
        console.error('Error getting quiz ID: ', e)
        res.status(500).send('Error getting quiz ID: ', e)
    }
}

module.exports = getQuizId