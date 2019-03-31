/* eslint-disable no-unused-vars */
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  selectPokemon: ["pokemon"],
  unselectPokemon: null,
  getSelectedPokemon: null
});

export const PokemonTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  selectedPokemon: {}
});

/* ------------- Reducers ------------- */
export const selectPokemon = (state, action) => {
  return state.merge({ selectedPokemon: action.pokemon });
};

export const unselectPokemon = (state, action) => {
  return state.merge({ selectedPokemon: {} });
};

export const getSelectedPokemon = (state, action) => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_POKEMON]: selectPokemon,
  [Types.UNSELECT_POKEMON]: unselectPokemon,
  [Types.GET_SELECTED_POKEMON]: getSelectedPokemon
});
