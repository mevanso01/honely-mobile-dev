import React from 'react'
import { View } from 'react-native'
import { SignUpForm } from './SignUpForm'
import { SignUpAgreeForm } from './SignUpAgreeForm'
import { DescribeForm } from './DescribeForm'
import { BusinessTypeForm } from './BusinessTypeForm'
import { BusinessCompanyForm } from './BusinessCompanyForm'
import { ConsumerTypeForm } from './ConsumerTypeForm'
import { OTPForm } from './OTPForm'
import { Success } from './Success'

export const SignUpScreen = (props) => {
  const {
    handleHideSliderButton,
    signUpFormStep,
    setSignUpFormStep,
    handleGoToLogin
  } = props

  const handleSignUpClick = () => {
    handleHideSliderButton()
    setSignUpFormStep('signUpAgree')
  }
  const handleDescibeNextStep = (type) => {
    if (type === 'Homeowner') {
      setSignUpFormStep('consumerType')
    } else {
      setSignUpFormStep('businessType')
    }
  }
  const handleBusinessTypeNextStep = () => {
    setSignUpFormStep('businessCompany')
  }

  return (
    <View style={{ flex: 1 }}>
      {signUpFormStep === 'signUp' && (
        <SignUpForm
          handleNextStep={handleSignUpClick}
        />
      )}
      {signUpFormStep === 'signUpAgree' && (
        <SignUpAgreeForm
          handleNextStep={() => setSignUpFormStep('businessType')}
        />
      )}
      {signUpFormStep === 'describe' && (
        <DescribeForm
          handleNextStep={handleDescibeNextStep}
        />
      )}
      {signUpFormStep === 'businessType' && (
        <BusinessTypeForm
          handleNextStep={handleBusinessTypeNextStep}
        />
      )}
      {signUpFormStep === 'businessCompany' && (
        <BusinessCompanyForm
          setSignUpFormStep={setSignUpFormStep}
        />
      )}
      {signUpFormStep === 'otp' && (
        <OTPForm
          setSignUpFormStep={setSignUpFormStep}
          handleGoToLogin={handleGoToLogin}
        />
      )}
      {signUpFormStep === 'consumerType' && (
        <ConsumerTypeForm
          handleCreateAccount={handleCreateAccount}
        />
      )}
      {signUpFormStep === 'success' && (
        <Success />
      )}
    </View>
  )
}
