import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPokemonSpeciesRequest: ["id"],
  getPokemonSpeciesSuccess: ["data"],
  getPokemonSpeciesFailure: ["error"]
});

export const PokemonSpeciesTypes = Types;
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
export const getPokemonSpeciesRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: "" });
};

export const getPokemonSpeciesSuccess = (state, action) => {
  console.log("DATA", action);

  return state.merge({
    fetching: false,
    error: false,
    errorMessage: "",
    pokemon: action.data
  });
};

export const getPokemonSpeciesFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_SPECIES_REQUEST]: getPokemonSpeciesRequest,
  [Types.GET_POKEMON_SPECIES_SUCCESS]: getPokemonSpeciesSuccess,
  [Types.GET_POKEMON_SPECIES_FAILURE]: getPokemonSpeciesFailure
});
