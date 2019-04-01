import { takeLatest } from "redux-saga/effects";
import API from "../Services/Api";

/* ------------- Types ------------- */
import { RegionsTypes } from "../Redux/RegionsRedux";
import { PokedexTypes } from "../Redux/PokedexRedux";
import { PokemonDetailTypes } from "../Redux/PokemonDetailRedux";
import { PokemonSpeciesTypes } from "../Redux/PokemonSpeciesRedux";

/* ------------- Sagas ------------- */
import { getRegions } from "./RegionsSagas";
import { getPokedex } from "./PokedexSagas";
import { getPokemonDetail } from "./PokemonDetailSagas";
import { getPokemonSpecies } from "./PokemonSpeciesSagas";

/* ------------- API ------------- */
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield* [takeLatest(RegionsTypes.GET_REGIONS_REQUEST, getRegions, api)];
  yield* [takeLatest(PokedexTypes.GET_POKEDEX_REQUEST, getPokedex, api)];
  yield* [
    takeLatest(
      PokemonDetailTypes.GET_POKEMON_DETAIL_REQUEST,
      getPokemonDetail,
      api
    )
  ];
  yield* [
    takeLatest(
      PokemonSpeciesTypes.GET_POKEMON_SPECIES_REQUEST,
      getPokemonSpecies,
      api
    )
  ];
}
