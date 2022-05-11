import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { BillingInfo as BillingInfoScreen } from '../components/BillingInfo'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const BillingInfo = (props) => {
  const insets = useSafeAreaInsets()
  const billingInfoProps = {
    ...props,
    totalPrice: props.route.params?.totalPrice,
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
        <BillingInfoScreen {...billingInfoProps} />
      </KeyboardView>
    </SafeAreaView>
  )
}

export default BillingInfo
