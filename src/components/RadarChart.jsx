import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RadarChart = ({ models }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !models || models.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Model Capability Comparison',
        left: 'center',
        top: 12,
        textStyle: {
          fontSize: 18,
          fontWeight: 700,
          color: '#111827',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 12,
        data: models.map(m => m.model),
        textStyle: {
          color: '#374151',
          fontSize: 13,
        },
      },
      radar: {
        center: ['50%', '54%'],
        radius: '58%',
        nameGap: 12,
        axisName: {
          color: '#111827',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 18,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          padding: [2, 6],
        },
        indicator: [
          { name: 'Geometric\nTransformations', max: 50 },
          { name: 'Mechanics/\nOptics', max: 50 },
          { name: 'Novel\nAlgorithm', max: 50 },
          { name: 'Geometric\nRouting', max: 50 },
        ],
      },
      series: [
        {
          type: 'radar',
          data: models.map((model) => ({
            value: [
              model.geo_trans,
              model.mech_opt,
              model.algorithm,
              model.routing,
            ],
            name: model.model,
          })),
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
  }, [models]);

  return <div ref={chartRef} className="w-full h-[30rem]" />;
};

export default RadarChart;

