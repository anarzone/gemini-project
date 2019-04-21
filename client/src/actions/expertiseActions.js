import { apiURL } from '../axios';
import * as actionTypes from './types';

// Add new expertise
export function addExpertise(data) {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.REQUEST_ADD_EXPERTISE})
      const config = { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        } 
      };
      const request = await apiURL.post('/expertises', data, config)
      if(request.status === 201) {
        dispatch({type: actionTypes.SUCCESS_ADD_EXPERTISE, 
          payload: {
            message: 'Yeni fəaliyyət növü ugurla əlavə edildi!'
          }
        })
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FAILURE_ADD_EXPERTISE, 
        payload: {
          message: err.message, error: true
        }
      })
    }
  };
}

// Get all expertises
export function getExpertises() {
  return async dispatch => {
    dispatch({ type: actionTypes.REQUEST_GET_ALL_EXPERTISES })
    try {
      const req = await apiURL.get('/expertises');
      dispatch({ type: actionTypes.SUCCESS_GET_ALL_EXPERTISES, payload: req.data })
    } catch(err) {
      dispatch({ 
        type: actionTypes.FAILURE_GET_ALL_EXPERTISES, 
        payload: {
          message: err.message,
          error: true
        } 
      })
    }
  }
}

// Delete Expertise by id
export function deleteExpertise(id) {
  return async dispatch => {
    dispatch({ type: actionTypes.REQUEST_DELETE_EXPERTISE })
    try {
      const request = await apiURL.delete(`/expertises/${id}`);
      dispatch({ type: actionTypes.SUCCESS_DELETE_EXPERTISE, payload: request.status })
    } catch(err) {
      dispatch({ type: actionTypes.FAILURE_DELETE_EXPERTISE, payload: err.message })
    }
  }
}