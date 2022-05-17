import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Box, Divider, Pressable, VStack } from 'native-base'
import { HText, HButton } from '../Shared'
import { colors, icons, images } from '../../utils/styleGuide'
import styles from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FitImage from 'react-native-fit-image';

export const Profile = (props) => {
  const {
    onNavigationRedirect
  } = props

  const insets = useSafeAreaInsets()
  const statusBarHeight = insets.top

  const currentUser = useSelector(state => state.currentUser)
  const { agentProfile } = useSelector(({ screens }) => screens.editprofile)

  const fetchImage = () => {
    return currentUser.image_url + '?random_number=' + new Date().getTime()
  }

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
            <Image
              source={icons.setting}
              style={styles.settingIcon}
            />
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
              {currentUser.image_url ? (
                <FitImage
                  key={1}
                  source={{ uri: fetchImage() }}
                  indicatorSize='large'
                  indicatorColor={colors.primary}
                  resizeMode='cover'
                  style={styles.image}
                />
              ) : (
                <FitImage
                  key={2}
                  source={images.dummyAvatar}
                  indicatorSize='large'
                  indicatorColor={colors.primary}
                  resizeMode='contain'
                  style={styles.defaultImage}
                />
              )}
            </View>
          </Box>
          <VStack mt='8'>
            <HText style={styles.nameText}>{currentUser?.first_name} {currentUser?.last_name}</HText>
            <Divider backgroundColor={colors.white} width='full' />
            <HText style={styles.nameDetail}>{agentProfile?.company_name}</HText>
          </VStack>
        </View>
        <Box mt='5' mb='10' alignItems='center'>
          <HButton
            text='Edit Profile'
            disabledOpacity={0.6}
            onPress={() => onNavigationRedirect('EditProfile')}
          />
        </Box>
      </ScrollView>
    </View>
  )
}