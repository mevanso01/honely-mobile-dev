import React, { useState } from 'react'
import { View } from 'react-native'
import { ForgotPasswordFuction } from './ForgotPasswordFuction'
import { HScreenHeader } from '../Shared'
import styles from './style'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { OTPForm } from './OTPForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import { SuccessForm } from './SuccessForm'

const ForgotPasswordUI = (props) => {
  const {
    navigation,
    onNavigationRedirect,

    formStep,
    setFormStep,
    isLoading,
    formState,
    setFormState,
    handleUserIdentify,
    handleResetPassword
  } = props

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

export const ForgotPassword = (props) => {
  const forgotPasswordProps = {
    ...props,
    UIComponent: ForgotPasswordUI
  }
  return <ForgotPasswordFuction {...forgotPasswordProps} />
}
