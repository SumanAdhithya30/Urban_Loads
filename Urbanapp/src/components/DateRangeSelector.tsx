import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { api } from "../utils/api";

interface DateRangeSelectorProps {
  onPowerUsageChange?: (value: number) => void;
  selectedCity?: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  onPowerUsageChange,
  selectedCity,
}) => {
  const [powerUsage, setPowerUsage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCity && selectedPeriod) {
      fetchHistoricalData();
    }
  }, [selectedPeriod]);

  const fetchHistoricalData = async () => {
    if (!selectedCity) return;

    setLoading(true);
    try {
      const data = await api.getHistoricalData(selectedCity, selectedPeriod);
      setPowerUsage(data.usage.toString());
      onPowerUsageChange?.(data.usage);
      setError("");
    } catch (err) {
      setError("Failed to fetch historical data");
      console.error("Error fetching historical data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  const handlePowerUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPowerUsage(value);
    setError("");

    if (value === "") {
      onPowerUsageChange?.(0);
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      return;
    }

    if (numValue < 0) {
      setError("Power usage cannot be negative");
      return;
    }

    if (numValue > 20000) {
      setError("Value seems too high. Please verify");
      return;
    }

    onPowerUsageChange?.(numValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
        <Calendar className="h-5 w-5 text-gray-600" />
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          disabled={!selectedCity || loading}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex-grow">
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={powerUsage}
                onChange={handlePowerUsageChange}
                placeholder={loading ? "Loading..." : "Enter power usage"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 text-sm">kW</span>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm px-4">{error}</p>}
      </div>
    </div>
  );
};

export default DateRangeSelector;
