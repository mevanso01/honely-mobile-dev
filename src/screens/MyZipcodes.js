import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/styleGuide'

const MyZipcodes = (props) => {
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
      padding: 50
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>My Zipcodes</Text>
    </SafeAreaView>
  )
}

export default MyZipcodes
