import { createSlice } from '@reduxjs/toolkit'
import { doGet, doPost, doDelete } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'
import { cognitoSignIn, cognitoCurrentSession, cognitoSignup, cognitoResendSignUp, cognitoConfirmSignUp } from '../../store/reducer/cognitoUser'

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
    // if (formState.userType === 'Service Provider') {
      siteLeads = "TRUE"
      userType = (formState.serviceProviderType).join(',')
    // }
    // if (formState.userType === 'Homeowner') {
    //   userType = (formState.homeOwnerType).join(',')
    // }
  
    const params = {
      button_leads: "FALSE",
      company_name: formState.company_name,
      email: formState.email,
      email_consent: formState.emailConsent ? 'TRUE' : 'FALSE',
      first_name: formState.firstName,
      home_address: '',
      home_zip_code: '',
      interested_zip_codes: '',
      last_name: formState.lastName,
      membership_type: 'FREE',
      phone_number: fullPhone,
      site_leads: siteLeads,
      user_name: formState.userName,
      user_type: userType,
      
      // promo_code: '',
      // home_url: null,
    }

    dispatch(setParams(params))

    const response = await doGet('lookup-test/email_verification_service', { email: params.email })
    if (response.result === 'Error') {
      throw response
    }

    const handleUnconfirmedUserAddition = async (params) => {
      try {
        const response = await doPost('lookup/unconfirmed_user_addition', params)
        if (response.result === 'Failure.') throw response
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
      await handleUnconfirmedUserAddition(params)
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
    await dispatch(cognitoCurrentSession())

    try {
      const body = {
        ...params,
        promo_code: '',
        home_url: null,
      }
      const response = await doPost('lookup/register_service', body)
      if (response.result !== 'Success') throw response
    } catch (error) {
      return Promise.reject(error)
    }
    
    const getUserProfile = async () => {
      try {
        const response = await doGet('lookup-test/user_profile', { email: email })
        if (response?.result) {
          throw { message: response.result }
        }
        dispatch(resetState())
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
    },
    resetState: (state, action) => {
      state.isLoading = false
      state.isResending = false
      state.formState = {}
      state.params = {}
    }
  },
  extraReducers: {}
})

export const { setLoading, setIsResending, setParams, setFormState, resetState } = singupSlice.actions

export default singupSlice.reducer
