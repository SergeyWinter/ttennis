const fntrData = require('../data/json/fntrNews.json');

const getFntrNews = (req, res) => {
    try {
        res.json(fntrData?.news ?? []);
    } catch (err) {
        console.error('getFntrNews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getFntrNewsById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const allNews = fntrData?.news ?? [];
        const newsItem = allNews.find(n => n.id === id);

        if (!newsItem) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }

        res.json(newsItem);
    } catch (err) {
        console.error('getFntrNewsById error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getFntrNews,
    getFntrNewsById
};