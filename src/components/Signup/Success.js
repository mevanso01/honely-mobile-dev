import React from 'react'
import { Image, View } from 'react-native'
import { HText } from '../Shared'
import { images } from '../../utils/styleGuide'
import Loader from 'react-native-three-dots-loader'
import styles from './style'
import { useSelector } from 'react-redux'

export const Success = (props) => {
  const { formState } = useSelector(({ screens }) => screens.signup)

  return (
    <>
      <HText style={styles.signupCompleteTitle}>Sign Up Complete</HText>
      <View style={styles.successWrapper}>
        <Image
          source={images.logo}
          style={styles.logoWrapper}
        />
        <HText style={styles.congratsText}>Weclome {formState?.firstName}</HText>
        <HText style={styles.loadingText}>
          Loading
          <Loader
            size={5}
            dotMargin={5}
          />
        </HText>
      </View>
    </>
  )
}