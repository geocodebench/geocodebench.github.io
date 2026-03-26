import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DIMENSION_LABELS = {
  overall: 'Overall',
  geo_trans: 'Geometric Transformations',
  mech_opt: 'Mechanics/Optics',
  algorithm: 'Novel Algorithm',
  routing: 'Geometric Routing',
};

const LeaderboardBarChart = ({ data, dimension, onModelClick }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    const chart = echarts.init(chartRef.current);

    // Sort by selected dimension descending (rank order)
    const sorted = [...data].sort((a, b) => (b[dimension] ?? 0) - (a[dimension] ?? 0));
    const models = sorted.map((m) => m.model);
    const values = sorted.map((m) => Number((m[dimension] ?? 0).toFixed(1)));

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const p = params[0];
          const idx = p.dataIndex;
          const model = sorted[idx];
          return `<strong>${model.model}</strong><br/>${model.company}<br/>${DIMENSION_LABELS[dimension]}: <strong>${model[dimension].toFixed(1)}%</strong>`;
        },
      },
      grid: {
        left: '22%',
        right: '12%',
        top: 24,
        bottom: 24,
        containLabel: false,
      },
      xAxis: {
        type: 'value',
        name: 'Pass Rate (%)',
        min: 0,
        max: 100,
        axisLabel: { formatter: '{value}%' },
        splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
      },
      yAxis: {
        type: 'category',
        data: models,
        axisLabel: {
          width: 160,
          overflow: 'truncate',
          ellipsis: '...',
        },
        axisTick: { show: false },
        axisLine: { show: false },
        inverse: true,
      },
      series: [
        {
          type: 'bar',
          data: values,
          barMaxWidth: 28,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#8b5cf6' },
            ]),
            borderRadius: [0, 4, 4, 0],
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#2563eb' },
                { offset: 1, color: '#7c3aed' },
              ]),
            },
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}%',
            fontWeight: 600,
            color: '#374151',
          },
        },
      ],
    };

    chart.setOption(option);

    if (onModelClick) {
      chart.off('click');
      chart.on('click', (params) => {
        if (params.componentType === 'series' && params.dataIndex != null) {
          onModelClick(sorted[params.dataIndex]);
        }
      });
    }

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, dimension, onModelClick]);

  return (
    <div className="w-full">
      <div ref={chartRef} className="w-full h-[420px]" />
    </div>
  );
};

export default LeaderboardBarChart;
