import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import { ThemeProvider } from './contexts/Theme'
import theme from './theme.json'

import AppContainer from './AppContainer'
import { NativeBaseProvider } from 'native-base'

LogBox.ignoreLogs([
  ''
])

theme.images = {
  logo: require('./assets/images/logo.png'),
  intros: {
    slider1: require('./assets/images/slider-1.png'),
    slider2: require('./assets/images/slider-2.png'),
    slider3: require('./assets/images/slider-3.png'),
    slider4: require('./assets/images/slider-4.png')
  }
}

theme.icons = {
  leftArrow: require('./assets/icons/left-arrow.png'),
  message: require('./assets/icons/message.png'),
  lock: require('./assets/icons/lock.png'),
  eye: require('./assets/icons/eye.png')
}

const HonelyApp = () => {
  return (
    <NativeBaseProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <AppContainer />
      </ThemeProvider>
    </NativeBaseProvider>
  )
}

export default HonelyApp
