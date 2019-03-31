/* eslint-disable no-unused-vars */
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  addPokemonTeam: ["pokemonTeam"],
  deletePokemonTeam: null,
  getPokemonTeam: null
});

export const PokemonTeamTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  pokemonTeam: [null, null, null, null, null, null]
});

/* ------------- Reducers ------------- */
export const addPokemonTeam = (state, action) => {
  console.log("aaaaad");

  const { pokemonTeam } = action;
  return state.merge({ pokemonTeam });
};

export const deletePokemonTeam = (state, action) => {
  return state.merge({ pokemonTeam: [null, null, null, null, null, null] });
};

export const getPokemonTeam = (state, action) => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_POKEMON_TEAM]: addPokemonTeam,
  [Types.DELETE_POKEMON_TEAM]: deletePokemonTeam,
  [Types.GET_POKEMON_TEAM]: getPokemonTeam
});
