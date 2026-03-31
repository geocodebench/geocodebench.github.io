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

  // Failure-case distribution (Figure-style, normalized to 100%)
  // Source: failurecase.csv
  const failureCaseDistribution = [
    { model: 'Claude-Sonnet-4.5', shape: 14, syntax: 9, import: 5, type: 18, functional: 55 },
    { model: 'DeepSeek-R1', shape: 14, syntax: 9, import: 9, type: 18, functional: 50 },
    { model: 'Doubao-Seed-1.6', shape: 32, syntax: 9, import: 18, type: 5, functional: 36 },
    { model: 'Gemini-2.5-Pro', shape: 18, syntax: 14, import: 5, type: 18, functional: 45 },
    { model: 'GPT-5', shape: 14, syntax: 9, import: 14, type: 9, functional: 55 },
    { model: 'Kimi-K2-Instruct', shape: 14, syntax: 18, import: 5, type: 9, functional: 55 },
    { model: 'Llama-3.1-405B-Inst.', shape: 14, syntax: 14, import: 14, type: 27, functional: 32 },
    { model: 'Qwen3-Coder-480B', shape: 18, syntax: 9, import: 5, type: 27, functional: 41 },
  ];

  const overallModelComparison = [
    {
      model: 'GPT-5',
      company: 'OpenAI',
      overall: '36.6%',
      general: '42.8%',
      research: '29.1%',
      geoTrans: '41.7%',
      mechOpt: '43.7%',
      algorithm: '29.1%',
      routing: '28.9%',
    },
    {
      model: 'Claude-Sonnet-4.5',
      company: 'Anthropic',
      overall: '31.1%',
      general: '37.2%',
      research: '23.7%',
      geoTrans: '38.3%',
      mechOpt: '36.5%',
      algorithm: '19.7%',
      routing: '35.9%',
    },
    {
      model: 'Gemini-2.5-Pro',
      company: 'Google',
      overall: '30.4%',
      general: '33.8%',
      research: '26.2%',
      geoTrans: '41.9%',
      mechOpt: '27.6%',
      algorithm: '25.3%',
      routing: '29.1%',
    },
    {
      model: 'Kimi-K2-Instruct',
      company: 'Moonshot',
      overall: '30.4%',
      general: '34.6%',
      research: '25.1%',
      geoTrans: '36.7%',
      mechOpt: '33.1%',
      algorithm: '23.1%',
      routing: '31.4%',
    },
    {
      model: 'Doubao-Seed-1.6',
      company: 'ByteDance',
      overall: '26.9%',
      general: '29.7%',
      research: '23.4%',
      geoTrans: '40.9%',
      mechOpt: '21.0%',
      algorithm: '22.9%',
      routing: '25.2%',
    },
    {
      model: 'Qwen3-Coder-480B',
      company: 'Alibaba',
      overall: '23.5%',
      general: '22.7%',
      research: '24.6%',
      geoTrans: '29.0%',
      mechOpt: '17.7%',
      algorithm: '21.8%',
      routing: '33.2%',
    },
    {
      model: 'DeepSeek-R1',
      company: 'DeepSeek',
      overall: '21.0%',
      general: '27.2%',
      research: '13.5%',
      geoTrans: '33.9%',
      mechOpt: '21.9%',
      algorithm: '12.4%',
      routing: '17.0%',
    },
    {
      model: 'Llama-3.1-405B-Instruct',
      company: 'Meta',
      overall: '14.3%',
      general: '16.8%',
      research: '11.3%',
      geoTrans: '21.3%',
      mechOpt: '13.2%',
      algorithm: '10.9%',
      routing: '12.7%',
    },
  ];

  // Impact of paper length (relative to baseline: w/o paper input)
  // Source: paperlength.csv
  const paperLengthImpact = [
    { model: 'Gemini-2.5-Pro', introMethod: 3.0, fullPaper: -3.8 },
    { model: 'DeepSeek R1', introMethod: 1.6, fullPaper: -7.1 },
    { model: 'Claude-Sonnet-4.5', introMethod: 1.4, fullPaper: -0.9 },
    { model: 'Llama-3.1-405B-Instruct', introMethod: 1.2, fullPaper: -1.1 },
    { model: 'Kimi-K2-Instruct', introMethod: -0.2, fullPaper: 0.3 },
    { model: 'GPT-5', introMethod: -0.2, fullPaper: 0.9 },
    { model: 'Doubao-Seed-1.6', introMethod: -0.2, fullPaper: 1.0 },
    { model: 'Qwen3-Coder-480B', introMethod: -2.6, fullPaper: 1.4 },
  ];

  const PAPERLEN_MAX_ABS = 8; // match figure scale (-8% .. +4% with some headroom)
  const paperLenToStyle = (v) => {
    const clamped = Math.max(-PAPERLEN_MAX_ABS, Math.min(PAPERLEN_MAX_ABS, v));
    const half = 50; // baseline at center
    const pct = (Math.abs(clamped) / PAPERLEN_MAX_ABS) * 50;
    if (clamped >= 0) return { left: `${half}%`, width: `${pct}%` };
    return { left: `${half - pct}%`, width: `${pct}%` };
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Analysis</h1>
        <p className="text-lg text-gray-600">
          Deep dive into model capabilities and error patterns
        </p>
      </div>

      {/* Analysis Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <a href="#overall-model-comparison" className="bg-white rounded-lg shadow-md p-6 block transition hover:shadow-lg">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-lg font-semibold mb-2">Overall Model Comparison</h3>
          <p className="text-sm text-gray-600">
            Compare model performance across benchmark dimensions and pass rates
          </p>
        </a>
        <a href="#general-vs-research-capability" className="bg-white rounded-lg shadow-md p-6 block transition hover:shadow-lg">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-semibold mb-2">General vs. Research Capability</h3>
          <p className="text-sm text-gray-600">
            Analyze correlation between general 3D coding skills and research-level tasks
          </p>
        </a>
        <a href="#impact-of-paper-length" className="bg-white rounded-lg shadow-md p-6 block transition hover:shadow-lg">
          <div className="text-3xl mb-2">📄</div>
          <h3 className="text-lg font-semibold mb-2">Impact of Paper Length</h3>
          <p className="text-sm text-gray-600">
            Evaluate how context length and section selection affect generation quality
          </p>
        </a>
        <a href="#failure-case-analysis" className="bg-white rounded-lg shadow-md p-6 block transition hover:shadow-lg">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Failure Case Analysis</h3>
          <p className="text-sm text-gray-600">
            Break down common failure patterns and difficult reasoning bottlenecks
          </p>
        </a>
      </div>

      {/* Overall model comparison table */}
      <div id="overall-model-comparison" className="bg-white rounded-lg shadow-md p-6 mb-8 scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Overall Model Comparison</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Performance is assessed across two
            aspects: General 3D Capability (General) and Research Capability (Research), four dimensions:
            Geometric Transformations (Geo. Trans.), Mechanics/Optics Formulation (Mech./Opt.), Novel
            Algorithm Implementation (Algorithm), and Geometric Logic Routing (Routing).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead>
              <tr>
                <th rowSpan="2" className="px-3 py-2 border-b border-gray-200 bg-gray-50 font-semibold">Model</th>
                <th rowSpan="2" className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-gray-50 font-semibold">Company</th>
                <th rowSpan="2" className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-blue-50 font-semibold text-center">Overall</th>
                <th rowSpan="2" className="px-3 py-2 border-b border-gray-200 bg-blue-50 font-semibold text-center">General</th>
                <th rowSpan="2" className="px-3 py-2 border-b border-gray-200 bg-blue-50 font-semibold text-center">Research</th>
                <th colSpan="2" className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-emerald-50 font-semibold text-center">
                  General 3D Capability
                </th>
                <th colSpan="2" className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-amber-50 font-semibold text-center">
                  Research Capability
                </th>
              </tr>
              <tr>
                <th className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-emerald-50 font-semibold text-center">Geo. Trans.</th>
                <th className="px-3 py-2 border-b border-gray-200 bg-emerald-50 font-semibold text-center">Mech./Opt.</th>
                <th className="px-3 py-2 border-b border-gray-200 border-l-2 border-l-gray-300 bg-amber-50 font-semibold text-center">Algorithm</th>
                <th className="px-3 py-2 border-b border-gray-200 bg-amber-50 font-semibold text-center">Routing</th>
              </tr>
            </thead>
            <tbody>
              {overallModelComparison.map((row, idx) => (
                <tr key={row.model} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-3 py-2 border-b border-gray-100 font-medium">{row.model}</td>
                  <td className="px-3 py-2 border-b border-gray-100 border-l-2 border-l-gray-200">{row.company}</td>
                  <td className="px-3 py-2 border-b border-gray-100 border-l-2 border-l-gray-200 bg-blue-50/40 text-center">{row.overall}</td>
                  <td className="px-3 py-2 border-b border-gray-100 bg-blue-50/40 text-center">{row.general}</td>
                  <td className="px-3 py-2 border-b border-gray-100 bg-blue-50/40 text-center">{row.research}</td>
                  <td className="px-3 py-2 border-b border-gray-100 border-l-2 border-l-gray-200 bg-emerald-50/40 text-center">{row.geoTrans}</td>
                  <td className="px-3 py-2 border-b border-gray-100 bg-emerald-50/40 text-center">{row.mechOpt}</td>
                  <td className="px-3 py-2 border-b border-gray-100 border-l-2 border-l-gray-200 bg-amber-50/40 text-center">{row.algorithm}</td>
                  <td className="px-3 py-2 border-b border-gray-100 bg-amber-50/40 text-center">{row.routing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scatter Plot */}
      <div id="general-vs-research-capability" className="bg-white rounded-lg shadow-md p-6 mb-8 scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">General vs. Research Capability</h2>
          <p className="text-sm text-gray-600">
            Pearson correlation between general and research capabilities
          </p>
        </div>
        <ScatterPlot data={overallModelComparison} />
        <div className="mt-4 text-sm text-gray-500 italic">
          Note: Data points are plotted from the General and Research columns in Overall Model Comparison.
        </div>
      </div>

      {/* Impact of paper length */}
      <div id="impact-of-paper-length" className="bg-white rounded-lg shadow-md p-6 mb-8 scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Impact of Paper Length</h2>
          <p className="text-sm text-gray-600">
            Evaluate how context length and section selection affect generation quality
          </p>
        </div>
        <div className="space-y-5">
          <p className="text-gray-600 leading-relaxed">
            We report the <span className="font-medium">relative change in pass rate</span> compared to the baseline
            (<span className="font-medium">w/o paper input</span>) under two prompting settings:
            <span className="font-medium"> Given Introduction ~ Method Sections</span> and <span className="font-medium">Given Full Paper</span>.
          </p>

          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500" />
                <span>Introduction ~ Method</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-sky-500" />
                <span>Full Paper</span>
              </div>
              <div className="ml-auto text-xs text-gray-500">Baseline: w/o paper input</div>
            </div>

            <div className="mb-2 grid grid-cols-[10rem_1fr] gap-x-4 gap-y-3">
              <div className="text-xs text-gray-500">Model</div>
              <div className="relative text-xs text-gray-500">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                <div className="absolute left-[12.5%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="absolute left-[25%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="absolute left-[37.5%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="absolute left-[62.5%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="absolute left-[75%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="absolute left-[87.5%] top-0 bottom-0 w-px bg-gray-200" />
                <div className="flex justify-between">
                  <span>-8%</span>
                  <span>-6%</span>
                  <span>-4%</span>
                  <span>-2%</span>
                  <span>0%</span>
                  <span>+2%</span>
                  <span>+4%</span>
                </div>
              </div>

              {paperLengthImpact.map((row) => (
                <div key={row.model} className="contents">
                  <div className="truncate text-sm font-medium text-gray-900">{row.model}</div>
                  <div className="relative h-9">
                    <div className="absolute inset-0">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                      <div className="absolute left-[12.5%] top-0 bottom-0 w-px bg-gray-200" />
                      <div className="absolute left-[25%] top-0 bottom-0 w-px bg-gray-200" />
                      <div className="absolute left-[37.5%] top-0 bottom-0 w-px bg-gray-200" />
                      <div className="absolute left-[62.5%] top-0 bottom-0 w-px bg-gray-200" />
                      <div className="absolute left-[75%] top-0 bottom-0 w-px bg-gray-200" />
                      <div className="absolute left-[87.5%] top-0 bottom-0 w-px bg-gray-200" />
                    </div>

                    <div className="absolute left-0 right-0 top-1 flex items-center">
                      <div
                        className="absolute h-3 rounded-sm bg-sky-500/90"
                        style={paperLenToStyle(row.fullPaper)}
                        title={`Full Paper: ${row.fullPaper > 0 ? '+' : ''}${row.fullPaper.toFixed(1)}%`}
                      />
                    </div>
                    <div className="absolute left-0 right-0 bottom-1 flex items-center">
                      <div
                        className="absolute h-3 rounded-sm bg-amber-500/90"
                        style={paperLenToStyle(row.introMethod)}
                        title={`Introduction ~ Method: ${row.introMethod > 0 ? '+' : ''}${row.introMethod.toFixed(1)}%`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Values are relative deltas vs. baseline (w/o paper input). Positive means improved pass rate; negative means worse.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold text-gray-500 mb-1">Largest gain</div>
              <div className="font-medium text-gray-900">+3.0% (Gemini-2.5-Pro)</div>
              <div className="text-gray-600 mt-1">Introduction ~ Method</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold text-gray-500 mb-1">Largest drop</div>
              <div className="font-medium text-gray-900">-7.1% (DeepSeek R1)</div>
              <div className="text-gray-600 mt-1">Full Paper</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs font-semibold text-gray-500 mb-1">Overall takeaway</div>
              <div className="font-medium text-gray-900">Shorter context is safer</div>
              <div className="text-gray-600 mt-1">
                "More paper text" is not always better.
              </div>
            </div>
          </div>

        
        </div>
      </div>

      {/* Failure analysis */}
      <div id="failure-case-analysis" className="bg-white rounded-lg shadow-md p-6 mb-8 scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Failure Case Analysis</h2>
          <p className="text-sm text-gray-600">
            Distribution of common failure types across models (normalized to 100%)
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-teal-700" />
              <span>Shape Error</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-500" />
              <span>Syntax Error</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-700" />
              <span>Import Error</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-sky-500" />
              <span>Type Error</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-fuchsia-700" />
              <span>Functional Error</span>
            </div>
          </div>

          <div className="grid grid-cols-[12rem_1fr] gap-x-4 gap-y-3">
            <div className="text-xs text-gray-500">Model</div>
            <div className="relative text-xs text-gray-500">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-gray-200"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
              <div className="flex justify-between">
                <span>0%</span>
                <span>10%</span>
                <span>20%</span>
                <span>30%</span>
                <span>40%</span>
                <span>50%</span>
                <span>60%</span>
                <span>70%</span>
                <span>80%</span>
                <span>90%</span>
                <span>100%</span>
              </div>
            </div>

            {failureCaseDistribution.map((row) => (
              <div key={row.model} className="contents">
                <div className="truncate text-sm font-medium text-gray-900">{row.model}</div>
                <div className="relative h-8">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-gray-200"
                      style={{ left: `${i * 10}%` }}
                    />
                  ))}
                  <div className="absolute inset-y-1 left-0 right-0 flex overflow-hidden rounded-md border border-gray-200 bg-white">
                    <div
                      className="h-full bg-teal-700"
                      style={{ width: `${row.shape}%` }}
                      title={`Shape Error: ${row.shape}%`}
                    />
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${row.syntax}%` }}
                      title={`Syntax Error: ${row.syntax}%`}
                    />
                    <div
                      className="h-full bg-green-700"
                      style={{ width: `${row.import}%` }}
                      title={`Import Error: ${row.import}%`}
                    />
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${row.type}%` }}
                      title={`Type Error: ${row.type}%`}
                    />
                    <div
                      className="h-full bg-fuchsia-700"
                      style={{ width: `${row.functional}%` }}
                      title={`Functional Error: ${row.functional}%`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed findings */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="relative p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Key Findings</h2>
              <p className="text-sm text-gray-600 mt-1">
                Summary of the most consistent patterns observed in GeoCodeBench.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Large headroom remains</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Best LLM (GPT-5) leads overall (36.6%) yet achieves only around one-third of the ideal score,
                    revealing a substantial gap between 3D understanding and executable implementation across all models.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Creative correctness exists</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    LLMs can achieve Creative Correctness in 3D geometry tasks, successfully implementing distinct
                    but mathematically equivalent code paths for the same problem.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Knowing vs. implementing gap</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    LLMs show relatively stronger general 3D understanding than research-level capability, and a clear
                    gap between knowing and implementing 3D geometry.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fuchsia-50 text-fuchsia-700 font-semibold">
                  4
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">More context isn’t always better</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Providing more text does not guarantee better understanding—most LLMs perform best with concise,
                    method-focused inputs, revealing limited long-context comprehension.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

