import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { ContactLead as ContactLeadScreen} from '../components/ContactLead'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ContactLead = (props) => {
  const contactLeadProps = {
    ...props,
    level: props.route.params?.level,
    defaultLead: props.route.params?.lead,
    onNavigationRedirect: (page, params) => {
      if (!page) return
      props.navigation.navigate(page, params);
    },
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.backgroundColor
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <ContactLeadScreen {...contactLeadProps} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ContactLead
