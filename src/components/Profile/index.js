import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Box, Divider, Pressable, VStack, useToast } from 'native-base'
import { HText, HButton } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import { TOAST_LENGTH_SHORT } from '../../config'
import { doGet } from '../../services/http-client'
import { useDispatch } from 'react-redux'
import { setAgentProfile } from '../EditProfile/store'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FitImage from 'react-native-fit-image';
import { isServiceProvider } from '../../utils/helper'

export const Profile = (props) => {
  const {
    onNavigationRedirect
  } = props

  const insets = useSafeAreaInsets()
  const statusBarHeight = insets.top

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(false)
  const fetchImage = () => {
    const defaultImg = 'https://honely-files-public.s3.amazonaws.com/images/avatar/avatar_user_01.png'
    if (currentUser?.image_url) {
      return currentUser.image_url + '?random_number=' + new Date().getTime()
    } else {
      return defaultImg
    }
  }

  const fetchAgentProfile = async () => {
    try {
      setIsLoading(true)
      const response = await doGet('lookup-test/agent_profile', { agent_email: currentUser.email })
      if (response?.message) {
        throw response
      }
      dispatch(setAgentProfile({ ...response }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  useEffect(() => {
    if (isServiceProvider(currentUser.user_type)) {
      fetchAgentProfile()
    }
  }, [])

  return (
    <View style={styles.screenContainer}>
      <View style={[
        styles.headerContainer,
        { paddingTop: Platform.OS === 'ios' ? statusBarHeight + 10 : 40 }
      ]}>
        <HText style={styles.title}>My Profile</HText>
        <HText style={styles.subTitle}>What your profile looks like to a guest.</HText>
        <View style={[styles.settingIconContainer, { paddingTop: Platform.OS === 'ios' ? statusBarHeight : 40 }]}>
          <Pressable
            _pressed={{ opacity: 0.7 }}
            onPress={() => onNavigationRedirect('Settings')}
          >
            <Image source={icons.setting} style={styles.settingIcon} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.imageContainer}>
          <Box alignItems='center'>
            <View style={styles.photoWrapper}>
              <FitImage
                source={{ uri: fetchImage() }}
                indicatorSize='large'
                indicatorColor={colors.white}
                resizeMode='cover'
                style={styles.image}
              />
            </View>
          </Box>
          <VStack mt='8'>
            <HText style={styles.nameText}>{currentUser?.first_name} {currentUser?.last_name}</HText>
            <Divider backgroundColor={colors.white} width='full' />
            <HText style={styles.nameDetail}>Keller Willaims Realty</HText>
          </VStack>
        </View>
        <Box mt='5' mb='10' alignItems='center'>
          <HButton
            text='Edit Profile'
            isDisabled={isLoading}
            disabledOpacity={0.6}
            onPress={() => onNavigationRedirect('EditProfile')}
          />
        </Box>
      </ScrollView>
    </View>
  )
}