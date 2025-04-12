import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Card from "./Card";
import DateRangeSelector from "./DateRangeSelector";
import CitySelector from "./CitySelector";
import {
  Cloud,
  Leaf,
  LineChart,
  Lightbulb,
  Lock,
  Crown,
  Sparkles,
} from "lucide-react";
import { ROLES } from "../utils/roles";
import { api } from "../utils/api";

const CitizenDashboard = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === ROLES.ADMIN;
  const [powerUsage, setPowerUsage] = useState<number>(0);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [policyTips, setPolicyTips] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);

  const handleCityChange = async (cityId: string) => {
    setSelectedCity(cityId);
    setPowerUsage(0);
    setPrediction(null);
    setPredictionError(null);
    try {
      const weather = await api.getWeather(cityId);
      setWeatherData(weather);

      // Get policy tips based on temperature
      const policy = await api.getPolicy(weather.temperature);
      setPolicyTips(policy.tips);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handlePowerUsageChange = async (value: number) => {
    setPowerUsage(value);
    setPredictionLoading(true);
    setPredictionError(null);

    try {
      if (weatherData && value > 0) {
        const predictionData = {
          power_demand: value,
          temp: weatherData.temperature,
        };
        console.log(
          "Sending prediction request with data:",
          JSON.stringify(predictionData, null, 2)
        );
        const predictionResult = await api.getPrediction(predictionData);
        console.log(
          "Raw prediction result:",
          JSON.stringify(predictionResult, null, 2)
        );

        // Check if the response has the expected structure
        if (predictionResult && typeof predictionResult === "object") {
          // Try different possible property names
          const predictionValue =
            predictionResult.predicted_power_demand ||
            predictionResult.prediction ||
            predictionResult.value;

          if (
            typeof predictionValue === "number" ||
            (typeof predictionValue === "string" &&
              !isNaN(parseFloat(predictionValue)))
          ) {
            const finalValue =
              typeof predictionValue === "string"
                ? parseFloat(predictionValue)
                : predictionValue;

            console.log("Setting prediction value:", finalValue);
            setPrediction(finalValue);
          } else {
            console.error("Invalid prediction value format:", predictionValue);
            throw new Error("Invalid prediction value format");
          }
        } else {
          console.error(
            "Invalid prediction response structure:",
            predictionResult
          );
          throw new Error("Invalid prediction response structure");
        }
      }
    } catch (error) {
      console.error("Error getting prediction:", error);
      setPredictionError("Failed to get prediction. Please try again.");
      setPrediction(null);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Calculate the percentage for the progress bar (0-20000kW scale)
  const calculateProgressPercentage = (value: number) => {
    return Math.min((value / 20000) * 100, 100);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-6">
          <DateRangeSelector
            onPowerUsageChange={handlePowerUsageChange}
            selectedCity={selectedCity}
          />
          {powerUsage > 0 && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Previous Month Usage:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {powerUsage.toFixed(2)} kW
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${calculateProgressPercentage(powerUsage)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0 kW</span>
                  <span>20,000 kW</span>
                </div>
              </div>

              {predictionLoading ? (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">
                      Calculating prediction...
                    </span>
                  </div>
                </div>
              ) : predictionError ? (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-red-500 text-center">
                    {predictionError}
                  </div>
                </div>
              ) : (
                prediction !== null && (
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">
                        Predicted Next Month Usage:
                      </span>
                      <span className="text-lg font-semibold text-green-600">
                        {prediction.toFixed(2)} kW
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${calculateProgressPercentage(prediction)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0 kW</span>
                      <span>20,000 kW</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {prediction > powerUsage ? (
                        <span className="text-red-500">
                          Expected increase in power usage
                        </span>
                      ) : (
                        <span className="text-green-500">
                          Expected decrease in power usage
                        </span>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <CitySelector onCityChange={handleCityChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <Card title="Load Forecast Chart">
            <div
              className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 relative transition-all duration-300 ${
                !isAdmin && "blur-[6px] group-hover:blur-[4px]"
              }`}
            >
              <div className="text-center">
                <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart will be rendered here</p>
              </div>
            </div>
            {!isAdmin && (
              <div className="absolute inset-0 flex items-center justify-center mt-12 rounded-lg bg-white/80 transition-all duration-300">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="bg-blue-50 p-4 rounded-full inline-block">
                      <Lock className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <p className="text-gray-800 font-semibold text-lg">
                        Admin Access Only
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      This premium feature provides detailed load forecasting
                      insights
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-blue-600 mt-2">
                      <Crown className="h-4 w-4" />
                      <span className="text-sm">Premium Feature</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <Card title="Weather Overlay">
          <div className="flex items-center space-x-6 justify-center h-64">
            {weatherData ? (
              <>
                <Cloud className="h-16 w-16 text-blue-400" />
                <div>
                  <p className="text-4xl font-bold text-gray-800">
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-gray-500">
                    Humidity: {weatherData.humidity}%
                  </p>
                  <p className="text-gray-500">
                    Wind: {weatherData.windSpeed} km/h
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a city to see weather data</p>
            )}
          </div>
        </Card>

        <Card title="Energy Saving Tips">
          <div className="space-y-4">
            {policyTips.length > 0 ? (
              policyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-1" />
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Select a city to see energy saving tips
              </p>
            )}
          </div>
        </Card>

        <Card title="Your Impact">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">0.5t</p>
              <p className="text-sm text-gray-500">Your CO₂ Savings</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Leaf className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">10%</p>
              <p className="text-sm text-gray-500">Energy Saved</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default CitizenDashboard;
