import { USER_SET, USER_SIGNOUT  } from '../actionType'

const setUser = (res) => {
  return {
    type: USER_SET,
    payload: {
      ...res
    }
  }
}

const signoutUser = () => {
  return {
    type: USER_SIGNOUT,
  };
}


export { setUser, signoutUser }
