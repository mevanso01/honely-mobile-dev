import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Box, VStack, useToast } from 'native-base'
import { HText, HButton } from '../Shared'
import { colors } from '../../utils/styleGuide'
import styles from './style'
import { TOAST_LENGTH_SHORT } from '../../config'
import { doGet } from '../../services/http-client'
import { useDispatch } from 'react-redux'
import { setAgentProfile } from '../EditProfile/store'

export const Profile = (props) => {
  const {
    onNavigationRedirect
  } = props

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

  const isServiceProvider = (data) => {
    if (data) {
      if (data.toLowerCase() == 'agent/broker' || data.toLowerCase() == 'lender' || data.toLowerCase() == 'general contractor') {
        return true
      } else {
        return false
      }
    } else {
      return false
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
          <VStack mt='8' alignItems='center'>
            <HText style={styles.nameText}>{currentUser?.first_name} {currentUser?.last_name}</HText>
            <HText style={styles.nameDetail}>Keller Willaims Realty</HText>
          </VStack>
        </View>
        <VStack mt='4' mb='3'>
          <Box alignItems='center'>
            <HButton
              text='Edit Profile'
              isDisabled={isLoading}
              disabledOpacity={0.6}
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
    </View>
  )
}