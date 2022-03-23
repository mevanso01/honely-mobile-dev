import { USER_SET } from '../actionType'

const setUser = (res) => {
  return {
    type: USER_SET,
    payload: {
      ...res
    }
  }
}

export { setUser }
