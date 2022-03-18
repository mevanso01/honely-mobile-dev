import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import AppContainer from './AppContainer'
import { NativeBaseProvider } from 'native-base'

LogBox.ignoreLogs([
  ''
])

const HonelyApp = () => {
  return (
    <NativeBaseProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle='dark-content'
      />
      <AppContainer />
    </NativeBaseProvider>
  )
}

export default HonelyApp
