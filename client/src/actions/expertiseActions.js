import { apiURL } from '../axios';
import * as actionTypes from './types';

// Add new category for the project
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