import React from 'react'
import { Image, View } from 'react-native'
import { HText, HButton } from '../Shared'
import { colors,  icons } from '../../utils/styleGuide'
import { HStack, Box, Skeleton } from 'native-base'
import styles from './style'
import { leadStatuses } from '../../utils/constants'

export const LeadCard = (props) => {
  const {
    onNavigationRedirect,
    isLoading,
    type,
    lead,
    level
  } = props

  const getStatus = (status) => {
    const objectStatus = leadStatuses.find((o) => o.key === status)
    return objectStatus && objectStatus
  }

  return (
    <View style={styles.cardContainer}>
      <HStack alignItems='center' borderBottomColor={colors.borderColor} borderBottomWidth='1' pb='5'>
        <Image source={icons.location} style={styles.locationIcon}
        />
        {isLoading ? (
          <Skeleton h='5' w='24' rounded='sm' ml='2' />
        ) : (
          <HText style={styles.locationText} numberOfLines={1}>{lead?.searched_address}</HText>
        )}
      </HStack>
      <Box mt='6' mb='6'>
        {isLoading ? (
          <Skeleton h='6' w='32' rounded='sm' />
        ) : (
          <HText style={styles.nameText}>{lead?.name}</HText>
        )}
      </Box>
      <HStack justifyContent='space-between'>
        {isLoading ? (
          <Skeleton h='4' w='20' rounded='sm' />
        ) : (
          <HText style={styles.userTypeText}>{type}</HText>
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
          <HText style={styles.infoText}>{lead?.email}</HText>
        )}
      </HStack>
      <HStack mt='5' alignItems='center'>
        <Image source={icons.phone} style={styles.infoIcon} />
        {isLoading ? (
          <Skeleton h='4' w='32' rounded='sm' ml='2' />
        ) : (
          <HText style={styles.infoText}>{lead?.phone_number}</HText>
        )}
      </HStack>
      <Box alignItems='center' mt='16'>
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
          onPress={() => onNavigationRedirect('ContactLead', { lead: lead, level: level })}
        />
      </Box>
    </View>
  )
}