import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/styleGuide'

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
      padding: 50
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Buy Leads</Text>
    </SafeAreaView>
  )
}

export default BuyLeads
