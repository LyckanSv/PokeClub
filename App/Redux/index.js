import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

const RegionsRedux = require("./RegionsRedux").reducer;
const PokedexRedux = require("./PokedexRedux").reducer;
const PokemonRedux = require("./PokemonRedux").reducer;
const PokemonTeamRedux = require("./PokemonTeamRedux").reducer;
const PokemonDetailRedux = require("./PokemonDetailRedux").reducer;
const PokemonSpeciesRedux = require("./PokemonSpeciesRedux").reducer;

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    regionsData: RegionsRedux,
    pokedexData: PokedexRedux,
    pokemonData: PokemonRedux,
    pokemonTeamData: PokemonTeamRedux,
    pokemonDetailData: PokemonDetailRedux,
    pokemonSpeciesData: PokemonSpeciesRedux
  });

  return configureStore(rootReducer, rootSaga);
};
