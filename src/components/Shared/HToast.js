import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors, fonts, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HToast = (props) => {
  const {
    message,
    status
  } = props

  const insets = useSafeAreaInsets()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: deviceWidth - 36,
      backgroundColor: colors.primary_100,
      paddingHorizontal: 32,
      paddingVertical: 25,
      borderRadius: 10,
      top: insets.top ? 45 : 20
    },
    messageText: {
      color: colors.white,
      fontSize: 29,
      fontFamily: fonts.bold,
      textAlign: 'center',
      lineHeight: 34
    },
    emojiStyle: {
      width: 42,
      height: 36,
      resizeMode: 'contain',
      tintColor: colors.white,
      marginBottom: 16
    }
  })

  const getIcon = (status) => {
    if (status === 'success') return icons.toastSuccess
    return icons.toastError
  }

  return (
    <View style={styles.container}>
      <Image source={getIcon(status)} style={styles.emojiStyle} />
      <Text style={styles.messageText} numberOfLines={5}>{message}</Text>
    </View>
  )
}

export default HToast
