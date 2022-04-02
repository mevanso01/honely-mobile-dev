import React from 'react'
import { View } from 'react-native'
import { HText } from '../Shared'
import styles from './style'

export const MyZipcodes = (props) => {
  return (
    <View style={styles.screenContainer}>
      <HText style={styles.title}>My Zipcodes</HText>
    </View>
  )
}
