// import { User } from "../userCredentials";
import { UserAction } from "../actions/userActions";
import { UserActionType } from "../actions/userActionTypes";
import { Project } from "../project";
import { UserResponse } from "../userResponse";

let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

export interface UserState {
  loggedInUser: UserResponse | null
  projects: Project[] | null
}


const initialState: UserState = {
  loggedInUser: localLoggedinUser,
  projects: null
};

export function userReducer(state: UserState = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, loggedInUser: action.user }
    case UserActionType.GET_PROJ:
      console.log('set proj in reducer');
      
      return { ...state, projects: action.projects }
    default:
      return state;
  }
}
