import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';

const Data = () => {
  const [stats, setStats] = useState(null);
  const [repoTasks, setRepoTasks] = useState([]);
  const [repoTasksError, setRepoTasksError] = useState('');
  const [repoTasksQuery, setRepoTasksQuery] = useState('');
  const [repoTasksSource, setRepoTasksSource] = useState('');
  const [repoTasksCategory, setRepoTasksCategory] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/statistics.json`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Error loading statistics:', err));
  }, []);

  useEffect(() => {
    const parseSimpleCsv = (text) => {
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) return [];

      const headers = lines[0].split(',').map((h) => h.trim());
      return lines.slice(1).map((line) => {
        const cells = line.split(',').map((c) => c.trim());
        const row = {};
        headers.forEach((h, idx) => {
          row[h] = cells[idx] ?? '';
        });
        return row;
      });
    };

    fetch(`${import.meta.env.BASE_URL}data/repos.csv`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const rows = parseSimpleCsv(text);
        setRepoTasks(rows);
        setRepoTasksError('');
      })
      .catch((err) => {
        console.error('Error loading repos.csv:', err);
        setRepoTasks([]);
        setRepoTasksError('Failed to load repository task table.');
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const taskDistributionData = stats.task_distribution.map((task) => ({
    name: task.category,
    value: task.percentage,
  }));

  const repoTaskSources = Array.from(new Set(repoTasks.map((r) => String(r.Source ?? '').trim()).filter(Boolean))).sort();
  const repoTaskCategories = Array.from(
    new Set(repoTasks.map((r) => String(r['Question Type'] ?? '').trim()).filter(Boolean)),
  ).sort();

  const normalizedQuery = repoTasksQuery.trim().toLowerCase();
  const filteredRepoTasks = repoTasks.filter((row) => {
    const rowSource = String(row.Source ?? '').trim();
    const rowCategory = String(row['Question Type'] ?? '').trim();

    if (repoTasksSource && rowSource !== repoTasksSource) return false;
    if (repoTasksCategory && rowCategory !== repoTasksCategory) return false;

    if (!normalizedQuery) return true;
    const haystack = [
      row.repo_name,
      row.unittest_index,
      row.Source,
      row['Question Type'],
    ]
      .map((v) => String(v ?? '').toLowerCase())
      .join(' ');

    return haystack.includes(normalizedQuery);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data & Tasks</h1>
        <p className="text-lg text-gray-600">
          Download benchmark datasets, evaluation tools, and research materials
        </p>
      </div>

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
          <div className="text-4xl font-bold text-primary mb-2">
            {(stats.avg_paper_tokens / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-gray-600">Avg Tokens</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Task Distribution by Category</h2>
          <PieChart data={taskDistributionData} title="" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <div className="space-y-4">
            {(() => {
              const totalFromSources = stats.sources.reduce((sum, s) => sum + (Number(s.count) || 0), 0);
              const total = totalFromSources || Number(stats.total_tasks) || 1;

              return stats.sources.map((source) => {
                const pct = ((Number(source.count) || 0) / total) * 100;
                return (
                  <div key={source.venue} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">{source.venue}</div>
                    </div>
                    <div className="text-3xl font-bold text-primary">{pct.toFixed(1)}%</div>
                  </div>
                );
              });
            })()}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Total:</span>{' '}
                100 tasks extracted from 47 official
                code repositories
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Task Details</h2>
          <div className="text-sm text-gray-500">
            {filteredRepoTasks.length}/{repoTasks.length} rows
          </div>
        </div>

        {repoTasksError ? <div className="text-sm text-red-600">{repoTasksError}</div> : null}

        <div className="flex flex-col gap-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Search</label>
              <input
                value={repoTasksQuery}
                onChange={(e) => setRepoTasksQuery(e.target.value)}
                placeholder="Search repo / source / category / task#..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Source</label>
              <select
                value={repoTasksSource}
                onChange={(e) => setRepoTasksSource(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="">All</option>
                {repoTaskSources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select
                value={repoTasksCategory}
                onChange={(e) => setRepoTasksCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="">All</option>
                {repoTaskCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-gray-500">
              Tip: search supports partial matches (e.g. <span className="font-mono">cvpr</span>, <span className="font-mono">slam</span>,{' '}
              <span className="font-mono">3</span>).
            </div>
            <button
              type="button"
              onClick={() => {
                setRepoTasksQuery('');
                setRepoTasksSource('');
                setRepoTasksCategory('');
              }}
              className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[460px] overflow-y-auto rounded-lg border border-gray-100">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold w-16">#</th>
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold">RepoName</th>
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold">Task #</th>
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold">Source</th>
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepoTasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-sm text-gray-500">
                    No results. Try clearing filters or adjusting your search.
                  </td>
                </tr>
              ) : (
                filteredRepoTasks.map((row, idx) => (
                  <tr
                    key={`${row.repo_name ?? 'repo'}-${row.unittest_index ?? 'task'}-${idx}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="border-b p-3 text-sm text-gray-500 whitespace-nowrap">{idx + 1}</td>
                    <td className="border-b p-3 text-sm font-medium text-gray-900 whitespace-nowrap">{row.repo_name}</td>
                    <td className="border-b p-3 text-sm text-gray-700 whitespace-nowrap">{row.unittest_index}</td>
                    <td className="border-b p-3 text-sm text-gray-700 whitespace-nowrap">{row.Source}</td>
                    <td className="border-b p-3 text-sm text-gray-700">{row['Question Type']}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;

