import { combineReducers } from "redux";
import { msgReducer } from "./msgReducer";
import { roomReducer } from "./roomReducer";
import { authReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  rooms: roomReducer,
  msgs: msgReducer
});

export type RootState = ReturnType<typeof rootReducer>

export interface Action {
  type: string,
  payload?: any
}