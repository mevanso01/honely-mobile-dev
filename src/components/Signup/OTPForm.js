import React, { useState } from 'react'
import { HText, HButton, HToast } from '../Shared'
import { Box, HStack, ScrollView, useToast } from 'native-base'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import styles from './style'

import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setFormState, handleResendCode, handleCongitoConfirmSignUp, handleLogin } from './store'

export const OTPForm = (props) => {
  const { setSignUpFormStep } = props
  const toast = useToast()
  const dispatch = useDispatch()
  const { isLoading, isResending, formState } = useSelector(({ screens }) => screens.signup)

  const [error, setError] = useState(null)
  const [code, setCode] = useState(null)

  const handleSubmitClick = async () => {
    if (code) {
      try {
        await dispatch(handleCongitoConfirmSignUp(formState.userName, code, formState.email))
        setSignUpFormStep('success')
        setTimeout(() => {
          doLogin()
        }, 3000)
      } catch (error) {
        toast.show({
          render: () => <HToast status='error' message={error.message} />,
          placement: 'top',
          duration: TOAST_LENGTH_SHORT
        })
      }
    } else {
      setError('The OTP code is required.')
    }
  }

  const doLogin = async () => {
    try {
      dispatch(handleLogin(formState.userName, formState.password, formState.email))
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
      handleGoToLogin()
    }
  }

  const doResendCode = async () => {
    try {
      await dispatch(handleResendCode(formState.email, formState.userName))
      toast.show({
        render: () => <HToast status='success' message='Resent Email Verification Code!' />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
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
      <Box alignItems='center' mt='8'>
        <HButton
          text='Submit'
          onPress={handleSubmitClick}
          isLoading={isLoading}
          isDisabled={isResending}
        />
      <Box alignItems='center' mt='3'>
        <HButton
          text='Resend Code'
          backgroundColor={colors.white}
          borderColor={colors.white}
          textStyle={{
            color: colors.primary,
            fontSize: 16
          }}
          shadow={null}
          onPress={() => doResendCode()}
          isLoadingText='Please wait...'
          isLoading={isResending}
        />
      </Box>
      </Box>
    </ScrollView>
  )
}
