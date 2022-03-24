import React, { useState } from 'react'
import { SignUpScreenFunction } from './SignUpScreenFunction'
import { View } from 'react-native'
import { SignUpForm } from './SignUpForm'
import { DescribeForm } from './DescribeForm'
import { BusinessTypeForm } from './BusinessTypeForm'
import { BusinessCompanyForm } from './BusinessCompanyForm'
import { ConsumerTypeForm } from './ConsumerTypeForm'

const SignUpScreenUI = (props) => {
  const {
    handleHideSliderButton,
    signUpFormStep,
    setSignUpFormStep,

    isLoading,
    formState,
    setFormState,
    handleCheckUserNameExist,
    handleCreateAccount
  } = props

  const handleSignUpClick = () => {
    handleHideSliderButton()
    setSignUpFormStep('describe')
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
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleCheckUserNameExist={handleCheckUserNameExist}
          handleNextStep={handleSignUpClick}
        />
      )}
      {signUpFormStep === 'describe' && (
        <DescribeForm
          formState={formState}
          setFormState={setFormState}
          handleNextStep={handleDescibeNextStep}
        />
      )}
      {signUpFormStep === 'businessType' && (
        <BusinessTypeForm
          formState={formState}
          setFormState={setFormState}
          handleNextStep={handleBusinessTypeNextStep}
        />
      )}
      {signUpFormStep === 'businessCompany' && (
        <BusinessCompanyForm
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleCreateAccount={handleCreateAccount}
        />
      )}
      {signUpFormStep === 'consumerType' && (
        <ConsumerTypeForm
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleCreateAccount={handleCreateAccount}
        />
      )}
    </View>
  )
}

export const SignUpScreen = (props) => {
  const signUpProps = {
    ...props,
    UIComponent: SignUpScreenUI
  }
  return <SignUpScreenFunction {...signUpProps} />
}