import React from 'react';
import Chart from 'react-apexcharts';

function WeightChart ({activePetWeight}) {
  const options = {
    chart: {
      width: '100%',
      type: 'area',
      animations: {
        initialAnimation: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Weight',
        data: activePetWeight,
        color: '#F8938E',
      },
    ],
    xaxis: {
      type: 'datetime',
    },
  }

  return (
    <Chart
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
      }}
      options={options}
      series={[
        {
          name: 'Weight',
          data: activePetWeight,
          color: '#F8938E',
        },
      ]}
      type="area"
    />
  );
}

export default WeightChart;
