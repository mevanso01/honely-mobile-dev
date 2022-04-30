import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Linking, Platform } from 'react-native'
import { HStack, Box, VStack, TextArea, Pressable, useToast } from 'native-base'
import { HText, HButton, HSwitch } from '../Shared'
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { useSelector, useDispatch } from 'react-redux'
import { TOAST_LENGTH_SHORT } from '../../config'
import { doPatch } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'

export const ContactLead = (props) => {
  const {
    level,
    defaultLead,
    navigation,
    onNavigationRedirect
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [lead, setLead] = useState(defaultLead)
  const [emailEnabled, setEmailEnabled] = useState(currentUser?.preset?.use_email || false)
  const [smsEnabled, setSmsEnabled] = useState(currentUser?.preset?.use_phone_number || false)
  const [isSmsFocus, setIsSmsFocus] = useState(false)
  const [isEmailFocus, setIsEmailFocus] = useState(false)
  const [statusValue, setStatusValue] = useState(0)
  const [emailMessage, setEmailMessage] = useState('')
  const [smsMessage, setSmsMessage] = useState('')
  const [defaultIndex, setDefaultIndex] = useState(null)
  const [defaultSMS, setDefaultSMS] = useState('')
  const [defaultEmailMessage, setDefaultEmailMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const statusOptions = [
    { value: 0, content: 'New', color: colors.primary },
    { value: 1, content: 'Attempted Contact', color: colors.green },
    { value: 2, content: 'Followed Up', color: colors.green },
    { value: 3, content: 'Pending Sale', color: colors.green },
    { value: 4, content: 'Closed Leads', color: colors.green },
    { value: 5, content: 'Rejected', color: colors.rejected }
  ]

  const getSelectBgColor = (value) => {
    const found = statusOptions.find(item => item.value === value)
    return found?.color
  }

  const handleOpenMessage = async () => {
    if (smsEnabled) {
      const phone = '+123456789'
      const url = (Platform.OS === 'android')
        ? `sms:${phone}?body=${smsMessage}`
        : `sms:${phone}&body=${smsMessage}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
    if (emailEnabled) {
      const recipient = 'jonathan@mail.com'
      const url = `mailto:${recipient}?body=${emailMessage}`
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  }

  const handleChangeStatus = async (selectedItem) => {
    try {
      setIsLoading(true)
      setStatusValue(selectedItem.value)
      const response = await doPatch(`lookup-test/lead/change-status?lead-id=${lead.lead_id}`, { 'status': selectedItem.content })
      if (response.result !== 'Success') throw response
      setLead({ ...lead, agent_status: selectedItem.content.toUpperCase() })
      const _updatedLeads = currentUser.leads[level].leads.map(_lead => {
        if (_lead.lead_id === lead.lead_id) {
          _lead.agent_status = selectedItem.content.toUpperCase()
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
    const found = statusOptions.find(option => option.content.toLowerCase() === lead?.agent_status?.toLowerCase())
    setDefaultIndex(found?.value?.toString() || '0')
    setStatusValue(found?.value || 0)
    switch (lead?.agent_status) {
      case 'NEW':
        setDefaultSMS(currentUser?.preset?.preset_bayer_text_msg_first || '')
        setDefaultEmailMessage(currentUser?.preset?.preset_bayer_email_msg_first || '')
        setEmailEnabled(currentUser?.preset?.use_email || false)
        setSmsEnabled(currentUser?.preset?.use_phone_number || false)
        break
      case 'ATTEMPTED CONTACT':
        setDefaultSMS(currentUser?.preset?.preset_bayer_text_msg_second || '')
        setDefaultEmailMessage(currentUser?.preset?.preset_bayer_email_msg_second || '')
        setEmailEnabled(currentUser?.preset?.use_email || false)
        setSmsEnabled(currentUser?.preset?.use_phone_number || false)
        break
      default:
        setDefaultSMS('')
        setDefaultEmailMessage('')
        setEmailEnabled(false)
        setSmsEnabled(false)
        break
    }
  }, [lead?.agent_status, currentUser?.preset?.use_email, currentUser?.preset?.use_phone_number])

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
            data={statusOptions}
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
              <HStack alignItems='center'>
                <Image source={icons.email} style={styles.contactIcon} />
                <HText style={styles.contactInfoText}>{lead?.email}</HText>
              </HStack>
              <HStack alignItems='center'>
                <Image source={icons.phone} style={styles.contactIcon} />
                <HText style={styles.contactInfoText}>{lead?.phone_number}</HText>
              </HStack>
            </VStack>
          </HStack>
        </View>

        <VStack mt='6'>
          <HStack justifyContent='space-between'>
            <HText style={styles.label}>SMS Message</HText>
            <HSwitch
              value={smsEnabled}
              onValueChange={val => setSmsEnabled(val)}
            />
          </HStack>
          <View
            style={[styles.textArearWrapper, { borderColor: isSmsFocus ? colors.primary : colors.borderColor }]}
          >
            <TextArea
              fontSize={16}
              borderRadius={8}
              borderWidth={0}
              height={120}
              padding='4'
              color={colors.text01}
              autoCapitalize='none'
              defaultValue={defaultSMS}
              isDisabled={!smsEnabled}
              onChangeText={e => setSmsMessage(e)}
              blurOnSubmit={false}
              onFocus={() => setIsSmsFocus(true)}
              onBlur={() => setIsSmsFocus(false)}
            />
          </View>
          <HStack justifyContent='space-between' mt='4'>
            <HText style={styles.label}>Email Message</HText>
            <HSwitch
              value={emailEnabled}
              onValueChange={val => setEmailEnabled(val)}
            />
          </HStack>
          <View
            style={[styles.textArearWrapper, { borderColor: isEmailFocus ? colors.primary : colors.borderColor }]}
          >
            <TextArea
              fontSize={16}
              borderRadius={8}
              borderWidth={0}
              height={120}
              padding='4'
              color={colors.text01}
              autoCapitalize='none'
              defaultValue={defaultEmailMessage}
              isDisabled={!emailEnabled}
              onChangeText={e => setEmailMessage(e)}
              blurOnSubmit={false}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
          </View>
        </VStack>
        <Box alignItems='center' mt='5' mb='8'>
          <HButton
            text='Send'
            borderColor={colors.primary}
            backgroundColor={colors.primary}
            isDisabled={!(emailEnabled || smsEnabled)}
            onPress={() => handleOpenMessage()}
          />
        </Box>
      </ScrollView>
    </View>
  )
}
