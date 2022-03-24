import React, { useState } from 'react'
import { useToast } from 'native-base';
import { doGet } from '../../services/http-client'
import { useDispatch } from 'react-redux'
import { TOAST_LENGTH_SHORT } from '../../config'
import config from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)

export const ForgotPasswordFuction = (props) => {
  const {
    UIComponent
  } = props
  
  const toast = useToast()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formStep, setFormStep] = useState('forgot')
  const [formState, setFormState] = useState({})

  const handleUserIdentify = async (email) => {
    try {
      setIsLoading(true)
      const response = await doGet('lookup/user_name_fetch', { user_identifier: email })
      if (response.result === 'Error.') {
        throw response
      }
      setFormState({
        ...formState,
        userName: response.user_name
      })
      handleCognitoSendForgotPasswordCode(response.user_name)
      setFormStep('otp')
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

  const handleCognitoSendForgotPasswordCode = async (username) => {
    try {
      await Auth.forgotPassword(username)
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

  const handleResetPassword = async (new_password) => {
    try {
      setIsLoading(true)
      const username = formState.userName
      const code = formState.code
      await Auth.forgotPasswordSubmit(username, code, new_password)
      setFormStep('success')
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
      setIsLoading(false)
    }
  }

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          formState={formState}
          setFormState={setFormState}
          isLoading={isLoading}
          formStep={formStep}
          setFormStep={setFormStep}
          handleUserIdentify={handleUserIdentify}
          handleResetPassword={handleResetPassword}
        />
      )}
    </>
  )
}
