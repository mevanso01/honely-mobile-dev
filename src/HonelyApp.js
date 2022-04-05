import React from 'react'
import { LogBox } from 'react-native'
import AppContainer from './AppContainer'
import { NativeBaseProvider } from 'native-base'

LogBox.ignoreLogs([
  ''
])

const HonelyApp = () => {
  return (
    <NativeBaseProvider>
      <AppContainer />
    </NativeBaseProvider>
  )
}

export default HonelyApp
