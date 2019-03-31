import { call, put } from "redux-saga/effects";
import PokedexActions from "../Redux/PokedexRedux";

export function* getPokedex(api, action) {
  try {
    const response = yield call(api.getPokedex, action.region);
    if (response.ok) {
      yield put(PokedexActions.getPokedexSuccess(response.data));
    } else {
      yield put(PokedexActions.getPokedexFailure("Connection problems :("));
    }
  } catch (error) {
    yield put(PokedexActions.getPokedexFailure(error.message));
  }
}
