import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home as HomeScreen } from '../components/Home'
import { colors } from '../utils/styleGuide'

const Home = (props) => {
  const insets = useSafeAreaInsets()
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
      paddingBottom: insets.bottom,
      paddingTop: Platform.OS === 'ios' ? 30 : 40
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeScreen {...homeProps} />
    </SafeAreaView>
  )
}

export default Home