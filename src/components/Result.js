import React, { Component } from 'react';
import LineChart from 'react-linechart';
import { connect } from 'react-redux';
import '../../node_modules/react-linechart/dist/styles.css';

class Result extends Component {
  render() {
    const data = [
      {
        color: 'steelblue',
        points: this.props.emissions ? this.props.emissions.filter(e => e.year !== null && e.emissions !== null).map((e) => {
          return {
            x: e.year,
            y: e.emissions
          };
        }) : []
      }
    ];

    if (data[0].points.length === 0) {
      return null;
    }

    const hovered = (obj) =>  `Year: ${obj.x}<br /> CO2 emissions: ${obj.y}`;

    return (
      <div>
        <div className="App">
          <h2>Result</h2>
          <p>The x-axis indicates the <b>Year</b> and the y-axis indicates the <b>CO2 emissions (kt)</b>.</p>


          <LineChart
            width={1000}
            height={600}
            margins={{ top: 20, right: 20, bottom: 20, left: 50 }}
            data={data}
            hideXLabel={true}
            hideYLabel={true}
            onPointHover={hovered}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emissions: state.search.emissions,
  };
};

const ConnectedResult = connect(mapStateToProps)(Result);

export default ConnectedResult;