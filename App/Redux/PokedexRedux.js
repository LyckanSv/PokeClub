import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPokedexRequest: ["region"],
  getPokedexSuccess: ["data"],
  getPokedexFailure: ["error"]
});

export const PokedexTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  pokemons: [],
  status: "",
  fetching: true,
  errorMessage: "",
  error: false
});

/* ------------- Reducers ------------- */
// eslint-disable-next-line no-unused-vars
export const getPokedexRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: "" });
};

export const getPokedexSuccess = (state, action) => {
  console.log("DATA", action);

  return state.merge({
    fetching: false,
    error: false,
    errorMessage: "",
    pokemons: action.data.pokemon_entries
  });
};

export const getPokedexFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEDEX_REQUEST]: getPokedexRequest,
  [Types.GET_POKEDEX_SUCCESS]: getPokedexSuccess,
  [Types.GET_POKEDEX_FAILURE]: getPokedexFailure
});
