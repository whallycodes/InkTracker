'use client';

import { useState } from 'react';

interface WalkLoggerProps {
  onWalkAdded: () => void;
}

export default function WalkLogger({ onWalkAdded }: WalkLoggerProps) {
  const [distance, setDistance] = useState('');
  const [notes, setNotes] = useState('');
  const [isRefusal, setIsRefusal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/walks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distance: isRefusal ? 0 : parseFloat(distance),
          notes,
          refused: isRefusal,
        }),
      });

      if (!res.ok) throw new Error('Failed to log walk');

      setSuccess(true);
      setDistance('');
      setNotes('');
      setIsRefusal(false);
      onWalkAdded();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error logging walk:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sage-500">
      <h2 className="text-2xl font-serif font-bold text-sage-900 mb-6">Log a Walk</h2>

      {success && (
        <div className="mb-4 p-3 bg-sage-100 text-sage-900 rounded-md text-sm font-semibold">
          ✓ {isRefusal ? 'Refusal logged' : 'Walk logged'} successfully!
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={!isRefusal}
              onChange={() => setIsRefusal(false)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sage-900">Walk Completed</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={isRefusal}
              onChange={() => setIsRefusal(true)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sage-900">Ink Said No</span>
          </label>
        </div>

        {!isRefusal && (
          <div>
            <label className="block text-sm font-semibold text-sage-900 mb-2">
              Distance (km)
            </label>
            <input
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 2.3"
              required={!isRefusal}
              className="w-full px-3 py-2 border-2 border-sage-300 rounded-md focus:outline-none focus:border-sage-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-sage-900 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What happened on this walk? Any observations?"
            rows={3}
            className="w-full px-3 py-2 border-2 border-sage-300 rounded-md focus:outline-none focus:border-sage-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
            isRefusal
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-sage-500 hover:bg-sage-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Logging...' : isRefusal ? '🐕 Ink Said No' : '✓ Log Walk'}
        </button>
      </div>
    </form>
  );
}