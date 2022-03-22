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

  const [formState, setFormState] = useState({})
  const handleSignUpClick = (values) => {
    handleHideSliderButton()
    setSignUpFormStep('describe')
    setFormState({
      ...formState,
      ...values
    })
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
          formState={formState}
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
        <BusinessCompanyForm
          formState={formState}
          setFormState={setFormState}
        />
      )}
      {signUpFormStep === 'consumerType' && (
        <ConsumerTypeForm />
      )}
    </View>
  )
}
