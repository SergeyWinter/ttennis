//controllers/homepageController.js

// const players = require('../data/json/players.json');
// const players = require('../data/json/players.json');
// const videos = require('../data/json/videos.json');
const playersMen = require('../data/json/players_men_top30_2026.json');
const playersWomen = require('../data/json/players_women_top30_2026.json');
const playersRussiaMen = require('../data/json/players_russia_men.json');
const playersRussiaWomen = require('../data/json/players_russia_women.json');
const videos = require('../data/json/videos.json');
const playerNews = require('../data/json/playerNews.json'); // Твой файл с новостями

const getHomepagePlayers = (req, res) => {
    try {
        const worldPlayers = [
            ...playersMen.players,
            ...playersWomen.players
        ].map((p, i) => ({ ...p, id: i + 1 }));

        // 👇 Начинаем ID российских игроков после мировых
        const russiaPlayers = [
            ...playersRussiaMen.players,
            ...playersRussiaWomen.players
        ].map((p, i) => ({ ...p, id: worldPlayers.length + i + 1 })); 

        res.json({
            worldPlayers,
            russiaPlayers,
            videos: videos?.videos ?? []
        });
    } catch (err) {
        console.error('getHomepagePlayers error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPlayerById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const worldPlayers = [
            ...playersMen.players, 
            ...playersWomen.players
        ].map((p, i) => ({ ...p, id: i + 1 }));
        
        const russiaPlayers = [
            ...playersRussiaMen.players, 
            ...playersRussiaWomen.players
        ].map((p, i) => ({ ...p, id: worldPlayers.length + i + 1 })); // 👈 Та же логика

        const player = [...worldPlayers, ...russiaPlayers].find(p => p.id === id);

        if (!player) {
            return res.status(404).json({ error: 'Игрок не найден' });
        }
        res.json(player);
    } catch (err) {
        console.error('getPlayerById error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getPlayerNews = (req, res) => {
    try {
        const playerId = parseInt(req.params.id);
        const allNews = playerNews?.news ?? [];
        const filteredNews = allNews.filter(n => n.playerId === playerId);
        res.json(filteredNews);
    } catch (err) {
        console.error('getPlayerNews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getHomepagePlayers,
    getPlayerById,
    getPlayerNews
};