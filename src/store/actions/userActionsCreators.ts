import { Dispatch } from 'redux'
import { userService } from '../../services/userService'
import { UserCredentials } from '../userCredentials'
import { UserResponse } from '../userResponse'
import { UserAction } from './userActions'
import { UserActionType } from './userActionTypes'


export function login(userCreds: UserCredentials) {
  console.log('login in actions');
  
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const user = await userService.login(userCreds)
      dispatch({ type: UserActionType.SET_USER, user })
      return user
    } catch (err) {
      console.log('UserActions: err in login', err)
      throw err
    }
  }
}


export function getUserProjects() {
  console.log('get proj in actions');
  
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const projects = await userService.getUserProjects()
      dispatch({ type: UserActionType.GET_PROJ, projects })
      return projects
    } catch (err) {
      console.log('UserActions: err in get proj', err)
      throw err
    }
  }
}


