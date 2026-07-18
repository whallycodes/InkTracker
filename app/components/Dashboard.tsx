'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Walk {
  id: string;
  distance: number;
  notes?: string;
  refused: boolean;
  createdAt: string;
}

interface DashboardProps {
  walks: Walk[];
  loading: boolean;
}

export default function Dashboard({ walks, loading }: DashboardProps) {
  const stats = useMemo(() => {
    const thisWeek = walks.filter((walk) => {
      const walkDate = new Date(walk.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return walkDate >= weekAgo;
    });

    const completed = thisWeek.filter((w) => !w.refused);
    const refusals = thisWeek.filter((w) => w.refused);
    const totalDistance = completed.reduce((sum, w) => sum + w.distance, 0);

    return {
      completed: completed.length,
      refusals: refusals.length,
      totalDistance: totalDistance.toFixed(1),
      avgDistance: completed.length > 0 ? (totalDistance / completed.length).toFixed(1) : 0,
    };
  }, [walks]);

  const chartData = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayWalks = walks.filter(
        (w) => w.createdAt.split('T')[0] === dateStr && !w.refused
      );
      const distance = dayWalks.reduce((sum, w) => sum + w.distance, 0);
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        distance: parseFloat(distance.toFixed(1)),
      });
    }
    return last7Days;
  }, [walks]);

  if (loading) {
    return <div className="text-center text-sage-700 py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Walks This Week" value={stats.completed} icon="🚶" />
        <StatCard label="Refusals" value={stats.refusals} icon="🐕" />
        <StatCard label="Total Distance" value={`${stats.totalDistance} km`} icon="📍" />
        <StatCard label="Avg Distance" value={`${stats.avgDistance} km`} icon="📏" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-serif font-bold text-sage-900 mb-4">Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dde7db" />
            <XAxis dataKey="date" stroke="#7aa668" />
            <YAxis stroke="#7aa668" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f7faf7',
                border: '2px solid #7aa668',
                borderRadius: '8px',
              }}
              formatter={(value) => `${value} km`}
            />
            <Line
              type="monotone"
              dataKey="distance"
              stroke="#7aa668"
              strokeWidth={2}
              dot={{ fill: '#5f8a4f', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {walks.length === 0 && (
        <div className="text-center py-12 bg-sage-100 rounded-lg">
          <p className="text-sage-700 text-lg">No walks logged yet. Get Ink moving! 🐾</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-lg p-4 border-2 border-sage-200">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-sage-700 font-semibold">{label}</p>
      <p className="text-2xl font-serif font-bold text-sage-900 mt-1">{value}</p>
    </div>
  );
}