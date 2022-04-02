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
    const cognitoUser = await Auth.signIn(username, password)
    dispatch(setIsLoggedIn(true))
    dispatch(setCognitoUser(cognitoUser))
    return cognitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoSignup = (payload) => async (dispatch, getState) => {
  try {
    const username = payload.username
    const password = payload.password
    const attributes = payload.attributes
    const cognitoUser = await Auth.signUp({ username, password, attributes })
    dispatch(setCognitoUser(cognitoUser))
    return cognitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoResendSignUp = (username) => async (dispatch, getState) => {
  try {
    await Auth.resendSignUp(username)
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoConfirmSignUp = (username, code) => async (dispatch, getState) => {
  try {
    await Auth.confirmSignUp(username, code)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoForgotPassword = (username) => async (dispatch, getState) => {
  try {
    await Auth.forgotPassword(username)
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoResetPassword = (username, code, newPassword) => async (dispatch, getState) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword)
    return true
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
