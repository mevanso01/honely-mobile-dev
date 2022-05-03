import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../utils/styleGuide'
import { LeadsDashboard } from '../components/LeadsDashboard'
import { HFocusAwareStatusBar } from '../components/Shared'

const Leads = (props) => {
  const leadsProps = {
    ...props,
    onNavigationRedirect: (page, params) => {
      if (!page) return
      props.navigation.navigate(page, params);
    },
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.backgroundColor
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <LeadsDashboard {...leadsProps} />
    </SafeAreaView>
  )
}

export default Leads
