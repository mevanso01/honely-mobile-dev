import React from 'react'
import { Image, View } from 'react-native'
import { HText, HButton, HToast } from '../Shared'
import { colors,  icons } from '../../utils/styleGuide'
import { HStack, Box, Skeleton, Pressable, useToast } from 'native-base'
import styles from './style'
import { leadStatuses } from '../../utils/constants'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Clipboard from '@react-native-community/clipboard'
import { TOAST_LENGTH_SHORT } from '../../config'

export const LeadCard = (props) => {
  const {
    onNavigationRedirect,
    isLoading,
    lead
  } = props

  const toast = useToast()

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

  const copyToClipboard = (text) => {
    if (!text) return
    Clipboard.setString(text)
    toast.show({
      render: () => <HToast status='success' message='Copied!' />,
      placement: 'top',
      duration: TOAST_LENGTH_SHORT
    })
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
      <HStack mt='6' alignItems='center'>
        <Image source={icons.email} style={styles.infoIcon} />
        {isLoading ? (
          <Skeleton h='4' w='32' rounded='sm' ml='2' />
        ) : (
          <HStack ml='5' mr='6' borderBottomColor={colors.borderColor} borderBottomWidth='1'>
            <HText style={styles.infoText}>{lead?.email}</HText>
            {lead?.email && (
              <Pressable
                style={{ transform: [{ rotateY: '180deg' }] }}
                _pressed={{ opacity: 0.6 }}
                onPress={() => copyToClipboard(lead?.email)}
              >
                <MaterialIcons name='content-copy' color={colors.white} size={14} />
              </Pressable>
            )}
          </HStack>
        )}
      </HStack>
      <HStack mt='5' alignItems='center'>
        <Image source={icons.phone} style={styles.infoIcon} />
        {isLoading ? (
          <Skeleton h='4' w='32' rounded='sm' ml='2' />
        ) : (
          <HStack ml='5' mr='6' borderBottomColor={colors.borderColor} borderBottomWidth='1'>
            <HText style={styles.infoText}>{lead?.phone_number}</HText>
            {lead?.phone_number && (
              <Pressable
                style={{ transform: [{ rotateY: '180deg' }] }}
                _pressed={{ opacity: 0.6 }}
                onPress={() => copyToClipboard(lead?.phone_number)}
              >
                <MaterialIcons name='content-copy' color={colors.white} size={14} />
              </Pressable>
            )}
          </HStack>
        )}
      </HStack>
      <Box alignItems='center' mt='10'>
        <HButton
          text='Contact'
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