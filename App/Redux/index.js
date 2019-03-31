import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

const RegionsRedux = require("./RegionsRedux").reducer;
const PokedexRedux = require("./PokedexRedux").reducer;
const PokemonRedux = require("./PokemonRedux").reducer;
const PokemonTeamRedux = require("./PokemonTeamRedux").reducer;

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    regionsData: RegionsRedux,
    pokedexData: PokedexRedux,
    pokemonData: PokemonRedux,
    pokemonTeamData: PokemonTeamRedux
  });

  return configureStore(rootReducer, rootSaga);
};
