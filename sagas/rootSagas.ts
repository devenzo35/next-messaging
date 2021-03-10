import { all } from "redux-saga/effects";
import {startAddMessage} from "./messagesSaga";
import startAddRoom from "./roomSaga";
import {startLogin} from "./userSaga";

export default function* rootSaga(){
    yield all([startLogin(), startAddMessage(), startAddRoom()])
}