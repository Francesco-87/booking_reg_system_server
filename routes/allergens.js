const express = require('express');
const router = express.Router();
const allergenController = require('../controllers/allergenController');

router.route('/')
.get(allergenController.handleAllergenSearch)
.put(allergenController.handleAllergenUpdate);


module.exports = router;