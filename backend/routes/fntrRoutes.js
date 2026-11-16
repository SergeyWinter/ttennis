const express = require('express');
const router = express.Router();
const { getFntrNews } = require('../controllers/fntrController');

router.get('/', getFntrNews);

module.exports = router;