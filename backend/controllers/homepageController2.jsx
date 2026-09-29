const playersMen = require('../data/json/players_men_top30_2026.json');
const playersWomen = require('../data/json/players_women_top30_2026.json');
const playersRussiaMen = require('../data/json/players_russia_men.json');
const playersRussiaWomen = require('../data/json/players_russia_women.json');
const videos = require('../data/json/videos.json');

const getHomepagePlayers = (req, res) => {
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

module.exports = { getHomepagePlayers };