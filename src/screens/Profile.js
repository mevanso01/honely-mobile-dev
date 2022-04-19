import React from 'react';
import { StyleSheet, View, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../utils/styleGuide'
import { Profile as ProfileScreen } from '../components/Profile'
import { HFocusAwareStatusBar } from '../components/Shared'

const Profile = (props) => {
  const insets = useSafeAreaInsets()
  const profileProps = {
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
    }
  })

  return (
    <View style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.primary}
        barStyle='dark-content'
      />
      <ProfileScreen {...profileProps} />
    </View>
  )
}

export default Profile
