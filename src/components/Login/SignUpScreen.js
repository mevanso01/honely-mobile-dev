import React, { useState } from 'react'
import { View } from 'react-native'
import { SignUpForm } from './SignUpForm'
import { DescribeForm } from './DescribeForm'
import { BusinessTypeForm } from './BusinessTypeForm'
import { BusinessCompanyForm } from './BusinessCompanyForm'
import { ConsumerTypeForm } from './ConsumerTypeForm'

export const SignUpScreen = (props) => {
  const {
    handleHideSliderButton,
    signUpFormStep,
    setSignUpFormStep
  } = props

  const handleSignUpClick = () => {
    handleHideSliderButton()
    setSignUpFormStep('describe')
  }
  const handleDescibeNextStep = (type) => {
    if (type === 'consumer') {
      setSignUpFormStep('consumerType')
    } else {
      setSignUpFormStep('businessType')
    }
  }
  const handleBusinessTypeNextStep = (type) => {
    setSignUpFormStep('businessCompany')
  }

  return (
    <View style={{ flex: 1 }}>
      {signUpFormStep === 'signUp' && (
        <SignUpForm
          handleNextStep={handleSignUpClick}
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
        <BusinessCompanyForm />
      )}
      {signUpFormStep === 'consumerType' && (
        <ConsumerTypeForm />
      )}
    </View>
  )
}
