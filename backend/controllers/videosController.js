const videos = require('../data/json/videos.json');

const getVideoById = (req, res) => {

    const id = Number(req.params.id);

    const video = videos.videos.find(item => item.id === id);

    if (!video) {
        return res.status(404).json({
            message: 'Видео не найдено in videosControllers.js'
        });
    }

    res.json(video);
};

module.exports = {
    getVideoById
};