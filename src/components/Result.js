import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Charts from './Charts';

class Result extends Component {
  render() {
    let result;
    if (this.props.data) {
      result = (<Charts />);
    } else if (this.props.topEmitters) {
      result = (<ListGroup>
        {this.props.topEmitters.map(c => (<ListGroup.Item key={c}>{c}</ListGroup.Item>))}
      </ListGroup>);
    }

    return (
      <div>
        <div>
          <h2>Results</h2>

          {result}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.search.data,
    topEmitters: state.search.topEmitters
  };
};

const ConnectedResult = connect(mapStateToProps)(Result);

export default ConnectedResult;