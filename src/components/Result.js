import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

class Result extends Component {
  render() {
    const options = {
      theme: {
        palette: 'palette1'
      },
      yaxis: [
        {
          min: 0,
          max: this.props.data ? this.props.data.map(d => d.emissions).reduce((a, b) => Math.max(a,b), 0) + 50000 : 1000,
          seriesName: 'CO²-Emissions',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              color: '#008FFB',
            }
          },
          title: {
            text: 'CO²-emissions (kt)',
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          min: 0,
          max: (this.props.data && this.props.data.map(d => d.population)) ? this.props.data.map(d => d.population).reduce((a, b) => Math.max(a,b), 0) + 1000000 : 1000,
          seriesName: 'Population',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              color: '#00E396',
            }
          },
          title: {
            text: 'Population',
            style: {
              color: '#00E396',
            }
          },
        },
        {
          seriesName: 'CO²-Emissions',
          min: 0,
          max: (this.props.data && this.props.data.map(d => d.perCapita)) ? this.props.data.map(d => d.perCapita).reduce((a, b) => Math.max(a,b), 0) + 0.005 : 0.1,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019',
          },
          labels: {
            style: {
              color: '#FEB019',
            }
          },
          title: {
            text: 'CO²-emissions Per Capita (kt)',
            style: {
              color: '#FEB019',
            }
          }
        }
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
      name: 'CO²-Emissions',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.emissions)) ? this.props.data.filter(d => d.emissions !== null).map((d) => {
        return {
          x: d.year,
          y: d.emissions
        };
      }) : []
    }, {
      name: 'Population',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.population)) ? this.props.data.filter(d => d.population !== null).map((d) => {
        return {
          x: d.year,
          y: d.population
        };
      }) : []
    }, {
      // TODO: per capita omaan charttiinsa
      name: 'CO²-Emissions Per Capita',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.perCapita))
        ? this.props.data.filter(d => d.perCapita !== null).map((d) => {
          return {
            x: d.year,
            y: d.perCapita
          };
        })
        : []
    }];

    return (
      <div>
        <div className="App">
          <h2>Result</h2>

          {/* näytä alla olevat vain jos on jotain näytettävää eli showResult = true */}
          {/* näytä joku varoitushässäkkä jos country on NOT FOUND */}
          <div id="country"><b>Country: {this.props.country}</b></div>
          <p>Note that the scales of the axes are different.</p>

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
    country: state.search.country,
    data: state.search.data
  };
};

const ConnectedResult = connect(mapStateToProps)(Result);

export default ConnectedResult;