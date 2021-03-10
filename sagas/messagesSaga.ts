import { call, put, takeEvery } from "redux-saga/effects"
import { types } from "../redux/types"
import {db} from '../firebase/firebaseConfig'

function* addMessage(action){
    try{
        yield db.collection(`/rooms/${action.payload.roomId}/messages`).add(action.payload)
    }catch(e){
        console.log(e)
    }
}

function* startAddMessage(){
   yield takeEvery('START_ADD_MSG', addMessage)
}

export {startAddMessage}