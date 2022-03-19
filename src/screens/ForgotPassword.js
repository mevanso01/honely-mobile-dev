import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { ForgotPassword as ForgotPasswordScreen } from '../components/ForgotPassword'
import styled from 'styled-components/native'
import { colors } from '../utils/styleGuide'

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ForgotPassword = (props) => {
  const forgotPasswordProps = {
    ...props,
    onNavigationRedirect: (page, params) => {
      if (!page) return
      props.navigation.navigate(page, params);
    },
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ForgotPasswordScreen {...forgotPasswordProps} />
      </KeyboardView>
    </SafeAreaView>
  )
}

export default ForgotPassword
