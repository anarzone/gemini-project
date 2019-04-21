import * as actionTypes from '../actions/types';

const initialState = {
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    // Add expertise  
    case actionTypes.REQUEST_ADD_EXPERTISE:
      return {...state, isPending: true}
    case actionTypes.SUCCESS_ADD_EXPERTISE:
      return { ...state, isPending: false, success: action.payload, error: {} }
    case actionTypes.FAILURE_ADD_EXPERTISE:
      return { ...state, isPending: false, error: action.payload, success: {} }

    // Get expertises
    case actionTypes.REQUEST_GET_ALL_EXPERTISES:
      return {...state, isPending: true}
    case actionTypes.SUCCESS_GET_ALL_EXPERTISES:
      return { ...state, isPending: false, list: action.payload }
    case actionTypes.FAILURE_GET_ALL_EXPERTISES:
      return { ...state, isPending: false, error: action.payload }
    default: 
      return state
  }
}