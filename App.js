import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HonelyApp from './src/HonelyApp'
import { store, persistor } from './src/store/configureStore'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <HonelyApp />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
