import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { LeadsCheckout as LeadsCheckoutScreen } from '../components/LeadsCheckout'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const LeadsCheckout = (props) => {
  const leadsCheckoutProps = {
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
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <LeadsCheckoutScreen {...leadsCheckoutProps} />
    </SafeAreaView>
  )
}

export default LeadsCheckout
