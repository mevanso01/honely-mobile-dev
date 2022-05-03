import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { HStack, VStack, Box, Checkbox, Icon, Pressable } from 'native-base'
import { HText } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { leadStatuses } from '../../utils/constants'

export const ContactedLeads = (props) => {
  const {
    onNavigationRedirect
  } = props

  const currentUser = useSelector(state => state.currentUser)

  const [isBuyers, setIsBuyers] = useState(true)
  const [isSellers, setIsSellers] = useState(true)
  const [isProspective, setIsProspective] = useState(true)
  const [contactedLeadsList, setContactedLeadsList] = useState([])
  const [isNameAscending, setIsNameAscending] = useState(false)
  const [isStatusAscending, setIsStatusAscending] = useState(false)
  const [isNameSort, setIsNameSort] = useState(true)

  const getStatus = (status) => {
    const objectStatus = leadStatuses.find((o) => o.key === status)
    return objectStatus && objectStatus
  }

  const handleSortList = (leadsList) => {
    const _contactedLeadsList = [...leadsList]
    if (!isNameSort) {
      setIsNameSort(false)
      if (isStatusAscending) {
        _contactedLeadsList.sort((a, b) => {
          return getStatus(b.agent_status)?.value - getStatus(a.agent_status)?.value
        })
      } else {
        _contactedLeadsList.sort((a, b) => {
          return getStatus(a.agent_status)?.value - getStatus(b.agent_status)?.value
        })
      }
    }
    if (isNameSort) {
      setIsNameSort(true)
      if (!isNameAscending) {
        _contactedLeadsList.sort(function(a, b){
          if(a.name > b.name) { return 1; }
          if(a.name < b.name) { return -1; }
          return 0;
        })
      } else {
        _contactedLeadsList.sort(function(a, b){
          if(a.name < b.name) { return 1; }
          if(a.name > b.name) { return -1; }
          return 0;
        })
      }
    }
    setContactedLeadsList(_contactedLeadsList)
  }

  const onSelectFilterBy = (selected, type) => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    }
    ReactNativeHapticFeedback.trigger('impactLight', options)
    switch (type) {
      case 'buyers':
        setIsBuyers(selected)
        break
      case 'sellers':
        setIsSellers(selected)
        break
      case 'prospective':
        setIsProspective(selected)
        break
    }
  }

  const handleLeadsFilter = (response) => {
    let _leadsList = []
    if (isBuyers && response?.buyers?.leads) {
      const _buyerLeads = response.buyers?.leads.filter(lead => lead.agent_status !== 'NEW')
      if (_buyerLeads.length) {
        const buyerLeads = _buyerLeads.map(lead => {
          return { ...lead, level: 'buyers' }
        })
        _leadsList = [..._leadsList, ...buyerLeads]
      }
    }
    if (isSellers && response?.sellers?.leads) {
      const _sellerLeads = response.sellers?.leads.filter(lead => lead.agent_status !== 'NEW')
      if (_sellerLeads.length) {
        const sellerLeads = _sellerLeads.map(lead => {
          return { ...lead, level: 'sellers' }
        })
        _leadsList = [..._leadsList, ...sellerLeads]
      }
    }
    if (isProspective && response?.prospective?.leads) {
      const _prospectiveLeads = response.prospective?.leads.filter(lead => lead.agent_status !== 'NEW')
      if (_prospectiveLeads.length) {
        const prospectiveLeads = _prospectiveLeads.map(lead => {
          return { ...lead, level: 'prospective' }
        })
        _leadsList = [..._leadsList, ...prospectiveLeads]
      }
    }
    return _leadsList
  }

  useEffect(() => {
    if (!currentUser?.leads) return
    const _leadsList = handleLeadsFilter(currentUser?.leads)
    handleSortList(_leadsList)
  }, [JSON.stringify(currentUser?.leads), isBuyers, isSellers, isProspective, isNameSort, isNameAscending, isStatusAscending])

  return (
    <View style={styles.screenContainer}>
      <HText style={styles.title}>Contacted Leads</HText>
      <VStack mb='10'>
        <HStack mb='4' justifyContent='space-between'>
          <HText style={styles.filterText}>Filter by:</HText>
          <HText style={styles.filterText}>{contactedLeadsList?.length} leads</HText>
        </HStack>
        <HStack>
          <Checkbox
            size='md'
            mr='8'
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
            isChecked={isBuyers}
            onChange={selected => onSelectFilterBy(selected, 'buyers')}
          >
            <HText style={styles.radioLabel}>Buyers</HText>
          </Checkbox>
          <Checkbox
            size='md'
            mr='8'
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
            isChecked={isSellers}
            onChange={selected => onSelectFilterBy(selected, 'sellers')}
          >
            <HText style={styles.radioLabel}>Sellers</HText>
          </Checkbox>
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
            isChecked={isProspective}
            onChange={selected => onSelectFilterBy(selected, 'prospective')}
          >
            <HText style={styles.radioLabel}>Prospective</HText>
          </Checkbox>
        </HStack>
      </VStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <VStack>
          <HStack>
            <Pressable
              flex='1'
              _pressed={{
                backgroundColor: colors.text05
              }}
              onPress={() => {
                setIsNameSort(true)
                setIsNameAscending(!isNameAscending)
              }}
            >
              <HStack py='2'>
                <HText style={isNameSort ? styles.headerNameText : styles.statusText}>Name</HText>
                {isNameSort && (
                  <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: isNameAscending ? '0deg': '180deg' }] }]} />
                )}
              </HStack>
            </Pressable>
            <Pressable
              flex='1'
              _pressed={{
                backgroundColor: colors.text05
              }}
              onPress={() => {
                setIsNameSort(false)
                setIsStatusAscending(!isStatusAscending)
              }}
            >
              <HStack py='2'>
                <HText style={!isNameSort ? styles.headerNameText : styles.statusText}>Status</HText>
                {!isNameSort && (
                  <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: isStatusAscending ? '0deg': '180deg' }] }]} />
                )}
              </HStack>
            </Pressable>
          </HStack>
          {contactedLeadsList.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onNavigationRedirect('ContactLead', { level: item.level, lead: item })}
              _pressed={{
                backgroundColor: colors.text05
              }}
            >
              <HStack py='4' borderBottomColor={colors.borderColor} borderBottomWidth={1}>
                <HText style={styles.contactText}>{item.name}</HText>
                <HStack alignItems='center' flex='1'>
                  <Box mr='2'>
                    <MaterialIcons name='circle' color={getStatus(item.agent_status).color} size={8} />
                  </Box>
                  <HText style={styles.contactText}>{getStatus(item.agent_status).content}</HText>
                </HStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </View>
  )
}
