import React from 'react'
import { View } from 'react-native'
import { HText, HScreenHeader } from '../Shared'
import styles from './style'

export const ForgotPassword = (props) => {
  const {
    navigation
  } = props

  return (
    <View style={styles.wrapper}>
      <HScreenHeader
        title='Forgot Password'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}