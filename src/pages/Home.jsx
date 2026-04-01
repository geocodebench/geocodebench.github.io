import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import LeaderboardBarChart from '../components/LeaderboardBarChart';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [currentFinding, setCurrentFinding] = useState(0);
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/statistics.json`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error loading statistics:', err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/leaderboard_data.json`)
      .then(res => res.json())
      .then(data => setLeaderboardData(data))
      .catch(err => console.error('Error loading leaderboard data:', err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/news.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((err) => {
        console.warn('News not available:', err);
        setNews({ items: [] });
      });
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
      {/* Hero Section - z-20 so CTA stays above overlapping white content */}
      <div className="relative z-20 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            {/* CVPR 2026 */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-5 py-2.5 bg-amber-400/90 text-gray-900 rounded-full font-bold text-sm md:text-base shadow-lg border border-amber-300/50">
                CVPR 2026
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                GeoCodeBench
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-blue-100">
              Benchmarking PhD-Level Coding in 3D Geometric Computer Vision
            </p>

            {/* Organization / 单位 - replace with your institution name */}
            <p className="text-sm md:text-base text-blue-200/90 mb-2">
             Institute for AI Industry Research (AIR), Tsinghua University <br />
             Beijing Academy of Artificial Intelligence (BAAI)
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-blue-50 max-w-3xl mx-auto mb-8 leading-relaxed">
 
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

            {/* CTA Buttons: Paper, GitHub, Data, View Leaderboard */}
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://arxiv.org/abs/2603.30038"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-base hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-sm shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.5 14.25V6.75A2.25 2.25 0 0017.25 4.5H8.25A2.25 2.25 0 006 6.75v12A2.25 2.25 0 008.25 21h4.5M9 8.25h7.5M9 11.25h7.5M9 14.25h4.5M15.75 18.75l1.5 1.5 3-3"
                  />
                </svg>
                Paper
              </a>
              <a
                href="https://github.com/geocodebench/GeoCodeBench"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-base hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-sm shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
              <Link
                to="/data"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-base hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-sm shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 20.25c4.142 0 7.5-1.679 7.5-3.75S16.142 12.75 12 12.75s-7.5 1.679-7.5 3.75 3.358 3.75 7.5 3.75z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.5 12.75c0 2.071-3.358 3.75-7.5 3.75s-7.5-1.679-7.5-3.75M19.5 8.25c0 2.071-3.358 3.75-7.5 3.75S4.5 10.321 4.5 8.25 7.858 4.5 12 4.5s7.5 1.679 7.5 3.75zM4.5 8.25v8.25"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.5 8.25v8.25"
                  />
                </svg>
                Data
              </Link>
              <Link
                to="/leaderboard"
                className="group relative px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="relative z-10">View Leaderboard</span>
                <svg className="w-5 h-5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - no negative margin so hero does not cover this block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* News */}
        {news?.items?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-fuchsia-600 rounded-lg mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8.25v4.5l3 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">News</h2>
              </div>
            </div>

            <div className="space-y-3">
              {[...news.items]
                .sort((a, b) => String(b.date).localeCompare(String(a.date)))
                .slice(0, 4)
                .map((item, idx) => (
                  <div key={`${item.date}-${idx}`} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 mt-1.5" />
                      <div className="w-px flex-1 bg-gray-200" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                        {item.tag && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                            {item.tag}
                          </span>
                        )}
                        <div className="text-[11px] text-gray-500">{item.date}</div>
                      </div>
                      {item.body && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.body}</p>}
                      {item.link && (
                        <div className="mt-1.5">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-blue-700 hover:text-blue-800"
                          >
                            Learn more →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Benchmark Results - bar chart */}
        {leaderboardData?.leaderboard && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Benchmark Results</h2>
                  <p className="text-sm text-gray-500 mt-1">Overall pass rate by model</p>
                </div>
              </div>
              <Link
                to="/leaderboard"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                View Leaderboard
              </Link>
            </div>
            <LeaderboardBarChart data={leaderboardData.leaderboard} dimension="overall" />
          </div>
        )}

        {/* Benchmark Details - title + statistics cards in one block */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Benchmark Details</h2>
            <p className="text-sm text-gray-500 mt-1">Key statistics at a glance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
          {(() => {
            const totalFromSources = stats.sources.reduce((sum, s) => sum + (Number(s.count) || 0), 0);
            const total = totalFromSources || Number(stats.total_tasks) || 1;

            return stats.sources.map((source, idx) => {
              const pct = (Number(source.count) || 0) / total * 100;
              const pctLabel = `${pct.toFixed(1)}%`;

              return (
                <div
                  key={source.venue}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-all hover:shadow-lg"
                >
                  <div className="text-center">
                    <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${gradientColors[idx]} bg-clip-text text-transparent`}>
                      {pctLabel}
                    </div>
                    <div className="text-lg font-bold text-gray-800">{source.venue}</div>
                  </div>
                </div>
              );
            });
          })()}
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
                { icon: '🔍', title: 'Novel Task Extraction', desc: 'Extraction of coding tasks from top-tier research papers', color: 'from-blue-500 to-cyan-500' },
                { icon: '✅', title: 'Human Verification', desc: 'Expert validation of task quality and correctness', color: 'from-green-500 to-emerald-500' },
                { icon: '🧰', title: 'Unit Test Design', desc: 'Comprehensive automated testing of generated code', color: 'from-purple-500 to-pink-500' },
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

        {/* Citation - separate block above footer */}
        <div className="mt-12 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Citation</h2>
            <p className="text-sm text-gray-500 mb-3">If you use GeoCodeBench in your research, please cite:</p>
            <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-sm overflow-x-auto font-mono">
{`@article{li2026benchmarking,
  title={Benchmarking PhD-Level Coding in 3D Geometric Computer Vision}, 
  author={Wenyi,Li and Renkai,Luo and Yue,Yu and Huan-ang,Gao and Mingju,Gao and Li,Yuan and Chaoyou,Fu and Hao,Zhao},
  journal={arXiv preprint arXiv:2603.30038},
  year={2026},
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
