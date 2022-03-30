import React, { useState } from 'react'
import { SignUpScreenFunction } from './SignUpScreenFunction'
import { View } from 'react-native'
import { SignUpForm } from './SignUpForm'
import { SignUpAgreeForm } from './SignUpAgreeForm'
import { DescribeForm } from './DescribeForm'
import { BusinessTypeForm } from './BusinessTypeForm'
import { BusinessCompanyForm } from './BusinessCompanyForm'
import { ConsumerTypeForm } from './ConsumerTypeForm'
import { OTPForm } from './OTPForm'
import { Success } from './Success'

const SignUpScreenUI = (props) => {
  const {
    handleHideSliderButton,
    signUpFormStep,
    setSignUpFormStep,

    isLoading,
    isResending,
    formState,
    setFormState,
    handleCheckUserNameExist,
    handleCreateAccount,
    handleCongitoConfirmSignUp,
    handleResendCode
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
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleCheckUserNameExist={handleCheckUserNameExist}
          handleNextStep={handleSignUpClick}
        />
      )}
      {signUpFormStep === 'signUpAgree' && (
        <SignUpAgreeForm
          formState={formState}
          setFormState={setFormState}
          handleNextStep={() => setSignUpFormStep('businessType')}
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
      {signUpFormStep === 'otp' && (
        <OTPForm
          isLoading={isLoading}
          isResending={isResending}
          formState={formState}
          setFormState={setFormState}
          handleResendCode={handleResendCode}
          handleCongitoConfirmSignUp={handleCongitoConfirmSignUp}
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
      {signUpFormStep === 'success' && (
        <Success
          formState={formState}
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