import searchService from '../services/search';

const initialState = { searchTerm: '' };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_SEARCH_TERM':
    return {
      searchTerm: action.searchTerm
    };

  case 'SEARCH':
    return {
      ...state,
      emissions: action.data };

  default:
    return state;
  }
};

export const changeSearchTerm = (searchTerm) => {
  return {
    type: 'CHANGE_SEARCH_TERM',
    searchTerm: searchTerm
  };
};

export const searchCountrysEmissions = (country) => {
  return async (dispatch) => {
    const emissions = await searchService.countrysEmissions(country);

    dispatch({
      type: 'SEARCH',
      data: emissions,
    });
  };
};


export default searchReducer;