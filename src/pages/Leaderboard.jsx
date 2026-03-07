import { useEffect, useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import RadarChart from '../components/RadarChart';

const Leaderboard = () => {
  const [data, setData] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState('overall');
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/leaderboard_data.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        // Select top 3 models by default for radar chart
        setSelectedModels(data.leaderboard.slice(0, 3));
      })
      .catch(err => console.error('Error loading leaderboard:', err));
  }, []);

  const dimensions = [
    { key: 'overall', label: 'Overall', icon: '🏆' },
    { key: 'geo_trans', label: 'Geometric Transformations', icon: '📐' },
    { key: 'mech_opt', label: 'Mechanics/Optics', icon: '⚙️' },
    { key: 'algorithm', label: 'Novel Algorithm', icon: '🧮' },
    { key: 'routing', label: 'Geometric Routing', icon: '🔀' },
  ];

  const handleModelSelect = (model) => {
    setSelectedModels((prev) => {
      const exists = prev.find(m => m.model === model.model);
      if (exists) {
        return prev.filter(m => m.model !== model.model);
      }
      if (prev.length >= 5) {
        alert('Maximum 5 models can be compared');
        return prev;
      }
      return [...prev, model];
    });
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600">
          Compare performance of leading LLMs on PhD-level 3D geometric coding tasks
        </p>
      </div>

      {/* Dimension Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {dimensions.map((dim) => (
              <button
                key={dim.key}
                onClick={() => setSelectedDimension(dim.key)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  selectedDimension === dim.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{dim.icon}</span>
                <span>{dim.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Context Switcher (Placeholder) */}
      <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Context comparison (No Paper / Method Section / Full Paper) coming soon. 
              Currently showing default context results.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Rankings</h2>
          <p className="text-sm text-gray-600 mb-4">
            Click on model rows to select for radar chart comparison (max 5 models)
          </p>
          <div className="cursor-pointer">
            <LeaderboardTable data={data.leaderboard} dimension={selectedDimension} />
          </div>
        </div>
      </div>

      {/* Model Selection for Radar Chart */}
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Select Models for Comparison</h2>
        <div className="flex flex-wrap gap-2">
          {data.leaderboard.map((model) => (
            <button
              key={model.model}
              onClick={() => handleModelSelect(model)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                selectedModels.find(m => m.model === model.model)
                  ? 'border-primary bg-blue-50 text-primary'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {model.model}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      {selectedModels.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <RadarChart models={selectedModels} />
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

