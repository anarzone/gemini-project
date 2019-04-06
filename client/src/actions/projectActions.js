import { apiURL } from '../axios';
import { REQUEST_PROJECT_CATEGORY, SUCCESS_PROJECT_CATEGORY, FAILURE_PROJECT_CATEGORY } from './types';

// Add new category for the project
export function addProjectCategory(data) {
  return async dispatch => {
    try {
      dispatch({type: REQUEST_PROJECT_CATEGORY})
      const config = { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        } 
      };
      const request = await apiURL.post('/projects/categories', data, config)
      if(request.status === 201) {
        dispatch({type: SUCCESS_PROJECT_CATEGORY, payload: 'Yeni kateqoriya ugurla əlavə edildi!'})
      }
    } catch (err) {
      dispatch({type: FAILURE_PROJECT_CATEGORY, payload: err.message, error: true})
    }
  };
}

// Get all categories of the projects
export function getProjectCategories() {
  try {

  } catch(err) {
    console.log(err)
  }
}
