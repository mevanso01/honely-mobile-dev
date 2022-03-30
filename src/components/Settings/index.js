import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { HScreenHeader, HText, HButton } from '../Shared'
import { Pressable, VStack, HStack, Box } from 'native-base'
import { useDispatch } from 'react-redux'
import { signoutUser } from '../../store/action/setUser'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

export const Settings = (props) => {
  const {
    navigation
  } = props

  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <HScreenHeader
        title='Settings'
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
            onPress={() => {}}
          />
          <OptionItem
            text='Notifications'
            onPress={() => {}}
          />
          <OptionItem
            text='Privacy and Sharing'
            onPress={() => {}}
          />
        </VStack>
        <VStack mt='8'>
          <HText style={styles.sectionTitle}>Switch</HText>
          <Box mt='2'>
            <OptionItem
              text='Switch to Consumer'
              onPress={() => {}}
            />
          </Box>
        </VStack>
        <VStack mt='8'>
          <HText style={styles.sectionTitle}>Legal</HText>
          <VStack mt='2'>
            <OptionItem
              text='Terms of Service'
              onPress={() => {}}
            />
            <OptionItem
              text='Privacy Policy'
              onPress={() => {}}
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
            onPress={() => useDispatch(signoutUser())}
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
        <Image source={icons.arrowLeft} style={styles.arrowIcon} />
      </HStack>
    </Pressable>
  )
}
