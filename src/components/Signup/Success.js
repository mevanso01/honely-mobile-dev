import React from 'react'
import { Image, View } from 'react-native'
import { Box } from 'native-base'
import { HText } from '../Shared'
import { images } from '../../utils/styleGuide'
import Loader from 'react-native-three-dots-loader'
import styles from './style'
import { useSelector } from 'react-redux'
import { colors } from '../../utils/styleGuide'

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
        <HText style={styles.congratsText}>Welcome {formState?.firstName} {formState?.lastName}</HText>
      </View>
      <Box mb='8' alignItems='center'>
        <HText style={styles.loadingText}>
          Loading
          <Loader
            size={5}
            dotMargin={5}
            background={colors.text05}
            activeBackground={colors.text03}
          />
        </HText>
      </Box>
    </>
  )
}