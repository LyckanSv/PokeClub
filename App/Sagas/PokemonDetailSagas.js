/* eslint-disable import/no-named-as-default-member */
import { call, put } from "redux-saga/effects";
import PokemonDetail from "../Redux/PokemonDetailRedux";

// eslint-disable-next-line import/prefer-default-export
export function* getPokemonDetail(api, action) {
  try {
    const response = yield call(api.getPokemonDetail, action.id);
    if (response.ok) {
      yield put(PokemonDetail.getPokemonDetailSuccess(response.data));
    } else {
      yield put(
        PokemonDetail.getPokemonDetailFailure("Connection problems :(")
      );
    }
  } catch (error) {
    yield put(PokemonDetail.getPokemonDetailFailure(error.message));
  }
}
