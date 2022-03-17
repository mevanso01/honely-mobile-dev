import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { ThemeProvider } from './contexts/Theme'
import theme from './theme.json'

import SplashScreen from 'react-native-splash-screen'
import AppContainer from './AppContainer'

LogBox.ignoreLogs([
  ''
])

theme.images = {
  logo: require('./assets/images/logo.png'),
  intros: {
    slide1: require('./assets/images/slider-1.png'),
    slide2: require('./assets/images/slider-2.png'),
    slide3: require('./assets/images/slider-3.png'),
    slide4: require('./assets/images/slider-4.png')
  }
}

const HonelyApp = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  )
}

export default HonelyApp
