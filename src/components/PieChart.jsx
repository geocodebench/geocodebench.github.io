import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        width: '90%',
        align: 'auto',
        itemGap: 12,
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{b}: {d}%',
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
  }, [data, title]);

  return <div ref={chartRef} className="w-full h-96" />;
};

export default PieChart;

