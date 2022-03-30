import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../utils/styleGuide'

import { Profile as ProfileScreen } from '../components/Profile'

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
      paddingBottom: insets.bottom,
      paddingTop: Platform.OS === 'ios' ? 30 : 40
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <ProfileScreen {...profileProps} />
    </SafeAreaView>
  )
}

export default Profile
