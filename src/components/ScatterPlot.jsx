import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const toPercentNumber = (value) => {
  if (value === null || value === undefined) return Number.NaN;
  if (typeof value === 'number') return value;
  return Number.parseFloat(String(value).replace('%', '').trim());
};

const computeRegression = (points) => {
  const n = points.length;
  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumXX = points.reduce((acc, p) => acc + p.x * p.x, 0);
  const denominator = n * sumXX - sumX * sumX;

  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

const tCritical95 = (df) => {
  // Two-tailed 95% t critical values for df=1..30 (then ~ normal)
  const table = {
    1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262,
    10: 2.228, 11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110,
    18: 2.101, 19: 2.093, 20: 2.086, 21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060,
    26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042,
  };
  if (df <= 0) return 0;
  if (df >= 30) return 1.96;
  return table[df] ?? 1.96;
};

const computeConfidenceBand95 = (points, regression, xMin, xMax, steps = 60) => {
  const n = points.length;
  const df = n - 2;
  const t = tCritical95(df);

  const xBar = points.reduce((acc, p) => acc + p.x, 0) / n;
  const sxx = points.reduce((acc, p) => acc + (p.x - xBar) ** 2, 0);

  // Residual standard error
  const sse = points.reduce((acc, p) => {
    const yHat = regression.slope * p.x + regression.intercept;
    return acc + (p.y - yHat) ** 2;
  }, 0);
  const mse = df > 0 ? sse / df : 0;
  const s = Math.sqrt(mse);

  const lower = [];
  const upper = [];

  for (let i = 0; i <= steps; i += 1) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const yHat = regression.slope * x + regression.intercept;
    const seMean = sxx === 0 ? 0 : s * Math.sqrt((1 / n) + ((x - xBar) ** 2) / sxx);
    const delta = t * seMean;
    lower.push([x, yHat - delta]);
    upper.push([x, yHat + delta]);
  }

  return { lower, upper };
};

const computePearsonR = (points) => {
  const n = points.length;
  const meanX = points.reduce((acc, p) => acc + p.x, 0) / n;
  const meanY = points.reduce((acc, p) => acc + p.y, 0) / n;

  let numerator = 0;
  let sumXSq = 0;
  let sumYSq = 0;

  points.forEach((p) => {
    const dx = p.x - meanX;
    const dy = p.y - meanY;
    numerator += dx * dy;
    sumXSq += dx * dx;
    sumYSq += dy * dy;
  });

  const denominator = Math.sqrt(sumXSq * sumYSq);
  return denominator === 0 ? 0 : numerator / denominator;
};

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = echarts.init(chartRef.current);

    const points = data
      .map((model) => {
        const general = toPercentNumber(model.general ?? model.general_capability);
        const research = toPercentNumber(model.research ?? model.research_capability);
        return {
          name: model.model,
          x: general,
          y: research,
        };
      })
      .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));

    if (points.length < 2) {
      chart.clear();
      return () => chart.dispose();
    }
    const scatterData = points.map((p) => ({ name: p.name, value: [p.x, p.y] }));

    const minX = Math.min(...points.map((p) => p.x));
    const maxX = Math.max(...points.map((p) => p.x));
    const minY = Math.min(...points.map((p) => p.y));
    const maxY = Math.max(...points.map((p) => p.y));

    const xPadding = 1.8;
    const yPadding = 1.4;
    let axisMinX = Math.floor(minX - xPadding);
    let axisMaxX = Math.ceil(maxX + xPadding);
    let axisMinY = Math.floor(minY - yPadding);
    let axisMaxY = Math.ceil(maxY + yPadding);

    const { slope, intercept } = computeRegression(points);
    const pearsonR = computePearsonR(points);

    const lineStartX = axisMinX;
    const lineEndX = axisMaxX;
    const lineData = [
      [lineStartX, slope * lineStartX + intercept],
      [lineEndX, slope * lineEndX + intercept],
    ];
    const confidenceBand = computeConfidenceBand95(
      points,
      { slope, intercept },
      lineStartX,
      lineEndX,
      70,
    );
    const ciMinY = Math.min(...confidenceBand.lower.map((p) => p[1]));
    const ciMaxY = Math.max(...confidenceBand.upper.map((p) => p[1]));
    axisMinY = Math.floor(Math.min(axisMinY, ciMinY - 0.6));
    axisMaxY = Math.ceil(Math.max(axisMaxY, ciMaxY + 0.6));

    // Reserve extra room for edge labels (especially right/top points).
    axisMaxX += 0.8;
    axisMaxY += 0.4;

    const bandPolygon = [
      ...confidenceBand.lower,
      ...confidenceBand.upper.slice().reverse(),
    ];

    const option = {
      grid: { left: 70, right: 70, top: 24, bottom: 55 },
      graphic: [
        {
          type: 'rect',
          right: 26,
          bottom: 52,
          shape: { width: 138, height: 34 },
          style: {
            fill: 'rgba(255, 255, 255, 0.92)',
            stroke: '#9ca3af',
            lineWidth: 1,
          },
          silent: true,
          z: 100,
        },
        {
          type: 'text',
          right: 40,
          bottom: 61,
          style: {
            text: `Pearson r = ${pearsonR.toFixed(2)}`,
            fill: '#374151',
            font: '400 14px serif',
          },
          silent: true,
          z: 101,
        },
      ],
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.data.name}<br/>General: ${params.data.value[0].toFixed(1)}%<br/>Research: ${params.data.value[1].toFixed(1)}%`;
        },
      },
      xAxis: {
        name: 'General 3D Capability (%)',
        nameLocation: 'middle',
        nameGap: 30,
        min: axisMinX,
        max: axisMaxX,
        splitLine: { show: true, lineStyle: { color: '#d1d5db' } },
      },
      yAxis: {
        name: 'Research Capability (%)',
        nameLocation: 'middle',
        nameGap: 40,
        min: axisMinY,
        max: axisMaxY,
        splitLine: { show: true, lineStyle: { color: '#d1d5db' } },
      },
      series: [
        {
          type: 'custom',
          coordinateSystem: 'cartesian2d',
          data: [0],
          silent: true,
          z: 1,
          renderItem: (params, api) => {
            const polygonPoints = bandPolygon.map((point) => api.coord(point));
            return {
              type: 'polygon',
              shape: { points: polygonPoints },
              style: {
                fill: 'rgba(59, 130, 246, 0.14)',
              },
            };
          },
        },
        {
          type: 'line',
          data: lineData,
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#1d4ed8',
          },
          silent: true,
          z: 2,
        },
        {
          type: 'scatter',
          symbolSize: 12,
          data: scatterData,
          itemStyle: {
            color: '#2563eb',
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params) => params.data.name,
            fontSize: 11,
            color: '#1f2937',
          },
          z: 3,
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-96" />;
};

export default ScatterPlot;

