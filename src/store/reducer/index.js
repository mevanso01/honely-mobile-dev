import { combineReducers } from 'redux'
import currentUser from './currentUser'
import cognitoUser from './cognitoUser'
import screens from './screens'

const reducers = combineReducers({
  screens,
  currentUser,
  cognitoUser
})

export default reducers