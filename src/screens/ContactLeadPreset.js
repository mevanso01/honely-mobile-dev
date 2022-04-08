import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ContactLeadPreset as ContactLeadPresetScreen} from '../components/ContactLeadPreset'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const ContactLeadPreset = (props) => {
  const insets = useSafeAreaInsets()
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
      <ContactLeadPresetScreen {...contactLeadPresetProps} />
    </SafeAreaView>
  )
}

export default ContactLeadPreset
