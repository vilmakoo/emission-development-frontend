import searchService from '../services/search';

const initialState = { searchTerm: '', searchPopulations: false };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_SEARCH_TERM':
    return {
      ...state,
      searchTerm: action.searchTerm
    };

  case 'TOGGLE_POPULATION_CHECK_BOX':
    return {
      ...state,
      searchPopulations: !state.searchPopulations
    };

  case 'SET_RESULT':
    return {
      ...state,
      country: action.country,
      data: action.data
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

export const togglePopulationCheckBox = () => {
  return {
    type: 'TOGGLE_POPULATION_CHECK_BOX'
  };
};

export const searchCountrysEmissions = (country, searchPopulations) => {
  return async (dispatch) => {
    const data = await searchService.countrysEmissions(country, searchPopulations);

    dispatch({
      type: 'SET_RESULT',
      country: data.country,
      data: data.data
    });
  };
};


export default searchReducer;