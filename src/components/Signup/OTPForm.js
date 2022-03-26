import React, { useState } from 'react'
import { HText, HButton } from '../Shared'
import { Box, HStack, ScrollView } from 'native-base'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import styles from './style'

export const OTPForm = (props) => {
  const {
    isLoading,
    isResending,
    formState,
    setFormState,
    handleCongitoConfirmSignUp,
    handleResendCode
  } = props

  const [error, setError] = useState(null)
  const [code, setCode] = useState(null)

  const handleSubmitClick = () => {
    if (code) {
      setFormState({
        ...formState,
        code: code
      })
      handleCongitoConfirmSignUp(code)
    } else {
      setError('The OTP code is required.')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.signUpFormWrapper}
    >
      <Box alignItems='center' mb='8'>
        <HText style={styles.subtitle}>Enter OTP</HText>
        <HText style={styles.description}>An 6 digit code has been sent to</HText>
        <HText style={styles.description}>{formState?.email}</HText>
      </Box>
      <Box mt='8'>
        <OTPInputView
          pinCount={6}
          style={styles.otpView}
          autoFocusOnLoad
          keyboardType='number-pad'
          codeInputFieldStyle={styles.otpInputStyle}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          editable
          onCodeFilled={value => {
            setCode(value)
          }}
        />
      </Box>
      {error && (
        <HStack alignItems='center' justifyContent='center' mt={2}>
          <MaterialIcons name='warning' color={colors.error} />
          <HText style={styles.errorText}>{error}</HText>
        </HStack>
      )}
      <Box alignItems='center' mt='6'>
        <HButton
          text='Resend'
          onPress={handleResendCode}
          isLoadingText='Please wait...'
          isLoading={isResending}
        />
      </Box>
      <Box alignItems='center' mt='6'>
        <HButton
          text='Submit'
          onPress={handleSubmitClick}
          isLoading={isLoading}
          isDisabled={isResending}
        />
      </Box>
    </ScrollView>
  )
}
