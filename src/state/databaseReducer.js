import serverService from '../services/communicationWithServer';

const initialState = { updatingDatabase: null, error: null };

const databaseReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_ERROR':
    return {
      ...state,
      error: action.error
    };

  case 'SET_UPDATING_STATE':
    return {
      ...state,
      updatingDatabase: action.updatingState
    };

  default:
    return state;
  }
};

export const setUpdatingState = (state) => {
  return {
    type: 'SET_UPDATING_STATE',
    updatingState: state
  };
};

export const setError = (error) => {
  return {
    type: 'SET_ERROR',
    error
  };
};

export const updateDatabase = () => {
  return async (dispatch) => {
    dispatch(setUpdatingState('in progress'));

    const result = await serverService.updateDatabase();

    result === 'database updated' ? dispatch(setUpdatingState('done')) : dispatch(setError('Couldn\'t connect to the server'));

    setTimeout(() => {
      dispatch(setUpdatingState(null));
      dispatch(setError(null));
    }, 4000);
  };
};

export default databaseReducer;