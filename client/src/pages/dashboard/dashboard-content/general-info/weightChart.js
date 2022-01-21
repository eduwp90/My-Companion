import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export class WeightChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
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
            data: props.activePet,
            color: '#F8938E',
          },
        ],
        xaxis: {
          type: 'datetime',
        },
      },
    };
  }

  render() {
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
        options={this.state.options}
        series={[
          {
            name: 'Weight',
            data: this.props.activePet,
            color: '#F8938E',
          },
        ]}
        type="area"
      />
    );
  }
}

export default WeightChart;
