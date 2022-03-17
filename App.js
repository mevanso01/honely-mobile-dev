import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HonelyApp from './src/HonelyApp'

const App = () => {
  return (
    <SafeAreaProvider>
      <HonelyApp />
    </SafeAreaProvider>
  )
}

export default App
