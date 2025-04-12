import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { api } from "../utils/api";

interface City {
  id: string;
  name: string;
  state: string;
}

interface CitySelectorProps {
  onCityChange?: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCityChange }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.getCities();
        setCities(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cities");
        setLoading(false);
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCityChange?.(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 mb-6">
        <MapPin className="h-5 w-5 text-gray-600" />
        <div className="animate-pulse bg-gray-200 h-10 w-full rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 mb-6">
        <MapPin className="h-5 w-5 text-gray-600" />
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 mb-6">
      <MapPin className="h-5 w-5 text-gray-600" />
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a city
        </option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}, {city.state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
