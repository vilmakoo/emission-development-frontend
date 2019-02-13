import searchService from '../services/search';

const initialState = { searchTerm: '' };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_SEARCH_TERM':
    return {
      searchTerm: action.searchTerm
    };

  case 'SET_RESULT':
    return {
      ...state,
      country: action.country,
      emissions: action.emissions,
      populations: action.populations
    };

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
    const data = await searchService.countrysEmissions(country, true);

    dispatch({
      type: 'SET_RESULT',
      country: data.country,
      emissions: data.emissions,
      populations: data.populations
    });
  };
};


export default searchReducer;