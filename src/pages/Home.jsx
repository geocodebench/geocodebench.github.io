import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [currentFinding, setCurrentFinding] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/statistics.json`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error loading statistics:', err));
  }, []);

  useEffect(() => {
    if (stats?.key_findings) {
      const interval = setInterval(() => {
        setCurrentFinding((prev) => (prev + 1) % stats.key_findings.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [stats]);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const gradientColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
              <span className="text-sm font-semibold text-white">🎓 PhD-Level Benchmark</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                GeoCodeBench
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-blue-100">
              3D Geometric Vision Coding Benchmark
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-blue-50 max-w-3xl mx-auto mb-8 leading-relaxed">
              A comprehensive evaluation platform for assessing Large Language Models' capabilities 
              in 3D geometric computer vision programming tasks.
            </p>

            {/* Key Finding Card */}
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 max-w-3xl mx-auto mb-8 shadow-2xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-white/20 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-bold text-white mb-3">
                    {stats.key_findings[currentFinding]}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {stats.key_findings.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentFinding ? 'bg-white w-8' : 'bg-white/40 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/leaderboard"
                className="group relative px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  View Leaderboard
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                to="/download"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-base hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-sm shadow-lg"
              >
                Download Data
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[
            { title: 'Total Tasks', value: stats.total_tasks, icon: '📝', color: gradientColors[0] },
            { title: 'Models Evaluated', value: stats.total_models, icon: '🤖', color: gradientColors[1] },
            { title: 'Conference Sources', value: stats.sources.length, icon: '📚', color: gradientColors[2] },
            { title: 'Avg Paper Length', value: `${(stats.avg_paper_tokens / 1000).toFixed(1)}K`, icon: '📄', color: gradientColors[3] },
          ].map((stat, idx) => (
            <StatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={idx === 0 ? 'High-difficulty coding challenges' : idx === 1 ? 'Leading LLMs tested' : idx === 2 ? 'Top-tier venues' : 'Tokens per paper'}
              gradient={stat.color}
            />
          ))}
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Task Distribution</h2>
              <p className="text-sm text-gray-500 mt-1">Breakdown by category</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.task_distribution.map((task, idx) => (
              <div key={task.category} className="group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-gray-800">{task.category}</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {task.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-4 rounded-full bg-gradient-to-r ${gradientColors[idx]} transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${task.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conference Sources */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Data Sources</h2>
              <p className="text-sm text-gray-500 mt-1">Top-tier computer vision conferences</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.sources.map((source, idx) => (
            <div key={source.venue} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-all hover:shadow-lg">
              <div className="text-center">
                <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${gradientColors[idx]} bg-clip-text text-transparent`}>
                  {source.count}
                </div>
                <div className="text-lg font-bold text-gray-800">{source.venue}</div>
                <div className="text-xs text-gray-500 mt-1">Tasks</div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Methodology Overview */}
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200 rounded-full -mr-24 -mt-24 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200 rounded-full -ml-24 -mb-24 opacity-20 blur-3xl"></div>
          
          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Evaluation Methodology</h2>
              <p className="text-base text-gray-600">Our three-step process ensures quality and accuracy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🔍', title: 'Auto Extraction', desc: 'Automated extraction of coding tasks from research papers', color: 'from-blue-500 to-cyan-500' },
                { icon: '✅', title: 'Human Verification', desc: 'Expert validation of task quality and correctness', color: 'from-green-500 to-emerald-500' },
                { icon: '🧪', title: 'Auto Unit Test', desc: 'Comprehensive automated testing of generated code', color: 'from-purple-500 to-pink-500' },
              ].map((method, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-center text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-center text-gray-600 leading-relaxed">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
