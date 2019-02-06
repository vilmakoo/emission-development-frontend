import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSearchTerm, searchCountrysEmissions } from '../state/searchReducer';

class SearchBar extends Component {
  render() {
    const handleSearchTermChange = (event) => {
      this.props.changeSearchTerm(event.target.value);
    };

    const search = (event) => {
      event.preventDefault();
      this.props.searchCountrysEmissions(this.props.searchTerm);
    };

    return (
      <Form onSubmit={search}>
        <Form.Label>Search</Form.Label>
        <Form.Control type='input' value={this.props.searchTerm} onChange={handleSearchTermChange} placeholder='Search' />
        <Button type='submit'>Search</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm,
  };
};

const mapDispatchToProps = {
  changeSearchTerm,
  searchCountrysEmissions
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default ConnectedSearchBar;