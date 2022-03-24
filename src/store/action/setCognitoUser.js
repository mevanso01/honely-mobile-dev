import { COGNITO_USER_SET } from '../actionType'

const setCognitoUser = (res) => {
  return {
    type: COGNITO_USER_SET,
    payload: {
      ...res
    }
  }
}

export { setCognitoUser }
