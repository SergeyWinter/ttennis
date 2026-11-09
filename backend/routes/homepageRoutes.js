const express = require('express');
const router = express.Router();
const { getHomepagePlayers, getPlayerById} = require('../controllers/homepageController');
// const {getHomepagePlayers} =require('../controllers/homepageController2');

router.get('/', getHomepagePlayers);
router.get('/player/:id', getPlayerById);

module.exports = router;