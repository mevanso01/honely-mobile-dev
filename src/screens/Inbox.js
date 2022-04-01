import React from 'react';
import { StyleSheet, SafeAreaView, Text, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Inbox as InboxScreen } from '../components/Inbox'
import { colors } from '../utils/styleGuide'

const Inbox = (props) => {
  const insets = useSafeAreaInsets()
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
      paddingBottom: insets.bottom,
      paddingTop: Platform.OS === 'ios' ? 30 : 40,
      paddingHorizontal: 18
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <InboxScreen {...inboxProps} />
    </SafeAreaView>
  )
}

export default Inbox
