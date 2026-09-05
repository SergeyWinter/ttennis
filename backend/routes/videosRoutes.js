const express = require('express');
const router = express.Router();

const { getVideoById } = require('../controllers/videosController');

router.get('/:id', getVideoById);

module.exports = router;