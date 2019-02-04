import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSearchTerm } from '../state/searchReducer';

class SearchBar extends Component {
  render() {
    const handleSearchTermChange = (event) => {
      this.props.changeSearchTerm(event.target.value);
    };

    const search = (event) => {
      event.preventDefault();
      console.log('nappia painettu', this.props.searchTerm);
      axios
        .get(`http://localhost:3000/emissions/${this.props.searchTerm}`)
        .then(response => {
          console.log(response);
        });
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
    searchTerm: state.searchTerm,
  };
};

const mapDispatchToProps = {
  changeSearchTerm,
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default ConnectedSearchBar;