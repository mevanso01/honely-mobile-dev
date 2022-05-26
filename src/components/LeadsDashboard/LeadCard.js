import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { HText, HButton } from '../Shared'
import { colors,  icons } from '../../utils/styleGuide'
import { HStack, Box, Skeleton, Pressable } from 'native-base'
import styles from './style'
import { leadStatuses } from '../../utils/constants'
import Clipboard from '@react-native-community/clipboard'

export const LeadCard = (props) => {
  const {
    onNavigationRedirect,
    isLoading,
    lead
  } = props

  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

  const getStatus = (status) => {
    const objectStatus = leadStatuses.find((o) => o.key === status)
    return objectStatus && objectStatus
  }

  const getType = (level) => {
    let type = ''
    switch (level) {
      case 'buyers':
        type = 'Buyer'
        break
      case 'sellers':
        type = 'Seller'
        break
      case 'prospective':
        type = 'Prospective'
        break
    }
    return type
  }

  const copyToClipboard = (text, type) => {
    if (!text) return
    Clipboard.setString(text)
    if (type === 'email') {
      setEmailCopied(true)
      setTimeout(() => {
        setEmailCopied(false)
      }, 1000)
    } else {
      setPhoneCopied(true)
      setTimeout(() => {
        setPhoneCopied(false)
      }, 1000)
    }
  }

  return (
    <View style={styles.cardContainer}>
      <HStack alignItems='center' borderBottomColor={colors.borderColor} borderBottomWidth='1' pb='5'>
        <Image source={icons.location} style={styles.locationIcon}
        />
        {isLoading ? (
          <Skeleton h='5' w='24' rounded='sm' ml='2' />
        ) : (
          <HText style={styles.locationText} numberOfLines={1}>{lead?.searched_address || lead?.full_address}</HText>
        )}
      </HStack>
      <Box mt='6' mb='6'>
        {isLoading ? (
          <Skeleton h='6' w='32' rounded='sm' />
        ) : (
          <HText style={styles.nameText}>{lead?.name || lead?.full_name}</HText>
        )}
      </Box>
      <HStack justifyContent='space-between'>
        {isLoading ? (
          <Skeleton h='4' w='20' rounded='sm' />
        ) : (
          <HText style={styles.userTypeText}>{getType(lead.level)}</HText>
        )}
        {isLoading ? (
          <Skeleton h='4' w='24' rounded='sm' />
        ) : (
          <HText style={styles.userTypeText}>
            <HText style={[styles.userTypeText, { color: colors.borderColor }]}>Status:</HText> {getStatus(lead?.agent_status)?.content}
          </HText>
        )}
      </HStack>
      {(lead?.email && lead?.email !== 'None' || isLoading) && (
        <HStack mt='6' alignItems='center'>
          <Image source={icons.email} style={styles.infoIcon} />
          {isLoading ? (
            <Skeleton h='4' w='32' rounded='sm' ml='2' />
          ) : (
            <HStack ml='5' mr='6' borderBottomColor={colors.borderColor} borderBottomWidth='1' position='relative'>
              <Pressable
                flex='1'
                _pressed={{ opacity: 0.6 }}
                onPress={() => copyToClipboard(lead?.email, 'email')}
              >
                <HText style={styles.infoText}>{lead?.email}</HText>
              </Pressable>
              {emailCopied && (
                <View style={styles.copyTextWrapper}>
                  <HText style={styles.copyText}>Copied</HText>
                </View>
              )}
            </HStack>
          )}
        </HStack>
      )}
      {(lead?.phone_number || isLoading) && (
        <HStack mt='5' alignItems='center'>
          <Image source={icons.phone} style={styles.infoIcon} />
          {isLoading ? (
            <Skeleton h='4' w='32' rounded='sm' ml='2' />
          ) : (
            <HStack ml='5' mr='6' borderBottomColor={colors.borderColor} borderBottomWidth='1' position='relative'>
              <Pressable
                flex='1'
                _pressed={{ opacity: 0.6 }}
                onPress={() => copyToClipboard(lead?.phone_number, 'phone')}
              >
                <HText style={styles.infoText}>{lead?.phone_number}</HText>
              </Pressable>
              {phoneCopied && (
                <View style={styles.copyTextWrapper}>
                  <HText style={styles.copyText}>Copied</HText>
                </View>
              )}
            </HStack>
          )}
        </HStack>
      )}
      <Box alignItems='center' mt='10'>
        <HButton
          text='Contact'
          shadow={3}
          borderColor={colors.white}
          backgroundColor={colors.white}
          textStyle={{
            color: colors.primary,
            fontSize: 24,
            fontWeight: '700'
          }}
          isDisabled={isLoading}
          disabledOpacity={0.6}
          height={50}
          width={180}
          onPress={() => onNavigationRedirect('ContactLead', { lead: lead, level: lead.level })}
        />
      </Box>
    </View>
  )
}