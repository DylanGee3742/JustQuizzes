const pool = require('../connection/pool')

const getConnection = async (req, res, next) => {
    let client;
    try {
        client = await pool.connect();
        req.client = client;

        // Release the client back to the pool on response end or error
        // This will stop the database getting overun with requests/responses and crashing
        const release = () => {
            if (client) {
                client.release();
                client = null;
                console.log('Database connection released');
            }
        };

        req.on('finish', release);
        req.on('error', release);

        next();
    } catch (err) {
        console.error('Error acquiring database connection:', err);
        if (client) client.release();  // Ensure the client is released in case of error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getConnection;