const express = require('express');
const router = express.Router();

const { getVideoById,getAllVideos } = require('../controllers/videosController');

router.get('/:id', getVideoById);
router.get('/', getAllVideos);

module.exports = router;