import * as actionTypes from '../actions/types';

const initialState = {
  categories: {
    categoriesList: {
      data: []
    }
  }
}
export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.REQUEST_PROJECT_CATEGORY:
      return { ...state, categories: { ...state.categories, isPending: true }}
    case actionTypes.SUCCESS_PROJECT_CATEGORY:
      return {
        ...state, 
        categories: {
          ...state.categories, 
          isPending: false, 
          successMessage: action.payload 
        } 
      }
    case actionTypes.FAILURE_PROJECT_CATEGORY:
      return { ...state, 
        categories: {
        ...state.categories,
        isPending: false, 
        error: action.payload
      } 
    }
    case actionTypes.REQUEST_GET_PROJECT_CATEGORIES:
      return {...state, categories:{...state.categories, categoriesList: {...state.categories.categoriesList, isPending: true}}}
    case actionTypes.SUCCESS_GET_PROJECT_CATEGORIES:
      return {...state, categories:{...state.categories, categoriesList: {...state.categories.categoriesList, data: action.payload, isPending: false}}}
      case actionTypes.FAILURE_GET_PROJECT_CATEGORIES:
      return {...state, categories:{...state.categories, categoriesList: {...state.categories.categoriesList, error: true, isPending: false}}}
    default: 
        return state
  }
}