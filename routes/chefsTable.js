const express = require('express');
const router = express.Router();
const chefsTableController = require('../controllers/chefsTableController');

router.get('/', chefsTableController.handleChefsTable);


module.exports = router;