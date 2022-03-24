import { combineReducers } from 'redux'
import currentUser from './currentUser'
import cognitoUser from './cognitoUser'

const reducers = combineReducers({
  currentUser,
  cognitoUser
})

export default reducers