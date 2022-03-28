import React from 'react'
import { Image, View } from 'react-native'
import { HText } from '../Shared'
import { images, colors } from '../../utils/styleGuide'
import Loader from 'react-native-three-dots-loader'
import styles from './style'

export const Success = () => {
  return (
    <View style={styles.successWrapper}>
      <Image
        source={images.logo}
        style={styles.logoWrapper}
      />
      <HText style={styles.congratsText}>Congrats!</HText>
      <HText style={styles.loadingText}>
        Loading
        <Loader
          size={5}
          dotMargin={5}
        />
      </HText>
    </View>
  )
}