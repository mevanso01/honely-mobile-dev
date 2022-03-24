import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native';
import { HButton } from '../components/Shared'
import { colors } from '../utils/styleGuide'
import { signoutUser } from '../store/action/setUser'
import { useDispatch } from 'react-redux'

const Leads = (props) => {
  const dispatch = useDispatch()
  const homeProps = {
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
      padding: 50,
      alignItems: 'center'
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Leads dashboard</Text>
      <HButton
        text='Sign out'
        onPress={() => dispatch(signoutUser())}
      />
    </SafeAreaView>
  )
}

export default Leads
