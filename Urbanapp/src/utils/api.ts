import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Update this if your backend runs on a different port

export const api = {
  // Cities API
  getCities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  },

  // Historical Data API
  getHistoricalData: async (city: string, period: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/historical`, {
        params: { city, period },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching historical data:", error);
      throw error;
    }
  },

  // Weather API
  getWeather: async (city: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather`, {
        params: { city },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  },

  // Policy API
  getPolicy: async (temperature: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/policy`, {
        params: { temperature },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching policy:", error);
      throw error;
    }
  },

  // Prediction API
  getPrediction: async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, data);
      return response.data;
    } catch (error) {
      console.error("Error getting prediction:", error);
      throw error;
    }
  },
};
