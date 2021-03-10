import { types } from "../types";
import {Action} from './rootReducer'

const initialState = {
  user: null,
};

export const authReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        user: { ...action.payload },
      };
    
    case types.LOGIN_FAILED:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
