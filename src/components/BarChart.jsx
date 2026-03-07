import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = echarts.init(chartRef.current);

    const models = data.map(m => m.model);
    const dimensions = ['geo_trans', 'mech_opt', 'algorithm', 'routing'];
    const dimensionLabels = ['Geo Transform', 'Mech/Optics', 'Algorithm', 'Routing'];

    const series = dimensions.map((dim, index) => ({
      name: dimensionLabels[index],
      type: 'bar',
      data: data.map(m => m[dim]),
    }));

    const option = {
      title: {
        text: 'Performance by Dimension',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        bottom: 10,
        data: dimensionLabels,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: models,
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Pass Rate (%)',
      },
      series: series,
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

export default BarChart;

