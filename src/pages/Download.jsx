import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';

const Download = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/statistics.json`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error loading statistics:', err));
  }, []);

  const downloadItems = [
    {
      title: 'Benchmark Dataset',
      description: 'Complete dataset with 85 PhD-level 3D geometric coding tasks',
      format: 'JSON',
      size: '~2.5 MB',
      icon: '📊',
      link: '#',
    },
    {
      title: 'Unit Test Templates',
      description: 'Automated testing framework for evaluating model outputs',
      format: 'Python',
      size: '~500 KB',
      icon: '🧪',
      link: '#',
    },
    {
      title: 'Evaluation Scripts',
      description: 'Complete evaluation pipeline and scoring utilities',
      format: 'Python',
      size: '~300 KB',
      icon: '⚙️',
      link: '#',
    },
    {
      title: 'Paper (arXiv)',
      description: 'Full research paper with detailed methodology and analysis',
      format: 'PDF',
      size: '~5 MB',
      icon: '📄',
      link: 'https://arxiv.org',
    },
    {
      title: 'Supplementary Materials',
      description: 'Additional figures, tables, and extended analysis',
      format: 'PDF',
      size: '~3 MB',
      icon: '📎',
      link: '#',
    },
    {
      title: 'Source Code Repository',
      description: 'Complete codebase for reproducing all experiments',
      format: 'GitHub',
      size: 'N/A',
      icon: '💻',
      link: 'https://github.com',
    },
  ];

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const taskDistributionData = stats.task_distribution.map(task => ({
    name: task.category,
    value: task.percentage,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data & Tasks</h1>
        <p className="text-lg text-gray-600">
          Download benchmark datasets, evaluation tools, and research materials
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{stats.total_tasks}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">33</div>
          <div className="text-sm text-gray-600">Source Papers</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">3</div>
          <div className="text-sm text-gray-600">Top Venues</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{(stats.avg_paper_tokens / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">Avg Tokens</div>
        </div>
      </div>

      {/* Task Distribution and Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Task Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Task Distribution by Category</h2>
          <PieChart data={taskDistributionData} title="" />
        </div>

        {/* Conference Sources Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <div className="space-y-4">
            {(() => {
              const totalFromSources = stats.sources.reduce((sum, s) => sum + (Number(s.count) || 0), 0);
              const total = totalFromSources || Number(stats.total_tasks) || 1;

              return stats.sources.map((source) => {
                const pct = (Number(source.count) || 0) / total * 100;
                return (
                  <div key={source.venue} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">{source.venue}</div>
                      <div className="text-sm text-gray-600">{pct.toFixed(1)}%</div>
                    </div>
                    <div className="text-3xl font-bold text-primary">{pct.toFixed(1)}%</div>
                  </div>
                );
              });
            })()}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Total:</span> {stats.sources.reduce((sum, s) => sum + (Number(s.count) || 0), 0)} tasks 
                extracted from 33 official code repositories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Downloads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500">Format: {item.format}</span>
                <span className="text-xs text-gray-500">Size: {item.size}</span>
              </div>
              <a
                href={item.link}
                className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Download the Dataset
            </h3>
            <p className="text-gray-600 ml-11">
              Start by downloading the benchmark dataset JSON file containing all 85 tasks with their descriptions, 
              test cases, and metadata.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Set Up Evaluation Environment
            </h3>
            <p className="text-gray-600 ml-11">
              Install the evaluation scripts and unit test templates. Requires Python 3.8+ and standard scientific 
              computing libraries (NumPy, SciPy, etc.).
            </p>
            <pre className="ml-11 mt-2 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              pip install -r requirements.txt
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              Run Evaluation
            </h3>
            <p className="text-gray-600 ml-11">
              Use the evaluation scripts to test your model's generated code against the unit tests.
            </p>
            <pre className="ml-11 mt-2 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              python evaluate.py --model your_model --output results.json
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
              Submit Results
            </h3>
            <p className="text-gray-600 ml-11">
              Submit your evaluation results to be included in the leaderboard. Follow the submission guidelines 
              in the GitHub repository.
            </p>
          </div>
        </div>
      </div>

      {/* License and Citation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">License</h3>
          <p className="text-sm text-gray-600 mb-4">
            GeoCodeBench is released under the MIT License. You are free to use, modify, and distribute 
            the dataset and code for research and commercial purposes.
          </p>
          <a href="#" className="text-primary hover:text-blue-700 text-sm font-medium">
            View Full License →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Citation</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you use GeoCodeBench in your research, please cite our paper:
          </p>
          <button className="text-primary hover:text-blue-700 text-sm font-medium">
            Copy BibTeX →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Download;

