import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { HStack, VStack, Box, Checkbox, Icon, Pressable } from 'native-base'
import { HText } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const ContactedLeads = (props) => {
  const {
    onNavigationRedirect
  } = props
  const getStatus = (status) => {
    const statuses = [
      { value: 1, content: 'Working with client', color: colors.disabled },
      { value: 2, content: 'New', color: colors.primary },
      { value: 3, content: 'Rejected', color: colors.red },
      { value: 4, content: 'Closed Sale', color: colors.darkGreen },
      { value: 5, content: 'Attempted Contact', color: colors.green },
    ]
    const objectStatus = statuses.find((o) => o.value === status)
    return objectStatus && objectStatus
  }
  return (
    <View style={styles.screenContainer}>
      <HText style={styles.title}>Contacted Leads</HText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <VStack mb='10'>
          <HStack mb='4' justifyContent='space-between'>
            <HText style={styles.filterText}>Filter by:</HText>
            <HText style={styles.filterText}>420 leads</HText>
          </HStack>
          <HStack>
            <HStack alignItems='center' mr='8'>
              <Checkbox
                size='md'
                borderRadius={15}
                borderColor={colors.primary}
                _checked={{
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                }}
                _interactionBox={{
                  opacity: 0
                }}
                icon={
                  <Icon as={<Image source={icons.cirlceCheckOn} />} />
                }
                accessibilityLabel='Buyers'
              />
              <HText style={styles.radioLabel}>Buyers</HText>
            </HStack>
            <HStack alignItems='center' mr='8'>
              <Checkbox
                size='md'
                borderRadius={15}
                borderColor={colors.primary}
                _checked={{
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                }}
                _interactionBox={{
                  opacity: 0
                }}
                icon={
                  <Icon as={<Image source={icons.cirlceCheckOn} />} />
                }
              />
              <HText style={styles.radioLabel}>Sellers</HText>
            </HStack>
            <HStack alignItems='center'>
              <Checkbox
                size='md'
                borderRadius={15}
                borderColor={colors.primary}
                _checked={{
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                }}
                _interactionBox={{
                  opacity: 0
                }}
                icon={
                  <Icon as={<Image source={icons.cirlceCheckOn} />} />
                }
              />
              <HText style={styles.radioLabel}>Prospective</HText>
            </HStack>
          </HStack>
        </VStack>
        <VStack>
          <HStack py='2'>
            <HStack flex='1'>
              <HText style={styles.headerNameText}>Name</HText>
              <Image source={icons.arrowDown} style={styles.arrowDownIcon} />
            </HStack>
            <HText style={styles.statusText}>Status</HText>
          </HStack>
          {[...Array(5).keys()].map(i => (
            <Pressable
              key={i}
              onPress={() => onNavigationRedirect('ContactLead')}
              _pressed={{
                backgroundColor: colors.text05
              }}
            >
              <HStack py='4' borderBottomColor={colors.borderColor} borderBottomWidth={1}>
                <HText style={styles.contactText}>Jonathan Shah</HText>
                <HStack alignItems='center' flex='1'>
                  <Box mr='2'>
                    <MaterialIcons name='circle' color={getStatus(i + 1).color} size={8} />
                  </Box>
                  <HText style={styles.contactText}>{getStatus(i + 1).content}</HText>
                </HStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </View>
  )
}
