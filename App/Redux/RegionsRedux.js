import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getRegionsRequest: null,
  getRegionsSuccess: ["data"],
  getRegionsFailure: ["error"]
});

export const RegionsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  regions: [],
  status: "",
  fetching: true,
  errorMessage: "",
  error: false
});

/* ------------- Reducers ------------- */
// eslint-disable-next-line no-unused-vars
export const getRegionsRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: "" });
};

export const getRegionsSuccess = (state, action) => {
  console.log("DATA", action);

  return state.merge({
    fetching: false,
    error: false,
    errorMessage: "",
    regions: action.data.results
  });
};

export const getRegionsFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REGIONS_REQUEST]: getRegionsRequest,
  [Types.GET_REGIONS_SUCCESS]: getRegionsSuccess,
  [Types.GET_REGIONS_FAILURE]: getRegionsFailure
});
