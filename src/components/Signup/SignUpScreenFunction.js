import React, { useState } from 'react'
import { useToast } from 'native-base';
import { doGet, doPost, doDelete } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setCognitoUser } from '../../store/action/setCognitoUser'
import { setUser } from '../../store/action/setUser'
import config from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)

export const SignUpScreenFunction = (props) => {
  const {
    setSignUpFormStep,
    UIComponent
  } = props

  const cognitoUser = useSelector(state => state.cognitoUser)

  const dispatch = useDispatch()
  const toast = useToast()
  const [formState, setFormState] = useState({
    userType: 'Service Provider'
  })
  const [bodyParams, setBodyParams] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleCheckUserNameExist = async (userName) => {
    try {
      setIsLoading(true)
      await Auth.signIn(userName.toLowerCase(), '123')
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
      setIsLoading(false)
    }
  }

  const handleCreateAccount = async () => {
    try {
      setIsLoading(true)
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
      setBodyParams(params)
      const response = await doGet('lookup-test/email_verification_service', { email: params.email })
      if (response.result === 'Error') {
        throw response
      }
      handleCognitoSignup(params, params.user_name, formState.password, params.email, params.phone_number, params.first_name, params.last_name)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const handleCognitoSignup = async (params, username, password, email, phone_number, first_name, last_name) => {
    try {
      const _cognitoUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
        }
      })
      dispatch(setCognitoUser({ ..._cognitoUser, confirmationCodeRequested: true }))
      handleUnconfirmedUserAddition(params)
      setSignUpFormStep('otp')
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const handleUnconfirmedUserAddition = async (params) => {
    try {
      await doPost('lookup/unconfirmed_user_addition', params)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const handleCongitoConfirmSignUp = async (code) => {
    try {
      setIsLoading(true)
      await Auth.confirmSignUp(bodyParams.user_name, code)
      dispatch(setCognitoUser({ confirmationCodeRequested: false }))
      await doDelete('lookup-test/unconfirmed_user_deletion', { email: bodyParams.email })
      setSignUpFormStep('success')
      const _cognitoUser = await Auth.signIn(bodyParams.user_name, formState.password)
      dispatch(setCognitoUser({ ..._cognitoUser, isCognitoUserLoggedIn: true }))
      await doPost('lookup/register_service', bodyParams)
      getUserProfile()
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const getUserProfile = async () => {
    try {
      if (cognitoUser.isCognitoUserLoggedIn) {
        const response = await doGet('lookup/user_profile', { email: cognitoUser.attributes.email })
        if (response.error) {
          throw response
        }
        dispatch(setUser({ ...response, isLoggedIn: true }))
        setIsLogin(false)
      }
    } catch (error) {
      setIsLogin(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const getRequestConde = async () => {
    try {
      await Auth.resendSignUp(bodyParams.user_name)
      toast.show({
        title: 'Success',
        description: 'Resent Email Verification Code!',
        status: 'success',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleResendCode = async () => {
    try {
      const onSuccess = () => {
        throw { message: 'Too much time has elapsed. Please sign up again.' }
      }
      setIsResending(true)
      await doGet('lookup-test/email_verification_service', { email: bodyParams.email }, onSuccess, getRequestConde)
    } catch (error) {
      setIsResending(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }
  
  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          isLoading={isLoading}
          isResending={isResending}
          formState={formState}
          setFormState={setFormState}
          handleCreateAccount={handleCreateAccount}
          handleCheckUserNameExist={handleCheckUserNameExist}
          handleCongitoConfirmSignUp={handleCongitoConfirmSignUp}
          handleResendCode={handleResendCode}
        />
      )}
    </>
  )
}
