import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/styleGuide'

const Inbox = (props) => {
  const inboxProps = {
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
      <Text>Inbox</Text>
    </SafeAreaView>
  )
}

export default Inbox
