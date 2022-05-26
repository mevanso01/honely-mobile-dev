import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Linking, Platform } from 'react-native'
import { HStack, Box, VStack, TextArea, Pressable, useToast } from 'native-base'
import { HText, HButton, HToast } from '../Shared'
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { useSelector, useDispatch } from 'react-redux'
import { TOAST_LENGTH_SHORT } from '../../config'
import { doPatch } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'
import { leadStatuses } from '../../utils/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const ContactLead = (props) => {
  const {
    level,
    defaultLead,
    navigation,
    onNavigationRedirect
  } = props

  const insets = useSafeAreaInsets()

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [lead, setLead] = useState(defaultLead)
  const [isSmsFocus, setIsSmsFocus] = useState(false)
  const [isEmailFocus, setIsEmailFocus] = useState(false)
  const [statusValue, setStatusValue] = useState(0)
  const [defaultIndex, setDefaultIndex] = useState(null)
  const [defaultSMS, setDefaultSMS] = useState('')
  const [defaultEmailMessage, setDefaultEmailMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getSelectBgColor = (value) => {
    const found = leadStatuses.find(item => item.value === value)
    return found?.color
  }

  const handleOpenSms = async () => {
    const phone = lead?.phone_number
    const url = (Platform.OS === 'android')
      ? `sms:${phone}?body=${defaultSMS}`
      : `sms:${phone}&body=${defaultSMS}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      if (lead?.agent_status === 'NEW') {
        handleChangeStatus(leadStatuses[1])
      }
      if (lead?.agent_status === 'ATTEMPTED_CONTACT') {
        handleChangeStatus(leadStatuses[2])
      }
    }
  }

  const handleOpenEmail = async () => {
    const recipient = lead?.email
    const url = `mailto:${recipient}?body=${defaultEmailMessage}`
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      if (lead?.agent_status === 'NEW') {
        handleChangeStatus(leadStatuses[1])
      }
      if (lead?.agent_status === 'ATTEMPTED_CONTACT') {
        handleChangeStatus(leadStatuses[2])
      }
    }
  }

  const handleChangeStatus = async (selectedItem) => {
    try {
      setIsLoading(true)
      setStatusValue(selectedItem.value)
      const response = await doPatch(`v1/lead/${lead.lead_id}`, { 'agent_status': selectedItem.key })
      if (response.error) throw { message: response.error }
      if (defaultLead?.agent_status === 'NEW' && lead?.agent_status === 'NEW' && selectedItem?.key !== 'NEW') {
        const previousCount = currentUser?.newContactedLeadCount || 0
        dispatch(setUser({ newContactedLeadCount: previousCount + 1 }))
      }
      setLead({ ...lead, agent_status: selectedItem.key })
      const _updatedLeads = currentUser.leads[level].leads.map(_lead => {
        if (_lead.lead_id === lead.lead_id) {
          _lead.agent_status = selectedItem.key
        }
        return _lead
      })
      const updatedLeads = {
        ...currentUser.leads,
        [level]: {
          total: currentUser.leads[level].total,
          leads: _updatedLeads
        }
      }
      dispatch(setUser({ leads: updatedLeads }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handlePhoneCall = () => {
    const phoneNumber = Platform.OS === 'ios'
      ? `telprompt:${lead?.phone_number}`
      : `tel:${lead?.phone_number}`
    Linking.openURL(phoneNumber)
  }

  useEffect(() => {
    const found = leadStatuses.find(option => option.key === lead?.agent_status)
    setDefaultIndex(found?.value?.toString() || '0')
    setStatusValue(found?.value || 0)
    switch (lead?.agent_status) {
      case 'NEW':
        if (level === 'buyers') {
          setDefaultSMS(currentUser?.preset?.preset_bayer_text_msg_first || '')
          setDefaultEmailMessage(currentUser?.preset?.preset_bayer_email_msg_first || '')
        }
        if (level === 'sellers') {
          setDefaultSMS(currentUser?.preset?.preset_seller_text_msg_first || '')
          setDefaultEmailMessage(currentUser?.preset?.preset_seller_email_msg_first || '')
        }
        break
      case 'ATTEMPTED_CONTACT':
        if (level === 'buyers') {
          setDefaultSMS(currentUser?.preset?.preset_bayer_text_msg_second || '')
          setDefaultEmailMessage(currentUser?.preset?.preset_bayer_email_msg_second || '')
        }
        if (level === 'sellers') {
          setDefaultSMS(currentUser?.preset?.preset_seller_text_msg_second || '')
          setDefaultEmailMessage(currentUser?.preset?.preset_seller_email_msg_second || '')
        }
        break
      default:
        setDefaultSMS('')
        setDefaultEmailMessage('')
        break
    }
  }, [lead?.agent_status, level, currentUser?.preset?.use_email, currentUser?.preset?.use_phone_number])

  return (
    <View style={[styles.screenContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{ opacity: 0.7 }}
        >
          <HStack alignItems='center'>
            <Image source={icons.arrowLeft} style={styles.backIcon} />
            <HText style={styles.backText}>Back</HText>
          </HStack>
        </Pressable>
        <Pressable
          _pressed={{ opacity: 0.7 }}
          onPress={() => onNavigationRedirect('ContactLeadPreset')}
        >
          <Image source={icons.setting} style={styles.settingIcon} />
        </Pressable>
      </View>
      <HText style={styles.headerTitle}>Contact Lead</HText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.statusWrapper}>
          <HText style={styles.statusLabel}>Status:</HText>
          <SelectDropdown
            defaultButtonText='Select an option'
            defaultValueByIndex={defaultIndex}
            data={leadStatuses}
            disabled={isLoading}
            onSelect={handleChangeStatus}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.content }}
            rowTextForSelection={(item, index) => { return item.content }}
            buttonStyle={{
              backgroundColor: getSelectBgColor(statusValue),
              borderRadius: 8,
              height: 38,
              flex: 1
            }}
            buttonTextStyle={{
              color: colors.white,
              fontSize: 19,
              fontWeight: '700'
            }}
            dropdownStyle={{
              borderRadius: 8
            }}
            rowTextStyle={{
              color: colors.text01
            }}
            renderDropdownIcon={() => {return <Image source={icons.arrowDown} style={styles.arrowDownIcon} />}}
          />
        </View>
        <View style={styles.shadowContainer}>
          <View style={styles.contactCardContainer}>
            <View style={styles.contactCardInnerContainer}>
              <HStack>
                <HText style={styles.label} mRight='12'>From:</HText>
                <HText style={styles.label}>{currentUser?.first_name} {currentUser?.last_name}</HText>
              </HStack>
            </View>
          </View>
        </View>
        
        <View style={styles.ToContactContainer}>
          <HStack>
            <HText style={styles.label} mRight='12'>To:</HText>
            <VStack space='1'>
              <HText style={styles.label}>{lead?.name}</HText>
              {lead?.email && lead?.email !== 'None' && (
                <HStack alignItems='center'>
                  <Image source={icons.email} style={styles.contactIcon} />
                  <HText style={styles.contactInfoText}>{lead?.email}</HText>
                </HStack>
              )}
              {lead?.phone_number && (
                <HStack alignItems='center'>
                  <Image source={icons.phone} style={styles.contactIcon} />
                  <HText style={styles.contactInfoText}>{lead?.phone_number}</HText>
                </HStack>
              )}
            </VStack>
          </HStack>
        </View>

        {level !== 'prospective' ? (
          <>
            <VStack mt='10'>
              <HText style={styles.label}>SMS Message</HText>
              <View
                style={[styles.textArearWrapper, { borderColor: isSmsFocus ? colors.primary : colors.borderColor }]}
              >
                <TextArea
                  fontSize={16}
                  borderRadius={8}
                  borderWidth={0}
                  height={120}
                  backgroundColor='transparent'
                  padding='4'
                  color={colors.text01}
                  autoCapitalize='none'
                  defaultValue={defaultSMS}
                  isDisabled={!lead?.phone_number}
                  onChangeText={e => setDefaultSMS(e)}
                  blurOnSubmit={false}
                  onFocus={() => setIsSmsFocus(true)}
                  onBlur={() => setIsSmsFocus(false)}
                />
              </View>
              <Box alignItems='center' mt='5'>
                <HButton
                  text='Send SMS'
                  isDisabled={isLoading || !lead?.phone_number}
                  disabledOpacity={0.6}
                  borderColor={colors.primary}
                  backgroundColor={colors.primary}
                  onPress={() => handleOpenSms()}
                />
              </Box>
            </VStack>
            <VStack mt='8'>
              <HText style={styles.label}>Email Message</HText>
              <View
                style={[styles.textArearWrapper, { borderColor: isEmailFocus ? colors.primary : colors.borderColor }]}
              >
                <TextArea
                  fontSize={16}
                  borderRadius={8}
                  borderWidth={0}
                  height={120}
                  backgroundColor='transparent'
                  padding='4'
                  color={colors.text01}
                  autoCapitalize='none'
                  defaultValue={defaultEmailMessage}
                  onChangeText={e => setDefaultEmailMessage(e)}
                  blurOnSubmit={false}
                  onFocus={() => setIsEmailFocus(true)}
                  onBlur={() => setIsEmailFocus(false)}
                />
              </View>
              <Box alignItems='center' mt='5' mb='8'>
                <HButton
                  text='Send Email'
                  isDisabled={isLoading}
                  disabledOpacity={0.6}
                  borderColor={colors.primary}
                  backgroundColor={colors.primary}
                  onPress={() => handleOpenEmail()}
                />
              </Box>
            </VStack>
          </>
        ) : (
          <Box flex={1} alignItems='center' mt='5' mb='8' justifyContent='flex-end'>
            <HButton
              text='Call'
              shadow={2}
              isDisabled={isLoading}
              disabledOpacity={0.6}
              borderColor={colors.primary}
              backgroundColor={colors.primary}
              onPress={() => handlePhoneCall()}
            />
          </Box>
        )}
      </ScrollView>
    </View>
  )
}
