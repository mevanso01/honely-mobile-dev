import React, { useState } from 'react'
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

  return (
    <View style={styles.wrapper}>
      <HScreenHeader
        title={isSignUpScreen ? 'Sign Up' : 'Login'}
        onPress={() => navigation.goBack()}
      />

      {isShowSliderButton && (
        <HSliderButton
          isForceActive={isSignUpScreen}
          firstText='Log In'
          secondText='Sign Up'
          onFirstPress={() => setIsSignUpScreen(false)}
          onSecondPress={() => setIsSignUpScreen(true)}
        />
      )}

      {!isSignUpScreen ? (
        <LoginForm
          onNavigationRedirect={onNavigationRedirect}
        />
      ) : (
        <SignUpScreen
          handleHideSliderButton={() => setIsShowSliderButton(false)}
        />
      )}
    </View>
  )
}
