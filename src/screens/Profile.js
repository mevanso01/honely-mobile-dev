import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/styleGuide'
import { useDispatch } from 'react-redux'
import { signoutUser } from '../store/action/setUser'
import { HButton } from '../components/Shared'

const Profile = (props) => {
  const dispatch = useDispatch()
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
      padding: 50
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Profile</Text>
      <HButton
        text='Sign out'
        onPress={() => dispatch(signoutUser())}
      />
    </SafeAreaView>
  )
}

export default Profile
