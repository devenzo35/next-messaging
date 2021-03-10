import { types } from "../types";
import {Action} from './rootReducer'

const initialState = {
  rooms:null,
  activeRoom:{ id:"S1FjqbdyeozpXOG9ZYkt",
  roomName:"general"}
};

export const roomReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.ADD_ROOM:
      console.log(action.payload)
      return {
        ...state,
        rooms:[...state.rooms, ...[action.payload]]}
    
      case types.LOAD_ROOM:
      return {
        ...state,
        rooms:[...action.payload]}

    case types.ACTIVE_ROOM:
      return {
        ...state,
        activeRoom: action.payload
            }
    default:
      return state;
  }
};