'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
}

export default function WeatherBanner() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="bg-sage-100 p-4 text-center">Loading weather...</div>;
  
  if (error || !weather) {
    return <div className="bg-sage-100 p-4 text-center text-sage-700">Weather unavailable</div>;
  }

  const isRaining = weather.condition.toLowerCase().includes('rain');
  const bgColor = isRaining ? 'bg-blue-100' : 'bg-sage-100';
  const textColor = isRaining ? 'text-blue-900' : 'text-sage-900';

  return (
    <div className={`${bgColor} ${textColor} p-6 border-b-4 border-sage-300`}>
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-75">Current Weather</p>
            <p className="text-3xl font-serif font-bold mt-1">
              {weather.temperature}°C · {weather.condition}
            </p>
            <p className="text-sm opacity-80 mt-1">Feels like {weather.feelsLike}°C</p>
          </div>
          <div className="text-6xl">{weather.icon}</div>
        </div>
        
        {isRaining && (
          <p className="mt-4 text-lg font-semibold text-blue-800">
            💭 Maybe later. Ink's probably napping anyway.
          </p>
        )}
      </div>
    </div>
  );
}
