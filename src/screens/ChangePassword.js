import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../utils/styleGuide'
import { ChangePassword as ChangePasswordScreen } from '../components/ChangePassword'
import styled from 'styled-components/native'
import { HFocusAwareStatusBar } from '../components/Shared'

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ChangePassword = (props) => {
  const insets = useSafeAreaInsets()
  const changePasswordProps = {
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
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChangePasswordScreen {...changePasswordProps} />
      </KeyboardView>
    </SafeAreaView>
  )
}

export default ChangePassword
