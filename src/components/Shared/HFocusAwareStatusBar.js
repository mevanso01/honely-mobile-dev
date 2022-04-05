import * as React from 'react'
import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const HFocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused()

  return isFocused ? <StatusBar {...props} /> : null
}

export default HFocusAwareStatusBar
