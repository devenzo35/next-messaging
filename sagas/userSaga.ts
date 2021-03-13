import { all, put, takeLatest } from "redux-saga/effects";
import { types } from "../redux/types";


function* loginUser(action) {
  try {
    yield put({ type:types.LOGIN_USER, payload: action.payload });
  } catch (err) {
    yield put({ type: types.LOGIN_FAILED, err });
  }
}

function* logoutUser() {
  try {
    yield put({ type:types.LOGOUT_USER});
  } catch (err) {
    yield put({ type: types.LOGIN_FAILED, err });
  }
}

function* userSession() {
  yield all([
    takeLatest(types.START_LOGIN, loginUser),
    takeLatest(types.START_LOGOUT, logoutUser)
  ])
}

export {userSession};
