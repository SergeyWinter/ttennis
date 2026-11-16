const fntrData = require('../data/json/fntrNews.json');

const getFntrNews = (req, res) => {
    try {
        res.json(fntrData?.news ?? []);
    } catch (err) {
        console.error('getFntrNews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getFntrNews
};