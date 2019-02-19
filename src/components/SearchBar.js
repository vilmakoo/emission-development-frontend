import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSearchTerm, searchCountrysEmissions, togglePopulationCheckBox, toggleCompareCheckBox } from '../state/searchReducer';

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

    return (
      <Form onSubmit={search}>
        <Form.Label className={'search-title'}>Search</Form.Label>
        <p>Search for a country to see how its CO² emissions have developed during the years</p>
        {/* TODO: search with what? laita siis ohjeistus */}
        <Form.Control className={'search-input'} type='input' value={this.props.searchTerm} onChange={handleSearchTermChange} placeholder='Search' />
        <Form.Check className={'search-checkbox'} label={'Include populations'} onChange={handleIncludePopulationsClick} />
        <Form.Check className={'search-checkbox'} label={'Compare to the averages of countries with high income'} onChange={handleCompareClick} />
        <Button className={'search-button'} type='submit'>Search</Button>
      </Form>
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
  toggleCompareCheckBox
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default ConnectedSearchBar;