import { COGNITO_USER_SET } from '../actionType'

const initialState = {
  isCognitoUserLoggedIn: false,
  confirmationCodeRequested: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COGNITO_USER_SET: {
      const temp = {
        ...state
      }
      for (let key in action.payload) {
        temp[key] = action.payload[key]
      }
      return temp
    }
    default: {
      return state
    }
  }
}
