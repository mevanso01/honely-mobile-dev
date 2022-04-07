import React from 'react'
import { View, Image } from 'react-native'
import { HButton, HText } from '../Shared'
import { Box } from 'native-base'
import { images } from '../../utils/styleGuide'
import styles from './style'

export const SuccessForm = (props) => {
  const {
    onNavigationRedirect
  } = props
  return (
    <View>
      <Box mt='2' alignItems='center'>
        <HText style={styles.changeSuccessText}>Password Changed Successfully</HText>
      </Box>
      <Box alignItems='center' mt='10'>
        <HButton
          text='Log In'
          onPress={() => onNavigationRedirect('Login')}
        />
      </Box>
      <View style={[styles.forgotPasswordImgWrapper, { aspectRatio: 291 / 304 }]}>
        <Image
          source={images.forgotPassword}
          style={styles.forgotPasswordImg}
        />
      </View>
    </View>
  )
}
