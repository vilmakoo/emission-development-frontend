const initialState = { showEmissionDevelopment: false, showPopulationDevelopment: false, showPerCapitaDevelopment: false };

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'TOGGLE_SHOW_EMISSION_DEVELOPMENT':
    return {
      ...state,
      showEmissionDevelopment: !state.showEmissionDevelopment
    };

  case 'TOGGLE_SHOW_POPULATION_DEVELOPMENT':
    return {
      ...state,
      showPopulationDevelopment: !state.showPopulationDevelopment
    };

  case 'TOGGLE_SHOW_PER_CAPITA_DEVELOPMENT':
    return {
      ...state,
      showPerCapitaDevelopment: !state.showPerCapitaDevelopment
    };

  default:
    return state;
  }
};

export const toggleShowChart = (chart) => {
  if (chart === 'emissions') {
    return {
      type: 'TOGGLE_SHOW_EMISSION_DEVELOPMENT'
    };
  } else if (chart === 'populations') {
    return {
      type: 'TOGGLE_SHOW_POPULATION_DEVELOPMENT'
    };
  } else {
    return {
      type: 'TOGGLE_SHOW_PER_CAPITA_DEVELOPMENT'
    };
  }
};

export default chartReducer;