//controllers/homepageController.js

// const players = require('../data/json/players.json');
// const players = require('../data/json/players.json');
// const videos = require('../data/json/videos.json');
const playersMen = require('../data/json/players_men_top30_2026.json');
const playersWomen = require('../data/json/players_women_top30_2026.json');
const playersRussiaMen = require('../data/json/players_russia_men.json');
const playersRussiaWomen = require('../data/json/players_russia_women.json');
const videos = require('../data/json/videos.json');

const getHomepagePlayers = (req, res) => {

    // res.json(players); only players
    //  res.json({
    //     players: players.players,
    //     videos: videos.videos
    // });
   try {
    const worldPlayers = [
      ...playersMen.players,
      ...playersWomen.players
    ].map((p, i) => ({ ...p, id: i + 1 }));

    const russiaPlayers = [
      ...playersRussiaMen.players,
      ...playersRussiaWomen.players
    ].map((p, i) => ({ ...p, id: i + 1 }));

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
        
        // Собираем всех игроков в один массив (как в getHomepagePlayers)
        const worldPlayers = [...playersMen.players, ...playersWomen.players].map((p, i) => ({ ...p, id: i + 1 }));
        const russiaPlayers = [...playersRussiaMen.players, ...playersRussiaWomen.players].map((p, i) => ({ ...p, id: i + 1 }));
        
        // Ищем игрока по ID
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

module.exports = {
    getHomepagePlayers,
    getPlayerById
};