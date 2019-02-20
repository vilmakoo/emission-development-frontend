import searchService from '../services/communicationWithServer';

const initialState = { searchTerm: '', searchPopulations: false, compare: false };

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

  case 'TOGGLE_COMPARE_CHECK_BOX':
    return {
      ...state,
      compare: !state.compare
    };

  case 'SET_RESULT':
    return {
      ...state,
      country: action.country,
      data: action.data,
      highIncomeAverages: action.highIncomeAverages
    };

  case 'SET_ERROR':
    return {
      ...state,
      error: action.error
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

export const toggleCompareCheckBox = () => {
  return {
    type: 'TOGGLE_COMPARE_CHECK_BOX'
  };
};

export const setError = (error) => {
  return {
    type: 'SET_ERROR',
    error
  };
};

export const searchCountrysEmissions = (country, searchPopulations, compare) => {
  return async (dispatch) => {
    const data = await searchService.searchCountrysEmissions(country, searchPopulations, compare);

    if (data === 'error') {
      dispatch(setError('Couldn\'t connect to the server'));
    } else if (data.country.name === 'NOT FOUND') {
      dispatch(setError('Country not found'));
    } else {
      dispatch({
        type: 'SET_RESULT',
        country: data.country.name,
        data: data.country.data,
        highIncomeAverages: data.highIncomeAverages
      });
    }

    setTimeout(() => {
      dispatch(
        setError(null)
      );
    }, 4000);
  };
};


export default searchReducer;