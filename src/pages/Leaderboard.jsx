import { useEffect, useState } from 'react';
import LeaderboardBarChart from '../components/LeaderboardBarChart';
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

      {/* Leaderboard Bar Chart */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Rankings</h2>
          <p className="text-sm text-gray-600 mb-4">
            {dimensions.find((d) => d.key === selectedDimension)?.label} · Click a bar to add/remove model for radar comparison (max 5)
          </p>
          <LeaderboardBarChart
            data={data.leaderboard}
            dimension={selectedDimension}
            onModelClick={handleModelSelect}
          />
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

