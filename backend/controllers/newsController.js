// controllers/newsController.js
const newsData = require('../data/json/homepageNews.json');

const getNews = (req, res) => {
    // console.log('getNews called with query:', req.query);
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
const getNewsById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const allNews = newsData?.news ?? [];
        const newsItem = allNews.find(n => n.id === id);

        if (!newsItem) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }

        res.json(newsItem);
    } catch (err) {
        console.error('getNewsById error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getNews,
    getNewsById,
};