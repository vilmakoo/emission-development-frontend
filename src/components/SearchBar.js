import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { changeSearchTerm, searchCountrysEmissions, togglePopulationCheckBox, toggleCompareCheckBox, searchTopEmitters } from '../state/searchReducer';

class SearchBar extends Component {
  render() {
    const handleSearchTermChange = (event) => {
      this.props.changeSearchTerm(event.target.value);
    };

    const handleIncludePopulationsClick = (event) => {
      this.props.togglePopulationCheckBox();
    };

    const handleCompareClick = (event) => {
      this.props.toggleCompareCheckBox();
    };

    const search = (event) => {
      event.preventDefault();
      this.props.searchCountrysEmissions(this.props.searchTerm, this.props.searchPopulations, this.props.compare);
    };

    const searchTopEmitters = (event) => {
      this.props.searchTopEmitters();
    };

    return (
      <div>
        <form>
          <FormLabel className={'search-title'}>Search</FormLabel>

          <p>Search for a country to see how its CO² emissions have developed during the years</p>

          <Input className={'search-input'} type='input' onChange={handleSearchTermChange} placeholder='Search' value={this.props.searchTerm} />

          <div className={'checkboxes'}>
            <FormControlLabel control={
              <Checkbox style={{ fontSize: '20px' }} className={'search-checkbox'} checked={this.props.searchPopulations} onChange={handleIncludePopulationsClick} />
            }
            label='Include populations'
            />

            <FormControlLabel control={
              <Checkbox checked={this.props.compare} onChange={handleCompareClick} />
            }
            label='Compare to the averages of countries with high income'
            />
          </div>

          <Button className={'search-button'} type='submit' variant='outlined' color='primary' size='large' onClick={search}>Search</Button>

          <Button className={'search-button'} variant='outlined' color='secondary' onClick={searchTopEmitters} size='large'>Search for countries with
          largest emissions per capita in 2014</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm,
    searchPopulations: state.search.searchPopulations,
    compare: state.search.compare
  };
};

const mapDispatchToProps = {
  changeSearchTerm,
  searchCountrysEmissions,
  togglePopulationCheckBox,
  toggleCompareCheckBox,
  searchTopEmitters
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default ConnectedSearchBar;