import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { ContactLeadPreset as ContactLeadPresetScreen} from '../components/ContactLeadPreset'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ContactLeadPreset = (props) => {
  const contactLeadPresetProps = {
    ...props,
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
        <ContactLeadPresetScreen {...contactLeadPresetProps} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ContactLeadPreset
