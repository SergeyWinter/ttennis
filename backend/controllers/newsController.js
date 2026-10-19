// controllers/newsController.js
const newsData = require('../data/json/homepageNews.json');

const getNews = (req, res) => {
    try {
        const region = req.query.region || 'world';
        const allNews = newsData?.news ?? [];
        
        // Фильтруем по региону
        const filtered = allNews.filter(n => n.region === region);

        res.json(filtered);
    } catch (err) {
        console.error('getNews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getNews,
};