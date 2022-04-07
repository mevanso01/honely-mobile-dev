import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContactedLeads as ContactedLeadsScreen } from '../components/ContactedLeads'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const ContactedLeads = (props) => {
  const insets = useSafeAreaInsets()
  const contactedLeadsProps = {
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
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <ContactedLeadsScreen {...contactedLeadsProps} />
    </SafeAreaView>
  )
}

export default ContactedLeads
