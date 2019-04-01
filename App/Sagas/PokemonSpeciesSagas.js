/* eslint-disable import/no-named-as-default-member */
import { call, put } from "redux-saga/effects";
import PokemonSpecies from "../Redux/PokemonSpeciesRedux";

// eslint-disable-next-line import/prefer-default-export
export function* getPokemonSpecies(api, action) {
  try {
    const response = yield call(api.getPokemonSpecies, action.id);
    if (response.ok) {
      yield put(PokemonSpecies.getPokemonSpeciesSuccess(response.data));
    } else {
      yield put(
        PokemonSpecies.getPokemonSpeciesFailure("Connection problems :(")
      );
    }
  } catch (error) {
    yield put(PokemonSpecies.getPokemonSpeciesFailure(error.message));
  }
}
