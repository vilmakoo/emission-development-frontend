import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

class Result extends Component {
  render() {
    const options = {
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      theme: {
        palette: 'palette5'
      },
      yaxis: [
        {
          min: 0,
          max: this.props.emissions ? this.props.emissions.map(e => e.value).reduce((a, b) => Math.max(a,b)) + 50000 : 1000,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#2B908F',
          },
          labels: {
            style: {
              color: '#2B908F',
            }
          },
          title: {
            text: 'CO²-emissions',
            style: {
              color: '#2B908F',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          min: 0,
          max: this.props.populations ? this.props.populations.map(p => p.value).reduce((a, b) => Math.max(a,b)) + 1000000 : 1000,
          seriesName: 'Emissions',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#F9A3A4'
          },
          labels: {
            style: {
              color: '#F9A3A4',
            }
          },
          title: {
            text: 'Population',
            style: {
              color: '#F9A3A4',
            }
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
        x: { formatter: (seriesName) => 'Year: ' + seriesName }
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    };

    const series = [{
      name: 'Emissions',
      type: 'line',
      data: this.props.emissions ? this.props.emissions.filter(e => e.year !== null && e.value !== null).map((e) => {
        return {
          x: e.year,
          y: e.value
        };
      }) : []
    }, {
      name: 'Population',
      type: 'line',
      data: this.props.populations ? this.props.populations.filter(p => p.year !== null && p.value !== null).map((p) => {
        return {
          x: p.year,
          y: p.value
        };
      }) : []
    }];

    return (
      <div>
        <div className="App">
          <h2>Result</h2>

          {/* näytä alla olevat vain jos on jotain näytettävää eli showResult = true */}
          {/* näytä joku varoitushässäkkä jos country on NOT FOUND */}
          <div id="country"><b>Country: {this.props.country}</b></div>

          <div id="chart">
            <Chart options={options} series={series} type="line" height="800px" width="1000px" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emissions: state.search.emissions,
    country: state.search.country,
    populations: state.search.populations
  };
};

const ConnectedResult = connect(mapStateToProps)(Result);

export default ConnectedResult;