import { put, takeLatest } from "redux-saga/effects";

function* loginUser(action) {
  try {
    yield put({ type: "LOGIN_USER", payload: action.payload });
  } catch (err) {
    yield put({ type: "LOGIN_FAILED", err });
  }
}

function* startLogin() {
  yield takeLatest("START_LOGIN", loginUser)
}

export {startLogin};
