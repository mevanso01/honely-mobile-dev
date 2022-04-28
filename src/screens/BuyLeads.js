import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { BuyLeads as BuyLeadsScreen } from '../components/BuyLeads'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const BuyLeads = (props) => {
  const buyLeadsProps = {
    ...props,
    fullAddres: props.route.params?.fullAddres,
    defaultFilterBy: props.route.params?.filterBy,
    leads: props.route.params?.leads,
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
      <BuyLeadsScreen {...buyLeadsProps} />
    </SafeAreaView>
  )
}

export default BuyLeads
