import * as actionTypes from '../actions/types';

const initialState = {
  list: [],
  selectedProject: [],
  projectDetail: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    // Add new project
    case actionTypes.REQUEST_ADD_PROJECT:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_ADD_PROJECT:
      return { ...state, isPending: false, success: action.payload }
    case actionTypes.FAILURE_ADD_PROJECT:
      return { ...state, isPending: false, error: action.payload }
    
    // Get all projects
    case actionTypes.REQUEST_GET_ALL_PROJECTS:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_GET_ALL_PROJECTS:
      return { ...state, isPending: false, list: action.payload  }
    case actionTypes.FAILURE_GET_ALL_PROJECTS:
      return { ...state, isPending: false, error: action.payload }

    // Get all projects
    case actionTypes.REQUEST_GET_PROJECT_BY_CATEGORY:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_GET_PROJECT_BY_CATEGORY:
      return { ...state, isPending: false, selectedProject: action.payload  }
    case actionTypes.FAILURE_GET_PROJECT_BY_CATEGORY:
      return { ...state, isPending: false, error: action.payload }

    // Get details of the project
    case actionTypes.REQUEST_GET_PROJECT_BY_PROJECT_ID:
      return { ...state, isPending: true }
    case actionTypes.SUCCESS_GET_PROJECT_BY_PROJECT_ID:
      return { ...state, isPending: false, projectDetail: action.payload  }
    case actionTypes.FAILURE_GET_PROJECT_BY_PROJECT_ID:
      return { ...state, isPending: false, error: action.payload }
    default:
      return state;
  }
}