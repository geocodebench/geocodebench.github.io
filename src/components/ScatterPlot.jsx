import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = echarts.init(chartRef.current);

    // Calculate general capability (average of all dimensions)
    // Calculate research capability (simulated - in real scenario this would come from data)
    const scatterData = data.map((model) => {
      const generalCapability = (model.geo_trans + model.mech_opt + model.algorithm + model.routing) / 4;
      // Simulate research capability with some variance
      const researchCapability = generalCapability * (0.8 + Math.random() * 0.4);
      return {
        value: [generalCapability, researchCapability],
        name: model.model,
      };
    });

    const option = {
      title: {
        text: 'General vs Research Capability Correlation',
        left: 'center',
      },
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
        min: 0,
        max: 50,
      },
      yAxis: {
        name: 'Research Capability (%)',
        nameLocation: 'middle',
        nameGap: 40,
        min: 0,
        max: 50,
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 15,
          data: scatterData,
          itemStyle: {
            color: '#2563eb',
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params) => params.data.name.split('-')[0],
            fontSize: 10,
          },
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

