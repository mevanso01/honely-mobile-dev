import React, { useState } from 'react'
import { View } from 'react-native'
import { HScreenHeader } from '../Shared'
import styles from './style'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { OTPForm } from './OTPForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import { SuccessForm } from './SuccessForm'
import { useToast } from 'native-base'
import { TOAST_LENGTH_SHORT } from '../../config'
import { doGet } from '../../services/http-client'
import { useDispatch } from 'react-redux'
import { cognitoForgotPassword, cognitoResetPassword } from '../../store/reducer/cognitoUser'

export const ForgotPassword = (props) => {
  const {
    navigation,
    onNavigationRedirect   
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const [formStep, setFormStep] = useState('forgot')
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({})

  const handleCognitoSendForgotPasswordCode = async (username) => {
    try {
      await dispatch(cognitoForgotPassword(username))
      setIsLoading(false)
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
      await dispatch(cognitoResetPassword(username, code, new_password))
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
    <View style={styles.wrapper}>
      <HScreenHeader
        title='Forgot Password'
        onPress={() => navigation.goBack()}
      />
      {formStep === 'forgot' && (
        <ForgotPasswordForm
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleUserIdentify={handleUserIdentify}
        />
      )}
      {formStep === 'otp' && (
        <OTPForm
          formState={formState}
          setFormState={setFormState}
          handleNextStep={() => setFormStep('reset')}
        />
      )}
      {formStep === 'reset' && (
        <ResetPasswordForm
          isLoading={isLoading}
          handleResetPassword={handleResetPassword}
        />
      )}
      {formStep === 'success' && (
        <SuccessForm
          onNavigationRedirect={onNavigationRedirect}
        />
      )}
    </View>
  )
}
