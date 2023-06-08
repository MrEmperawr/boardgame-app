const express = require('express');
const boardgamesController = require('../controllers/boardgameController');

const router = express.Router();

router.get('/', boardgamesController.getBoardGames);

module.exports = router;