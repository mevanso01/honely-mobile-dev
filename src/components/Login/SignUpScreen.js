import React, { useState } from 'react'
import { View } from 'react-native'
import { SignUpForm } from './SignUpForm'
import { DescribeForm } from './DescribeForm'
import { BusinessTypeForm } from './BusinessTypeForm'
import { BusinessCompanyForm } from './BusinessCompanyForm'
import { ConsumerTypeForm } from './ConsumerTypeForm'

export const SignUpScreen = (props) => {
  const {
    handleHideSliderButton
  } = props
  const [formStep, setFormStep] = useState('signUp')

  const handleSignUpClick = () => {
    handleHideSliderButton()
    setFormStep('describe')
  }
  const handleDescibeNextStep = (type) => {
    if (type === 'consumer') {
      setFormStep('consumerType')
    } else {
      setFormStep('businessType')
    }
  }
  const handleBusinessTypeNextStep = (type) => {
    setFormStep('businessCompany')
  }

  return (
    <View style={{ flex: 1 }}>
      {formStep === 'signUp' && (
        <SignUpForm
          handleNextStep={handleSignUpClick}
        />
      )}
      {formStep === 'describe' && (
        <DescribeForm
          handleNextStep={handleDescibeNextStep}
        />
      )}
      {formStep === 'businessType' && (
        <BusinessTypeForm
          handleNextStep={handleBusinessTypeNextStep}
        />
      )}
      {formStep === 'businessCompany' && (
        <BusinessCompanyForm />
      )}
      {formStep === 'consumerType' && (
        <ConsumerTypeForm />
      )}
    </View>
  )
}
