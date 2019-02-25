import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import Result from './Result';
import Notification from './Notification';
import { updateDatabase } from '../state/databaseReducer';

class App extends Component {
  render() {
    const handleUpdateDatabaseButtonClick = async (event) => {
      this.props.updateDatabase();
    };

    return (
      <div className='container'>
        <Notification />
        <h1>CO²-emissions</h1>
        <SearchBar />
        <Button variant="warning" onClick={handleUpdateDatabaseButtonClick}>Update database</Button>
        <Result />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatingDatabase: state.database.updatingDatabase
  };
};

const mapDispatchToProps = {
  updateDatabase,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;