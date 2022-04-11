import React, { useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HStack, Box, VStack, TextArea, Pressable } from 'native-base'
import { HText, HButton, HSwitch } from '../Shared'
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'

export const ContactLead = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const [emailEnabled, setEmailEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [isSmsFocus, setIsSmsFocus] = useState(false)
  const [isEmailFocus, setIsEmailFocus] = useState(false)

  const [statusValue, setStatusValue] = useState(1)
  const statusOptions = [
    { value: 1, content: 'New', color: colors.primary },
    { value: 2, content: 'Attempted Contact', color: colors.green },
    { value: 3, content: 'Rejected', color: colors.rejected },
    { value: 4, content: 'Closed Sale', color: colors.green },
    { value: 5, content: 'Closed Leads', color: colors.green },
  ]

  const getSelectBgColor = (value) => {
    const found = statusOptions.find(item => item.value === value)
    return found?.color
  }

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
            defaultValueByIndex='0'
            data={statusOptions}
            onSelect={(selectedItem, index) => setStatusValue(selectedItem.value)}
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
                <HText style={styles.label}>John Closter</HText>
              </HStack>
            </View>
          </View>
        </View>
        
        <View style={styles.ToContactContainer}>
          <HStack>
            <HText style={styles.label} mRight='12'>To:</HText>
            <VStack space='1'>
              <HText style={styles.label}>First Name  Last Name</HText>
              <HStack alignItems='center'>
                <Image source={icons.email} style={styles.contactIcon} />
                <HText style={styles.contactInfoText}>jonathan@mail.com</HText>
              </HStack>
              <HStack alignItems='center'>
                <Image source={icons.phone} style={styles.contactIcon} />
                <HText style={styles.contactInfoText}>+1 238 2838 282</HText>
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
              onChangeText={e => console.log(e)}
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
              onChangeText={e => console.log(e)}
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
            onPress={() => {}}
          />
        </Box>
      </ScrollView>
    </View>
  )
}
