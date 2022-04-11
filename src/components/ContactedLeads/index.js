import React, { useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { HStack, VStack, Box, Checkbox, Icon, Pressable } from 'native-base'
import { HText } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const dummyData = [
  { id: 1, name: 'Jonathan Shah', status: 3 },
  { id: 2, name: 'James Smith', status: 2 },
  { id: 3, name: 'Robert Smith', status: 4 },
  { id: 4, name: 'David Smith', status: 1 },
  { id: 5, name: 'James Johnson', status: 3 },
]

export const ContactedLeads = (props) => {
  const {
    onNavigationRedirect
  } = props
  const [contactedLeadsList, setContactedLeadsList] = useState(dummyData)
  const getStatus = (status) => {
    const statuses = [
      { value: 1, content: 'New', color: colors.primary },
      { value: 2, content: 'Rejected', color: colors.rejected },
      { value: 3, content: 'Closed Sale', color: colors.darkGreen },
      { value: 4, content: 'Attempted Contact', color: colors.green },
    ]
    const objectStatus = statuses.find((o) => o.value === status)
    return objectStatus && objectStatus
  }

  const handleSortList = (sort) => {
    const _contactedLeadsList = [...dummyData]
    if (sort === 'status') {
      _contactedLeadsList.sort((a, b) => {
        return a.status - b.status
      })
    }
    if (sort === 'name') {
      _contactedLeadsList.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
    }
    setContactedLeadsList(_contactedLeadsList)
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
          <HStack>
            <Pressable
              flex='1'
              _pressed={{
                backgroundColor: colors.text05
              }}
              onPress={() => handleSortList('name')}
            >
              <HStack py='2'>
                <HText style={styles.headerNameText}>Name</HText>
                <Image source={icons.arrowDown} style={styles.arrowDownIcon} />
              </HStack>
            </Pressable>
            <Pressable
              flex='1'
              _pressed={{
                backgroundColor: colors.text05
              }}
              onPress={() => handleSortList('status')}
            >
              <HStack py='2'>
                <HText style={styles.statusText}>Status</HText>
                <Image source={icons.arrowDown} style={styles.arrowDownIcon} />
              </HStack>
            </Pressable>
          </HStack>
          {contactedLeadsList.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onNavigationRedirect('ContactLead')}
              _pressed={{
                backgroundColor: colors.text05
              }}
            >
              <HStack py='4' borderBottomColor={colors.borderColor} borderBottomWidth={1}>
                <HText style={styles.contactText}>{item.name}</HText>
                <HStack alignItems='center' flex='1'>
                  <Box mr='2'>
                    <MaterialIcons name='circle' color={getStatus(item.status).color} size={8} />
                  </Box>
                  <HText style={styles.contactText}>{getStatus(item.status).content}</HText>
                </HStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </View>
  )
}
