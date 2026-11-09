const express = require('express');
const router = express.Router();
const { getHomepagePlayers, getPlayerById,getPlayerNews} = require('../controllers/homepageController');
// const {getHomepagePlayers} =require('../controllers/homepageController2');

router.get('/', getHomepagePlayers);
router.get('/player/:id', getPlayerById);
router.get('/player/:id/news', getPlayerNews);

module.exports = router;