import React from 'react'
import { View, ScrollView, Image, Linking } from 'react-native'
import { HScreenHeader, HText, HButton } from '../Shared'
import { Pressable, VStack, HStack, Box } from 'native-base'
import { useDispatch } from 'react-redux'
import { signoutUser } from '../../store/action/setUser'
import { resetProfileInfo } from '../EditProfile/store'
import { colors, icons } from '../../utils/styleGuide'
import { URL_PRIVACY_POLICY, URL_TERMS_SERVICE } from '../../utils/constants'
import styles from './style'

export const Settings = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(resetProfileInfo())
    dispatch(signoutUser())
  }

  return (
    <View style={styles.container}>
      <HScreenHeader
        title='Edit Profile'
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <HText style={styles.sectionTitle}>Account Settings</HText>
        <VStack mt='2'>
          <OptionItem
            text='Change Password'
            onPress={() => onNavigationRedirect('ChangePassword')}
          />
          {/* <OptionItem
            text='Notifications'
            onPress={() => {}}
          /> */}
          <OptionItem
            text='Contact Lead Preset'
            onPress={() => onNavigationRedirect('ContactLeadPreset')}
          />
          {/* <OptionItem
            text='Privacy and Sharing'
            onPress={() => {}}
          /> */}
        </VStack>
        {/* <VStack mt='8'>
          <HText style={styles.sectionTitle}>Switch</HText>
          <Box mt='2'>
            <OptionItem
              text='Switch to Consumer'
              onPress={() => {}}
            />
          </Box>
        </VStack> */}
        <VStack mt='8'>
          <HText style={styles.sectionTitle}>Legal</HText>
          <VStack mt='2'>
            <OptionItem
              text='Terms of Service'
              onPress={() => { Linking.openURL(URL_TERMS_SERVICE) }}
            />
            <OptionItem
              text='Privacy Policy'
              onPress={() => { Linking.openURL(URL_PRIVACY_POLICY) }}
            />
          </VStack>
        </VStack>
        <Box alignItems='center' mt='6' mb='6'>
          <HButton
            text='Logout'
            shadow={null}
            backgroundColor={colors.white}
            borderColor={colors.white}
            textStyle={{
              color: colors.error
            }}
            onPress={() => handleLogout()}
          />
        </Box>
      </ScrollView>
    </View>
  )
}

const OptionItem = ({ text, onPress }) => {
  return (
    <Pressable
      _pressed={{
        backgroundColor: colors.text05
      }}
      onPress={onPress}
    >
      <HStack pt='4' pb='4'
        alignItems='center'
        justifyContent='space-between'
        borderBottomColor={colors.borderColor}
        borderBottomWidth={1}
      >
        <HText style={styles.optionText}>{text}</HText>
        <Image source={icons.arrowRight} style={styles.arrowIcon} />
      </HStack>
    </Pressable>
  )
}
