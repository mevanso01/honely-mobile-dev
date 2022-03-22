import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { HSliderButton, HScreenHeader} from '../Shared'
import { LoginForm } from './LoginForm'
import { SignUpScreen } from './SignUpScreen'

import styles from './style'

export const Login = (props) => {
  const {
    isSignUp,
    navigation,
    onNavigationRedirect
  } = props

  const [isSignUpScreen, setIsSignUpScreen] = useState(isSignUp || false)
  const [isShowSliderButton, setIsShowSliderButton] = useState(true)

  const [signUpFormStep, setSignUpFormStep] = useState('signUp')

  const handleGoBack = () => {
    if (isSignUpScreen) {
      switch (signUpFormStep) {
        case 'describe':
          setSignUpFormStep('signUp')
          break
        case 'businessType':
          setSignUpFormStep('describe')
          break
        case 'businessCompany':
          setSignUpFormStep('businessType')
          break
        case 'consumerType':
          setSignUpFormStep('describe')
          break       
        default:
          navigation.goBack()
          break
      }
    } else {
      navigation.goBack()
    }
  }

  useEffect(() => {
    if (signUpFormStep === 'signUp') {
      setIsShowSliderButton(true)
    }
  }, [signUpFormStep])

  return (
    <View style={styles.wrapper}>
      <HScreenHeader
        title={isSignUpScreen ? 'Sign Up' : 'Login'}
        onPress={() => handleGoBack()}
      />

      <View style={{ display: isShowSliderButton ? 'flex' : 'none' }}>
        <HSliderButton
          isForceActive={isSignUpScreen}
          firstText='Log In'
          secondText='Sign Up'
          onFirstPress={() => setIsSignUpScreen(false)}
          onSecondPress={() => setIsSignUpScreen(true)}
        />
      </View>

      {!isSignUpScreen ? (
        <LoginForm
          onNavigationRedirect={onNavigationRedirect}
        />
      ) : (
        <SignUpScreen
          signUpFormStep={signUpFormStep}
          setSignUpFormStep={setSignUpFormStep}
          handleHideSliderButton={() => setIsShowSliderButton(false)}
        />
      )}
    </View>
  )
}
