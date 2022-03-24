import React, { useState } from 'react'
import { useToast } from 'native-base';
import { doGet, doPost } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch } from 'react-redux'
import { setCognitoUser } from '../../store/action/setCognitoUser'
import config from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)

export const SignUpScreenFunction = (props) => {
  const {
    UIComponent
  } = props

  const dispatch = useDispatch()
  const toast = useToast()
  const [formState, setFormState] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
        // first_name: formState.firstName,
        // last_name: formState.lastName,
        email: formState.email,
        phone_number: fullPhone,
        membership_type: 'FREE',
        // email_consent: emailConsent,
        // promo_code: formState.promoCode,
        user_type: userType,
        site_leads: siteLeads,
        button_leads: "FALSE",
        home_url: null,
        // interested_zip_codes: ',
        // home_address: '',
        // home_zip_code: '',
      }

      const response = await doGet('lookup-test/email_verification_service', { email: params.email })
      if (response.result === 'Error') {
        throw response
      }
      handleCognitoSignup(params, params.user_name, formState.password, params.email, params.phone_number)
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

  const handleCognitoSignup = async (params, username, password, email, phone_number) => {
    try {
      const cognitoUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
        }
      })
      dispatch(setCognitoUser(cognitoUser))
      handleUnconfirmedUserAddition(params)
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
      toast.show({
        title: 'Success',
        description: 'Sign up is successful!',
        status: 'success',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
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
  
  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleCreateAccount={handleCreateAccount}
          handleCheckUserNameExist={handleCheckUserNameExist}
        />
      )}
    </>
  )
}
