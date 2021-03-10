import {types} from '../types'
import {Action} from './rootReducer'

const initialState={
    messages:null
}

export const msgReducer=(state=initialState, action: Action)=>{
      switch (action.type) {
            
                case types.LOAD_MSG:
                return {
                    ...state,
                    messages: [...action.payload]               
                }
        
            default:
                return state;
        }
}