const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.route('/')
    .get(bookingController.handleBookingGet)
    .put(bookingController.handleBookingUpdate);


module.exports = router;