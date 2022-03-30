import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ForgotPassword as ForgotPasswordScreen } from '../components/ForgotPassword'
import styled from 'styled-components/native'
import { colors } from '../utils/styleGuide'

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ForgotPassword = (props) => {
  const insets = useSafeAreaInsets()
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
      paddingBottom: insets.bottom,
      paddingTop: Platform.OS === 'ios' ? 30 : 40
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
