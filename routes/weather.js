const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const { getCityTemperature } = require('../controllers/weatherController');

// Serve the weather page
router.get('/', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/weather.html'));
});

// Fetch city temperature
router.get('/:cityName', authMiddleware, getCityTemperature);

module.exports = router;