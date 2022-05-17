import React, { useState } from 'react'
import { HText, HButton, HToast } from '../Shared'
import { Box, HStack, ScrollView, useToast } from 'native-base'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import { doGet } from '../../services/http-client'
import { cognitoResendSignUp } from '../../store/reducer/cognitoUser'
import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch } from 'react-redux'

import styles from './style'

export const OTPForm = (props) => {
  const {
    formState,
    setFormState,
    handleNextStep
  } = props

  const toast = useToast()
  const dispatch = useDispatch()

  const [error, setError] = useState(null)
  const [code, setCode] = useState(null)
  const [isResending, setIsResending] = useState(false)

  const handleSubmitClick = () => {
    if (code) {
      setFormState({
        ...formState,
        code: code
      })
      handleNextStep()
    } else {
      setError('The OTP code is required.')
    }
  }

  const handleResendCode = async (email, username) => {
    try {
      const onSuccess = () => {
        throw { message: 'Too much time has elapsed. Please sign up again.' }
      }
      setIsResending(true)
      const getRequestCode = async () => {
        try {
          await dispatch(cognitoResendSignUp(username))
          setIsResending(false)
          toast.show({
            render: () => <HToast status='success' message='Resent Email Verification Code!' />,
            placement: 'top',
            duration: TOAST_LENGTH_SHORT
          })
        } catch (error) {
          setIsResending(false)
          throw error
        }
      }
    
      await doGet('lookup-test/email_verification_service', { email: email }, onSuccess, getRequestCode)
    } catch (error) {
      setIsResending(false)
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
    >
      <Box alignItems='center' mb='8'>
        <HText style={styles.subtitle}>Enter OTP</HText>
        <HText style={styles.description}>An 6 digit code has been sent to</HText>
        <HText style={styles.description}>{formState?.email}</HText>
      </Box>
      <Box mt='9'>
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
        />
      </Box>
      <Box alignItems='center' mt='8'>
        <HButton
          text='Resend Code'
          backgroundColor={colors.white}
          borderColor={colors.white}
          textStyle={{
            color: colors.primary,
            fontSize: 16
          }}
          shadow={null}
          onPress={() => handleResendCode(formState?.email, formState?.userName)}
          isLoadingText='Please wait...'
          isLoading={isResending}
        />
      </Box>
    </ScrollView>
  )
}
