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
const getAllVideos = (req, res) => {
    try {
        res.json(videos?.videos ?? []);
    } catch (error) {
        console.error('getAllVideos error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getVideoById,
    getAllVideos
};