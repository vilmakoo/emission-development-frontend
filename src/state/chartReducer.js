const initialState = { showEmissionDevelopment: false, showPopulationDevelopment: false, showPerCapitaDevelopment: false };

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_EMISSION_DEVELOPMENT':
    return {
      ...state,
      showEmissionDevelopment: true
    };

  case 'SHOW_POPULATION_DEVELOPMENT':
    return {
      ...state,
      showPopulationDevelopment: true
    };

  case 'SHOW_PER_CAPITA_DEVELOPMENT':
    return {
      ...state,
      showPerCapitaDevelopment: true
    };

  default:
    return state;
  }
};

export const showChart = (chart) => {
  if (chart === 'emissions') {
    return {
      type: 'SHOW_EMISSION_DEVELOPMENT'
    };
  } else if (chart === 'populations') {
    return {
      type: 'SHOW_POPULATION_DEVELOPMENT'
    };
  } else {
    return {
      type: 'SHOW_PER_CAPITA_DEVELOPMENT'
    };
  }
};

export default chartReducer;