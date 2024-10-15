const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCityTemperature = async (req, res) => {
  const { cityName } = req.params;
  try {
    // Fetch the temperature from the OpenWeatherMap API
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
    const temperature = response.data.main.temp;

    // Return the temperature
    res.json({ temp: temperature });
  } catch (error) {
    console.error('Error fetching city temperature:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch city temperature', details: error.message });
  }
};

module.exports = { getCityTemperature };