import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Home as HomeScreen } from '../components/Home';
import { useTheme } from 'styled-components/native';

const Home = (props) => {
  const theme = useTheme();
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
      backgroundColor: theme.colors.backgroundColor,
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeScreen {...homeProps} />
    </SafeAreaView>
  )
}

export default Home