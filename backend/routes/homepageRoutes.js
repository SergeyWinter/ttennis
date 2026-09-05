const express = require('express');
const router = express.Router();
const { getHomepagePlayers } = require('../controllers/homepageController');

router.get('/', getHomepagePlayers);

module.exports = router;