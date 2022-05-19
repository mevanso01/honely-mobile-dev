import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import { HStack, VStack, Box, Checkbox, Pressable } from 'native-base'
import { HText, HUserFilterBy, HCartButton } from '../Shared'
import { colors, icons, images } from '../../utils/styleGuide'
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
  const [isOpenStatusList, setIsOpenStatusList] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState(['ATTEMPTED_CONTACT', 'FOLLOWED_UP', 'PENDING_SALE', 'CLOSED_LEADS', 'REJECTED'])
  const [totalLeads, setTotalLeads] = useState(0)

  const getStatus = (status) => {
    const objectStatus = leadStatuses.find((o) => o.key === status)
    return objectStatus && objectStatus
  }

  const handleSortList = (leadsList) => {
    const _contactedLeadsList = [...leadsList]
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
    setContactedLeadsList(_contactedLeadsList)
  }

  const handleLeadsFilter = (response) => {
    let _leadsList = []
    let _totalLead = 0
    if (response?.buyers?.leads) {
      const _buyerLeads = response.buyers?.leads.filter(lead => lead.agent_status !== 'NEW' && (selectedStatuses.includes(lead.agent_status) || !selectedStatuses.length))
      _totalLead += _buyerLeads.length
      if (_buyerLeads.length && isBuyers) {
        const buyerLeads = _buyerLeads.map(lead => {
          return { ...lead, level: 'buyers' }
        })
        _leadsList = [..._leadsList, ...buyerLeads]
      }
    }
    if (response?.sellers?.leads) {
      const _sellerLeads = response.sellers?.leads.filter(lead => lead.agent_status !== 'NEW' && (selectedStatuses.includes(lead.agent_status) || !selectedStatuses.length))
      _totalLead += _sellerLeads.length
      if (_sellerLeads.length && isSellers) {
        const sellerLeads = _sellerLeads.map(lead => {
          return { ...lead, level: 'sellers' }
        })
        _leadsList = [..._leadsList, ...sellerLeads]
      }
    }
    if (response?.prospective?.leads) {
      const _prospectiveLeads = response.prospective?.leads.filter(lead => lead.agent_status !== 'NEW' && (selectedStatuses.includes(lead.agent_status) || !selectedStatuses.length))
      _totalLead += _prospectiveLeads.length
      if (_prospectiveLeads.length && isProspective) {
        const prospectiveLeads = _prospectiveLeads.map(lead => {
          return { ...lead, level: 'prospective' }
        })
        _leadsList = [..._leadsList, ...prospectiveLeads]
      }
    }
    setTotalLeads(_totalLead)
    return _leadsList
  }

  useEffect(() => {
    if (!currentUser?.leads) return
    const _leadsList = handleLeadsFilter(currentUser?.leads)
    handleSortList(_leadsList)
  }, [JSON.stringify(currentUser?.leads), isBuyers, isSellers, isProspective, isNameAscending, selectedStatuses])

  return (
    <TouchableWithoutFeedback onPress={() => {
      setIsOpenStatusList(false)
    }}>
      <View style={styles.screenContainer}>
        <View style={{ paddingHorizontal: 18 }}>
          <View style={styles.headerContainer}>
            <HText style={styles.title}>Contacted Leads</HText>
            <View style={styles.cartIconWrapper}>
              <HCartButton
                countWrapperStyle={{ backgroundColor: colors.backgroundLightGray }}
                onPress={() => onNavigationRedirect('LeadsCheckout')}
              />
            </View>
          </View>
          <VStack mb='5'>
            <View style={styles.filterContainer}>
              <HUserFilterBy
                headerTitle={`${contactedLeadsList?.length} of ${totalLeads} leads`}
                isBuyers={isBuyers}
                setIsBuyers={setIsBuyers}
                isSellers={isSellers}
                setIsSellers={setIsSellers}
                isProspective={isProspective}
                setIsProspective={setIsProspective}
              />
            </View>
          </VStack>
          <HStack zIndex={100}>
            <Pressable
              flex='1'
              _pressed={{
                backgroundColor: colors.text05
              }}
              onPress={() => {
                setIsOpenStatusList(false)
                setIsNameAscending(!isNameAscending)
              }}
            >
              <HStack py='2'>
                <HText style={styles.headerNameText}>Name</HText>
                <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: isNameAscending ? '0deg': '180deg' }] }]} />
              </HStack>
            </Pressable>
            <View style={styles.statusListContainer}>
              <Pressable
                _pressed={{
                  backgroundColor: colors.text05
                }}
                onPress={() => setIsOpenStatusList(!isOpenStatusList)}
              >
                <HStack py='2'>
                  <HText style={styles.statusText}>Status</HText>
                  <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: isOpenStatusList ? '180deg' : '0deg' }] }]} />
                </HStack>
              </Pressable>
              {isOpenStatusList && (
                <View style={styles.dropDownListContainer}>
                  <Checkbox.Group
                    defaultValue={selectedStatuses}
                    onChange={values => {
                      setSelectedStatuses(values || []);
                    }}
                  >
                    {leadStatuses.filter(lead => lead.key !== 'NEW').map(lead => (
                      <HStack
                        key={lead.key}
                        alignItems='center'
                        p='2'
                      >
                        <Checkbox
                          size='sm'
                          borderColor={colors.primary}
                          _checked={{
                            backgroundColor: colors.primary,
                            borderColor: colors.primary
                          }}
                          _interactionBox={{
                            opacity: 0
                          }}
                          mr='1'
                          value={lead.key}
                        >
                          <HText style={styles.radioLabel}>{lead.content}</HText>
                        </Checkbox>
                      </HStack>
                    ))}
                  </Checkbox.Group>
                </View>
              )}
            </View>
          </HStack>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <VStack>
            {contactedLeadsList.map(item => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setIsOpenStatusList(false)
                  onNavigationRedirect('ContactLead', { level: item.level, lead: item })
                }}
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
          {totalLeads === 0 && (
            <VStack alignItems='center' flex='1' justifyContent='center'>
              <Image source={images.dummyAvatar} style={styles.avatarWrapper} />
              <VStack mt='12'>
                <HText style={styles.subtitle}>No Contacted Leads</HText>
                <HText style={styles.description}>You will need to first contact a lead to see them here.</HText>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}
