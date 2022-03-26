import React from 'react'
import { Image, View } from 'react-native'
import { HText } from '../Shared'
import { images } from '../../utils/styleGuide'
import styles from './style'

export const Success = () => {
  return (
    <View style={styles.successWrapper}>
      <Image
        source={images.logo}
        style={styles.logoWrapper}
      />
      <HText style={styles.congratsText}>Congrats!</HText>
    </View>
  )
}