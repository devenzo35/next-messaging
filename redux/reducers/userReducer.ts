import { types } from "../types";
import {Action} from './rootReducer'

const initialState = {
  user: undefined,
  authError: undefined,
};

export const authReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        user: { ...action.payload },
        authError: null
      };
    
      case types.WITHOUT_USER:
      return {
        ...state,
        user: null,
      };
      
      case types.LOGIN_FAILED:
        return {
          ...state,
          authError: action.payload,
        };
      
        case types.CLEAN_ERRORS:
        return {
          ...state,
          authError: null,
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
