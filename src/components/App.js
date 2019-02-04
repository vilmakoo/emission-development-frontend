import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Result from './Result';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>CO²-emissions</h1>
        <SearchBar />
        <Result />
      </div>
    );
  }
}

export default App;