import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const DataEntry: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    sleepHours: '',
    restingHR: '',
    dailySteps: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Health Entry:', formData);
    alert('Health entry added successfully!');
    navigate('/dashboard'); // Go back to dashboard after adding
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white flex items-center justify-center p-6">
      <div className="bg-purple-800/40 backdrop-blur-sm rounded-xl p-8 w-full max-w-md border border-purple-600/30">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-green-400" />
          Add Health Entry
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Sleep Hours</label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              placeholder="e.g., 7.5"
              className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Resting Heart Rate (bpm)</label>
            <input
              type="number"
              name="restingHR"
              value={formData.restingHR}
              onChange={handleChange}
              placeholder="e.g., 72"
              className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Daily Steps</label>
            <input
              type="number"
              name="dailySteps"
              value={formData.dailySteps}
              onChange={handleChange}
              placeholder="e.g., 8000"
              className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes..."
              className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataEntry;
