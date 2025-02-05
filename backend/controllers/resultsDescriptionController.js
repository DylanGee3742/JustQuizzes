const resultsDescription = async (req, res, next) => {
    const client = req.client
    const result = req.params.result
    const slug = req.params.slug
    try {
        const table_name = `"${slug}-results"`

        const resultsDescription = await client.query(`SELECT description FROM ${table_name} WHERE result = $1`, [result])

        res.status(200).json(resultsDescription.rows)

    } catch (e) {
        console.error('Error getting result data: ', e)
        res.status(500).send('Error getting result data: ', e)
    } finally {
        client.release()
    }
}

module.exports = resultsDescription