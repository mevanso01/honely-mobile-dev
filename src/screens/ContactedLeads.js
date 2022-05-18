import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { ContactedLeads as ContactedLeadsScreen } from '../components/ContactedLeads'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const ContactedLeads = (props) => {
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
      backgroundColor: colors.backgroundLightGray
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
