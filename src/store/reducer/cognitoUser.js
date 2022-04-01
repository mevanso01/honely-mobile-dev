import { createSlice } from '@reduxjs/toolkit'
import awsConfig from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(awsConfig)

const initialState = {
  isLoggedIn: false,
  confirmationCodeRequested: false,
  user: null
}

export const cognitoSignIn = (payload) => async (dispatch, getState) => {
  try {
    const username = payload.username
    const password = payload.password
    const congnitoUser = await Auth.signIn(username, password)
    dispatch(setIsLoggedIn(true))
    dispatch(setCognitoUser(congnitoUser))
    return congnitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

const cognitoUserSlice = createSlice({
  name: 'cognitoUser',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !!action.payload
    },
    setCognitoUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: {}
})

export const { setIsLoggedIn, setCognitoUser } = cognitoUserSlice.actions

export default cognitoUserSlice.reducer
