const initialState = { searchTerm: '' };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_SEARCH_TERM':
    return {
      searchTerm: action.searchTerm
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

export default searchReducer;