import { takeLatest } from "redux-saga/effects";
import API from "../Services/Api";

/* ------------- Types ------------- */
import { RegionsTypes } from "../Redux/RegionsRedux";
import { PokedexTypes } from "../Redux/PokedexRedux";

/* ------------- Sagas ------------- */
import { getRegions } from "./RegionsSagas";
import { getPokedex } from "./PokedexSagas";

/* ------------- API ------------- */
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield* [takeLatest(RegionsTypes.GET_REGIONS_REQUEST, getRegions, api)];
  yield* [takeLatest(PokedexTypes.GET_POKEDEX_REQUEST, getPokedex, api)];
}
