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
        <h1 className='title'>CO²-emissions</h1>
        <div className='application'>
          <Info />
          <div>
            <Notification />
            <SearchBar />
            <Button className={'button'} variant='outlined' size='large' onClick={handleUpdateDatabaseButtonClick}>Update database</Button>
            <Result />
          </div>
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