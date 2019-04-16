import * as actionTypes from '../actions/types';

const initialState = {
  list: [],
  selectedCategory: {}
}
export default function(state = initialState, action) {
  switch(action.type) {
    // Add new category
    case actionTypes.REQUEST_ADD_PROJECT_CATEGORY:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_ADD_PROJECT_CATEGORY:
      return { ...state, isPending: false, success: action.payload }
    case actionTypes.FAILURE_ADD_PROJECT_CATEGORY:
      return { ...state, isPending: false, error: action.payload }

    // Get all categories
    case actionTypes.REQUEST_GET_PROJECT_CATEGORIES:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_GET_PROJECT_CATEGORIES:
      return { ...state, isPending: false, list: action.payload  }
    case actionTypes.FAILURE_GET_PROJECT_CATEGORIES:
      return { ...state, isPending: false, error: action.payload }

    // Get category by id
    case actionTypes.REQUEST_GET_SELECTED_CATEGORY:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_GET_SELECTED_CATEGORY:
      return { ...state, isPending: false, selectedCategory: action.payload  }
    case actionTypes.FAILURE_GET_SELECTED_CATEGORY:
      return { ...state, isPending: false, error: action.payload }

    // Update selected category
    case actionTypes.REQUEST_UPDATE_SELECTED_CATEGORY:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_UPDATE_SELECTED_CATEGORY:
      return { ...state, isPending: false, selectedCategory: action.payload  }
    case actionTypes.FAILURE_UPDATE_SELECTED_CATEGORY:
      return { ...state, isPending: false, error: action.payload }
    default: 
      return state
  }
}