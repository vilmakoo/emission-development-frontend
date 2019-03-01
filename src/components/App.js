import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import Result from './Result';
import Notification from './Notification';
import Info from './Info';
import { updateDatabase } from '../state/databaseReducer';

class App extends Component {
  render() {
    const handleUpdateDatabaseButtonClick = async (event) => {
      this.props.updateDatabase();
    };

    return (
      <div className='container'>
        <Info />
        <div className='rest'>
          <Notification />
          <h1>CO²-emissions</h1>
          <SearchBar />
          <Button className={'search-button'} variant='outlined' size='large' onClick={handleUpdateDatabaseButtonClick}>Update database</Button>
          <Result />
        </div>
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