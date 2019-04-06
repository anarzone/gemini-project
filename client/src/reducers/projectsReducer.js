import { REQUEST_PROJECT_CATEGORY, SUCCESS_PROJECT_CATEGORY, FAILURE_PROJECT_CATEGORY } from '../actions/types';

const initialState = {
  categories: {
    categoriesList: [],
    successMessage: '',
    error: null
  }
}
export default function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PROJECT_CATEGORY:
      return { ...state, isPending: true }
    case SUCCESS_PROJECT_CATEGORY:
      return {
        ...state, 
        categories: {
          ...state.categories, 
          isPending: false, 
          successMessage: action.payload 
        } 
      }
    case FAILURE_PROJECT_CATEGORY:
      return { ...state, 
        categories: {
        ...state.categories,
        isPending: false, 
        error: action.payload
      } 
    }
    default: 
        return state
  }
}