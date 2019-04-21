import * as actionTypes from '../actions/types';

const initialState = {
  list: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    // Add a new team member  
    case actionTypes.SUCCESS_ADD_EXPERTISE:
      return { ...state, isPending: false, success: action.payload, error: {} }
    case actionTypes.FAILURE_ADD_EXPERTISE:
      return { ...state, isPending: false, error: action.payload, success: {} }

    // Get team members
    case actionTypes.SUCCESS_GET_TEAM:
      return { ...state, list: action.payload }
    case actionTypes.FAILURE_GET_TEAM:
      return { ...state, error: action.payload }

    default: 
      return state
  }
}