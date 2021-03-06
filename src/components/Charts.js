import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { toggleShowChart } from '../state/chartReducer';

class Charts extends Component {
  render() {
    const options = (title, yaxis) => {
      return {
        theme: {
          palette: 'palette6'
        },
        title: {
          text: title,
          align: 'center',
          margin: 20,
          style: {
            fontSize:  '20px',
            color:  '#EA3546'
          },
        },
        yaxis: yaxis,
        xaxis: {
          labels: {
            rotateAlways: true
          },
          max: 2014
        },
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
          position: 'top',
          horizontalAlign: 'right',
          offsetX: 40,
          showForNullSeries: false,
        }
      };
    };

    const countMax = (averages, data, add) => {
      const maxOfAverages = averages.reduce((a, b) => Math.max(a, b), 0);
      const maxOfData = data.reduce((a, b) => Math.max(a, b), 0);
      return Math.max(maxOfAverages, maxOfData) + add;
    };

    const emissionsOptions = options('Development of CO²-emissions', [{
      min: 0,
      max: this.props.data ? countMax(
        this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.map(a => a.emissionsAverage) : [],
        this.props.data.map(d => d.emissions),
        5000
      ) : 1000,
      seriesName: 'CO²-emissions',
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#662E9B',
      },
      labels: {
        style: {
          color: '#662E9B',
        }
      },
      title: {
        text: 'CO²-emissions (kt)',
        style: {
          color: '#662E9B',
        }
      },
      tooltip: {
        enabled: true
      }
    }]
    );

    const populationsOptions = options('Development of Populations', [{
      min: 0,
      max: (this.props.data && this.props.data.map(d => d.population)) ? countMax(
        this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.map(a => a.populationAverage) : [],
        this.props.data.map(d => d.population),
        1000000
      ) : 1000,
      seriesName: 'Population',
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#662E9B'
      },
      labels: {
        style: {
          color: '#662E9B',
        }
      },
      title: {
        text: 'Population',
        style: {
          color: '#662E9B',
        }
      },
      tooltip: {
        enabled: true
      }
    }]
    );

    const perCapitaOptions = options('Development of CO²-emissions per Capita', [
      {
        seriesName: 'CO²-emissions Per Capita',
        min: 0,
        max: (this.props.data && this.props.data.map(d => d.perCapita)) ? countMax(
          this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.map(a => a.perCapitaAverage * 1000000) : [],
          this.props.data.map(d => d.perCapita * 1000000),
          1000
        ) : 1000,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#662E9B',
        },
        labels: {
          style: {
            color: '#662E9B',
          }
        },
        title: {
          text: 'CO²-emissions Per Capita (kg)',
          style: {
            color: '#662E9B',
          }
        },
        tooltip: {
          enabled: true
        }
      }]
    );

    const seriesEmissions = [{
      name: this.props.country ? `${this.props.country}` : 'Searched country',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.emissions)) ? this.props.data.filter(d => d.emissions !== null).map((d) => {
        return {
          x: d.year,
          y: d.emissions
        };
      }) : []
    },
    {
      name: 'Average of countries with high income',
      type: 'line',
      data: this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.filter(a => a.year && a.emissionsAverage !== 0).map(a => {
        return {
          x: a.year,
          y: a.emissionsAverage
        };
      }) : []
    }];

    const seriesPopulations = [{
      name: this.props.country ? `${this.props.country}` : 'Searched country',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.population))
        ? this.props.data.filter(d => d.population !== null).map((d) => {
          return {
            x: d.year,
            y: d.population
          };
        }) : []
    },
    {
      name: 'Average of countries with high income',
      type: 'line',
      data: this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.filter(a => a.year && a.populationAverage !== 0).map(a => {
        return {
          x: a.year,
          y: a.populationAverage
        };
      }) : []
    }];

    const seriesPerCapita = [{
      name: this.props.country ? `${this.props.country}` : 'Searched country',
      type: 'line',
      data: (this.props.data && this.props.data.map(d => d.perCapita))
        ? this.props.data.filter(d => d.perCapita !== null).map((d) => {
          return {
            x: d.year,
            y: d.perCapita * 1000000
          };
        })
        : []
    },
    {
      name: 'Average of countries with high income',
      type: 'line',
      data: this.props.highIncomeAverages ? this.props.highIncomeAverages.averages.filter(a => a.year && a.perCapitaAverage && a.perCapitaAverage !== 0).map(a => {
        return {
          x: a.year,
          y: a.perCapitaAverage * 1000000
        };
      }) : []
    }];

    const handleButtonClick = (chart) => () => {
      this.props.toggleShowChart(chart);
    };

    let emissionChart = null;
    if (this.props.showEmissionDevelopment) {
      emissionChart = (
        <div id="emissions-chart" className='chart'>
          <Chart options={emissionsOptions} series={seriesEmissions} type="line" width="700" />
        </div>
      );
    }

    let populationChart = null;
    if (this.props.showPopulationDevelopment) {
      populationChart = (
        <div id="populations-chart" className='chart'>
          <Chart options={populationsOptions} series={seriesPopulations} type="line" width="700" />
        </div>
      );
    }

    let perCapitaChart = null;
    if (this.props.showPerCapitaDevelopment) {
      perCapitaChart = (
        <div id="emissions-per-capita" className='chart'>
          <Chart options={perCapitaOptions} series={seriesPerCapita} type="line" width="700" />
        </div>
      );
    }

    return (
      <div>
        <div className="App">
          <div id="country"><b>Country: {this.props.country}</b></div>

          <Button className='button' variant='outlined' color='primary' onClick={handleButtonClick('emissions')}>Show emission development</Button>
          {emissionChart}

          <Button className='button' variant='outlined' color='primary' onClick={handleButtonClick('populations')}>Show population development</Button>
          {populationChart}

          <Button className='button' variant='outlined' color='primary' onClick={handleButtonClick('perCapita')}>Show emissions development per capita</Button>
          {perCapitaChart}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: state.search.country,
    data: state.search.data,
    highIncomeAverages: state.search.highIncomeAverages,
    showEmissionDevelopment: state.charts.showEmissionDevelopment,
    showPopulationDevelopment: state.charts.showPopulationDevelopment,
    showPerCapitaDevelopment: state.charts.showPerCapitaDevelopment
  };
};

const mapDispatchToProps = {
  toggleShowChart
};

const ConnectedCharts = connect(mapStateToProps, mapDispatchToProps)(Charts);

export default ConnectedCharts;