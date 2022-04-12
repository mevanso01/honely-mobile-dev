import React from 'react';
import { StyleSheet, View } from 'react-native'
import { BuyLeads as BuyLeadsScreen } from '../components/BuyLeads'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const BuyLeads = (props) => {
  const buyLeadsProps = {
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
    <View style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <BuyLeadsScreen {...buyLeadsProps} />
    </View>
  )
}

export default BuyLeads
