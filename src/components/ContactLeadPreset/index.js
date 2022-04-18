import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { Pressable, HStack, VStack, Box, useToast } from 'native-base'
import { HText, HSwitch, HSliderButton } from '../Shared'
import { icons, colors, images } from '../../utils/styleGuide'
import { Accordion } from './Accordion'
import styles from './style'
import { TOAST_LENGTH_SHORT } from '../../config'

import { doGet, doPost } from '../../services/http-client'
import { useSelector } from 'react-redux'

export const ContactLeadPreset = (props) => {
  const {
    navigation
  } = props

  const toast = useToast()

  const currentUser = useSelector(state => state.currentUser)
  const [phoneEnabled, setPhoneEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [presetData, setPresetData] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState('buyer')

  const handleChangeEmailPreset = (isFirst, value) => {
    if (isFirst) {
      if (selectedUserType === 'buyer') {
        setPresetData({
          ...presetData,
          preset_bayer_email_msg_first: value
        })
      } else {
        setPresetData({
          ...presetData,
          preset_seller_email_msg_first: value
        })
      }
    } else {
      if (selectedUserType === 'buyer') {
        setPresetData({
          ...presetData,
          preset_bayer_email_msg_second: value
        })
      } else {
        setPresetData({
          ...presetData,
          preset_seller_email_msg_second: value
        })
      }
    }
  }

  const handleChangeSmsPreset = (isFirst, value) => {
    if (isFirst) {
      if (selectedUserType === 'buyer') {
        setPresetData({
          ...presetData,
          preset_bayer_text_msg_first: value
        })
      } else {
        setPresetData({
          ...presetData,
          preset_seller_text_msg_first: value
        })
      }
    } else {
      if (selectedUserType === 'buyer') {
        setPresetData({
          ...presetData,
          preset_bayer_text_msg_second: value
        })
      } else {
        setPresetData({
          ...presetData,
          preset_seller_text_msg_second: value
        })
      }
    }
  }

  const fetchPresetData = async () => {
    try {
      setIsLoading(true)
      const response = await doGet('lookup-test/user_settings', { 'user-email': currentUser.email })
      if (response?.msg) {
        throw { message: response }
      }
      setPresetData(response.data)
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

  const handleUpdatePreset = async () => {
    try {
      setIsUpdating(true)
      const response = await doPost(`lookup-test/user_settings?user-email=${currentUser.email}`, presetData)
      if (response.result === 'Success') {
        toast.show({
          title: 'Success',
          description: 'Preset updated',
          status: 'success',
          duration: TOAST_LENGTH_SHORT,
          marginRight: 4,
          marginLeft: 4,
        })
      } else {
        throw { message: 'Something went wrong' }
      }
      setIsUpdating(false)
    } catch (error) {
      setIsUpdating(false)
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
    fetchPresetData()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{ opacity: 0.7 }}
        >
          <HStack alignItems='center'>
            <Image source={icons.arrowLeft} style={styles.backIcon} />
            <HText>Back</HText>
          </HStack>
        </Pressable>
      </View>
      <HText style={styles.headerTitle}>Contact Lead Preset</HText>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoContainer}>
          <HText style={styles.questionText}>Is this the phone number or email you are reaching out with?</HText>
          <View style={styles.shadowContainer}>
            <View style={styles.contactCardContainer}>
              <View style={styles.contactCardInnerContainer}>
                <HStack>
                  <Image source={images.dummyAvatar} style={styles.photo} />
                  <VStack ml='2' flex='1'>
                    <HText style={styles.infoText}>{currentUser?.first_name} {currentUser?.last_name}</HText>
                    <HStack mt='3'>
                      <VStack flex='1'>
                        <HText style={styles.infoDescription}>Use my phone number to contact any lead</HText>
                        <HText style={styles.infoText}>{currentUser?.phone_number}</HText>
                        <Box mt='4'>
                          <HText style={styles.infoDescription}>Use my email to contact any lead</HText>
                          <HText style={styles.infoText}>{currentUser?.email}</HText>
                        </Box>
                      </VStack>
                      <VStack ml='2' justifyContent='space-between'>
                        <HSwitch
                          value={phoneEnabled}
                          onValueChange={val => setPhoneEnabled(val)}
                        />
                        <HSwitch
                          value={emailEnabled}
                          onValueChange={val => setEmailEnabled(val)}
                        />
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
              </View>
            </View>
          </View>
          <Box mt='8'>
            <HSliderButton
              width={310}
              firstText='Buyer'
              secondText='Seller'
              onFirstPress={() => setSelectedUserType('buyer')}
              onSecondPress={() => setSelectedUserType('seller')}
            />
          </Box>
        </View>

        <VStack mt='6'>
          <Accordion
            title='First message'
            isLoading={isLoading}
            isUpdating={isUpdating}
            emailText={selectedUserType === 'buyer' ? presetData?.preset_bayer_email_msg_first : presetData?.preset_seller_email_msg_first}
            smsText={selectedUserType === 'buyer' ? presetData?.preset_bayer_text_msg_first : presetData?.preset_seller_text_msg_first}
            handleChangeEmailText={val => handleChangeEmailPreset(true, val)}
            handleChangeSmsText={val => handleChangeSmsPreset(true, val)}
            onSave={handleUpdatePreset}
          />
          <Accordion
            title='Follow-up message'
            isLoading={isLoading}
            isUpdating={isUpdating}
            emailText={selectedUserType === 'buyer' ? presetData?.preset_bayer_email_msg_second : presetData?.preset_seller_email_msg_second}
            smsText={selectedUserType === 'buyer' ? presetData?.preset_bayer_text_msg_second : presetData?.preset_seller_text_msg_second}
            handleChangeEmailText={val => handleChangeEmailPreset(false, val)}
            handleChangeSmsText={val => handleChangeSmsPreset(false, val)}
            onSave={handleUpdatePreset}
          />
        </VStack>
      </ScrollView>
    </View>
  )
}
