import { useState } from 'react';

const LeaderboardTable = ({ data, dimension }) => {
  const [sortConfig, setSortConfig] = useState({ key: dimension, direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    });
  };

  const getColumnLabel = (key) => {
    const labels = {
      overall: 'Overall',
      geo_trans: 'Geo Transform',
      mech_opt: 'Mech/Optics',
      algorithm: 'Algorithm',
      routing: 'Routing',
    };
    return labels[key] || key;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44 min-w-[11rem] max-w-[11rem]">
              Model
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            {['overall', 'geo_trans', 'mech_opt', 'algorithm', 'routing'].map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 min-w-[4.5rem]"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{getColumnLabel(key)}</span>
                  {sortConfig.key === key && (
                    <span>{sortConfig.direction === 'desc' ? '↓' : '↑'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((model, index) => (
            <tr key={model.model} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap w-16">
                <div className="flex items-center">
                  {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                  {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                  {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                </div>
              </td>
              <td className="px-4 py-4 w-44 min-w-[11rem] max-w-[11rem] align-middle">
                <div className="text-sm font-semibold text-gray-900 truncate max-w-full" title={model.model}>
                  {model.model}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap w-28">
                <div className="text-sm text-gray-600 truncate max-w-full" title={model.company}>
                  {model.company}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    model.type === 'open-source'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {model.type}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {model.overall.toFixed(1)}%
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {model.geo_trans.toFixed(1)}%
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {model.mech_opt.toFixed(1)}%
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {model.algorithm.toFixed(1)}%
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {model.routing.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;

