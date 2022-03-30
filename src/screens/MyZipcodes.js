import React from 'react';
import { StyleSheet, SafeAreaView, Text, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../utils/styleGuide'

const MyZipcodes = (props) => {
  const insets = useSafeAreaInsets()
  const myZipcodesProps = {
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
      <Text>My Zipcodes</Text>
    </SafeAreaView>
  )
}

export default MyZipcodes
