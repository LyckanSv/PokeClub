import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPokemonDetailRequest: ["id"],
  getPokemonDetailSuccess: ["data"],
  getPokemonDetailFailure: ["error"]
});

export const PokemonDetailTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  pokemon: null,
  status: "",
  fetching: false,
  errorMessage: "",
  error: false
});

/* ------------- Reducers ------------- */
// eslint-disable-next-line no-unused-vars
export const getPokemonDetailRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: "" });
};

export const getPokemonDetailSuccess = (state, action) => {
  console.log("DATA", action);

  return state.merge({
    fetching: false,
    error: false,
    errorMessage: "",
    pokemon: action.data
  });
};

export const getPokemonDetailFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_DETAIL_REQUEST]: getPokemonDetailRequest,
  [Types.GET_POKEMON_DETAIL_SUCCESS]: getPokemonDetailSuccess,
  [Types.GET_POKEMON_DETAIL_FAILURE]: getPokemonDetailFailure
});
