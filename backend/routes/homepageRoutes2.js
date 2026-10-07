const express = require('express');
const router = express.Router();
// const { getHomepagePlayers } = require('../controllers/homepageController');
const {getHomepagePlayers2} =require('../controllers/homepageController2');

router.get('/', getHomepagePlayers2);

module.exports = router;