import { USER_FETCH_CURRENT, USER_SET } from '../actionType'

const initialState = {
  isLoggedIn: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_CURRENT: {
      return { ...state }
    }
    case USER_SET: {
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
