import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ data }) => {
  const [converted] = useState({});

  for (const itm of data) {
    if (itm.language) {
      converted[itm.language] = (converted[itm.language] || 0) + 1;
    }
  }

  let categories = Object.keys(converted);
  let newdata = Object.values(converted);

  const chartData = {
    series: [
      {
        data: newdata,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories,
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={200}
      />
    </div>
  );
};

export default BarChart;
