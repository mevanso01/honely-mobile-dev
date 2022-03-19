import React, { useState } from 'react'
import { View } from 'react-native'
import { HScreenHeader } from '../Shared'
import styles from './style'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { OTPForm } from './OTPForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import { SuccessForm } from './SuccessForm'

export const ForgotPassword = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const [formStep, setFormStep] = useState('forgot')
  const [recoveryEmail, setRecoverEmail] = useState(null)

  return (
    <View style={styles.wrapper}>
      <HScreenHeader
        title='Forgot Password'
        onPress={() => navigation.goBack()}
      />
      {formStep === 'forgot' && (
        <ForgotPasswordForm
          handleNextStep={() => setFormStep('otp')}
          setRecoverEmail={setRecoverEmail}
        />
      )}
      {formStep === 'otp' && (
        <OTPForm
          recoveryEmail={recoveryEmail}
          handleNextStep={() => setFormStep('reset')}
        />
      )}
      {formStep === 'reset' && (
        <ResetPasswordForm
          handleNextStep={() => setFormStep('success')}
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