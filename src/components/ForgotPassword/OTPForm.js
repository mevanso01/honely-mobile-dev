import React, { useState } from 'react'
import { View } from 'react-native'
import { HText, HButton } from '../Shared'
import { Box, HStack } from 'native-base'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import styles from './style'

export const OTPForm = (props) => {
  const {
    recoveryEmail,
    handleNextStep
  } = props

  const [error, setError] = useState(null)
  const [code, setCode] = useState(null)

  const handleSubmitClick = () => {
    if (code) {
      handleNextStep()
    } else {
      setError('The OTP code is required.')
    }
  }

  return (
    <View>
      <Box alignItems='center' mb='8'>
        <HText style={styles.subtitle}>Enter OTP</HText>
        <HText style={styles.description}>An 4 digit code has been sent to</HText>
        <HText style={styles.description}>{recoveryEmail}</HText>
      </Box>
      <Box mt='8'>
        <OTPInputView
          pinCount={4}
          style={styles.otpView}
          autoFocusOnLoad
          keyboardType='number-pad'
          codeInputFieldStyle={styles.underlineStyleBase}
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
          text='Submit'
          onPress={handleSubmitClick}
        />
      </Box>
    </View>
  )
}
