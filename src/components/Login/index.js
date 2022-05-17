import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { HSliderButton, HScreenHeader} from '../Shared'
import { LoginForm } from './LoginForm'
import { SignUpScreen } from '../Signup'

import styles from './style'

export const Login = (props) => {
  const {
    isSignUp,
    navigation,
    onNavigationRedirect
  } = props

  const [isSignUpScreen, setIsSignUpScreen] = useState(isSignUp || false)
  const [isShowSliderButton, setIsShowSliderButton] = useState(true)

  const [signUpFormStep, setSignUpFormStep] = useState('success')

  const handleGoBack = () => {
    if (isSignUpScreen) {
      switch (signUpFormStep) {
        case 'signUpAgree':
          setSignUpFormStep('signUp')
          break
        case 'businessCompany':
          setSignUpFormStep('signUpAgree')
          break
        case 'otp':
          setSignUpFormStep('businessCompany')
          break 
        default:
          navigation.goBack()
          break
      }
    } else {
      navigation.goBack()
    }
  }

  const handleGoToLogin = () => {
    setIsSignUpScreen(false)
    setIsShowSliderButton(true)
    setSignUpFormStep('signUp')
  }

  useEffect(() => {
    if (signUpFormStep === 'signUp') {
      setIsShowSliderButton(true)
    }
  }, [signUpFormStep])

  return (
    <View style={styles.wrapper}>
      {!(signUpFormStep === 'success' && isSignUpScreen) && (
        <HScreenHeader
          title={isSignUpScreen ? 'Sign Up' : 'Login'}
          onPress={() => handleGoBack()}
        />
      )}

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
          handleGoToLogin={() => handleGoToLogin()}
        />
      )}
    </View>
  )
}
