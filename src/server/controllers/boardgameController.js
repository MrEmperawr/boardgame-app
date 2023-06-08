const axios = require('axios');

async function getBoardGames(req, res) {
    try {
        const response = await axios.get('http://case.senarion.com/boardgames', {
            headers: {
                'X-API-Key': 'boardgames123',
                'Accept': '*/*',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching board games:', error);
        res.status(500).json({ message: 'Failed to fetch board games' });
    }
}

module.exports = {
    getBoardGames,
};
