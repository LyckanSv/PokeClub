import { call, put } from "redux-saga/effects";
import RegionsActions from "../Redux/RegionsRedux";

export function* getRegions(api, action) {
  try {
    const response = yield call(api.getRegions);
    if (response.ok) {
      yield put(RegionsActions.getRegionsSuccess(response.data));
    } else {
      yield put(RegionsActions.getRegionsFailure("Connection problems :("));
    }
  } catch (error) {
    yield put(RegionsActions.getRegionsFailure(error.message));
  }
}
