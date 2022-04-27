import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HToast = (props) => {
  const {
    message,
    type
  } = props
  const insets = useSafeAreaInsets()

  let backgroundColor = '#333333'
  switch (type) {
    case 'info':
      backgroundColor = '#6ba4ff'
      break
    case 'error':
      backgroundColor = '#D83520'
      break
    case 'success':
      backgroundColor = '#5db85c'
      break
    default:
      backgroundColor = '#333333'
  }

  const styles = StyleSheet.create({
    container: {
      width: deviceWidth,
      backgroundColor: backgroundColor,
      paddingHorizontal: 18,
      paddingVertical: 15,
      bottom: insets.bottom ? -18 : -50
    },
    messageText: {
      color: colors.white,
      fontSize: 14
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  )
}



export default HToast
