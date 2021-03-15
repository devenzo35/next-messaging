import { types } from "../types";
import {Action} from './rootReducer'

const initialState = {
  user: undefined,
};

export const authReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        user: { ...action.payload },
      };
    
      case types.WITHOUT_USER:
      return {
        ...state,
        user: null,
      };
      
      case types.LOGIN_FAILED:
        return {
          ...state,
          user: action.payload,
        };
        
        case types.LOGOUT_USER:
          return {
            ...state,
            user: null,
          };
        

    default:
      return state;
  }
};
