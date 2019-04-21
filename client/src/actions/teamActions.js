import { apiURL } from '../axios';
import * as actionTypes from './types';

// Add a member to the team
export function addTeamMember(data) {
  return async dispatch => {

    try {
      const request = await apiURL.post('/team', data)
      dispatch({ type: actionTypes.SUCCESS_ADD_NEW_TEAM_MEMBER, payload: request.data })
    } catch(err) {
      dispatch({ type: actionTypes.FAILURE_ADD_NEW_TEAM_MEMBER, payload: err.message })
    }
  }
} 

// Get all team members
export function getTeam() {
  return async dispatch => {

    try {
      const request = await apiURL.get('/team')
      dispatch({ type: actionTypes.SUCCESS_GET_TEAM, payload: request.data })
    } catch(err) {
      dispatch({ type: actionTypes.FAILURE_GET_TEAM, payload: err.message })
    }
  }
} 

// Delete member of team by id
export function deleteTeamMember(id) {
  return async dispatch => {
    try {
      const request = await apiURL.delete(`/team/${id}`);
      dispatch({ type: actionTypes.SUCCESS_DELETE_TEAM_MEMBER, payload: request.status })
    } catch(err) {
      dispatch({ type: actionTypes.FAILURE_DELETE_TEAM_MEMBER, payload: err.message })
    }
  }
}