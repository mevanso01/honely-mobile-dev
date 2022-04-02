import React from 'react'
import { View } from 'react-native'
import { HText } from '../Shared'
import styles from './style'

export const Inbox = (props) => {
  return (
    <View style={styles.screenContainer}>
      <HText style={styles.title}>Lead Contacting</HText>
    </View>
  )
}
