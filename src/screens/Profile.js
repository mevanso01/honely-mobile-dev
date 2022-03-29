import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../utils/styleGuide'

import { Profile as ProfileScreen } from '../components/Profile';

const Profile = (props) => {
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
    <SafeAreaView style={styles.wrapper}>
      <ProfileScreen {...profileProps} />
    </SafeAreaView>
  )
}

export default Profile
