import { types } from "../types";
import {Action} from './rootReducer'

const initialState = {
  rooms:null,
  activeRoom:{ 
    id:"tzhO1m5udIrhmhRx9TwA",
    roomName:"General",
    roomDescription:"General room to talk and share ideas about whatever you want",}
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
