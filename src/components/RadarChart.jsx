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
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 10,
        data: models.map(m => m.model),
      },
      radar: {
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

  return <div ref={chartRef} className="w-full h-96" />;
};

export default RadarChart;

