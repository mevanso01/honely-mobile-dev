import { createSlice } from '@reduxjs/toolkit'
import { doGet, doPost, doDelete } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'
import { cognitoSignIn, cognitoSignup, cognitoResendSignUp, cognitoConfirmSignUp } from '../../store/reducer/cognitoUser'

export const handleCheckUserNameExist = (values) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true))
    dispatch(setFormState(values))
    const username = values.userName.toLowerCase()
    await dispatch(cognitoSignIn({ username: username, password: '123' }))
    return true
  } catch (error) {
    switch (error.code) {
      case 'UserNotFoundException':
        return true
      case 'UserLambdaValidationException':
        return false
      case 'NotAuthorizedException':
        return true
      case 'PasswordResetRequiredException':
        return true
      case 'UserNotConfirmedException':
        return true
      default:
        return false
    }
  } finally {
    dispatch(setLoading(false))
  }
}

export const handleCreateAccount = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true))
    const { screens: { signup: { formState } } } = getState()

    let fullPhone = ""
    const countryCode = '+1'
    fullPhone = countryCode + formState.phonenumber
    fullPhone = fullPhone.replace(/-/g, "")

    let siteLeads = "FALSE"
    let userType = ''
    if (formState.userType === 'Service Provider') {
      siteLeads = "TRUE"
      userType = (formState.serviceProviderType).join(',')
    }
    if (formState.userType === 'Homeowner') {
      userType = (formState.homeOwnerType).join(',')
    }
  
    const params = {
      user_name: formState.userName,
      first_name: formState.firstName,
      last_name: formState.lastName,
      email: formState.email,
      phone_number: fullPhone,
      membership_type: 'FREE',
      promo_code: '',
      email_consent: formState.emailConsent ? 'TRUE' : 'FALSE',
      user_type: userType,
      site_leads: siteLeads,
      button_leads: "FALSE",
      home_url: null,
      interested_zip_codes: '',
      home_address: '',
      home_zip_code: '',
    }

    dispatch(setParams(params))

    const response = await doGet('lookup-test/email_verification_service', { email: params.email })
    if (response.result === 'Error') {
      throw response
    }

    const handleUnconfirmedUserAddition = async (params) => {
      try {
        await doPost('lookup/unconfirmed_user_addition', params)
        dispatch(setLoading(false))
        return true
      } catch (error) {
        dispatch(setLoading(false))
        return Promise.reject(error)
      }
    }

    try {
      await dispatch(cognitoSignup({
        username: formState.userName,
        password: formState.password,
        attributes: {
          email: params.email,
          phone_number: params.phone_number
        }
      }))
      handleUnconfirmedUserAddition(params)
    } catch (error) {
      dispatch(setLoading(false))
      return Promise.reject(error)
    }

  } catch (error) {
    dispatch(setLoading(false))
    return Promise.reject(error)
  }
}

export const handleResendCode = (email, username) => async (dispatch, getState) => {
  try {
    const onSuccess = () => {
      throw 'Too much time has elapsed. Please sign up again.'
    }
    dispatch(setIsResending(true))

    const getRequestCode = async () => {
      try {
        await dispatch(cognitoResendSignUp(username))
        dispatch(setIsResending(false))
        return true
      } catch (error) {
        dispatch(setIsResending(false))
        return Promise.reject(error)
      }
    }
  
    await doGet('lookup-test/email_verification_service', { email: email }, onSuccess, getRequestCode)
  } catch (error) {
    dispatch(setIsResending(false))
    return Promise.reject(error)
  }
}

export const handleCongitoConfirmSignUp = (username, code, email) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true))
    await dispatch(cognitoConfirmSignUp(username, code))
    try {
      await doDelete('lookup-test/unconfirmed_user_deletion', { email: email })
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  } catch (error) {
    dispatch(setLoading(false))
    return Promise.reject(error)
  }
}

export const handleLogin = (username, password, email) => async (dispatch, getState) => {
  try {
    const { screens: { signup: { params } } } = getState()

    await dispatch(cognitoSignIn({ username: username, password: password }))
    try {
      await doPost('lookup/register_service', params)
    } catch (error) {
      return Promise.reject(error)
    }
    
    const getUserProfile = async () => {
      try {
        const response = await doGet('lookup-test/user_profile', { email: email })
        if (response.error) {
          throw response
        }
        dispatch(setLoading(false))
        dispatch(setUser({ ...response, isLoggedIn: true }))
        return true
      } catch (error) {
        dispatch(setLoading(false))
        return Promise.reject(error)
      }
    }
    getUserProfile()
  } catch (error) {
    dispatch(setLoading(false))
    return Promise.reject(error)
  }
}

const initialState = {
  isLoading: false,
  isResending: false,
  formState: {},
  params: {}
}

const singupSlice = createSlice({
  name: 'screens/signup',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = !!action.payload
    },
    setIsResending: (state, action) => {
      state.isResending = !!action.payload
    },
    setParams: (state, action) => {
      state.params = action.payload
    },
    setFormState: (state, action) => {
      const temp = {
        ...state.formState
      }
      for (let key in action.payload) {
        temp[key] = action.payload[key]
      }
      state.formState = temp
    }
  },
  extraReducers: {}
})

export const { setLoading, setIsResending, setParams, setFormState } = singupSlice.actions

export default singupSlice.reducer
