import { useEffect, useState } from 'react';
import ScatterPlot from '../components/ScatterPlot';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const Analysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/leaderboard_data.json`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error loading data:', err));
  }, []);

  // Simulated error distribution data
  const errorDistribution = [
    { name: 'Functional Error', value: 45 },
    { name: 'Shape Error', value: 25 },
    { name: 'Type Error', value: 15 },
    { name: 'Logic Error', value: 10 },
    { name: 'Other', value: 5 },
  ];

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Analysis</h1>
        <p className="text-lg text-gray-600">
          Deep dive into model capabilities and error patterns
        </p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-semibold mb-2">Positive Correlation</h3>
          <p className="text-sm text-gray-600">
            General 3D capability shows strong positive correlation with research-level task performance
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Common Failures</h3>
          <p className="text-sm text-gray-600">
            Functional errors account for 45% of failures, often due to improper formula usage
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="text-lg font-semibold mb-2">Routing Challenge</h3>
          <p className="text-sm text-gray-600">
            Geometric logic routing remains the hardest category with average 17.2% pass rate
          </p>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Capability Correlation Analysis</h2>
          <p className="text-sm text-gray-600">
            Replicating Figure 3 from the paper: Pearson correlation between general and research capabilities
          </p>
        </div>
        <ScatterPlot data={data.leaderboard} />
        <div className="mt-4 text-sm text-gray-500 italic">
          Note: Research capability data is simulated for demonstration. Replace with actual data when available.
        </div>
      </div>

      {/* Error Distribution and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Error Distribution</h2>
            <p className="text-sm text-gray-600">
              Breakdown of failure types across all models
            </p>
          </div>
          <PieChart data={errorDistribution} title="" />
          <div className="mt-4 text-sm text-gray-500 italic">
            Note: Error distribution data is simulated. Replace with actual analysis results.
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Dimensional Performance</h2>
            <p className="text-sm text-gray-600">
              Comparative analysis across task categories
            </p>
          </div>
          <BarChart data={data.leaderboard} />
        </div>
      </div>

      {/* Detailed Findings */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Key Findings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">1️⃣</span>
              Model Performance Hierarchy
            </h3>
            <p className="text-gray-600 ml-8">
              GPT-5 leads with 28.0% overall pass rate, followed closely by Gemini-2.5-Pro (27.4%) 
              and Claude-Sonnet-4.5 (27.2%). The gap between top performers is narrow, suggesting 
              similar architectural capabilities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">2️⃣</span>
              Context Length Impact
            </h3>
            <p className="text-gray-600 ml-8">
              Method section context consistently outperforms full paper input, suggesting that 
              focused, relevant context is more valuable than comprehensive but noisy information.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">3️⃣</span>
              Open vs Closed Source Gap
            </h3>
            <p className="text-gray-600 ml-8">
              Open-source models like Kimi-K2-Instruct (26.3%) and Qwen3-Coder-480B (23.2%) are 
              approaching closed-source performance, indicating rapid progress in the open-source community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">4️⃣</span>
              Task Difficulty Variance
            </h3>
            <p className="text-gray-600 ml-8">
              Geometric transformations show highest pass rates (avg 36.7%), while geometric logic 
              routing remains extremely challenging (avg 17.2%), highlighting specific areas for model improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

