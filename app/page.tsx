'use client';

import { useState, useEffect } from 'react';
import WeatherBanner from './components/WeatherBanner';
import WalkLogger from './components/WalkLogger';
import Dashboard from './components/Dashboard';

export default function Home() {
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalks = async () => {
      try {
        const res = await fetch('/api/walks');
        const data = await res.json();
        setWalks(data);
      } catch (error) {
        console.error('Failed to fetch walks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalks();
  }, []);

  const handleWalkAdded = () => {
    const fetchWalks = async () => {
      const res = await fetch('/api/walks');
      const data = await res.json();
      setWalks(data);
    };
    fetchWalks();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <WeatherBanner />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col gap-8">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-serif font-bold text-sage-900 mb-2">
              🐾 InkTracker
            </h1>
            <p className="text-lg text-sage-700">
              A walk logger for a retired racer who hates the rain.
            </p>
          </header>

          <WalkLogger onWalkAdded={handleWalkAdded} />
          
          <Dashboard walks={walks} loading={loading} />
        </div>
      </div>
    </div>
  );
}
