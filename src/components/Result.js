import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Charts from './Charts';

class Result extends Component {
  render() {
    let result;
    if (this.props.data) {
      result = (<Charts />);
    } else if (this.props.topEmitters) {
      result = (<List>
        {this.props.topEmitters.map(c => (<ListItem key={c}>{c}</ListItem>))}
      </List>);
    } else {
      result = (<p>Results will be shown here.</p>);
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