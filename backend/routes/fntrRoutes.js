const express = require('express');
const router = express.Router();
const { getFntrNews,getFntrNewsById } = require('../controllers/fntrController');

router.get('/', getFntrNews);
router.get('/:id', getFntrNewsById); // 👈 Новый роу

module.exports = router;