import { Project } from '../project'
import { UserResponse } from '../userResponse'
import { UserActionType } from './userActionTypes'

interface Login {
  type: UserActionType.SET_USER,
  user: UserResponse
}

interface GetUserProjects {
  type: UserActionType.GET_PROJ,
  projects: Project[]
}


export type UserAction = Login | GetUserProjects


