import { all } from "redux-saga/effects";
import {startAddMessage} from "./messagesSaga";
import startAddRoom from "./roomSaga";
import {userSession} from "./userSaga";

export default function* rootSaga(){
    yield all([userSession(), startAddMessage(), startAddRoom()])
}