import React from 'react';
import { StyleSheet, View } from 'react-native'
import { LeadsMap as LeadsMapScreen } from '../components/LeadsMap'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const LeadsMap = (props) => {
  const leadsMapProps = {
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
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <LeadsMapScreen {...leadsMapProps} />
    </View>
  )
}

export default LeadsMap
