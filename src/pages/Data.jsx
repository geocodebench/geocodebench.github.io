import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';

const PaperIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.5 14.25V6.75A2.25 2.25 0 0017.25 4.5H8.25A2.25 2.25 0 006 6.75v12A2.25 2.25 0 008.25 21h4.5M9 8.25h7.5M9 11.25h7.5M9 14.25h4.5M15.75 18.75l1.5 1.5 3-3"
    />
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

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
      row['Paper link'],
      row['Github link'],
    ]
      .map((v) => String(v ?? '').toLowerCase())
      .join(' ');

    return haystack.includes(normalizedQuery);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data & Tasks</h1>

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
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold w-24 text-center">Paper</th>
                <th className="sticky top-0 bg-white/95 backdrop-blur border-b p-3 font-semibold w-24 text-center">GitHub</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepoTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-sm text-gray-500">
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
                    <td className="border-b p-3 text-center">
                      {row['Paper link'] ? (
                        <a
                          href={row['Paper link']}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open paper"
                          className="inline-flex items-center justify-center text-primary hover:text-primary/80"
                          title="Open paper"
                        >
                          <PaperIcon className="w-5 h-5 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="border-b p-3 text-center">
                      {row['Github link'] ? (
                        <a
                          href={row['Github link']}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open GitHub repository"
                          className="inline-flex items-center justify-center text-primary hover:text-primary/80"
                          title="Open repository"
                        >
                          <GitHubIcon className="w-5 h-5 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
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

