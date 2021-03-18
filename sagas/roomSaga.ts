import { put, takeLatest } from "redux-saga/effects"
import { startAddMessage } from "./messagesSaga"
import {db, firebase} from '../firebase/firebaseConfig'
import { types } from "../redux/types"

interface Action {
    type: string,
    payload: any
}

function* addRoom(action: Action){
    console.log(action.payload)
    try{
        yield db.collection('rooms').add(action.payload)
    }catch(e) {
        console.log(e)
    }
}

function* loadRooms(action){
    try{
        yield put({type: types.LOAD_ROOM ,payload:action.payload})
    }catch(e) {
        console.log(e)
    }
}

function* startAddRoom(){
    yield takeLatest(types.START_ADD_ROOM, addRoom )
    yield takeLatest(types.START_LOAD_ROOMS, loadRooms )
}

export default startAddRoom