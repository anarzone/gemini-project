import { apiURL } from '../axios';
import * as actionTypes from './types';

// Add new category for the project
export function addProjectCategory(data) {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.REQUEST_ADD_PROJECT_CATEGORY})
      const config = { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        } 
      };
      const request = await apiURL.post('/projects/categories', data, config)
      if(request.status === 201) {
        dispatch({type: actionTypes.SUCCESS_ADD_PROJECT_CATEGORY, 
          payload: {
            message: 'Yeni kateqoriya ugurla əlavə edildi!'
          }
        })
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FAILURE_ADD_PROJECT_CATEGORY, 
        payload: {
          message: err.message, error: true
        }
      })
    }
  };
}

// Get all categories of the projects
export function getProjectCategories() {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.REQUEST_GET_PROJECT_CATEGORIES})
      const request = await apiURL.get('/projects/categories');
      dispatch({type: actionTypes.SUCCESS_GET_PROJECT_CATEGORIES, payload: request.data})
    } catch(err) {
      dispatch({
        type: actionTypes.FAILURE_GET_PROJECT_CATEGORIES, 
        payload: {
          message: err, 
          error: true
        }
      })
    }
  }
}



// Add new project
export function addProject(data, catId) {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.REQUEST_ADD_PROJECT})
      const config = { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        } 
      };
      const request = await apiURL.post(`/projects/${catId}`, data, config)
      if(request.status === 201) {
        dispatch({
          type: actionTypes.SUCCESS_ADD_PROJECT, 
          payload: {
            message: 'Yeni layihə ugurla əlavə edildi'
          }
        })
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FAILURE_ADD_PROJECT, 
        payload: {
          message: err.message, 
          error: true
       }
      })
    }
  }
  
}

// Get all projects
export function getProjects() {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.REQUEST_GET_ALL_PROJECTS})
      const request = await apiURL.get('/projects');
      dispatch({type: actionTypes.SUCCESS_GET_ALL_PROJECTS, payload: request.data})
    } catch(err) {
      dispatch({
        type: actionTypes.FAILURE_GET_ALL_PROJECTS, 
        payload: {
          message: err, 
          error: true
        }
      })
    }
  }
}

// Get project by projectId, nameLang and contentLang parameters
