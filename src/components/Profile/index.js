import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Box, VStack } from 'native-base'
import { HText, HButton } from '../Shared'
import { colors } from '../../utils/styleGuide'
import styles from './style'

export const Profile = (props) => {
  const {
    onNavigationRedirect
  } = props

  const currentUser = useSelector(state => state.currentUser)
  const fetchImage = () => {
    const defaultImg = 'https://honely-files-public.s3.amazonaws.com/images/avatar/avatar_user_01.png'
    if (currentUser?.image_url) {
      return currentUser.image_url
    } else {
      return defaultImg
    }
  }

  return (
    <>
      <VStack mb='8'>
        <HText style={styles.title}>My Profile</HText>
        <HText style={styles.subTitle}>What you look like to consumer</HText>
      </VStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.imageContainer}>
          <View style={styles.photoWrapper}>
            <Image
              source={{ uri: fetchImage() }}
              style={styles.image}
            />
          </View>
          <View style={styles.userName}>
            <HText style={styles.title}>{currentUser?.first_name} {currentUser?.last_name}</HText>
            <HText style={styles.nameDetail}>Keller Willaims Realty</HText>
          </View>
        </View>
        <VStack mt='4' mb='3'>
          <Box alignItems='center'>
            <HButton
              text='Edit Profile'
              onPress={() => onNavigationRedirect('EditProfile')}
            />
          </Box>
          <Box alignItems='center' mt='2'>
            <HButton
              text='Settings'
              backgroundColor={colors.white}
              borderColor={colors.white}
              textStyle={{
                color: colors.primary
              }}
              shadow={null}
              onPress={() => onNavigationRedirect('Settings')}
            />
          </Box>
        </VStack>
      </ScrollView>
    </>
  )
}