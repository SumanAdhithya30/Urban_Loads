const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Cities data
const cities = [
  { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "delhi", name: "Delhi", state: "Delhi" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
];

// Historical power usage data (dummy data for now)


// Cities endpoint
app.get("/cities", (req, res) => {
  res.json(cities);
});

// Historical data endpoint
app.get("/historical", (req, res) => {
  const { city, period } = req.query;

  if (!city || !period) {
    return res
      .status(400)
      .json({ error: "City and period parameters are required." });
  }

  const cityData = historicalData[city];
  if (!cityData) {
    return res.status(404).json({ error: "City not found." });
  }

  const usage = cityData[period];
  if (!usage) {
    return res
      .status(400)
      .json({ error: "Invalid period. Use today, week, or month." });
  }

  res.json({ usage });
});

// Weather Route
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const data = weatherResponse.data;
    const sanitizedData = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.json(sanitizedData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    if (error.response) {
      console.error("API response error:", error.response.data);
    }
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

// Fallback Policy Route (Temperature-aware heuristic tips)
app.get("/policy", (req, res) => {
  const temperature = parseFloat(req.query.temperature);

  if (isNaN(temperature)) {
    return res.status(400).json({
      error: "Temperature query parameter is required and must be a number.",
    });
  }

  let tips = [];

  if (temperature >= 30) {
    // Hot weather tips
    tips = [
      "Use ceiling fans before switching on the AC.",
      "Keep curtains closed during the day to block heat.",
      "Hydrate well and avoid overusing cooling appliances.",
      "Set AC to 24°C for efficient cooling.",
      "Use solar shades or reflective window panels.",
    ];
  } else if (temperature <= 15) {
    // Cold weather tips
    tips = [
      "Use thick curtains to retain heat inside.",
      "Seal any window or door gaps to prevent heat loss.",
      "Wear layered clothing indoors instead of increasing heater usage.",
      "Use electric blankets instead of room heaters when possible.",
      "Bake or cook at home to warm the kitchen naturally.",
    ];
  } else {
    // Moderate weather tips
    tips = [
      "Take advantage of natural ventilation.",
      "Use programmable thermostats efficiently.",
      "Switch off appliances when not in use.",
      "Use public transport or cycle when possible.",
      "Maintain appliances for better energy performance.",
    ];
  }

  res.json({ temperature, tips });
});

// Replace the existing /predict route handler with this updated version:

app.post("/predict", async (req, res) => {
  try {
    const { power_demand, temp } = req.body;

    if (!power_demand || !temp) {
      return res
        .status(400)
        .json({ error: "power_demand and temp are required parameters." });
    }

    // Create the input data in the exact format expected by the ML model
    const inputData = {
      input: [parseFloat(power_demand), parseFloat(temp)],
    };

    console.log("Sending data to ML model:", inputData);

    // Make prediction request to ML model
    const response = await axios.post(
      "https://1c29-59-145-65-66.ngrok-free.app/predict",
      inputData
    );

    console.log("Raw ML model response:", response.data);

    // Extract the predicted_power_demand value from the response
    let prediction = null;
    if (response.data && response.data.predicted_power_demand !== undefined) {
      prediction = response.data.predicted_power_demand;
    } else {
      throw new Error("Unexpected response format from ML model");
    }

    console.log("Extracted prediction:", prediction);

    // Return the prediction result in the format expected by the frontend
    res.json({ prediction });
  } catch (error) {
    console.error("Error fetching prediction:", error.message);
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    res.status(500).json({ error: "Failed to get prediction from ML model." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
