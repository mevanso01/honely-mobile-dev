import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Home as HomeScreen } from '../components/Home';
import { colors } from '../utils/styleGuide'

const Home = (props) => {
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
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeScreen {...homeProps} />
    </SafeAreaView>
  )
}

export default Home