// const players = require('../data/json/players.json');
const players = require('../data/json/players.json');
const videos = require('../data/json/videos.json');

const getHomepagePlayers = (req, res) => {

    // res.json(players); only players
     res.json({
        players: players.players,
        videos: videos.videos
    });

};

module.exports = {
    getHomepagePlayers
};